$(function(){
	
	// Mobile Button
	$('.btn-mobile').click(function(){
		$('.main-nav').toggleClass('show');
		$('.btn-mobile [class*="icon-"]').toggle();
		return false;
	});
	
	$('.show a').click(function(){
    	$('.main-nav').removeClass('show');
	});
	
	// Scroll
    $('.logo a, .main-nav a[href*=#]:not([href=#]), .back-to-top').click(function() {
          var target = $(this.hash);
          var header = $('.header').height();
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html,body').animate({
              scrollTop: target.offset().top - header
            }, 1000);
            return false;
          }
    });

    var aChildren = $(".main-nav li:not([target=_blank])").children(); // find the a children of the list items
    var aArray = []; // create the empty aArray
    for (var i=0; i < aChildren.length; i++) {    
        var aChild = aChildren[i];
        var ahref = $(aChild).attr('href');
        aArray.push(ahref);
    } // this for loop fills the aArray with attribute href values
    
    $(window).scroll(function(){
        var windowPos = $(window).scrollTop(); // get the offset of the window from the top of page
        var windowHeight = $(window).height(); // get the height of the window
        var docHeight = $(document).height();
        var header = $('.header').height();

        for (var i=0; i < aArray.length; i++) {
            var theID = aArray[i];
            var divPos = $(theID).offset().top - header-2; // get the offset of the div from the top of page
            var divHeight = $(theID).height(); // get the height of the div in question
            if (windowPos >= divPos && windowPos < (divPos + divHeight)) {
                $(".main-nav a[href='" + theID + "']").addClass("active");
            } else {
                $(".main-nav a[href='" + theID + "']").removeClass("active");
            }
        }

        if(windowPos + windowHeight == docHeight) {
            if (!$(".main-nav li:last-child a").hasClass("active")) {
                var navActiveCurrent = $(".active").attr("href");
                $("a[href='" + navActiveCurrent + "']").removeClass("active");
                $(".main-nav li:last-child a").addClass("active");
            }
        }
    
    });

/*
    $('.main-nav a, .logo a').click(function() {
        $(this).addClass('active');
    })
*/

});