var isDesktop = false,
    isTablet = false,
    isMobile = false,
    isRetina = false;

$(document).ready(function(){	
    var myHeight,
        myWidth;
    function resize(){
       if( typeof( window.innerWidth ) == 'number' ) {
            myWidth = window.innerWidth;
            myHeight = window.innerHeight;
        } else if( document.documentElement && ( document.documentElement.clientWidth || 
        document.documentElement.clientHeight ) ) {
            myWidth = document.documentElement.clientWidth;
            myHeight = document.documentElement.clientHeight;
        } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
            myWidth = document.body.clientWidth;
            myHeight = document.body.clientHeight;
        }

        if( myWidth > 767 ){
            isDesktop = true;
            isTablet = false;
            isMobile = false;

            $("body").addClass("is-desktop");
        }else{
            isDesktop = false;
            isTablet = false;
            isMobile = true;

            $("body").removeClass("is-desktop");
        }

        resizeBack(myWidth, myHeight);
    }

    isRetina = retina();

    function retina(){
        var mediaQuery = "(-webkit-min-device-pixel-ratio: 1.5),\
            (min--moz-device-pixel-ratio: 1.5),\
            (-o-min-device-pixel-ratio: 3/2),\
            (min-resolution: 1.5dppx)";
        if (window.devicePixelRatio > 1)
            return true;
        if (window.matchMedia && window.matchMedia(mediaQuery).matches)
            return true;
        return false;
    }

    $(window).resize(resize);
    resize();

    setTimeout(resize, 500);
    setTimeout(resize, 1000);
    setTimeout(resize, 1500);

    var mobile = [
        ["i/set-1-mobile.jpg"],
        ["i/set-2-mobile.jpg"],
        ["i/set-3-mobile.jpg"],
        ["i/old-price.svg"],
        ["i/sale.svg"],
        ["i/mobile-cross.svg"],
        ["i/quiz-mobile.jpg"]
    ];

    var desktop = [
        ["i/set-back.svg"],
        ["i/old-price.svg"],
        ["i/sale.svg"],
        ["i/quiz-1.jpg", "i/quiz-1@2x.jpg"],
        ["i/set-1.png", "i/set-1@2x.png"],
        ["i/set-2.png", "i/set-2@2x.png"],
        ["i/set-3.png", "i/set-3@2x.png"],
    ];

    if( isMobile ){
        $(".b-1").css("height", myHeight);

        loadImages( mobile );
    }else{
        $(".b-1").css("height", "auto");

        loadImages( desktop );
    }
    if (!isDesktop) {
        // $(".b-advantages").slick();
        $(".b-advantages").slick({
        autoplay: true
    });
    }
   
    function loadImages(array){
        for( var i in array ){
            var items = array[i],
                item = items.shift(),
                image = new Image();

            if( isRetina && items.length ){
                item = items.pop();   
            }

            image.src = item;
        }
    }

    $.fn.placeholder = function() {
        if(typeof document.createElement("input").placeholder == 'undefined') {
            $('[placeholder]').focus(function() {
                var input = $(this);
                if (input.val() == input.attr('placeholder')) {
                    input.val('');
                    input.removeClass('placeholder');
                }
            }).blur(function() {
                var input = $(this);
                if (input.val() == '' || input.val() == input.attr('placeholder')) {
                    input.addClass('placeholder');
                    input.val(input.attr('placeholder'));
                }
            }).blur().parents('form').submit(function() {
                $(this).find('[placeholder]').each(function() {
                    var input = $(this);
                    if (input.val() == input.attr('placeholder')) {
                        input.val('');
                    }
                });
            });
        }
    }
    $.fn.placeholder();

    function resizeBack(width, height){
        var k = ( height < 820 )?0.25:0.4,
            zoom = 0.7,
            height = $(".b-1").height();

        if( height/width > 1144/2048 ){
            $(".b-back, .b-back-cont").css({
                width : "auto",
                height : height + (1430 - height)*zoom
            });
        }else{
            $(".b-back, .b-back-cont").css({
                width : width + (2560 - width)*zoom,
                height : "auto"
            });
        }

        var top = ($(".b-back-cont").height() - height) * k;

        $(".b-back-cont").css({
            top : -1 * top
        });
    }

    $(".b-quiz-back").click(function(){
        var $quiz = $(this).parents(".b-quiz");
        $quiz.hide();
        $( $(this).attr("href") ).show();
        return false;
    });

    $(".b-quiz-next").click(function(){
        var $quiz = $(this).parents(".b-quiz");
        $quiz.hide();
        $( $(this).attr("href") ).show();

        if( $(this).attr("href") == "#b-quiz-2" ){
            var selected = $quiz.find("input[name='tour']:checked"),
                name = selected.val().split(".").shift();

            $("#b-quiz-2 h2 b").text( name );
            $(".b-tour-in").text( selected.attr("data-in") );
            $(".b-tour-out").text( selected.attr("data-out") );
            $(".b-tour-from").text( selected.attr("data-from") );
            $(".b-tour-to").text( selected.attr("data-to") );
            $(".b-quiz-newprice").text( selected.attr("data-price") + " руб." );
            $(".b-quiz-oldprice").text( selected.attr("data-oldprice") + " руб." );


            if( !isMobile ){
                $( $(this).attr("href") ).find("input").eq(0).focus();
            }
        };
         if( $(this).attr("href") == "#b-quiz-4" ){
            var selected = $quiz.find("input[name='tour']:checked"),
                name = selected.val().split(".").shift();

            $("#b-quiz-4 h2 b").text( name );
            $(".b-tour-in").text( selected.attr("data-in") );
            $(".b-tour-out").text( selected.attr("data-out") );
            $(".b-tour-from").text( selected.attr("data-from") );
            $(".b-tour-to").text( selected.attr("data-to") );
            $(".b-quiz-newprice").text( selected.attr("data-price") + " руб." );
            $(".b-quiz-oldprice").text( selected.attr("data-oldprice") + " руб." );


            if( !isMobile ){
                $( $(this).attr("href") ).find("input").eq(0).focus();
            }
        }
        return false;
    });

    customHandlers["quizClose"] = function(){
        $(".b-quiz").hide();
        $("#b-quiz-1").show();
        $("#b-quiz-3").show();
    };

    $( ".b-top-menu .b-menu-btn" ).click(function(){
        if ($( ".b-menu" ).hasClass( "show-m" )){
            $( ".b-menu" ).removeClass( "show-m" );
        } else {
            $( ".b-menu" ).addClass( "show-m" )
        }
        return false;
    });

     $( ".b-menu a" ).click(function(){
        if ($( ".b-menu" ).hasClass( "show-m" )){
            $( ".b-menu" ).removeClass( "show-m" );
        };
    });
     $(document).on('click', function(e){
        var container = $('.b-menu');
        if (container.has(e.target).length === 0){
            container.removeClass("show-m");
        }
    });

var slideout = new Slideout({
      'panel': document.getElementById('panel'),
      'menu': document.getElementById('menu'),
      'padding': 250,
      'tolerance': 70,
      'side': 'left',
      'touch': false
    }); 
$('#menu').css('display','block');
$('#menu').css('opacity','0');
    function close(eve) {
    eve.preventDefault();
    slideout.close();
    }
    slideout
        .on('beforeopen', function() {
          $(" #panel ").addClass("panel-open");
          $('#menu').css('opacity','1');
        })
        .on('open', function() {
           this.panel.addEventListener('click', close);
        })
        .on('beforeclose', function() {
          $(" #panel ").removeClass("panel-open");
          this.panel.removeEventListener('click', close);
           $('#menu').css('opacity','0');
        });
    slideout.once('open', slideout._initTouchEvents);
    slideout.on('open', slideout.enableTouch);
    slideout.on('close', slideout.disableTouch);
    document.querySelector('.toggle-button').addEventListener('click', function() {
    slideout.toggle();
    });
    document.querySelector('.b-mobile-menu').addEventListener('click', function() {
    slideout.toggle();
    });

    $('.b-slick').slick({
        centerMode: true,
        variableWidth: true,
        slidesToShow: 3,
        prevArrow: '<button type="button" class="photo-arrow slick-prev slick-arrow icon-arrow-left"></button>',
        nextArrow: '<button type="button" class="photo-arrow slick-next slick-arrow icon-arrow-right"></button>',
        responsive: [
            {
              breakpoint: 768,
              settings: {
                arrows: false,
                variableWidth: false,
                slidesToShow: 1
              }
            },
          ]
    });

    $('.b-review-slick').slick({
         fade: true,
         speed: 500,
         arrows: false,
    });

    $('.b-review-slick .b-btn').on('click', function(){
        $('.b-review-slick').slick('slickNext');
        return false;
    });

    if (isMobile) {
        $(".toggle-button, .b-mobile-menu").bind('touchend', function(e) {
            e.preventDefault();
            $(this).click();
        });
    };

    // $(function() {
    //     FastClick.attach(document.body);
    // });
    // $(".b-step-slider").slick({
    //     dots: true,
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     infinite: true,
    //     cssEase: 'ease', 
    //     speed: 500,
    //     arrows: true,
    //     prevArrow: '<button type="button" class="slick-prev slick-arrow icon-arrow-left"></button>',
    //     nextArrow: '<button type="button" class="slick-next slick-arrow icon-arrow-right"></button>',
    //     touchThreshold: 100
    // });

    // // Первая анимация элементов в слайде
    // $(".b-step-slide[data-slick-index='0'] .slider-anim").addClass("show");

    // // Кастомные переключатели (тумблеры)
    // $(".b-step-slider").on('beforeChange', function(event, slick, currentSlide, nextSlide){
    //     $(".b-step-tabs li.active").removeClass("active");
    //     $(".b-step-tabs li").eq(nextSlide).addClass("active");
    // });

    // // Анимация элементов в слайде
    // $(".b-step-slider").on('afterChange', function(event, slick, currentSlide, nextSlide){
    //     $(".b-step-slide .slider-anim").removeClass("show");
    //     $(".b-step-slide[data-slick-index='"+currentSlide+"'] .slider-anim").addClass("show");
    // });


    
	// var myPlace = new google.maps.LatLng(55.754407, 37.625151);
 //    var myOptions = {
 //        zoom: 16,
 //        center: myPlace,
 //        mapTypeId: google.maps.MapTypeId.ROADMAP,
 //        disableDefaultUI: true,
 //        scrollwheel: false,
 //        zoomControl: true
 //    }
 //    var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions); 

 //    var marker = new google.maps.Marker({
	//     position: myPlace,
	//     map: map,
	//     title: "Ярмарка вакансий и стажировок"
	// });

});