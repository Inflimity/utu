
// PRELOADER
	jQuery(window).load(function() {
        // will first fade out the loading animation
	jQuery(".sk-spinner").fadeOut();
        // will fade out the whole DIV that covers the website.
	jQuery(".preloader").delay(1000).fadeOut("slow");
});

// NIVO LIGHTBOX
$('.iso-box-section a').nivoLightbox({
        effect: 'fadeScale',
    });

// ISOTOPE FILTER
jQuery(document).ready(function($){

	if ( $('.iso-box-wrapper').length > 0 ) { 

	    var $container 	= $('.iso-box-wrapper'), 
	    	$imgs 		= $('.iso-box img');

	    $container.imagesLoaded(function () {

	    	$container.isotope({
				layoutMode: 'fitRows',
				itemSelector: '.iso-box'
	    	});

	    	$imgs.load(function(){
	    		$container.isotope('reLayout');
	    	})

	    });

	    //filter items on button click

	    $('.filter-wrapper li a').click(function(){

	        var $this = $(this), filterValue = $this.attr('data-filter');

			$container.isotope({ 
				filter: filterValue,
				animationOptions: { 
				    duration: 750, 
				    easing: 'linear', 
				    queue: false, 
				}              	 
			});	            

			// don't proceed if already selected 

			if ( $this.hasClass('selected') ) { 
				return false; 
			}

			var filter_wrapper = $this.closest('.filter-wrapper');
			filter_wrapper.find('.selected').removeClass('selected');
			$this.addClass('selected');

	      return false;
	    }); 

	}

});


// MAIN NAVIGATION
 $('.main-navigation').onePageNav({
        scrollThreshold: 0.2, // Adjust if Navigation highlights too early or too late
        scrollOffset: 75, //Height of Navigation Bar
        filter: ':not(.external)',
        changeHash: true
    }); 

    /* NAVIGATION VISIBLE ON SCROLL */
    mainNav();
    $(window).scroll(function () {
        mainNav();
    });

    function mainNav() {
        var top = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        if (top > 40) $('.sticky-navigation').stop().animate({
            "opacity": '1',
            "top": '0'
        });
        else $('.sticky-navigation').stop().animate({
            "opacity": '0',
            "top": '-75'
        });
    }


// HIDE MOBILE MENU AFTER CLIKING ON A LINK
    $('.navbar-collapse a').click(function(){
        $(".navbar-collapse").collapse('hide');
    });


// WOW ANIMATED 
$(function()
{
    new WOW().init();
});

async function loadProducts() {
  const container = document.getElementById("products-container");

  // Replace with your published Google Sheet CSV link
  const response = await fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vR1LOTq93SxnNOB7rLCElA1qYDbMNe3IkkgFSTFj-dMQFNbRaTCY1hhxORa9LrHqeUg87Dy2_mrT2yt/pub?output=csv");
  const data = await response.text();

  const rows = data.split("\n").map(row => row.split(","));
  const products = rows.slice(1); // skip header

  products.forEach((product, i) => {
    if (product.length < 4) return; // skip empty rows

    const [name, role, image, description] = product;

    const card = document.createElement("div");
    card.classList.add("col-md-6", "col-sm-10");
    card.innerHTML = `
      <div class="media wow fadeInUp" data-wow-delay="${0.3 + i * 0.3}s">
        <div class="media-object pull-left">
          <img src="${image}" class="img-responsive" alt="${name}">
        </div>
        <div class="media-body border-right">
          <h3 class="media-heading">${name}</h3>
          <h4 class="tm-team-member-heading-2">${role}</h4>
          <p>${description}</p>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

loadProducts();
