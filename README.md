# 🧩 ng-wasm-bridge

**Типобезопасный мост между Angular и WebAssembly (C++/Emscripten)**
Позволяет загружать и использовать скомпилированные WASM-модули в Angular с типизацией TypeScript, простотой интеграции и безопасностью.

---

## 🚀 Возможности

* 🔗 Простое подключение WebAssembly модулей, собранных через **Emscripten**
* 🧠 Типобезопасность через интерфейсы TypeScript
* 🧩 Модульная структура — добавляйте и используйте свои модули как сервисы
* ⚡ Поддержка `async/await` загрузки
* 🧱 Полная изоляция WASM модулей и кэширование в памяти

---

## 🧰 Пример использования

### 1. Установите пакет

```bash
npm install ng-wasm-bridge
```

### 2. Создайте C++ модуль и соберите через Emscripten

```cpp
// sum.cpp
#include <emscripten/bind.h>
using namespace emscripten;

int add(int a, int b) {
  return a + b;
}

EMSCRIPTEN_BINDINGS(sum_module) {
  function("add", &add);
}
```

Сборка:

```bash
emcc sum.cpp -o sum.js \
  -s MODULARIZE=1 \
  -s EXPORT_NAME="SumModule" \
  -s ENVIRONMENT='web' \
  -s ALLOW_MEMORY_GROWTH=1 \
  -O3 -lembind -std=c++17
```

Поместите `sum.js` и `sum.wasm` в `src/assets/wasm`.

---

### 3. Определите интерфейс модуля

```ts
interface SumModule {
  add(a: number, b: number): number;
}
```

---

### 4. Загрузите модуль через сервис

```ts
import { Component, OnInit } from '@angular/core';
import { WasmService, TypedModule } from 'ng-wasm-bridge';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App implements OnInit {
  constructor(private wasmService: WasmService) {}

  async ngOnInit() {
    const module = await this.wasmService.loadWasmModule<TypedModule<SumModule>>(
      '/assets/wasm/sum.js'
    );
    console.info('Result:', module.add(5, 6)); // 11
  }
}
```

---

## 🧩 Архитектура

* **WasmService** — единая точка загрузки и управления модулями
* **TypedModule<T>** — типизированный контракт между JS и C++
* **Кэширование** — повторные вызовы `loadWasmModule()` возвращают один и тот же экземпляр

---

## 🧱 Планы развития

* [ ] Поддержка dynamic imports из URL
* [ ] Интеграция с Web Workers
* [ ] Примеры работы с более сложными C++ классами
* [ ] CLI для генерации интерфейсов TypeScript на основе `.cpp`

---

## ⚖️ Лицензия

[Apache License 2.0](LICENSE) © 2025 [Arthur95dev](https://github.com/Arthur95dev)

---

## ⭐ Поддержка

Если проект тебе полезен — поставь звёздочку ⭐
и следи за обновлениями!
