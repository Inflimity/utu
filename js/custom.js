
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

  // 👇 you’ll need to maintain a list of product files, or generate it during build
  const files = ["jonny-doe.md", "jonny-ive.md", "jonny-mark.md", "jonny-lady.md"];

  for (let file of files) {
    let res = await fetch(`/content/products/${file}`);
    let text = await res.text();

    // Extract frontmatter
    let match = /---([\s\S]*?)---/.exec(text);
    let frontmatter = {};
    if (match) {
      match[1].trim().split("\n").forEach(line => {
        let [key, ...rest] = line.split(":");
        frontmatter[key.trim()] = rest.join(":").trim().replace(/"/g, "");
      });
    }

    let description = text.replace(/---[\s\S]*?---/, "").trim();

    container.innerHTML += `
      <div class="col-md-6 col-sm-10">
        <div class="media wow fadeInUp" data-wow-delay="0.3s">
          <div class="media-object pull-left">
            <img src="${frontmatter.image}" class="img-responsive" alt="${frontmatter.title}">
          </div>
          <div class="media-body border-right">
            <h3 class="media-heading">${frontmatter.title}</h3>
            <h4 class="tm-team-member-heading-2">${frontmatter.role}</h4>
            <p>${description}</p>
          </div>
        </div>
      </div>
    `;
  }
}

loadProducts();
