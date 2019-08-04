$(document).ready(function () {
    $(function(){
        /*start плагин*/
        (function($){
        $.fn.liTip = function(params){
            var params = $.extend({
                themClass: 'liTipBlack',
                timehide: 200,
                posY: 'top',
                radius: '3px',
                maxWidth: '400px',
                content: false,
                tipEvent: 'mouseenter'
            }, params);
            return this.each(function(){
                var tipTag = $(this).css({whiteSpace:'nowrap'}),
                    wW = $(window).width(),
                    wH = $(window).height(),
                    themClass = params.themClass,
                    timehide = params.timehide,
                    maxWidth = params.maxWidth,
                    posY = params.posY,
                    tipFuncId = false,
                    tipF = false,
                    radius = params.radius,
                    tipEvent = params.tipEvent,
                    liTipContent = $('<div>').css({borderRadius:radius,maxWidth:maxWidth}).addClass('liTipContent liTipHide '+themClass).appendTo('body'),
                    content = params.content,
                    liTipClass = 'liTipPos'+posY,
                    tipContent = '',
                    tipTagLeft = tipTag.offset().left,
                    tipTagTop = tipTag.offset().top,
                    tipTagWidth = tipTag.outerWidth(),
                    tipTagHeight = tipTag.outerHeight(),
                    tipTagCenter = tipTagLeft + tipTagWidth/2,
                    liTipInner = $('<div>').addClass('liTipInner').html(tipContentFunc()).appendTo(liTipContent),
                    liTipCone = $('<div>').addClass('liTipCone').appendTo(liTipContent),
                    liTipContentWidth = liTipContent.outerWidth(),
                    liTipContentHeight = liTipContent.outerHeight(),
                    liTipContentCenter = liTipContentWidth/2,
                    coneLeft = 0;
                
                function tipContentFunc(){
                    if(content == false){
                        tipContent = tipTag.attr('title');
                        tipTag.attr('title','');
                    }else{
                        tipTag.attr('title','');
                        tipContent = content;
                    };
                    return tipContent;
                };
                
                tipTag.on(tipEvent,function(e){
                    var eX = e.pageX;
                    var eY = e.pageY;
                    tipLeft = tipTagCenter - liTipContentCenter;
                    coneLeft = 0;
                    if(tipLeft < 0){
                        tipLeft = 5;
                        coneLeft = (tipTagCenter - liTipContentCenter) - 5;
                    };
                    if(tipLeft > (wW - liTipContentWidth)){
                        tipLeft = (wW - (liTipContentWidth + 5));
                        coneLeft = (tipTagCenter - liTipContentCenter) - (wW - (liTipContentWidth + 5));
                    };
                    liTipCone.css({marginLeft:coneLeft - 6 + 'px'});
                    if(posY == 'top'){
                        tipTop = tipTagTop - (liTipContentHeight+5);
                        if(tipTop < $(window).scrollTop()){
                            tipTop = (tipTagTop + tipTagHeight +5);    
                            liTipClass = 'liTipPosbottom';
                        }
                    };
                    if(posY == 'bottom'){
                        tipTop = (tipTagTop + tipTagHeight +5);    
                        if((tipTop + liTipContentHeight) > $(window).scrollTop() + wH){
                            tipTop = tipTagTop - (liTipContentHeight+5);
                            liTipClass = 'liTipPostop';
                        }
                    };
                    liTipContent.removeClass('liTipPostop').removeClass('liTipPosbottom').addClass(liTipClass).css({left:tipLeft, top:tipTop});
                    clearTimeout(tipFuncId);
                    if(tipEvent == 'click'){
                        return false;
                    };
                }).on('mouseleave',function(){
                    tipF = function tipFunc(){
                        liTipContent.css({left:'-99999px', top:'-99999px'})    ;
                    };
                    clearTimeout(tipFuncId);
                    tipFuncId = setTimeout(tipF,timehide);
                });
                liTipContent.on('mouseenter',function(){
                    clearTimeout(tipFuncId);
                }).on('mouseleave',function(){
                    clearTimeout(tipFuncId);
                    tipFuncId = setTimeout(tipF,timehide);
                });
                $(window).resize(function(){
                    wW = $(window).width();
                    wH = $(window).height();
                    tipTagLeft = tipTag.offset().left;
                    tipTagTop = tipTag.offset().top;
                    tipTagWidth = tipTag.outerWidth();
                    tipTagHeight = tipTag.outerHeight();
                    tipTagCenter = tipTagLeft + tipTagWidth/2;
                    liTipContentWidth = liTipContent.outerWidth();
                    liTipContentHeight = liTipContent.outerHeight();
                    liTipContentCenter = liTipContentWidth/2;
                    liTipClass = 'liTipPos'+posY;
                })
            });
        };
    })(jQuery);
        /*end плагин*/

        $('.tip_1').liTip({
            themClass: 'liTipViolent',
            timehide:0,
            posY: 'top',
            radius: '5px',
            maxWidth: '300px',
            content: 'Мы разработали особую систему брифования и детального изучения бизнеса заказчиков. Над сценарием работает не 1, а 4 человека (сценарист, маркетолог, режиссёр, креативный директор). И мы не переходим к созданию ролика, пока все стороны не будут уверены на 100%, что сценарий удался. Поэтому с нами работают научно-производственные, исследовательские, технологические компании. Мы научились сложное делать простым и наглядным.'
        });
        $('.tip_2').liTip({
            themClass: 'liTipViolent',
            timehide:0,
            posY: 'top',
            radius: '5px',
            maxWidth: '300px',
            content: 'Знаем, как решать основные 15 бизнес-задач компаний из разных сфер. Оставьте заявку на сайте, и мы пришлём примеры роликов (кейсы) из вашей ниши. Расскажем, какой тип/стиль видео лучше сработает в вашей ситуации. Поделимся опытом.'
        });

        $('.tip_3').liTip({
            themClass: 'liTipViolent',
            timehide:0,
            posY: 'top',
            radius: '5px',
            maxWidth: '300px',
            content: 'Когда определимся со стилем, длительностью и идеей ролика, предоставим вам 2-3 варианта смет с подробным обоснованием каждого пункта. И проведём скайп-конференцию или личную встречу, где расскажем, почему в смету включены такие пункты, на чём можно сэкономить. Наш прайс будет для вас максимально прозрачным. А ценой вы можете управлять сами, выбирая или удаляя опции.'
        });

        $('.tip_4').liTip({
            themClass: 'liTipViolent',
            timehide:0,
            posY: 'top',
            radius: '5px',
            maxWidth: '300px',
            content: 'Если мы берёмся за работу, то выполняем её в срок. От нереальных проектов отказываемся, т.к. по договору платим большую неустойку за задержки. Единственное, что может помешать - это длительные согласования со стороны заказчика. Если по каждому этапу производства нужно ждать решение от совета директоров, то прибавьте к нашим срокам ещё месяц-два.'
        });

        $('.tip_5').liTip({
            themClass: 'liTipViolent',
            timehide:0,
            posY: 'top',
            radius: '5px',
            maxWidth: '300px',
            content: 'Для начала посмотрите отзывы и уровень работ подрядчика. Также у нас есть чек-лист для подробного сравнения студий. Если вы используете основные 10 параметров для выбора подрядчика, то минимизируете риски. Многие заказчики ограничиваются просмотром сайтов и выбором по цене. Но этого недостаточно.'
        });

        $('.tip_6').liTip({
            themClass: 'liTipViolent',
            timehide:0,
            posY: 'top',
            radius: '5px',
            maxWidth: '300px',
            content: 'У нас ушло 3 года, чтобы разработать безопасную для заказчика систему работы. Мы тратим до 40 часов на брифование, исследования, аналитику и составление технического задания. Поэтому ваши ожидания будут предельно чётко сформулированы и реализованы. Для этого согласовываем каждый этап производства ролика. И контролируем качество работы каждого сотрудника.'
        });


    });
});
