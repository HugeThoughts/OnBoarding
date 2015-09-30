$(document).ready(function() {

    $('#onboardingForm').submit(function() {


        var $check_interested = $(this).find("input[name='interested[]']:checked");
        var $radio_experience = $(this).find("input[name='experience']:checked");

        !$check_interested.length ? $('.check-error').css('display',"block") :  $('.check-error').css('display',"none")
        !$radio_experience.length ? $('.radio-error').css('display',"block") :  $('.radio-error').css('display',"none")
        
        if(!$radio_experience.length || !$check_interested.length){

            return false; // The form will *not* submit

        }


        if(document.getElementById("file-2").value == "" && $('input[name=experience]:checked').val()=='Fresher') {
            
            $('.upload-error').css('display','block');
            return false;
        }
        else
        {
             $('.upload-error').css('display','hidden');
        }

        if($('input[name=experience]:checked').val()!='Fresher' && $('.github-profile').val()=="" && document.getElementById("file-2").value == "" ) {
            $('.upload-error').text('You need to enter your GitHub Profile OR attach your resume');
            $('.upload-error').css('display','block');
            return false;
        }
        else
        {
             $('.upload-error').css('display','hidden');
        }

        var GitHubProfile = $('.github-profile').val();
        var GitHubRegex = new RegExp(/^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_]{1,25}$/igm);
        
        if (GitHubProfile != '' && $('input[name=experience]:checked').val()!='Fresher' ) {
        if(GitHubRegex.test(GitHubProfile)){ 
            return true;
            }
            else
            {

            $('.upload-error').text('Make sure to enter VALID GitHub Profile URL');
            $('.upload-error').css('display','block');
            return false;
            }
        }

        // 

    });

        $(".github-profile").hide();
        $(".experienced-person").hide();

        var file = document.getElementById("file-2");

        file.onchange = function() {

            document.getElementById('uploaded-file-name').innerText = document.getElementById("file-2").files[0].name;

            document.getElementById('experienced-upload').innerText = "Change Resume";
        };


});

function githubProfile(value){
if(value=='show')
{       $('.upload-error').css('display',"none")
        $(".github-profile").show();
        $(".box").hide();
        $(".experienced-person").show();

}
 
else
{       $(".github-profile").hide();
        $(".box").show();
        $(".experienced-person").hide();
        

}

}


    $.fn.scrollView = function() {
        return this.each(function() {
            $('html, body').animate({
                scrollTop: $(this).offset().top
            }, 1000);
        });
    }


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


( function ( document, window, index )
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




