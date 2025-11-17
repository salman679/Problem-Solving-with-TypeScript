# ব্লগ ১: TypeScript-এ Interface আর Type-এই দুইটা নিয়ে এত কথা কেন?

TypeScript শেখা শুরু করলে একটা জিনিস খুবই দ্রুত চোখে পড়ে-কখনো আমরা interface লিখছি, আবার কখনো type alias। দুটো দেখতে প্রায় একই রকম, কাজও কাছাকাছি। তাহলে এত আলাদা করে দুটো জিনিস রাখার দরকারই বা কী?

এটাই আজকে খুব সহজভাবে বুঝে নিই।

## Interface আসলে কী?

Interface হলো একটা খসড়া নকশার মতো। কোনো অবজেক্টের মধ্যে কী কী প্রপার্টি থাকবে, কোন প্রপার্টির টাইপ কী হবে-এসব আমরা interface দিয়ে ঠিক করে দিই। সাধারণত অবজেক্টের গঠন নির্দিষ্ট করতে interface-ই বেশি ব্যবহৃত হয়।

উদাহরণ:

```ts
interface User {
  id: number;
  name: string;
  email: string;
}
```

এখানে User অবজেক্টের গঠন একদম পরিষ্কার। এই শেপের বাইরে কিছু দিলে TypeScript ধরিয়ে দেবে।

## Type alias কী করে?

Type alias হচ্ছে নামকরণ। কোনো টাইপকে নতুন একটা নাম দিয়ে ব্যবহার করা। এখানে শুধু অবজেক্ট না-primitive type, union, tuple, function signature, প্রায় সবকিছুই type alias দিয়ে করা যায়।

```ts
type ID = string | number;
type Position = [number, number];
```

এগুলো interface দিয়ে করা যাবে না।

## কোথায় কোথায় পার্থক্য?

### Interface মার্জ হতে পারে

Interface বারবার ডিক্লেয়ার করলে TypeScript দুটোকে মিলিয়ে একটি বানিয়ে দেয়। যেমন:

```ts
interface Animal {
  name: string;
}

interface Animal {
  age: number;
}
```

এখন Animal-এর মধ্যে name আর age-দুটোই থাকবে।

Type alias হলে এখানে সরাসরি error।

### Extending

দুটোতেই extend করা যায়, কিন্তু ভঙ্গি আলাদা।

```ts
interface Dog extends Animal {
  breed: string;
}
```

Type alias হলে intersection ব্যবহার:

```ts
type Dog = Animal & { breed: string };
```

### Union type বা প্রিমিটিভ টাইপের ক্ষেত্রে type alias এগিয়ে

```ts
type Status = "pending" | "approved" | "rejected";
```

Interface এখানে ব্যবহার করা যায় না।

### জটিল টাইপ গঠনে type alias বেশি শক্তিশালী

Mapped type, conditional type-এই ক্ষেত্রে type alias-ই ব্যবহারযোগ্য।

## তাহলে কোনটা কখন?

Interface ব্যবহার করা ভালো যখন:

- কোনো অবজেক্ট বা ক্লাসের গঠন নির্ধারণ করবেন
- কোড স্ট্রাকচার পরিষ্কার রাখতে চান
- বড় প্রজেক্টে কাজ করছেন যেখানে merging সুবিধা কাজে লাগে

Type alias ব্যবহার করবেন যখন:

- union বা intersection দরকার
- tuple বা primitive টাইপ নিয়ে কাজ করছেন
- জটিল টাইপ রূপান্তর দরকার
- React কোডbase-অনেক টিম type পছন্দ করে

## এক কথায় সারমর্ম

অবজেক্টের নকশা বানাতে interface সুবিধাজনক।
টাইপ নিয়ে বেশি খেলাধুলা করতে হলে type alias টক্করহীন।

দুটোই দরকার হয়, আর ঠিক সময়ে ঠিকটাকে বেছে নিতে পারলে TypeScript-এর শক্তি ঠিকমতো ব্যবহার করতে পারবেন।

---

# ব্লগ ২: TypeScript-এর keyof-একবার বুঝে গেলে পুরো গেমটাই বদলে যায়

TypeScript-এর টাইপ সিস্টেম যতই গভীরে যান, একসময় একটা জিনিস বারবার সামনে আসে-keyof। যারা প্রথম শিখছেন, তাদের মনে হতে পারে এটা খুব জটিল কিছু। কিন্তু আসলে ব্যাপারটা বেশ সহজ। আর ব্যাপারটা সত্যিই বুঝে গেলে টাইপ-সেফ কোড লেখা আরও স্বাভাবিক লাগে।

আজকে বিষয়টা পুরো সহজভাবে দেখে ফেলি।

## keyof আসলে কী?

যে অবজেক্ট টাইপের ওপর ব্যবহার করবেন, সেই টাইপের সব key নিয়ে একটি union তৈরি করে। ধরুন:

```ts
interface Person {
  name: string;
  age: number;
}
```

এখন

```ts
type Keys = keyof Person;
```

Keys হবে: `"name" | "age"`

মানে Person-এর কোন কোন key আছে TypeScript সেটা নিজেই জানে।

## এটা এত দরকার কেন?

কারণ এটা টাইপ-নিরাপত্তা বাড়ায়। ভুল key লিখলে কোড রান করার আগেই TypeScript ধরে ফেলে।

## একটি টাইপ-সেফ getter ফাংশন কেমন হতে পারে?

```ts
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

এখানে key ভুল দিলে TypeScript আপনাকে লিখতে দেবে না।

## টাইপ-সেফ আপডেট করা আরও সহজ

```ts
function updateProduct<K extends keyof Product>(
  product: Product,
  key: K,
  value: Product[K]
) {
  return { ...product, [key]: value };
}
```

কোন key কী টাইপ নেবে, কোথায় কী ভুল হচ্ছে-সবকিছু compile-time-এ পরিষ্কার হয়ে যায়।

## keyof দিয়ে utility টাইপ বানানো খুব স্বাভাবিক

Pick, Partial, Required-এসব বিল্ট-ইন utility টাইপ তৈরির পেছনেও keyof আছে।

উদাহরণ:

```ts
type Partialize<T> = {
  [K in keyof T]?: T[K];
};
```

যে কাজটি TypeScript-এর Partial করে, সেটাই আমরা নিজেরা বানিয়ে ফেললাম।

## আরেকটু ব্যবহারিক জায়গা

Form validation, API response mapping, event system-সবখানে keyof দারুণ কাজে লাগে। কারণ এটি সবসময় object-এর key অনুযায়ী টাইপ-চেক enforce করে।

## তাহলে সহজ কথায়

keyof আপনাকে অবজেক্টের key গুলোকে টাইপে পরিণত করার শক্তি দেয়।
এর ফলে:

- ভুল key ব্যবহার হতে পারে না
- generic function লেখা সহজ হয়
- পুরো কোডbase আরও নিরাপদ হয়

এই ছোট একটা কিওয়ার্ড আপনার কোডে বিশাল পরিবর্তন আনতে পারে-শুধু একবার ঠিকভাবে বুঝে নিতে হবে।

---
