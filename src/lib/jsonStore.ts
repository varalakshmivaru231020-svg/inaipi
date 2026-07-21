import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';

/** Absolute path to a file inside the /data directory. */
export function dataFile(name: string) {
  return join(process.cwd(), 'data', name);
}

/** Read + parse a JSON data file, returning `fallback` if it is missing/invalid. */
export function readJson<T>(file: string, fallback: T): T {
  try {
    return JSON.parse(readFileSync(file, 'utf-8')) as T;
  } catch {
    return fallback;
  }
}

/** Pretty-write a JSON data file, creating the directory if needed. */
export function writeJson(file: string, data: unknown) {
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, JSON.stringify(data, null, 2));
}
