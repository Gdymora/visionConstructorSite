import { generateRandomNumber } from "./generateRandomNumber"; 

export function generateRandomInt(min: number, max: number): number {
  return Math.round(generateRandomNumber(min, max));
}
