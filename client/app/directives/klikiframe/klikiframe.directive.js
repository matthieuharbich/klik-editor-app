'use strict';

angular.module('msrsApp')
  .directive('klikiframe', function ($timeout, $http, ngDialog) {
    return {
      // templateUrl: 'app/directives/klikiframe/klikiframe.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
        $timeout(function(){

          // element.on('timeupdate', function(){
          //  console.log(element[0].currentTime) ;
          // })
            var klik = new Klik('.'+attrs.class);
            var polyLayer = klik.addGraphicLayer('reds');
            var eventLayer = klik.addLayer();
            eventLayer.stylise({
                'background-color': '#EBEBEB',
                'opacity':0.75,
                'position':'fixed',
                'width': '30%',
                'left': '-30%',
                'border-top-right-radius': 6,
                'border-bottom-right-radius': 6
            })
            eventLayer.sideBox();
            polyLayer.stylise({
              'background-color': '',
              'opacity': 0.3
            })
            polyLayer.adaptToVideo();
            $http({
              method: 'GET',
              url: 'api/projects/' + scope.videoId
            }).success(function(project){        

               
               scope.iframeProject = project;
               polyLayer.dynamise(project.klikData)

             
            })
            // polyLayer.dynamise(attrs.klikdata)
            iframeHeight();
            $(window).on('resize', function(){
              polyLayer.adaptToVideo();
              iframeHeight();
              console.log($(window).innerHeight())
            })
            
            function iframeHeight(){
              var windowHeight = $(window).innerHeight();      
              element.css('height',windowHeight );
            }
            var video = klik.getVideoElement();
            var videoDuration = video.duration;
           


              
            var controls = '<button class="klikShare btn"><span class="glyphicon glyphicon-send"></button><div class="klikControls klikControlsUp"><input type="range" class="klik-seek-bar" min=1 max="100" step="1" value="0"><button class="togglePlay btn"><span class="glyphicon glyphicon-pause" aria-hidden="true"></span></button><div class="soundContainer"><button class="klikSound btn"><span class="glyphicon glyphicon-volume-down" aria-hidden="true"></span></button><input class="seek-volume" min="0" max="1" step="0.1" type="range"></div><div class="klikTime">00:00 / 00:00</div><button class="klikFS btn"><span class="glyphicon glyphicon-fullscreen" aria-hidden="true"></span></button><a class="logoControler" target="blank" href="http://www.messieurs.ch"><img src="assets/images/msrsLogo.png"></a></div>';
            klik.setControls(controls, function(){             

              klik.seekBar('.klik-seek-bar');
              klik.seekVolume('.seek-volume');

              $('.klikFS').on('click', function(){
                klik.toggleFullscreen();
              })          
                    

              $(video).on('timeupdate', function(){
                
                scope.$apply(function(){
                  scope.videoCurrentTime = video.currentTime;

                  function getTimeMMSS(seconds){
                      var seconds = seconds;
                      // multiply by 1000 because Date() requires miliseconds
                      var date = new Date(seconds * 1000);
                      var hh = date.getUTCHours();
                      var mm = date.getUTCMinutes();
                      var ss = date.getSeconds();
                      // If you were building a timestamp instead of a duration, you would uncomment the following line to get 12-hour (not 24) time
                      // if (hh > 12) {hh = hh % 12;}
                      // These lines ensure you have two-digits
                      if (hh < 10) {hh = "0"+hh;}
                      if (mm < 10) {mm = "0"+mm;}
                      if (ss < 10) {ss = "0"+ss;}
                      // This formats your string to HH:MM:SS
                      var t = mm+":"+ss;
                      return t;
                      // document.write(t);
                  }
                             
                  $('.klikTime').html(''+getTimeMMSS(video.currentTime)+' / '+getTimeMMSS(video.duration)+'')
                
                })
              })

              $('.soundContainer').on('mouseenter', function(){

                $('.seek-volume').toggle('slide');

              });

              $('.soundContainer').on('mouseleave', function(){
                $('.seek-volume').toggle( "slide");

              });

              if (video.muted) {
                $('.klikSound span').removeClass('glyphicon-volume-down').removeClass('glyphicon-volume-up').addClass('glyphicon-volume-off');
              }else{
                if ($('.seek-volume').val()>50) {
                  $('.klikSound span').removeClass('glyphicon-volume-off').removeClass('glyphicon-volume-down').addClass('glyphicon-volume-up');

                }else{
                  $('.klikSound span').removeClass('glyphicon-volume-off').removeClass('glyphicon-volume-up').addClass('glyphicon-volume-down');

                };
              };

              $('.seek-volume').on('change', function(){
                if($(this).val() == 0){
                    $('.klikSound span').removeClass('glyphicon-volume-down').removeClass('glyphicon-volume-up').addClass('glyphicon-volume-off');
                }else{
                  if(video.muted){
                    klik.toggleMute;
                  }
                  if ($(this).val() <= 0.5) {
                    $('.klikSound span').removeClass('glyphicon-volume-off').removeClass('glyphicon-volume-up').addClass('glyphicon-volume-down');

                  }else{
                    $('.klikSound span').removeClass('glyphicon-volume-off').removeClass('glyphicon-volume-down').addClass('glyphicon-volume-up');

                  };
                }
              })

              $('.klikSound').on('click', function(){

                 if (!video.muted) {
                    $('.klikSound span').removeClass('glyphicon-volume-down').removeClass('glyphicon-volume-up').addClass('glyphicon-volume-off');
                    
                  }else{
                    
                      $('.klikSound span').removeClass('glyphicon-volume-off').removeClass('glyphicon-volume-down').addClass('glyphicon-volume-up');

                  };
                  klik.toggleMute();
              })

              if (video.paused) {
                $('.togglePlay span').removeClass('glyphicon-pause').addClass('glyphicon-play');

              }else{
                $('.togglePlay span').removeClass('glyphicon-play').addClass('glyphicon-pause');

              };

              $('.togglePlay').on('click', function(){
                 if (video.paused) {
                    $(this).children('span').removeClass('glyphicon-play').addClass('glyphicon-pause');
                    $('.klikShare').fadeOut();
                 }else{
                    $(this).children('span').removeClass('glyphicon-pause').addClass('glyphicon-play');
                    $('.klikShare').fadeIn();
                 };
                
              })

              $('.klikShare').on('click', function(){
                  if (document.fullscreenElement &&    
                      document.mozFullScreenElement && document.webkitFullscreenElement && document.msFullscreenElement ) {
                      if (document.exitFullscreen) {
                            document.exitFullscreen();
                       } else if (document.msExitFullscreen) {
                            document.msExitFullscreen();
                       } else if (document.mozCancelFullScreen) {
                            document.mozCancelFullScreen();
                       } else if (document.webkitExitFullscreen) {
                            document.webkitExitFullscreen();
                       }
                  };
                  ngDialog.open({
                    template: 'app/modal/iframeLink.html',
                    className: 'ngdialog-theme-default iframeLink',
                    data: scope,
                    controller: 'VideoCtrl',
                    closeByEscape: true,
                    closeByDocument: true,
                    showClose: true
                  });
              })

  

              $('.klikControls').hover(function(){
            // if (document.fullscreenElement ||    
            //           document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement ){
                        // alert('ok');
                    $('.klikControls').switchClass('klikControlsDown', 'klikControlsUp');
                  // }
                 

              }, function(){
                     // if (document.fullscreenElement ||    
                     //  document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement ){
                        // alert('ok');
                    $('.klikControls').switchClass('klikControlsUp', 'klikControlsDown');
                  // }
                  
              });

              $('.togglePlay').on('click', function(){
                klik.togglePlayPause();
                console.log('yeah')
              })
              });


              
              
            });
            
      
        
      	
      }
    };
  });