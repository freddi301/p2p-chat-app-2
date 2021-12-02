import { hash } from "immutable";
import { isEqual } from "lodash";

export class AsValueObject<Value> implements Immutable.ValueObject {
  constructor(public value: Value) {}
  precalculatedHashCode = calculateHashCode(this.value);
  hashCode() {
    return this.precalculatedHashCode;
  }
  equals(other: unknown) {
    return isEqual(this.value, (other as AsValueObject<unknown>).value);
  }
}

function calculateHashCode(value: unknown): number {
  if (value !== null && typeof value === "object") {
    const prototype = Object.getPrototypeOf(value);
    switch (prototype) {
      case Array.prototype: {
        const array = value as Array<unknown>;
        return hashCollection(
          (step) => {
            for (let i = 0; i < array.length; i++) {
              step(i, array[i]);
            }
            return array.length;
          },
          false,
          true
        );
      }
      case Object.prototype: {
        const object = value as Record<string, unknown>;
        const keys = Object.getOwnPropertyNames(object);
        return hashCollection(
          (step) => {
            for (let i = 0; i < keys.length; i++) {
              const key = keys[i] as string;
              step(key, object[key]);
            }
            return keys.length;
          },
          true,
          false
        );
      }
    }
  }
  return hash(value);
}

// https://github.com/immutable-js/immutable-js/blob/main/src/CollectionImpl.js

function hashCollection(
  iterate: (step: (key: unknown, value: unknown) => void) => number,
  keyed: boolean,
  ordered: boolean
) {
  let h = ordered ? 1 : 0;
  const size = iterate(
    keyed
      ? ordered
        ? (v, k) => {
            h = (31 * h + hashMerge(hash(v), hash(k))) | 0;
          }
        : (v, k) => {
            h = (h + hashMerge(hash(v), hash(k))) | 0;
          }
      : ordered
      ? (v) => {
          h = (31 * h + hash(v)) | 0;
        }
      : (v) => {
          h = (h + hash(v)) | 0;
        }
  );
  return murmurHashOfSize(size, h);
}

function murmurHashOfSize(size: number, h: number) {
  h = imul(h, 0xcc9e2d51);
  h = imul((h << 15) | (h >>> -15), 0x1b873593);
  h = imul((h << 13) | (h >>> -13), 5);
  h = ((h + 0xe6546b64) | 0) ^ size;
  h = imul(h ^ (h >>> 16), 0x85ebca6b);
  h = imul(h ^ (h >>> 13), 0xc2b2ae35);
  h = smi(h ^ (h >>> 16));
  return h;
}

function hashMerge(a: number, b: number) {
  return (a ^ (b + 0x9e3779b9 + (a << 6) + (a >> 2))) | 0; // int
}

const imul =
  typeof Math.imul === "function" && Math.imul(0xffffffff, 2) === -2
    ? Math.imul
    : function imul(a: number, b: number) {
        a |= 0; // int
        b |= 0; // int
        const c = a & 0xffff;
        const d = b & 0xffff;
        // Shift by 0 fixes the sign on the high part.
        return (c * d + ((((a >>> 16) * d + c * (b >>> 16)) << 16) >>> 0)) | 0; // int
      };

function smi(i32: number) {
  return ((i32 >>> 1) & 0x40000000) | (i32 & 0xbfffffff);
}
