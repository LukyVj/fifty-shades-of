// Fifty shades of #000000
// Because fifty shades of grey is mainstream.
// And here is the basic function used : http://codepen.io/LukyVj/pen/0a173451d91b8f1f84a2f799f77f3145

// This demo use _select, a project of TimPietrusky
// http://timpietrusky.com/_select/

$(function(){

  // FiftyShadesOf jquery function.
  // Just because Fifty shades of grey is mainstream.
  //
  // Codes are mostly from http://jsbin.com/oqaza4/2/edit?html,js,output
  // & http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
  setTimeout(function(){
    $('#twitter-widget-0').css({
      'transform':'scale(.8)',
      'width':'82px',
      'margin-top':'.5em'});
  }, 400);


  // Select by @TimPietrusky 
  // https://github.com/TimPietrusky/_select
  function _select(a){var b=document,c;a="undefined"===typeof a[0]?a:a[0];try{a.select();try{"undefined"===typeof a.dataset.mouseup&&(a.dataset.mouseup="true",a.addEventListener("mouseup",function(a){a.preventDefault()},!1))}catch(d){}}catch(e){window.getSelection?(c=window.getSelection(),b=b.createRange(),b.selectNodeContents(a),c.removeAllRanges(),c.addRange(b)):b.body.createTextRange&&(b=b.body.createTextRange(),b.moveToElementText(a),b.select())}};


  function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null; 
  }
  function rgb2hex(rgb){
    rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
      return (rgb && rgb.length === 4) ? "#" +
      ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
      ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
      ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
    }


    function fiftyShadesOf($hex,$where){


      function decode($i){
        var decoded =  hexToRgb($i).r+','+ hexToRgb($i).g+','+ hexToRgb($i).b; 
        return 'rgb('+decoded+')';
      } 

      var r = decode($hex).replace('rgb(','').split(',')[0]%256;
        var g = decode($hex).replace('rgb(','').split(',')[1]%256;
          var b = decode($hex).replace('rgb(','').replace(')','').split(',')[2]%256;

          var str="";
          for(var i=0;i<50;i++)
          {
            r+=4;
            g+=4;
            b+=4;
            str+="<div class='c' id='shade_"+(i+1)+"' style='background-color:rgb("+r+","+g+","+b+")'></div>"; 
          }
          $($where).html(str);
        }



        function reveal($i){




          var $twitter = $('a[href*="twitter"], a[href*="github"]');
          var $sample = $('.colors .sample');
          var $hex = $('.colors .hex');
          var $rgb = $('.colors .rgb'); 

          $twitter.css('color', $i)
          $sample.css('background-color', $i)
          $rgb.empty().append(' '+$i)
          $hex.empty().append(' '+rgb2hex($i)) 
        }

        function giveColor(){
          $('.c').on('mouseover', function(){ 
            reveal($(this).css('background-color'))
          })
        }
  // Place the color first, then the zone to apply it
  fiftyShadesOf('#000000','.canvas')


  var colors = $('span[contenteditable]')
  var evt = 'keyup';

  colors.empty().append('000000')

  colors.on(evt, function(){
    var $val = $(this).text();
    fiftyShadesOf($val,'.canvas')
    giveColor()
  })
  giveColor()

  function expand(){
    $('.c').on('click', function(){
      if($(this).hasClass('expanded')){
        $(this).removeClass('expanded')
        $('*').removeClass('bigger')
      }
      else{ 
        $(this).  addClass('expanded').removeClass('bigger');
        $('.c').not($(this)).removeClass('expanded').addClass('bigger')
      }
    });
  }
  expand()


  var p = $('.colors .hex, .colors .rgb');
  p.css({ cursor: 'pointer' });

  p.on('click',function(e) {
    var range = window.getSelection() || document.getSelection() || document.selection.createRange();
    var word = $.trim(range.toString());
    _select(this)
    if(word != '') {
      prompt('copy:',word);
    }
    e.stopPropagation();


  });


  function urlToApp(){
    if (window.location.href.indexOf("#") > -1) {
      var colors = $('span[contenteditable]')
      var str= window.location.href;
      var str = str.split("#")[1];
      colors.empty().append(str)
      fiftyShadesOf(str, '.canvas')
      giveColor();
      expand();
    }

  }

  function brightOrDark($el){
    var c = $($el);
    var c = c.css('background-color');
    var cm = rgb2hex(c);
    var ct = cm.substring(1);      // strip #
    var rgb = parseInt(ct, 16);   // convert rrggbb to decimal
    var r = (rgb >> 16) & 0xff;  // extract red
    var g = (rgb >>  8) & 0xff;  // extract green
    var b = (rgb >>  0) & 0xff;  // extract blue

    var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

    if (luma > 40) {
     $('header, footer').attr('style','color: #000 !important;text-shadow: 0 1px 0 rgba(255,255,255,.4)!important')
   }
   else{
    $('header, footer').attr('style','color: #fff !important;text-shadow: 0 1px 0 rgba(0,0,0,.6)!important')
  }
}

urlToApp();
setTimeout(function(){
  brightOrDark('.c:nth-child(2)');
}, 50)
$('*').on('keyup', function(){
  brightOrDark('.c:nth-child(2)');
});
$('*').on('click', function(){
  brightOrDark('.c:nth-child(2)');
});


function toggleHelp(){
  var trig = $('a[data-toggle*="help"]');
  trig.on('click',  function(e){
    e.preventDefault();

    if($('.helpzone').hasClass('off-screen')){
      $('.helpzone').removeClass('off-screen').addClass('on-screen')
    }
    else{
       $('.helpzone').removeClass('on-screen').addClass('off-screen')
    }
  });
}

toggleHelp()

})