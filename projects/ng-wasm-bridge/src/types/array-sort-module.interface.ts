import { VectorInstanceCpp } from './vector-instance.interface';

export interface ArraySortModule {
  VectorInt: {
    new (): VectorInstanceCpp;
  };
  VectorFloat: {
    new (): VectorInstanceCpp;
  };
  VectorDouble: {
    new (): VectorInstanceCpp;
  };

  sortAscendingInt(array: VectorInstanceCpp): number;
  sortDescendingInt(array: VectorInstanceCpp): number;
  quickSortInt(array: VectorInstanceCpp): number;

  sortAscendingFloat(array: VectorInstanceCpp): number;
  sortDescendingFloat(array: VectorInstanceCpp): number;
  quickSortFloat(array: VectorInstanceCpp): number;

  sortAscendingDouble(array: VectorInstanceCpp): number;
  sortDescendingDouble(array: VectorInstanceCpp): number;
  quickSortDouble(array: VectorInstanceCpp): number;

}
