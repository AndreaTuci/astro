import { atom, map } from 'nanostores';
import { persistentAtom, persistentMap } from '@nanostores/persistent'

//export const testVar = persistentAtom('testVar', 'false');
export const testVar = atom(false);


export type TestItem = {
  name: string;
  gender: string;
  email: string;
}
map<Record<string, TestItem>>
export const testItems = map<Record<string, TestItem>>({});

//type ItemDisplayInfo = Pick<TestItem, 'id' | 'name' | 'gender', 'email'>;
export function addTestItem({ email, name, gender}: TestItem) {
  const existingEntry = testItems.get()[email];
  if (existingEntry) {
    testItems.setKey(email, {
      ...existingEntry,
    });
  } else {
    testItems.setKey(
      email,
      { email, name, gender }
    );
  }
}