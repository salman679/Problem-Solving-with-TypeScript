# TypeScript গভীর আলোচনা: Interface vs Type এবং keyof এর শক্তি

## ব্লগ ১: TypeScript-এ Interface এবং Type-এর মধ্যে পার্থক্য

### ভূমিকা

TypeScript কাস্টম টাইপ ডিফাইন করার জন্য দুটি শক্তিশালী উপায় প্রদান করে: **interface** এবং **type alias**। যদিও এগুলো প্রায়ই একে অপরের বিকল্প বলে মনে হয়, তবে রক্ষণাবেক্ষণযোগ্য এবং স্কেলেবল TypeScript কোড লেখার জন্য এদের মধ্যে পার্থক্য বোঝা অত্যন্ত গুরুত্বপূর্ণ। এই ব্লগে, আমরা মূল পার্থক্যগুলো এবং কখন কোনটি ব্যবহার করতে হবে তা জানব।

### Interface কী?

TypeScript-এ Interface একটি অবজেক্টের কাঠামো নির্ধারণ করে। এটি একটি চুক্তি যা অবজেক্টে নির্দিষ্ট প্রপার্টি এবং মেথড বাধ্যতামূলক করে।

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

const user: User = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
};
```

### Type Alias কী?

Type alias যেকোনো টাইপের জন্য একটি নতুন নাম তৈরি করে, যার মধ্যে রয়েছে প্রিমিটিভ, ইউনিয়ন, টাপল এবং আরও জটিল টাইপ।

```typescript
type User = {
  id: number;
  name: string;
  email: string;
};

type ID = string | number;
type Coordinate = [number, number];
```

### মূল পার্থক্যসমূহ

#### ১. **Declaration Merging (ঘোষণা একত্রীকরণ)**

Interface declaration merging সমর্থন করে, যা আপনাকে একই interface একাধিকবার ডিফাইন করতে দেয় এবং TypeScript স্বয়ংক্রিয়ভাবে সেগুলো একত্রিত করে।

```typescript
interface Animal {
  name: string;
}

interface Animal {
  age: number;
}

// মার্জ হওয়া interface
const dog: Animal = {
  name: "Buddy",
  age: 5,
};
```

Type alias **একত্রিত করা যায় না**:

```typescript
type Animal = {
  name: string;
};

// Error: Duplicate identifier 'Animal'
type Animal = {
  age: number;
};
```

#### ২. **Extending এবং Implementing**

Interface এবং type উভয়ই extend করা যায়, তবে তাদের সিনট্যাক্স ভিন্ন:

**Interface:**

```typescript
interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}

class Labrador implements Dog {
  name = "Max";
  breed = "Labrador";
}
```

**Type:**

```typescript
type Animal = {
  name: string;
};

type Dog = Animal & {
  breed: string;
};
```

#### ৩. **Union এবং Intersection Types**

Type alias union এবং intersection টাইপ তৈরিতে দক্ষ:

```typescript
type Status = "pending" | "approved" | "rejected";
type ID = string | number;

type Admin = User & {
  role: "admin";
  permissions: string[];
};
```

Interface সরাসরি union টাইপ প্রতিনিধিত্ব করতে পারে না:

```typescript
// Interface দিয়ে সম্ভব নয়
interface Status = "pending" | "approved" | "rejected"; // Error
```

#### ৪. **Computed Properties**

Type alias computed properties আরও নমনীয়ভাবে ব্যবহার করতে পারে:

```typescript
type Keys = "name" | "age";
type Person = {
  [K in Keys]: string;
};

// সমতুল্য:
// type Person = {
//   name: string;
//   age: string;
// }
```

#### ৫. **Primitive Types**

Type alias প্রিমিটিভ, ইউনিয়ন এবং টাপল প্রতিনিধিত্ব করতে পারে, কিন্তু interface পারে না:

```typescript
type StringOrNumber = string | number; // ✓
type Coordinates = [number, number]; // ✓
type Callback = (data: string) => void; // ✓

// Interface দিয়ে এটি করা যায় না
interface StringOrNumber = string | number; // Error
```

### পারফরম্যান্স বিবেচনা

বেশিরভাগ ক্ষেত্রে, কোনো উল্লেখযোগ্য পারফরম্যান্স পার্থক্য নেই। তবে, বড় প্রজেক্টে কম্পাইলেশন গতির দিক থেকে interface একটু এগিয়ে থাকতে পারে কারণ TypeScript কম্পাইলার এগুলো আরও দক্ষতার সাথে ক্যাশ করতে পারে।

### কখন কোনটি ব্যবহার করবেন?

**Interface ব্যবহার করুন যখন:**

- অবজেক্টের আকৃতি এবং class contract ডিফাইন করা হচ্ছে
- Declaration merging প্রয়োজন (যেমন, তৃতীয় পক্ষের লাইব্রেরি extend করা)
- পাবলিক API তৈরি করছেন যা ব্যবহারকারীরা extend করতে পারবে
- Object-oriented programming প্যাটার্নের সাথে কাজ করছেন

**Type Alias ব্যবহার করুন যখন:**

- Union বা intersection টাইপ তৈরি করছেন
- Primitive টাইপ alias ডিফাইন করছেন
- Tuple নিয়ে কাজ করছেন
- জটিল mapped বা conditional টাইপ তৈরি করছেন
- টাইপ composition-এ আরও নমনীয়তা প্রয়োজন

### সর্বোত্তম অনুশীলন

১. **সামঞ্জস্যতা**: আপনার প্রজেক্টের জন্য একটি কনভেনশন বেছে নিন এবং তাতে লেগে থাকুন
২. **পাবলিক API**: পাবলিক API-এর জন্য interface পছন্দ করুন declaration merging এর জন্য
৩. **জটিল টাইপ**: Union, intersection এবং mapped টাইপের জন্য type alias ব্যবহার করুন
৪. **React Props**: উভয়ই ভালো কাজ করে, তবে অনেক টিম React component props-এর জন্য `type` পছন্দ করে
৫. **অবজেক্ট আকৃতি**: সরল অবজেক্ট আকৃতি ডিফাইন করার সময়, যেকোনোটি কাজ করে—আপনার টিমের কনভেনশনের উপর ভিত্তি করে বেছে নিন

### উপসংহার

Interface এবং type alias উভয়ই TypeScript-এর টাইপ সিস্টেমের শক্তিশালী টুল। তাদের পার্থক্য বোঝা আপনাকে প্রতিটি পরিস্থিতিতে সঠিক টুল বেছে নিতে সাহায্য করে। মনে রাখবেন: Interface অবজেক্ট চুক্তি এবং extensibility-এর জন্য আদর্শ, যখন type alias জটিল টাইপ composition-এ আরও নমনীয়তা প্রদান করে।

---

## ব্লগ ২: TypeScript-এ `keyof` কীওয়ার্ডে দক্ষতা অর্জন

### ভূমিকা

TypeScript-এর `keyof` অপারেটর একটি শক্তিশালী ফিচার যা টাইপ-নিরাপদ প্রপার্টি অ্যাক্সেস এবং ম্যানিপুলেশন সম্ভব করে। এটি TypeScript-এর উন্নত টাইপ সিস্টেমের একটি ভিত্তি, যা ডেভেলপারদের আরও নমনীয় এবং রক্ষণাবেক্ষণযোগ্য কোড তৈরি করতে দেয়। এই ব্লগে, আমরা জানব `keyof` কী করে, কীভাবে এটি ব্যবহার করতে হয় এবং ব্যবহারিক উদাহরণ দেখব।

### `keyof` কী?

`keyof` অপারেটর একটি অবজেক্ট টাইপ নেয় এবং তার কী-গুলোর একটি string বা numeric literal union তৈরি করে। এটি একটি **টাইপ অপারেটর** যা বিদ্যমান টাইপের কী থেকে একটি নতুন টাইপ তৈরি করে।

### মৌলিক ব্যবহার

```typescript
interface Person {
  name: string;
  age: number;
  email: string;
}

type PersonKeys = keyof Person;
// PersonKeys = "name" | "age" | "email"

let key: PersonKeys;
key = "name"; // ✓ Valid
key = "age"; // ✓ Valid
key = "email"; // ✓ Valid
key = "address"; // ✗ Error: Type '"address"' is not assignable to type 'keyof Person'
```

### ব্যবহারিক উদাহরণসমূহ

#### উদাহরণ ১: টাইপ-নিরাপদ প্রপার্টি অ্যাক্সেস

একটি ফাংশন তৈরি করুন যা নিরাপদভাবে অবজেক্ট প্রপার্টি অ্যাক্সেস করে:

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user: User = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  age: 30,
};

const userName = getProperty(user, "name"); // Type: string
const userAge = getProperty(user, "age"); // Type: number
// const invalid = getProperty(user, "invalid"); // Error: Argument of type '"invalid"' is not assignable
```

এটি অবজেক্ট প্রপার্টি অ্যাক্সেস করার সময় কম্পাইল-টাইম নিরাপত্তা নিশ্চিত করে!

#### উদাহরণ ২: ডায়নামিক প্রপার্টি আপডেট

একটি টাইপ-নিরাপদ আপডেট ফাংশন তৈরি করুন:

```typescript
interface Product {
  id: string;
  name: string;
  price: number;
  inStock: boolean;
}

function updateProduct<K extends keyof Product>(
  product: Product,
  key: K,
  value: Product[K]
): Product {
  return {
    ...product,
    [key]: value,
  };
}

let product: Product = {
  id: "p1",
  name: "Laptop",
  price: 999,
  inStock: true,
};

product = updateProduct(product, "price", 899); // ✓ Valid
product = updateProduct(product, "inStock", false); // ✓ Valid
// product = updateProduct(product, "price", "cheap");  // ✗ Error: wrong type
```

#### উদাহরণ ৩: Pick ফাংশন তৈরি করা

একটি কাস্টম `pick` ফাংশন implement করুন যা নির্দিষ্ট প্রপার্টি extract করে:

```typescript
function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;

  keys.forEach((key) => {
    result[key] = obj[key];
  });

  return result;
}

interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  salary: number;
}

const employee: Employee = {
  id: 101,
  name: "Bob Smith",
  email: "bob@company.com",
  department: "Engineering",
  salary: 80000,
};

const publicInfo = pick(employee, ["id", "name", "department"]);
// Type: { id: number; name: string; department: string; }
```

#### উদাহরণ ৪: `keyof` এর সাথে Mapped Types

বিদ্যমান টাইপের উপর ভিত্তি করে ডায়নামিক টাইপ তৈরি করুন:

```typescript
interface Settings {
  theme: string;
  language: string;
  notifications: boolean;
}

// একটি টাইপ তৈরি করুন যেখানে সব প্রপার্টি optional
type PartialSettings = {
  [K in keyof Settings]?: Settings[K];
};

// একটি টাইপ তৈরি করুন যেখানে সব প্রপার্টি readonly
type ReadonlySettings = {
  readonly [K in keyof Settings]: Settings[K];
};

// একটি টাইপ তৈরি করুন যা সব প্রপার্টিকে string-এ রূপান্তর করে
type SettingsAsStrings = {
  [K in keyof Settings]: string;
};
```

#### উদাহরণ ৫: `keyof` দিয়ে ফর্ম ভ্যালিডেশন

একটি টাইপ-নিরাপদ ফর্ম ভ্যালিডেটর তৈরি করুন:

```typescript
interface FormData {
  username: string;
  email: string;
  password: string;
  age: number;
}

type ValidationErrors<T> = {
  [K in keyof T]?: string;
};

function validateForm(data: FormData): ValidationErrors<FormData> {
  const errors: ValidationErrors<FormData> = {};

  if (data.username.length < 3) {
    errors.username = "Username must be at least 3 characters";
  }

  if (!data.email.includes("@")) {
    errors.email = "Invalid email format";
  }

  if (data.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }

  if (data.age < 18) {
    errors.age = "Must be 18 or older";
  }

  return errors;
}

const formData: FormData = {
  username: "ab",
  email: "invalid-email",
  password: "short",
  age: 16,
};

const errors = validateForm(formData);
console.log(errors);
// {
//   username: "Username must be at least 3 characters",
//   email: "Invalid email format",
//   password: "Password must be at least 8 characters",
//   age: "Must be 18 or older"
// }
```

#### উদাহরণ ৬: জেনেরিক ইভেন্ট হ্যান্ডলার তৈরি করা

`keyof` দিয়ে টাইপ-নিরাপদ event handling:

```typescript
interface Events {
  click: { x: number; y: number };
  hover: { elementId: string };
  submit: { formData: Record<string, string> };
}

type EventCallback<K extends keyof Events> = (data: Events[K]) => void;

class EventEmitter {
  private listeners: {
    [K in keyof Events]?: EventCallback<K>[];
  } = {};

  on<K extends keyof Events>(event: K, callback: EventCallback<K>): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event]!.push(callback);
  }

  emit<K extends keyof Events>(event: K, data: Events[K]): void {
    const callbacks = this.listeners[event];
    if (callbacks) {
      callbacks.forEach((callback) => callback(data));
    }
  }
}

const emitter = new EventEmitter();

emitter.on("click", (data) => {
  console.log(`Clicked at: ${data.x}, ${data.y}`);
});

emitter.on("submit", (data) => {
  console.log("Form submitted:", data.formData);
});

emitter.emit("click", { x: 100, y: 200 });
emitter.emit("submit", { formData: { name: "John" } });
```

### উন্নত ব্যবহার ক্ষেত্র

#### Conditional Types এর সাথে `keyof` একত্রিত করা

```typescript
interface Config {
  apiUrl: string;
  timeout: number;
  retries: number;
  debug: boolean;
}

type StringKeys<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

type NumberKeys<T> = {
  [K in keyof T]: T[K] extends number ? K : never;
}[keyof T];

type ConfigStringKeys = StringKeys<Config>; // "apiUrl"
type ConfigNumberKeys = NumberKeys<Config>; // "timeout" | "retries"
```

#### Index Signatures এর সাথে `keyof` ব্যবহার করা

```typescript
interface Dictionary {
  [key: string]: number;
}

type DictionaryKeys = keyof Dictionary; // string | number
// নোট: number অন্তর্ভুক্ত কারণ JS সংখ্যাসূচক কী-গুলোকে string-এ রূপান্তর করে
```

### `keyof` ব্যবহারের সুবিধাসমূহ

১. **টাইপ নিরাপত্তা**: কম্পাইল টাইমে অস্তিত্বহীন প্রপার্টি অ্যাক্সেস প্রতিরোধ করে
২. **রিফ্যাক্টরিং**: যখন আপনি একটি প্রপার্টি রিনেম করেন, TypeScript সমস্ত প্রভাবিত ব্যবহার ধরবে
৩. **অটোকমপ্লিট**: IDE বৈধ কী-এর জন্য বুদ্ধিমান পরামর্শ প্রদান করতে পারে
৪. **স্ব-নথিভুক্ত**: কোড আরও পাঠযোগ্য এবং স্ব-ব্যাখ্যামূলক হয়ে ওঠে
৫. **রানটাইম ত্রুটি হ্রাস**: ডেভেলপমেন্টের সময় অনেক ত্রুটি ধরে ফেলে

### সাধারণ প্যাটার্নসমূহ

#### প্যাটার্ন ১: নেস্টেড প্রপার্টি অ্যাক্সেস

```typescript
type DeepKeyOf<T> = {
  [K in keyof T]: K extends string
    ? T[K] extends object
      ? K | `${K}.${DeepKeyOf<T[K]>}`
      : K
    : never;
}[keyof T];
```

#### প্যাটার্ন ২: প্রয়োজনীয় কী-সমূহ

```typescript
type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];
```

### উপসংহার

`keyof` অপারেটর TypeScript-এর টাইপ সিস্টেমে একটি অপরিহার্য টুল। এটি টাইপ-নিরাপদ প্রপার্টি অ্যাক্সেস সক্ষম করে, উন্নত utility টাইপগুলোকে শক্তি প্রদান করে এবং নমনীয়, পুনর্ব্যবহারযোগ্য ফাংশন তৈরি করতে সাহায্য করে। `keyof` তে দক্ষতা অর্জন করে, আপনি আরও শক্তিশালী TypeScript কোড লিখতে পারবেন যা রানটাইমের পরিবর্তে কম্পাইল টাইমে ত্রুটি ধরে।

আপনি ফর্ম ভ্যালিডেটর তৈরি করুন, জেনেরিক utility ফাংশন তৈরি করুন বা টাইপ-নিরাপদ API ডিজাইন করুন না কেন, `keyof` একটি মৌলিক বিল্ডিং ব্লক যা আপনার TypeScript দক্ষতাকে পরবর্তী স্তরে নিয়ে যাবে।

### মূল বিষয়সমূহ

- `keyof` একটি অবজেক্টের কী-গুলোর union টাইপ তৈরি করে
- এটি টাইপ-নিরাপদ প্রপার্টি অ্যাক্সেস এবং ম্যানিপুলেশন সক্ষম করে
- শক্তিশালী, পুনর্ব্যবহারযোগ্য ফাংশনের জন্য `keyof` কে generics এর সাথে একত্রিত করুন
- বিদ্যমান টাইপ রূপান্তর করতে এটি mapped টাইপের সাথে ব্যবহার করুন
- টাইপ-নিরাপদ লাইব্রেরি এবং ফ্রেমওয়ার্ক তৈরির জন্য এটি অপরিহার্য

আজই আপনার TypeScript প্রজেক্টে `keyof` অন্তর্ভুক্ত করা শুরু করুন এবং কম্পাইল-টাইম নিরাপত্তার শক্তি অনুভব করুন!
