import { atom, map } from "nanostores";
import { persistentAtom, persistentMap } from "@nanostores/persistent";

// use nanostores/persistent if you wanto to save the state to localStorage

export const testVar = atom(false);

export type TestItem = {
  name: string;
  gender: string;
  email: string;
};
map<Record<string, TestItem>>;
export const testItems = map<Record<string, TestItem>>({});

export function addTestItem({ email, name, gender }: TestItem) {
  const existingEntry = testItems.get()[email];
  if (existingEntry) {
    testItems.setKey(email, {
      ...existingEntry,
    });
  } else {
    testItems.setKey(email, { email, name, gender });
  }
}

/**
 * Adds a new test item to the testItems map. If an item with the same email already exists, it updates the existing item. Otherwise, it creates a new item with the provided email, name, and gender.
 * 
 * @param {TestItem} testItem - The test item to be added.
 * @param {string} testItem.email - The email of the test item.
 * @param {string} testItem.name - The name of the test item.
 * @param {string} testItem.gender - The gender of the test item.
 * @returns {void}
 */
