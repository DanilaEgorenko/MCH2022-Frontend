# :heavy_check_mark: [MoscowCityHack2022](https://moscityhack2022.innoagency.ru/#tacks) | Команда LowcatOrNot | Frontend :warning:

Frontend-часть проекта "Сервис по сбору и анализу информации о продукции производителей Москвы для развития импортозамещения".

Хакатон Moscow City Hack.

:arrow_forward: **[Backend-репозиторий](https://gitlab.com/Denactive/mch2022-backend)**

## Задание

Разработайте сервис умного сбора и систематизации информации о выпускаемой продукции компаний-производителей на территории Москвы в единую базу данных с возможностью автоматической кластеризации по видам продукции и гибкой фильтрации для поиска и последующего анализа.

Решение позволит оказать поддержку бизнесу и ускорить процесс импортозамещения, а также своевременно анализировать информацию о продукции, представленной на рынке.

## Команда LowCatOrNot
- [Андрей Кравцов](https://t.me/Kravtandr)  - Backend-разработчик Golang
- [Данила Егоренко](https://t.me/danilaEgorenko) - Frontend-разработчик JS React
- [Денис Кириллов](https://t.me/denactive)  - Fullstack-разработчик JS React / Python

## Презентация :rocket:
- [Подробное описание и мотивация разработки](https://docs.google.com/document/d/1jLJx6QBzKzX5SyYPHv2D7Ulm1HI5HRdRo-Fp4zcTxjY/edit?usp=sharing)
- [Презентация](https://drive.google.com/drive/folders/1J9QcQiZSeBmB7OHF0ut_jUWUZ23YHFSU?usp=sharing)
- [Другие материалы](https://drive.google.com/drive/folders/1gFeC_X9jVWI9ZB3WXPcHytyVjxribGJS?usp=sharing)

## Установка Frontend :factory:
  *Требования*
- Windows 10 / Ubuntu 20.04. Для Windows установка *node* ниже описанным образом неактуальна, *sudo* в командах следует опустить.
- node js 14.16.0+
- js-модули из [package.json](./package.json)
- Для просмотра всего функционала тебуется предварительно запустить [API-сервер](https://gitlab.com/Denactive/mch2022-backend). Для части запросов написаны заглушки: для их активации нужно установить переменную *mock* равной *true* в [src/utils/globals.ts](./src/utils/globals.ts).


  *Установка js-модулей*
1. ```sudo npm i```
  *Запуск демо-сервера*
2. ```sudo npm start```

## Лицензия
- [GNU GPLv2](./LICENSE)

## Статус проекта
- :wrench: Завершен 9:00 13.06.2022
