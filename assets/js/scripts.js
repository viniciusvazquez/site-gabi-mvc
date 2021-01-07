var mr_firstSectionHeight, 
    mr_nav, 
    mr_navOuterHeight, 
    mr_navScrolled = false,
    mr_navFixed = false,
    mr_outOfSight = false,
    mr_floatingProjectSections,
    mr_scrollTop = 0;

jQuery(document).ready(function(){
    "use strict";
    
    //WordPress z-index fix
    var sectionNo = jQuery('section').length;
    jQuery('section').each(function(idx){
        jQuery(this).css('z-index', sectionNo - idx);
    });
    
    jQuery('p:empty').remove();
    
    // Update scroll variable for scrolling functions
    addEventListener('scroll',function(){ mr_scrollTop = window.pageYOffset; }, false );
    
    // Append .background-image-holder <img>'s as CSS backgrounds
    jQuery('.background-image-holder').each(function() {
        var imgSrc = jQuery(this).children('img').attr('src');
        jQuery(this).css('background', 'url("' + imgSrc + '")');
        jQuery(this).children('img').hide();
        jQuery(this).css('background-position', 'initial');
    });
    
    // Fade in background images
    setTimeout(function(){
        jQuery('.background-image-holder').each(function() {
            jQuery(this).addClass('fadeIn');
        });
    },200);
    
    // Initialize Tooltips
    jQuery('[data-toggle="tooltip"]').tooltip();
    
    // Checkboxes
    jQuery('.checkbox-option').click(function(){
        jQuery(this).toggleClass('checked');
        var checkbox = jQuery(this).find('input');
        if(checkbox.prop('checked') === false){
            checkbox.prop('checked',true);
        }else{
            checkbox.prop('checked',false);
        }
    });
    
    // Radio Buttons
    jQuery('.radio-option').click(function(){
        jQuery(this).closest('form').find('.radio-option').removeClass('checked');
        jQuery(this).addClass('checked');
        jQuery(this).find('input').prop('checked',true);
    });
    
    // Tabbed Content
    jQuery('.tabbed-content').each(function(){
        jQuery(this).append('<ul class="content"></ul>');
    });
    
    jQuery('.tabs li').each(function(){
        var originalTab = jQuery(this), activeClass = "";
        if(originalTab.is('.tabs li:first-child')){
            activeClass = ' class="active"';
        }
        var tabContent = originalTab.find('.tab-content').detach().wrap('<li'+activeClass+'></li>').parent();
        originalTab.closest('.tabbed-content').find('.content').append(tabContent);
    });
    
    jQuery('.tabs li').click(function(){
        jQuery(this).closest('.tabs').find('li').removeClass('active');
        jQuery(this).addClass('active');
        var liIndex = jQuery(this).index() + 1;
        jQuery(this).closest('.tabbed-content').find('.content>li').removeClass('active');
        jQuery(this).closest('.tabbed-content').find('.content>li:nth-of-type('+liIndex+')').addClass('active');
    });
    
    // Navigation
    if(!jQuery('nav').hasClass('fixed') && !jQuery('nav').hasClass('absolute')){
    
        // Make nav container height of nav
        
        jQuery('.nav-container').css('min-height',jQuery('nav').outerHeight(true));
        
        jQuery(window).resize(function(){
            jQuery('.nav-container').css('min-height',jQuery('nav').outerHeight(true));
        });
        
        // Compensate the height of parallax element for inline nav
        
        if(jQuery(window).width() > 768){
            jQuery('.parallax:first-child .background-image-holder').css('top', -(jQuery('nav').outerHeight(true)) );
        }
        
        // Adjust fullscreen elements
        
        if(jQuery(window).width() > 768){
            jQuery('section.fullscreen:first-child').css('height', (jQuery(window).height() - jQuery('nav').outerHeight(true)));
        }
        
    }else{
        jQuery('body').addClass('nav-is-overlay');
    }
    
    if(jQuery('nav').hasClass('bg-dark')){
        jQuery('.nav-container').addClass('bg-dark');
    }
    

    // Fix nav to top while scrolling
    mr_nav = jQuery('body .nav-container nav:first');
    mr_navOuterHeight = jQuery('body .nav-container nav:first').outerHeight();
    window.addEventListener("scroll", updateNav, false);

    // Menu dropdown positioning
    jQuery('.menu > li > ul').each(function(){
        var menu = jQuery(this).offset();
        var farRight = menu.left + jQuery(this).outerWidth(true);
        if(farRight > jQuery(window).width() && !jQuery(this).hasClass('mega-menu') ){
            jQuery(this).addClass('make-right');
        }else if(farRight > jQuery(window).width() && jQuery(this).hasClass('mega-menu')){
            var isOnScreen = jQuery(window).width() - menu.left;
            var difference = jQuery(this).outerWidth(true) - isOnScreen;
            jQuery(this).css('margin-left', -(difference));
        }
    });
    
    // Mobile Menu
    jQuery('.mobile-toggle').click(function(){
        jQuery('.nav-bar').toggleClass('nav-open');
        jQuery(this).toggleClass('active');
    });
    
    jQuery('.menu li').click(function(e){
        if (!e) e = window.event;
        e.stopPropagation();
        if(jQuery(this).find('ul').length){
            jQuery(this).toggleClass('toggle-sub');
        }else{
            jQuery(this).parents('.toggle-sub').removeClass('toggle-sub');
        }
    });
    
    jQuery('.menu li a').click(function(){
        if(jQuery(this).attr('href') === '#'){
            if(!jQuery(this).closest('li').find('ul').length){
                return false;
            }
        }
    });
    
    
    jQuery('.module.widget-handle').click(function(){
        jQuery(this).toggleClass('toggle-widget-handle');
    });
    
    if( jQuery('.instafeed').length && wp_data.access_token && wp_data.client_id ){
        jQuery.fn.spectragram.accessData = {
            accessToken: wp_data.access_token,
            clientID: wp_data.client_id
        };  
    
        jQuery('.instafeed').each(function() {
            jQuery(this).children('ul').spectragram('getUserFeed', {
                query: jQuery(this).attr('data-user-name'), 
                max: 12
            });
        });
    
    }
    
    // Image Sliders
    jQuery('.slider-all-controls').flexslider({  });
    
    // Interact with Map once the user has clicked (to prevent scrolling the page = zooming the map
    jQuery('.map-holder').click(function(){
        jQuery(this).addClass('interact');
    });
    
    jQuery(window).scroll(function(){
        if(jQuery('.map-holder.interact').length){
            jQuery('.map-holder.interact').removeClass('interact');
        }
    });
    
    // Scroll Reveal
    window.sr = new scrollReveal();
    
});

jQuery(window).load(function() { 
    "use strict";
    
    mr_firstSectionHeight = jQuery('.main-container section:first-child').outerHeight(true);   
    
});

function updateNav(){
    
    var scrollY = mr_scrollTop;

    if(scrollY <= 0){
        if(mr_navFixed){mr_navFixed = false;mr_nav.removeClass('fixed');}
        if(mr_outOfSight){mr_outOfSight = false; mr_nav.removeClass('outOfSight');}
        if(mr_navScrolled){mr_navScrolled = false;mr_nav.removeClass('scrolled');}
        return;
    }

    if(scrollY > mr_firstSectionHeight){
        if(!mr_navScrolled){
            mr_nav.addClass('scrolled');
            mr_navScrolled = true;
            return; 
        }
    }else{
        if(scrollY > mr_navOuterHeight){
            if(!mr_navFixed){mr_nav.addClass('fixed');mr_navFixed = true;}

            if(scrollY > mr_navOuterHeight*2){
                if(!mr_outOfSight){mr_nav.addClass('outOfSight'); mr_outOfSight = true;}
            }else{
                if(mr_outOfSight){mr_outOfSight = false; mr_nav.removeClass('outOfSight'); }
            }
        }else{
            if(mr_navFixed){mr_navFixed = false;mr_nav.removeClass('fixed');}
            if(mr_outOfSight){mr_outOfSight = false; mr_nav.removeClass('outOfSight'); }
        }

        if(mr_navScrolled){mr_navScrolled = false;mr_nav.removeClass('scrolled');}
        
    }
}

function capitaliseFirstLetter(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}