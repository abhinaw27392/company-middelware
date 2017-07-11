$(window).load(function () {
    $("#preloader").fadeOut("slow");
});

$(document).ready(function () {

    wow = new WOW({
        mobile: false,       // default
    }
    )
    wow.init();

    $('#top-nav').onePageNav({
        currentClass: 'current',
        changeHash: true,
        scrollSpeed: 1200
    });


    //animated header class
    $(window).scroll(function () {
        if ($(window).scrollTop() > 100) {
            $(".navbar-default").addClass("animated");
        } else {
            $(".navbar-default").removeClass('animated');
        }
    });


    $('.init-slider').owlCarousel({
        items: 1,
        merge: true,
        loop: true,
        video: true,
        smartSpeed: 600
    });

    /*$('input, textarea').data('holder', $('input, textarea').attr('placeholder'));

    $('input, textarea').focusin(function () {
        $(this).attr('placeholder', '');
    });
    $('input, textarea').focusout(function () {
        $(this).attr('placeholder', $(this).data('holder'));
    });*/


    //contact form validation
    $("#contact-form").validate({
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            message: {
                required: true,
                minlength: 2
            },
            email: {
                required: true,
                email: true
            }
        },
        messages: {
            name: {
                required: "Please enter Your Name",
                minlength: "Your name must consist of at least 2 characters"
            },
            message: {
                required: "Please Write Something",
                minlength: "Your message must consist of at least 2 characters"
            },
            email: "Please enter a valid email address"
        },
        submitHandler: function (form) {
            $(form).ajaxSubmit({
                type: "POST",
                data: $(form).serialize(),
                url: "mail.php",
                success: function () {
                    $('#contact-form :input').attr('disabled', 'disabled');
                    $('#contact-form').fadeTo("slow", 0.15, function () {
                        $(this).find(':input').attr('disabled', 'disabled');
                        $(this).find('label').css('cursor', 'default');
                        $('#success').fadeIn();
                    });
                },
                error: function () {
                    $('#contact-form').fadeTo("slow", 0.15, function () {
                        $('#error').fadeIn();
                    });
                }
            });
        }
    });

});

// When the window has finished loading create our google map below
google.maps.event.addDomListener(window, 'load', init);

function init() {
    // Basic options for a simple Google Map
    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    var mapOptions = {
        // How zoomed in you want the map to start at (always required)
        zoom: 16,

        // The latitude and longitude to center the map (always required)
        center: new google.maps.LatLng(23.751945, 90.384590), // Dhaka ,
        scrollwheel: false,

        // How you would like to style the map. 
        // This is where you would paste any style found on Snazzy Maps.
        styles: [{ "featureType": "landscape.natural", "elementType": "geometry.fill", "stylers": [{ "visibility": "on" }, { "color": "#e0efef" }] }, { "featureType": "poi", "elementType": "geometry.fill", "stylers": [{ "visibility": "on" }, { "hue": "#1900ff" }, { "color": "#c0e8e8" }] }, { "featureType": "road", "elementType": "geometry", "stylers": [{ "lightness": 100 }, { "visibility": "simplified" }] }, { "featureType": "road", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit.line", "elementType": "geometry", "stylers": [{ "visibility": "on" }, { "lightness": 700 }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "color": "#7dcdcd" }] }]
    };

    // Get the HTML DOM element that will contain your map 
    // We are using a div with id="map" seen below in the <body>
    var mapElement = document.getElementById('map-canvas');

    // Create the Google Map using our element and options defined above
    var map = new google.maps.Map(mapElement, mapOptions);

    // Let's also add a marker while we're at it
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(23.751945, 90.384590),
        map: map,
        icon: 'img/map.png',
        title: 'Twing!'
    });
}
function functionMmodal(modalId, closeId) {
    // Get the modal
    var modal = document.getElementById(modalId);
    modal.style.display = "block";
    // Get the button that opens the modal
    //var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementById(closeId);

    // When the user clicks the button, open the modal 
    // btn.onclick = function() {
    // modal.style.display = "block";
    // }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        var myNode = document.getElementById('dynamicIdContainerBox');
        if (myNode) { 
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }
        }
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            var myNode = document.getElementById('dynamicIdContainerBox');
            if (myNode) { 
            while (myNode.firstChild) {
                myNode.removeChild(myNode.firstChild);
            }
            }
            modal.style.display = "none";
        }
    }
}
function functionAnnual(divId, divOptId) {
    var x = document.getElementById(divId);
    if (x.style.display === 'none') {
        x.style.display = 'block';
        document.getElementById(divOptId).className = "fa fa-chevron-down";
    } else {
        x.style.display = 'none';
        document.getElementById(divOptId).className = "fa fa-chevron-right";
    }

}

function hideandseek(isVisible, divElement) {
    var x = document.getElementById(divElement);
    if (isVisible == "true")
        x.style.display = 'block';
    else
        x.style.display = 'none';
}

function insertDynamicDivs(count) {
    var count = document.getElementById(count).innerHTML;
    var container = document.getElementById("dynamicIdContainerBox");
    var containerDiv = document.getElementById("dynamicId");
    var divtoconcat = document.getElementById("dynamicId").innerHTML;

    for (var i = 0; i < count - 1; i++) {
        container.innerHTML += divtoconcat.replace(/divAssetDeclared/g, "divAssetDeclared" + i).replace(/secondaryUserDiv/g, "secondaryUserDiv" + i).replace(/usingIt/g, "usingIt" + i);

    }
}