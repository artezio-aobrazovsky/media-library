import { SortDirection } from "./types";

export function sort(a: string, b: string, direction: SortDirection): number;
export function sort(a: number, b: number, direction: SortDirection): number;
export function sort(a: any, b: any, direction: SortDirection): number;

export function sort(
  a: number | string,
  b: number | string,
  direction: SortDirection
): number {
  const multiplier = direction === SortDirection.ASC ? 1 : -1;
  if (typeof a === "string" && typeof b === "string") {
    return a.localeCompare(b) * multiplier;
  }

  if (typeof a === "number" && typeof b === "number") {
    return (a - b) * multiplier;
  }

  return 0;
}
