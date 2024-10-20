// Implement Test-Driven Development by writing tests with vitest

import { expect, test } from "vitest";
import { cumSum } from "../sum";

import { search } from "./bs";
import { LRU } from "./lru";

test("cumulated sum of an array", () => {
  expect(cumSum([1, 3, 5, 7])).toBe(16);
  expect(cumSum([-2, -4, -8])).toBe(-14);

  // write two test cases for the binary search function
  expect(search([1, 3, 5, 7], 5)).toBe(2);
  expect(search([1, 3, 5, 7], 6)).toBe(-1);

  // write two test cases for the LRU class implementation
  const lru = new LRU(2);
  lru.putItem("a", 1);
  lru.putItem("b", 2);
  lru.putItem("c", 3);
  expect(lru.getItem("a")).toBe(undefined);
  expect(lru.getItem("b")).toBe(2);
  lru.putItem("d", 4);
  expect(lru.getItem("c")).toBe(undefined);
  expect(lru.getItem("b")).toBe(2);
});
