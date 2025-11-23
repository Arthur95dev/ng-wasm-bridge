export interface VectorInstanceCpp {
  push_back(value: number): void;
  size(): number;
  get(index: number): number;
  delete(): void;
}

export interface ArrayStatisticsModule {
  VectorInt: {
    new (): VectorInstanceCpp;
  };
  VectorFloat: {
    new (): VectorInstanceCpp;
  };
  VectorDouble: {
    new (): VectorInstanceCpp;
  };

  sumArrayInt(array: VectorInstanceCpp): number;
  averageArrayInt(array: VectorInstanceCpp): number;
  minArrayInt(array: VectorInstanceCpp): number;
  maxArrayInt(array: VectorInstanceCpp): number;

  sumArrayFloat(array: VectorInstanceCpp): number;
  averageArrayFloat(array: VectorInstanceCpp): number;
  minArrayFloat(array: VectorInstanceCpp): number;
  maxArrayFloat(array: VectorInstanceCpp): number;

  sumArrayDouble(array: VectorInstanceCpp): number;
  averageArrayDouble(array: VectorInstanceCpp): number;
  minArrayDouble(array: VectorInstanceCpp): number;
  maxArrayDouble(array: VectorInstanceCpp): number;
}
