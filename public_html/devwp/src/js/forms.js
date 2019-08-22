/*
$(document).ready(function () {
    function submitForm(){
        console.log('Hello submitform');
        // Переменные с данными из формы
        //var jname = '', jemailfrom = '', jphone = '', jmessage = '';
        var jname = $('input[name="iname"]').val();
        var jemailfrom = $('input[name="iemailfrom"]').val();
        var jphone = $('input[name="iphone"]').val();
        var jmessage = $('input[name="imessage"]').val();
        console.log(jname + ' ' + jemailfrom + ' ' + jmessage + ' ' + jphone);
        $.ajax({
            type: "POST",
            url: "/theme/formsbackend.php",
            data: "iname="+ jname + "&iemailfrom="+ jemailfrom + "&iphone"+ jphone + "&imessage="+ jmessage,
            success : function(text){
                if(text == "success"){
                    formSuccess();
                }
            }
        });
    }

    function clearInput() {
        $('input[name="iemailfrom"], input[name="iname"], input[name="imessage"], input[name="iphone"]').each( function() {
        $(this).val('');
        });
    }

    function  formSuccess(){
        console.log('Hello formSuccess');
        $( "#msgSubmit").removeClass( "hidden");
        setTimeout(function() {
            $( "#msgSubmit").addClass( "hidden");
        }, 3000);
        //clearInput();
        //$( "#msgSubmit").addClass( "hidden");

    }
});
*/

$(document).ready(function () {
    $('form').submit(function () {
        var formID = $(this).attr('id'); // Получение ID формы
        var formNm = $('#' + formID);
        $.ajax({
            type: 'POST',
            url: 'phpmail.php', // Обработчик формы отправки 
            data: formNm.serialize(),
            success: function (data) {
                // Вывод текста результата отправки в текущей форме
                $(formNm).html(data);
                // Перезагрузка формы через 3 секунды
                //setTimeout(function() { $("#parent").load("http://test.pixarts.ru" #child) }, 3000);
            }
        });
        return false;
    });
});

/*
$("#myModal3").submit(function(event){
    console.log('Hello jquery modal3');
    // cancels the form submission
    event.preventDefault();
    submitForm();
});

$("#myModal2").submit(function(event){
    console.log('Hello jquery modal2');
    // cancels the form submission
    event.preventDefault();
    submitForm();
});

$("#myModal1").submit(function(event){
    console.log('Hello jquery modal1');
    // cancels the form submission
    event.preventDefault();
    submitForm();
});

$("#myModal1b").submit(function(event){
    console.log('Hello jquery modal1b');
    // cancels the form submission
    event.preventDefault();
    submitForm();
});
*/