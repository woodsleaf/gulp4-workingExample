# Gulp4-browsersyncWorkWithOpenServer-jsConcatMinify-cssSass-mdMarkdownToHtml

## Prepare
Install node.js. Check add them in `%PATH%`. Execute in console `npm install --global gulp-cli`. And it `npm install yarn -G`.
Go to project in console and execute `yarn` for install node_modules.

## Включение наблюдения
Execute from console in directory public_html `gulp watcher` или просто `gulp`.

## Browsersync + PHP
Реализовано через локальный сервер `const localDomainUrl` first string in `public_html/gulpfile.js`, поднять который можно средствами php, или какой нибудь сборкой типа OpenServer. Чтобы страничка обновлялась, нужно включить скрипты на странице, если они вдруг заблокированы. Начальный файл проекта `index.php` находится в корне сайта. Это возможно криво, но ориентировано на обычный хостинг.

## Sass
Обработка sass. Autoprefix css (конфиг public_html/.browserslistrc). Минификация css.

## Markdown to html
Отключен(markdown vulnerably) Просто Конвертация.

## PUG to html
Отключен. Для js пока не требуется.

## PUG to php
Отключен(и шаблоны pug вынесены в public_html/tpl-pug), так как работает криво, он предполагает сборку, всего кода в один файл а для шаблона это вроде как не нужно, ну и инклуды, вливают содержимое в файл. Так что надо указывать на вход не всю папку а конкретные файлы, в общем все равно ересь, не нужен pug`у сборщик.

## JS
Конкатенация, сохранение промежуточного варианта. Минификация `min.js`.

## Обработка изображений
(надо добавить автогенерацию разных размеров изображений, в остальном полностью устраивает)
Сейчас работает следующим образом. При изменении содержимого `src/images/` запускается оптимизатор, после обработки стандартными оптимизаторами, сохраняется, а затем содержимое потока переименовывается, сжимается уже `webp`, сохраняется рядышком.

## Дополнительно
Для отображения на гитхабе зависимостей, `package.json` перенесен в корень проекта, а с помощью `.yarnrc` папка node_modules формируется в каталоге `public_html`.

Для работы pug установлен в public_html/vendor пакет Phug, расположение папки vendor настроено в composer.json. Соответственно для установки нужно выполнить в корне проекта команду `composer install`, естественно последний должен быть настроен и прописан в путях.

Зависимостей пока больше чем реально используется.

## Использовался как литература
[Данный видео ролик](https://www.youtube.com/watch?v=tTrPLQ6nOX8)


### Примеры обработки изображений устарели.
[Примеры использования gulp-imagemin.](https://www.npmjs.com/package/gulp-imagemin) [Пример использованный для Webp.](https://www.smashingmagazine.com/2018/07/converting-images-to-webp/) Другие примеры:
[Примеры использования imagemin.](https://github.com/imagemin/imagemin) [Примеры использования imagemin-webp.](https://github.com/imagemin/imagemin-webp)