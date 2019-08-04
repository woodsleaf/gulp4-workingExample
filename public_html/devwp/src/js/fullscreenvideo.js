/*Скрипт Запуска первого видео с кнопки на полный экран*/
$(document).ready(function() {
  $('.vframe').on('click', function (event) {
    event.preventDefault();
    var url = $(this).attr('href');
    $('.main_video iframe').prop('src', url);
  });
});
