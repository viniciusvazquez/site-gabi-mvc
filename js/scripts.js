var mr_firstSectionHeight,mr_nav,mr_navOuterHeight,mr_floatingProjectSections,mr_navScrolled=!1,mr_navFixed=!1,mr_outOfSight=!1,mr_scrollTop=0;function updateNav(){var e=mr_scrollTop;if(e<=0)return mr_navFixed&&(mr_navFixed=!1,mr_nav.removeClass("fixed")),mr_outOfSight&&(mr_outOfSight=!1,mr_nav.removeClass("outOfSight")),void(mr_navScrolled&&(mr_navScrolled=!1,mr_nav.removeClass("scrolled")));if(e>mr_firstSectionHeight){if(!mr_navScrolled)return mr_nav.addClass("scrolled"),void(mr_navScrolled=!0)}else e>mr_navOuterHeight?(mr_navFixed||(mr_nav.addClass("fixed"),mr_navFixed=!0),e>2*mr_navOuterHeight?mr_outOfSight||(mr_nav.addClass("outOfSight"),mr_outOfSight=!0):mr_outOfSight&&(mr_outOfSight=!1,mr_nav.removeClass("outOfSight"))):(mr_navFixed&&(mr_navFixed=!1,mr_nav.removeClass("fixed")),mr_outOfSight&&(mr_outOfSight=!1,mr_nav.removeClass("outOfSight"))),mr_navScrolled&&(mr_navScrolled=!1,mr_nav.removeClass("scrolled"))}function capitaliseFirstLetter(e){return e.charAt(0).toUpperCase()+e.slice(1)}jQuery(document).ready(function(){"use strict";var e=jQuery("section").length;jQuery("section").each(function(t){jQuery(this).css("z-index",e-t)}),jQuery("p:empty").remove(),addEventListener("scroll",function(){mr_scrollTop=window.pageYOffset},!1),jQuery(".background-image-holder").each(function(){var e=jQuery(this).children("img").attr("src");jQuery(this).css("background",'url("'+e+'")'),jQuery(this).children("img").hide(),jQuery(this).css("background-position","initial")}),setTimeout(function(){jQuery(".background-image-holder").each(function(){jQuery(this).addClass("fadeIn")})},200),jQuery('[data-toggle="tooltip"]').tooltip(),jQuery(".checkbox-option").click(function(){jQuery(this).toggleClass("checked");var e=jQuery(this).find("input");!1===e.prop("checked")?e.prop("checked",!0):e.prop("checked",!1)}),jQuery(".radio-option").click(function(){jQuery(this).closest("form").find(".radio-option").removeClass("checked"),jQuery(this).addClass("checked"),jQuery(this).find("input").prop("checked",!0)}),jQuery(".tabbed-content").each(function(){jQuery(this).append('<ul class="content"></ul>')}),jQuery(".tabs li").each(function(){var e=jQuery(this),t="";e.is(".tabs li:first-child")&&(t=' class="active"');var r=e.find(".tab-content").detach().wrap("<li"+t+"></li>").parent();e.closest(".tabbed-content").find(".content").append(r)}),jQuery(".tabs li").click(function(){jQuery(this).closest(".tabs").find("li").removeClass("active"),jQuery(this).addClass("active");var e=jQuery(this).index()+1;jQuery(this).closest(".tabbed-content").find(".content>li").removeClass("active"),jQuery(this).closest(".tabbed-content").find(".content>li:nth-of-type("+e+")").addClass("active")}),jQuery("nav").hasClass("fixed")||jQuery("nav").hasClass("absolute")?jQuery("body").addClass("nav-is-overlay"):(jQuery(".nav-container").css("min-height",jQuery("nav").outerHeight(!0)),jQuery(window).resize(function(){jQuery(".nav-container").css("min-height",jQuery("nav").outerHeight(!0))}),jQuery(window).width()>768&&jQuery(".parallax:first-child .background-image-holder").css("top",-jQuery("nav").outerHeight(!0)),jQuery(window).width()>768&&jQuery("section.fullscreen:first-child").css("height",jQuery(window).height()-jQuery("nav").outerHeight(!0))),jQuery("nav").hasClass("bg-dark")&&jQuery(".nav-container").addClass("bg-dark"),mr_nav=jQuery("body .nav-container nav:first"),mr_navOuterHeight=jQuery("body .nav-container nav:first").outerHeight(),window.addEventListener("scroll",updateNav,!1),jQuery(".menu > li > ul").each(function(){var e=jQuery(this).offset(),t=e.left+jQuery(this).outerWidth(!0);if(t>jQuery(window).width()&&!jQuery(this).hasClass("mega-menu"))jQuery(this).addClass("make-right");else if(t>jQuery(window).width()&&jQuery(this).hasClass("mega-menu")){var r=jQuery(window).width()-e.left,i=jQuery(this).outerWidth(!0)-r;jQuery(this).css("margin-left",-i)}}),jQuery(".mobile-toggle").click(function(){jQuery(".nav-bar").toggleClass("nav-open"),jQuery(this).toggleClass("active")}),jQuery(".menu li").click(function(e){e||(e=window.event),e.stopPropagation(),jQuery(this).find("ul").length?jQuery(this).toggleClass("toggle-sub"):jQuery(this).parents(".toggle-sub").removeClass("toggle-sub")}),jQuery(".menu li a").click(function(){if("#"===jQuery(this).attr("href")&&!jQuery(this).closest("li").find("ul").length)return!1}),jQuery(".module.widget-handle").click(function(){jQuery(this).toggleClass("toggle-widget-handle")}),jQuery(".instafeed").length&&wp_data.access_token&&wp_data.client_id&&(jQuery.fn.spectragram.accessData={accessToken:wp_data.access_token,clientID:wp_data.client_id},jQuery(".instafeed").each(function(){jQuery(this).children("ul").spectragram("getUserFeed",{query:jQuery(this).attr("data-user-name"),max:12})})),jQuery(".slider-all-controls").flexslider({}),jQuery(".map-holder").click(function(){jQuery(this).addClass("interact")}),jQuery(window).scroll(function(){jQuery(".map-holder.interact").length&&jQuery(".map-holder.interact").removeClass("interact")}),window.sr=new scrollReveal}),jQuery(window).load(function(){"use strict";mr_firstSectionHeight=jQuery(".main-container section:first-child").outerHeight(!0)});