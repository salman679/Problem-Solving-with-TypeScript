//solution of the problem-1
type Value = string | number | boolean;

function formatValue(value: Value): Value {
  if (typeof value === "string") {
    return value.toUpperCase();
  }

  if (typeof value === "number") {
    return value * 10;
  }

  if (typeof value === "boolean") {
    return !value;
  }

  return value;
}

//solution of the problem-2
function getLength(value: string | any[]): number {
  if (Array.isArray(value)) {
    return value.length;
  }
  if (typeof value === "string") {
    return value.length;
  }

  return 0;
}

//solution of the problem-3
class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  getDetails(): string {
    return `Name: ${this.name}, Age: ${this.age}`;
  }
}

//solution of the problem-4
function filterByRating(
  values: { title: string; rating: number }[]
): { title: string; rating: number }[] {
  return values.filter((value) => value.rating >= 4);
}

//solution of the problem-5
type User = { id: number; name: string; email: string; isActive: boolean };

function filterActiveUsers(users: User[]): User[] {
  return users.filter((user) => user.isActive);
}

//solution of the problem-6
interface Book {
  title: string;
  author: string;
  publishedYear: number;
  isAvailable: boolean;
}

function printBookDetails(book: Book): void {
  console.log(
    `Title: ${book.title}, Author: ${book.author}, Published: ${
      book.publishedYear
    }, Available: ${book.isAvailable ? "Yes" : "No"}`
  );
}

//solution of the problem-7
function getUniqueValues(
  arr1: (string | number)[],
  arr2: (string | number)[]
): (string | number)[] {
  const combinedArray = [...arr1, ...arr2];
  let uniqueArray: (string | number)[] = [];

  for (let i = 0; i < combinedArray.length; i++) {
    let found = false;

    for (let j = 0; j < uniqueArray.length; j++) {
      if (combinedArray[i] === uniqueArray[j]) {
        found = true;
        break;
      }
    }

    if (!found) {
      uniqueArray[uniqueArray.length] = combinedArray[i];
    }
  }

  return uniqueArray;
}

//solution of the problem - 8
interface Product {
  name: string;
  price: number;
  quantity: number;
  discount?: number;
}
function calculateTotalPrice(items: Product[]): number {
  return items
    .map((item) => {
      const discount = item.discount ? item.discount : 0;
      const discountedPrice = item.price - (item.price * discount) / 100;
      return discountedPrice * item.quantity;
    })
    .reduce((acc, curr) => acc + curr, 0);
}
