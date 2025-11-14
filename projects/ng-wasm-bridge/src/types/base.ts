export interface EmscriptenModule {
  _malloc(size: number): number;
  _free(ptr: number): void;
  HEAPF32?: Float32Array;
  HEAPF64?: Float64Array;
  HEAP32?: Int32Array;
  HEAPU32?: Uint32Array;
  HEAP16?: Int16Array;
  HEAPU16?: Uint16Array;
  HEAP8?: Int8Array;
  HEAPU8?: Uint8Array;
  [exportedFn: string]: unknown;
}

export type TypedModule<T> = EmscriptenModule & T;

