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


  function fiftyShadesOf($hex,$where){

    function hexToRgb(hex) {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null; 
    }

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

        function rgb2hex(rgb){
          rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
            return (rgb && rgb.length === 4) ? "#" +
            ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
            ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
            ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
          }


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
    range.collapse();
    e.stopPropagation();


  });


  function urlToApp(){
    var colors = $('span[contenteditable]')
    var str= window.location.href;
    var str = str.split("#")[1];
    colors.empty().append(str)
    fiftyShadesOf(str, '.canvas')
    giveColor();
    expand();
  }

  urlToApp();


})