# crypto-exchange-test-project

[Задание](https://docs.google.com/document/d/1DMNmvv8iBAP_8KrJkRiS3pKIZE4kRZahbdlDapeAusQ/edit?tab=t.0)
Демо можно посмотреть [здесь](https://crypto-exchange-test-project.vercel.app/)

## Стэк

Для создания проекта использовались:

[React](https://react.dev)

[React Router](https://reactrouter.com/home)

[Chakra UI](https://chakra-ui.com/docs/get-started/installation)

[MobX](https://mobx.js.org/README.html)

[FSD](https://feature-sliced.design/docs)

## Основые команды

- Установка зависимостей: `npm i`
- Запуск в режиме разработки: `npm run dev`
- Запуск в режиме prodaction: `npm run build && npm run preview`

### Дополнительные команды

- Форматирование кода: `npm run prettier`
- Статический анализ кода: `npm run lint`

## Немного про мотивацию использовать указанный стэк и подробности реализации

- **Chakra UI** - взят чтобы не городить велосипеды из базовых компонентов. В библиотеке есть все
  нужные элементы, легко стилизуются через
  [конфигурацию](https://github.com/verkhoturov/crypto-exchange-test-project/blob/main/src/shared/ui/theme.ts)
  библиотеки и через параметры самих компонентов.

- **FSD** - для организации файловой структуры. В данном конкретном случае, FSD используется с одной
  оговоркой:

    1. Не был реализован слой Features, фактически, все фичи находятся в рамках Widgets

- **Доступность и UX**
    - инпуты и селекты доступны для управления через табы,
    - в мобильной версии открывается числовая клавиатура,
    - есть минимальный адаптив под мобильную версию,
    - состояние формы сохраняется в параметрах URL,
    - если недоступен API, то ошибки будут во всплывающих сообщениях
