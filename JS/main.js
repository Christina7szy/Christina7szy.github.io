var posLeft = "-150px";
var audio = document.getElementById("myAudio"); 
var elem1 = document.querySelector('.record');
var elem1 = document.querySelector('.record');
var play = false;
var button2Pressed = false;
var button3Pressed = false;

// wait till the document is ready
jQuery(function($) {


$( ".record" ).draggable();
$( "#draggable" ).draggable();
$(".album").draggable();
$(".childContainer1").draggable();
//$(".masterContainer2").draggable();
document.ondrag = function() {
    
    var elem1 = document.querySelector('.record');
    var elem2 = document.querySelector('.vinyl2');
    var elem3 = document.querySelector('.pin');
    window.getComputedStyle(elem1).left

    posLeft = parseInt(window.getComputedStyle(elem1).left);
    posTop = parseInt(window.getComputedStyle(elem1).top);
  //  console.log(posLeft + ", " + posTop);
    
    if((posLeft > 230)&&(posLeft<350)&&(posTop>258)&&(posTop<348)) {
        audio.play();
        elem1.classList.add("rotating");
        elem2.classList.add("rotating");
        elem3.classList.add("rotate"); 
        $(".handle").css({
                transform: 'rotate(' + '5deg)'
            });
        play = true;
        button2Pressed = true;
    //    console.log("test");
//         window.scroll({
//         top: 750, 
//         left: 0, 
//         behavior: 'smooth' 
//        
//    }); 
        ScrollDown();
    }
        else {
        audio.pause();
        $( ".record" ).removeClass( "rotating" );
        $( ".vinyl2" ).removeClass( "rotating" );    
        play = false;
        $(".handle").css({
                transform: 'rotate(' + '-20deg)'
            });    
//         $(".pin").css({
//                transform: 'rotate(' + '40deg)'
//            });
    }
      
      if (button3Pressed = true){
            $(".button3").css({"background-image" : "url(CSS/Media/Button3_Pressed.png)"});
        }
      else if (button3Pressed = false){
            $(".button3").css({"background-image" : "url(CSS/Media/Button3.png)"});
        }
    
//   if (posTop > 100){
//        console.log("test");
//         window.scroll({
//         top: 670, 
//         left: 0, 
//         behavior: 'smooth' 
//        });
//        }
}
   $(".button1").on('click', function(event){
    var elem1 = document.querySelector('.record');
    var elem2 = document.querySelector('.vinyl2');
    var elem3 = document.querySelector('.pin');   
         if (play == true) {
           audio.pause(); 
           play = false;
            $( ".record" ).removeClass( "rotating" );
            $( ".vinyl2" ).removeClass( "rotating" ); 
            $( ".pin" ).removeClass( "rotateback" );
            elem3.classList.add("rotateback");  
            ScrollDown();
//             $(".pin").css({
//                transform: 'rotate(' + '0deg)'
//                 
//            });  
        }
        else {
           audio.play(); 
           play = true; 
//            $(".pin").css({
//                transform: 'rotate(' + '40deg)'
//            });
           
           elem1.classList.add("rotating");
           elem2.classList.add("rotating"); 
           $( ".pin" ).removeClass( "rotateback" ); 
           elem3.classList.add("rotate");    
        }
          });

   $(".button2").on('click', function(event){
        var vid = document.getElementById("myAudio");
     //   console.log("click");
        vid.playbackRate=0.5;
        button2Pressed = true;
        button3Pressed = false;
       if (button2Pressed == true){
            $(".button2").css({"background-image" : "url(CSS/Media/Button2_Pressed.png)"});
        }
      else if (button3Pressed == false){
            $(".button2").css({"background-image" : "url(CSS/Media/Button2.png)"});
        }
       if (button3Pressed == true){
            $(".button3").css({"background-image" : "url(CSS/Media/Button3_Pressed.png)"});
        }
        else if (button3Pressed == false){
            $(".button3").css({"background-image" : "url(CSS/Media/Button3.png)"});
        }
    
        
    });
    
   $(".button3").on('click', function(event){
        var vid = document.getElementById("myAudio");
        vid.playbackRate=1;
        console.log(button3Pressed);
        button3Pressed = true;
        button2Pressed = false;
        if (button2Pressed == true){
            $(".button2").css({"background-image" : "url(CSS/Media/Button2_Pressed.png)"});
        }
        else if (button2Pressed == false){
            $(".button2").css({"background-image" : "url(CSS/Media/Button2.png)"});
        } 
        if (button3Pressed == true){
            $(".button3").css({"background-image" : "url(CSS/Media/Button3_Pressed.png)"});
        }
        else if (button3Pressed == false){
            $(".button3").css({"background-image" : "url(CSS/Media/Button3.png)"});
        }
    
    });

 
      var play = document.getElementById("amount");
    $( "#slider-vertical" ).slider({
      orientation: "vertical",
      range: "min",
      min: 0,
      max: 100,
      value: 60,
      slide: function( event, ui ) {
        $( "#amount" ).val( ui.value );
         var playball = parseInt(document.getElementsByName("searchtext")[0].value); 
        //   console.log(playball);
         var vid = document.getElementById("myAudio");
         vid.volume = (playball/100);
        //   console.log(vid.volume);
      }
    });
    $( "#amount" ).val( $( "#slider-vertical" ).slider( "value" ) );
       
       var play = parseInt(document.getElementsByName("searchtext")[0].value);
   var vid = document.getElementById("myAudio");
     vid.volume = (play/100);
      
 function ScrollDown(){ 
    setTimeout(ScrollDown2, 2000); 
 }
function ScrollDown2(){  
     //    console.log("Hi");
         window.scroll({
         top: 720, 
         left: 0, 
         behavior: 'smooth'
 });
}  
  }); 


   



