# ব্লগ ১: TypeScript-এ Interface vs Type - কোনটা কখন ব্যবহার করবেন?

TypeScript ব্যবহার করতে করতে আমরা প্রায়ই একটা দ্বিধায় পড়ি-**interface** আর **type alias** আসলে কীভাবে আলাদা? দুটোই তো দেখতেও বেশ মিল! কিন্তু বাস্তবে দুটির আলাদা উদ্দেশ্য আছে, আর সেই কারণেই পার্থক্যগুলো জানা জরুরি।

চলুন সহজভাবে বুঝে নিই। 👇

---

## Interface কী?

এক কথায়, Interface হলো **অবজেক্টের ব্লুপ্রিন্ট**। অবজেক্টের কোন কোন প্রপার্টি থাকবে-এটাই Interface বলে দেয়।

```ts
interface User {
  id: number;
  name: string;
  email: string;
}
```

Interface সাধারণত অবজেক্ট শেপ ডিফাইন করার জন্যই সবচেয়ে ভালো।

---

## Type Alias কী?

Type alias অনেকটা "টাইপকে একটা নাম দেওয়া"র মতো। শুধু অবজেক্ট নয়-**primitive, union, tuple, function signature**-সবকিছুই Type দিয়ে করা যায়।

```ts
type ID = string | number;
type Coordinate = [number, number];
```

Interface এরকম নয়।

---

## বড় পার্থক্যগুলো সহজ ভাষায়

### **Declaration Merging – Interface-এর আলাদা বৈশিষ্ট্য**

Interface একাধিকবার ডিফাইন করলে TypeScript এগুলোকে অটো-মার্জ করে।

```ts
interface Animal {
  name: string;
}
interface Animal {
  age: number;
}
```

কিন্তু Type alias?
Duplicate error দিবে - মার্জ করতে পারে না।

---

### **Extending**

দুটো দিয়েই extend করা যায়, কিন্তু syntax আলাদা।

**Interface:**

```ts
interface Dog extends Animal {
  breed: string;
}
```

**Type (using intersection &):**

```ts
type Dog = Animal & { breed: string };
```

---

### **Union Types: Type দিয়ে হয়ে যায়**

```ts
type Status = "pending" | "approved" | "rejected";
```

কিন্তু Interface এটা করতে পারে না।

---

### **Mapped/Computed Types: এখানে Type-ই আসল বস**

```ts
type Person = {
  [K in "name" | "age"]: string;
};
```

এ ধরনের কাজ Type দিয়ে বেশি সহজ।

---

### **Primitive বা tuple-Interface পারে না, Type পারে**

Tuple, union, function type-এসব সবই type alias-এর মাঠ।

---

## পারফরম্যান্স?

বড় প্রজেক্টে interface একটু দ্রুত কাজ করতে পারে - তবে পার্থক্য খুবই সামান্য।

---

## তাহলে কখন কোনটা ব্যবহার করবেন?

### ✔ Interface ব্যবহার করুন যখন-

- অবজেক্টের আকৃতি নির্ধারণ করবেন
- ক্লাসের সাথে কাজ করছেন
- লাইব্রেরি/পাবলিক API ডিফাইন করছেন
- Declaration merging দরকার

### ✔ Type ব্যবহার করুন যখন-

- Union/Intersection প্রয়োজন
- Tuple বা primitive টাইপ দরকার
- জটিল mapped বা conditional টাইপ তৈরি করছেন
- React props টাইপ করতে-অনেক টিম Type ব্যবহার করে

---

## সারসংক্ষেপ

Type এবং Interface-দুটোই শক্তিশালী।
Object modeling? → Interface
Type composition ও flexibility? → Type alias
উভয়ের শক্তি কাজে লাগানোই স্মার্ট কাজ।

---

# ব্লগ ২: TypeScript-এর `keyof` - সহজ ভাষায় বোঝা

TypeScript শেখার একটা টার্নিং পয়েন্ট আছে-যখন আপনি `keyof` বুঝে ফেলেন।
এরপর আপনার টাইপ-নিরাপত্তা, utility functions-সবকিছু অনেক লেভেল-আপ হয়ে যায়।

চলুন সহজভাবে দেখি।

---

## `keyof` কী?

কোনো object type-এর **সব key** নিয়ে একটি union টাইপ তৈরি করে।

```ts
interface Person {
  name: string;
  age: number;
}

type PersonKeys = keyof Person;
// "name" | "age"
```

খুবই শক্তিশালী কারণ এটি অবজেক্ট প্রপার্টিতে টাইপ-লেভেল নিরাপত্তা দেয়।

---

## ব্যবহারিক উদাহরণ – বাস্তবে কেন দরকার?

### টাইপ-নিরাপদ property getter

```ts
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

ভুল key দিলে কম্পাইল-টাইমেই ধরবে!

---

### টাইপ-নিরাপদ আপডেট ফাংশন

```ts
function updateProduct<K extends keyof Product>(
  product: Product,
  key: K,
  value: Product[K]
) {
  return { ...product, [key]: value };
}
```

TypeScript নিজেই নিশ্চিত করবে value-এর টাইপ সঠিক হচ্ছে কিনা।

---

### নিজের Pick utility তৈরি করা

```ts
function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> { ... }
```

React, API response filtering - সবখানে কাজে লাগে।

---

### Mapped types আরও শক্তিশালী হয় `keyof` দিয়ে

```ts
type PartialSettings = { [K in keyof Settings]?: Settings[K] };
```

এই জিনিসটাই TypeScript-এর built-in `Partial<>`-এর ভিত্তি।

---

### Form validation - একবার লিখে বারবার ব্যবহার করা যায়

```ts
type ValidationErrors<T> = { [K in keyof T]?: string };
```

এভাবে generic ভ্যালিডেটর বানানো খুব সহজ হয়।

---

### EventEmitter - টাইপ-নিরাপদ ইভেন্ট সিস্টেম

```ts
on<K extends keyof Events>(event: K, callback: EventCallback<K>)
```

`emit("click")` দিলে কখনো ভুল payload পাঠানো যাবে না।

---

## আরও অ্যাডভান্সড

### Conditional types-এর সাথে `keyof`

যেমন স্ট্রিং-টাইপ property-গুলো আলাদা করা:

```ts
type StringKeys<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];
```

---

## কেন `keyof` এত উপকারী?

- ভুল key দিলে কম্পাইল টাইমে ধরা পড়ে
- IDE autocomplete আরও বুদ্ধিমান হয়
- কোড রিফ্যাক্টর সহজ
- Generic utility ফাংশন বানানো যায়
- টাইপ-নিরাপদ লাইব্রেরি, ফর্ম, API-সবকিছু সম্ভব

---
