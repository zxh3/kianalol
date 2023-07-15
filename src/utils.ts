import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Check deep equality of two objects
export function deepEqualObj(obj1: any, obj2: any): boolean {
  if (obj1 === obj2) {
    return true;
  }

  if (typeof obj1 === "object" && typeof obj2 === "object") {
    if (Object.keys(obj1).length !== Object.keys(obj2).length) {
      return false;
    }
    for (const key in obj1) {
      if (obj2.hasOwnProperty(key)) {
        if (!deepEqualObj(obj1[key], obj2[key])) {
          return false;
        }
      } else {
        return false;
      }
    }
    return true;
  }

  return false;
}
