// Global parameters
window.params = {
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    isIOS: /iPhone|iPad|iPod/i.test(navigator.userAgent)
};


jQuery(document).ready(function($) {


    /*---------------------------
                                  ADD CLASS ON SCROLL
    ---------------------------*/
    $(function() { 
        var $document = $(document),
            $element = $('.menu-button'),
            $element2 = $('header'),
            className = 'hasScrolled';

        $document.scroll(function() {
            $element.toggleClass(className, $document.scrollTop() >= 1);
            $element2.toggleClass(className, $document.scrollTop() >= 1);
        });
    });
    
    /*---------------------------
                                PAGE ANCHORS
    ---------------------------*/
    $('.mainNav a, .anchor').click(function() {
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top - 50
        }, 800);
        return false;
    });

    /*---------------------------
                                ACTIVATE MENU ITEM OVER CURRENT SECTION
    ---------------------------*/
    var $sections = $('section');
    $(window).scroll(function(){
        var currentScroll = $(this).scrollTop();
        var $currentSection;
        var windowHalf = $(window).height() / 2;
        
        $sections.each(function(){
          var divPosition = $(this).offset().top - windowHalf;
          
          if( divPosition - 1 < currentScroll ){
            $currentSection = $(this);
          }
        var id = $currentSection.attr('id');
          $('a').removeClass('active');
          $("[href=#"+id+"]").addClass('active');
        })
    });

    /*---------------------------
                                  MENU TOGGLE
    ---------------------------*/
    $('.menu-button').on('click', function(event) {
        event.preventDefault();
        $(this).toggleClass('active');
        $(this).siblings('header').toggleClass('active');
        if ($('header').hasClass('active')) {
                $('body').css('overflow', 'hidden');
            } else {
                $('body').css('overflow', 'visible');
            }
    });


        
        // ======================================================
        // Doughnut Chart
        // ======================================================

        // Doughnut Chart Options
        var doughnutOptions = {
            //Boolean - Whether we should show a stroke on each segment
            segmentShowStroke : false,
            
            //String - The colour of each segment stroke
            segmentStrokeColor : "#fff",
            
            //Number - The width of each segment stroke
            segmentStrokeWidth : 2,
            
            //The percentage of the chart that we cut out of the middle.
            percentageInnerCutout : 70,
            
            //Boolean - Whether we should animate the chart 
            animation : true,
            
            //Number - Amount of animation steps
            animationSteps : 150,
            
            //String - Animation easing effect
            animationEasing : "easeOutBounce",
            
            //Boolean - Whether we animate the rotation of the Doughnut
            animateRotate : true,

            //Boolean - Whether we animate scaling the Doughnut from the centre
            animateScale : true,
            
            //Function - Will fire on animation completion.
            onAnimationComplete : null,

            tooltipFillColor: "rgba(0,0,0,0.8)",

            tooltipEvents: ["mousemove", "touchstart", "touchmove", "load"],

            onAnimationComplete: function()
            {
                this.showTooltip(this.segments, true); 
            },

            tooltipEvents: [],

            showTooltips: true

        }


        // Doughnut Chart Data
        var doughnutData = [
            {
                value : 280,
                color : "#FF9711"
            },
            {
                value : 200,
                color : "#EEF7E2"
            },
            {
                value : 30,
                color : "#D6DF24"
            },
            {
                value: 510,
                color:"#118844"
            }

        ]


        //Get the context of the Doughnut Chart canvas element we want to select
        var ctx = document.getElementById("doughnutChart").getContext("2d");

        // Create the Doughnut Chart
        var mydoughnutChart = new Chart(ctx).Doughnut(doughnutData, doughnutOptions);



    /*---------------------------
                                PAGE ANCHORS
    ---------------------------*/
    $('.services__list li:first-of-type').addClass('active');
    $('.services__info__tab:first-of-type').addClass('active');

    $('.services__list li').click(function() {
        var target = $(this).data('service');

        $('.services__list li').removeClass('active');
        $(this).addClass('active');
        $('.services__info__tab').removeClass('active');
        $('.' + target + '').addClass('active');

    });

    /*---------------------------
                                  Magnific popup
    ---------------------------*/
    $('.magnific').magnificPopup({
        type: 'inline',

        fixedContentPos: false,
        fixedBgPos: true,

        overflowY: 'auto',
        modal: false,

        closeBtnInside: true,
        preloader: false,
        
        midClick: true,
        removalDelay: 300,
        mainClass: 'my-mfp-slide-bottom'
    });




    /*---------------------------
                                  Team slider
    ---------------------------*/
    $('.team-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
        $('.slide').removeClass('active left right');
        $(slick.$slides[nextSlide-1]).addClass('active left');
        $(slick.$slides[nextSlide]).addClass('active');
        $(slick.$slides[nextSlide+1]).addClass('active right');
    });

    $('.team-slider').slick({
        centerMode: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        infinite: false,
        focusOnSelect: true
    })



    /*----------------------------
                              SEND FORM
    -------------------------*/
    /**
     *
     * Open popup
     *
     * @param popup {String} jQuery object (#popup)
     *
     * @return n/a
     *
    */
    function openPopup(popup){
        $.magnificPopup.open({
            items: {
              src: popup
            },
            type: 'inline',
            fixedContentPos: false,
            fixedBgPos: true,
            overflowY: 'auto',
            modal: false,
            closeBtnInside: true,
            preloader: false,
            midClick: true,
            removalDelay: 300,
            mainClass: 'my-mfp-slide-bottom'
        }, 0);
    }

    $('form').on('submit', function(event) {
        event.preventDefault();
        /* Act on the event */
        var data = $(this).serialize();
        $.ajax({
            url: theme.url + '/forms.php',
            type: 'POST',
            data: data,
            success: function(result){
                if (result.status == 'ok') {
                    openPopup('#modal-popup-ok')
                } else {
                    openPopup('#modal-popup-error')
                }
            },
            error: function(result) {
                openPopup('#modal-popup-error');
            }
        })
        .always(function() {
            $('form').each(function(index, el) {
                $(this)[0].reset();
            });
        });
        
    });


    var map;
    function googleMap_initialize() {
        var lat = $('#map_canvas').data('lat');
        var long = $('#map_canvas').data('lng');

        var mapCenterCoord = new google.maps.LatLng(lat, long+0.002);
        var mapMarkerCoord = new google.maps.LatLng(lat, long);
        if ( $(window).width() <= 1000 ) {
            mapCenterCoord = new google.maps.LatLng(lat, long);
            mapMarkerCoord = new google.maps.LatLng(lat, long);
        }
        $(window).resize(function(event) {
            if ( $(window).width() <= 1000 ) {
                mapCenterCoord = new google.maps.LatLng(lat, long);
                mapMarkerCoord = new google.maps.LatLng(lat, long);
            } else {
                mapCenterCoord = new google.maps.LatLng(lat, long+0.002);
                mapMarkerCoord = new google.maps.LatLng(lat, long);
            }
        });

        var mapOptions = {
            center: mapCenterCoord,
            zoom: 17,
            //draggable: false,
            disableDefaultUI: true,
            scrollwheel: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
        var markerImage = new google.maps.MarkerImage('images/location.png');
        var marker = new google.maps.Marker({
            icon: markerImage,
            position: mapMarkerCoord, 
            map: map,
            title:"Чисто Строй"
        });
        
        $(window).resize(function (){
            map.setCenter(mapCenterCoord);
        });
    }

    googleMap_initialize(); 

}); // end file