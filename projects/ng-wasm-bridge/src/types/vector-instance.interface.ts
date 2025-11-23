export interface VectorInstanceCpp<T = number> {
  push_back(value: number): void;
  size(): number;
  get(index: number): T;
  delete(): void;
}
