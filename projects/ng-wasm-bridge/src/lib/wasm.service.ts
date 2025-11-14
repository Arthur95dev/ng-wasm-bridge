import { Injectable } from '@angular/core';
import { EmscriptenModule, TypedModule } from '../types';

@Injectable({ providedIn: 'root' })
export class WasmService {

  private modules: Record<string, EmscriptenModule> = {};

  /**
   * Загружает модуль
   * @param path Путь к файлу модуля
   */
  async loadWasmModule<T>(path: string): Promise<TypedModule<T>> {
    if (this.modules[path]) {
      return this.modules[path] as TypedModule<T>;
    }

    const factoryModule = await import(/* @vite-ignore */ path);
    const factory = factoryModule.default;

    const module = await factory();
    this.modules[path] = module;

    return module;
  }

  /**
   * Получает модуль по имени
   * @param path Путь к файлу модуля
   */
  getModule<T>(path: string): TypedModule<T> | null {
    return (this.modules[path] as TypedModule<T>) || null;
  }
}
