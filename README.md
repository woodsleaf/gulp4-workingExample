# Gulp4-browsersyncWorkWithOpenServer-jsConcatMinify-cssSass-mdMarkdownToHtml

## Включение наблюдения
`gulp watch`

## Browsersync + PHP
Реализовано через локальный сервер поднять который можно средствами php, или какой нибудь сборкой типа OpenServer.
Чтобы страничка обновлялась, нужно включить скрипты на странице, если они вдруг заблокированы.
Начальный файл проекта `index.php` находится в корне сайта. Это возможно криво, но ориентировано на обычный хостинг.

## Sass
Обработка sass.
Autoprefix css. пока не работает - не добавляются прификсы хотя все прописано.
Минификация css.

## Markdown to html
Просто Конвертация.

## JS
Конкатенация, сохранение промежуточного варианта в папку merge.
Минификация js.

## Обработка изображений
Пока не тестировал.
[Примеры использования gulp-imagemin.](https://www.npmjs.com/package/gulp-imagemin)
[Примеры использования imagemin-webp.](https://github.com/imagemin/imagemin-webp)
[Примеры использования imagemin.](https://github.com/imagemin/imagemin)

Дополнительно для отображения на гитхабе зависимостей, `package.json` перенесен в корень проекта, а с помощью `.yarnrc` папка node_modules формируется в каталоге `public_html`.
