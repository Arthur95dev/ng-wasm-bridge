import { Injectable } from '@angular/core';
import { EmscriptenModule, TypedModule } from '../types';

@Injectable({ providedIn: 'root' })
export class WasmService {

  private modulesPromises: Map<string, Promise<EmscriptenModule>> = new Map();
  private modules: Map<string, EmscriptenModule> = new Map();

  async loadWasmModule<T>(path: string): Promise<TypedModule<T>> {
    let module = this.modules.get(path);

    if (module) {
      return module as TypedModule<T>;
    } else if (this.modulesPromises.has(path)) {
      return this.modulesPromises.get(path) as Promise<TypedModule<T>>;
    }

    const promiseModule = this.load(path);
    this.modulesPromises.set(path, promiseModule);

    return promiseModule as Promise<TypedModule<T>>;
  }

  private async load<T>(path: string): Promise<TypedModule<T>> {
    const factoryModule = await import(/* @vite-ignore */ path);
    const factory = factoryModule.default;

    const module = await factory();
    this.modules.set(path, module);
    this.modulesPromises.delete(path);
    return module;
  }


  /**
   * Получает модуль по имени
   * @param path Путь к файлу модуля
   */
  getModule<T>(path: string): TypedModule<T> | null {
    return (this.modules.get(path) as TypedModule<T>) || null;
  }
}
