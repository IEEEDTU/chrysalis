;(function($) {

"use strict";

var $body = $('body');
// var $head = $('head');
// var $mainWrapper = $('#main-wrapper');

$(document).ready(function () {

	/* -------------------------------------------------------------------------
    SELECT BOX 
  ------------------------------------------------------------------------- */
  $.fn.SelectBox = function() {

    var self = $(this),
      select = self.find('select');
    self.prepend('<ul class="select-clone custom-list"></ul>');

    var placeholder = select.data('placeholder') ? select.data('placeholder') : select.find('option:eq(0)').text(),
      clone = self.find('.select-clone');
    self.prepend('<input class="value-holder" type="text" disabled="disabled" placeholder="' + placeholder + '">');
    var value_holder = self.find('.value-holder');

    // CREATE CLONE LIST
    select.find('option').each(function() {
      if ($(this).attr('value')) {
        clone.append('<li data-value="' + $(this).val() + '">' + $(this).text() + '</li>');
      }
    });

    // TOGGLE LIST
    self.click(function() {
      clone.slideToggle(100);
      self.toggleClass('active');
    });

    // CLICK
    clone.find('li').click(function() {

      value_holder.val($(this).text());
      select.find('option[value="' + $(this).attr('data-value') + '"]').attr('selected', 'selected');

      // IF LIST OF LINKS
      if (self.hasClass('links')) {
        window.location.href = select.val();
      }

    });

    // HIDE LIST
    self.bind('clickoutside', function(event) {
      clone.slideUp(100);
    });

    // LIST OF LINKS
    if (self.hasClass('links')) {
      select.change(function() {
        window.location.href = select.val();
      });
    }

  };

  /* -------------------------------------------------------------------------
    DATEPICKER 
  ------------------------------------------------------------------------- */
  $('.calendar').each(function() {

    var input = $(this).find('input'),
      dateformat = input.data('dateformat') ? input.data('dateformat') : 'm/d/y',
      icon = $(this).find('.fa'),
      widget = input.datepicker('widget');

    input.datepicker({
      dateFormat: dateformat,
      minDate: 0,
      beforeShow: function() {
        input.addClass('active');
      },
      onClose: function() {
        input.removeClass('active');
        // TRANSPLANT WIDGET BACK TO THE END OF BODY IF NEEDED
        widget.hide();
        if (!widget.parent().is('body')) {
          widget.detach().appendTo($('body'));
        }
      }
    });
    icon.click(function() {
      input.focus();
    });

  });

  // SELECT BOX
  $( '.select-box' ).each(function(){
    $(this).SelectBox();
  });

	$("#clients-slider").owlCarousel({
		autoPlay: true
	});

	//jQuery for page scrolling feature - requires jQuery Easing plugin
	$(function() {
    $('nav ul li a, .scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 69
        }, 1200, 'easeInOutExpo');
        event.preventDefault();
    });
	});

  // NAVBAR TOGGLE
  $( '.toggleMenu' ).click(function(){
    $('.navigation nav').slideToggle(300);
  });

  $(window).resize(function(){
    if ($(window).width() > 768) {
      $('.navigation nav').removeAttr( 'style' );
    }
  });


});


// Mediaqueries
// ---------------------------------------------------------
// var XS = window.matchMedia('(max-width:767px)');
// var SM = window.matchMedia('(min-width:768px) and (max-width:991px)');
// var MD = window.matchMedia('(min-width:992px) and (max-width:1199px)');
// var LG = window.matchMedia('(min-width:1200px)');
// var XXS = window.matchMedia('(max-width:480px)');
// var SM_XS = window.matchMedia('(max-width:991px)');
// var LG_MD = window.matchMedia('(min-width:992px)');



// Touch
// ---------------------------------------------------------
var dragging = false;

$body.on('touchmove', function() {
	dragging = true;
});

$body.on('touchstart', function() {
	dragging = false;
});



}(jQuery));
