
// create as many regular expressions here as you need:
var digitsOnly = /[1234567890]/g;
var floatOnly = /[0-9\.]/g;
var alphaOnly = /[A-Za-z]/g;
var AlphaNumericOnly = /[A-Za-z0-9\.]/g;

function restrictCharacters(myfield, e, restrictionType) {
    if (!e) var e = window.event
    if (e.keyCode) code = e.keyCode;
    else if (e.which) code = e.which;
    var character = String.fromCharCode(code);
    // if they pressed esc... remove focus from field...
    if (code == 27) {
        this.blur();
        return false;
    }
    // ignore if they are press other keys
    // strange because code: 39 is the down key AND ' key...
    // and DEL also equals .
    if (!e.ctrlKey && code != 9 && code != 8 && code != 36 && code != 37 && code != 38 && (code != 39 || (code == 39 && character == "'")) && code != 40) {
        if (character.match(restrictionType)) {
            return true;
        } else {
            return false;
        }
    }
}

/*
    By Osvaldas Valutis, www.osvaldas.info
    Available for use under the MIT License
*/

$('input.text-box').floatlabel({
    labelClass: 'label'
});


'use strict';

;( function ( document, window, index )
{
    var inputs = document.querySelectorAll( '.inputfile' );
    Array.prototype.forEach.call( inputs, function( input )
    {
        var label    = input.nextElementSibling,
            labelVal = label.innerHTML;

        input.addEventListener( 'change', function( e )
        {
            var fileName = '';
            if( this.files && this.files.length > 1 )
                fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
            else
                fileName = e.target.value.split( '\\' ).pop();

            if( fileName )
                label.querySelector( 'span' ).innerHTML = fileName;
            else
                label.innerHTML = labelVal;
        });

        // Firefox bug fix
        input.addEventListener( 'focus', function(){ input.classList.add( 'has-focus' ); });
        input.addEventListener( 'blur', function(){ input.classList.remove( 'has-focus' ); });
    });
}( document, window, 0 ));

$(document).ready(function() {

    $('#onboardingForm').submit(function() {

        var $check_interested = $(this).find("input[name='interested[]']:checked");
        var $radio_experience = $(this).find("input[name='experience']:checked");

        !$check_interested.length ? $('.check-error').css('display',"block") :  $('.check-error').css('display',"none")
        !$radio_experience.length ? $('.radio-error').css('display',"block") :  $('.radio-error').css('display',"none")
        
        if(!$radio_experience.length || !$check_interested.length){

            return false; // The form will *not* submit

        }
    });
});




  // $("input[name='interested[]']").change(function() {
  //       if($(this).is(":checked")) {

  //           alert("You have clicked it..");
  //       }
  //   });
