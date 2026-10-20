import { useEffect, useState } from 'react';
import { readStore, writeStore } from '../utils/storage';

export default function useLocalStorage(key, initial, validate) {
  const [value, setValue] = useState(() => readStore(key, initial, validate));
  useEffect(() => {
    writeStore(key, value);
  }, [key, value]);
  return [value, setValue];
}
