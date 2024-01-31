/*
	Stellar by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$main = $('#main');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Nav.
		var $nav = $('#nav');

		if ($nav.length > 0) {

			// Shrink effect.
				$main
					.scrollex({
						mode: 'top',
						enter: function() {
							$nav.addClass('alt');
						},
						leave: function() {
							$nav.removeClass('alt');
						},
					});

			// Links.
				var $nav_a = $nav.find('a');

				$nav_a
					.scrolly({
						speed: 1000,
						offset: function() { return $nav.height(); }
					})
					.on('click', function() {

						var $this = $(this);

						// External link? Bail.
							if ($this.attr('href').charAt(0) != '#')
								return;

						// Deactivate all links.
							$nav_a
								.removeClass('active')
								.removeClass('active-locked');

						// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
							$this
								.addClass('active')
								.addClass('active-locked');

					})
					.each(function() {

						var	$this = $(this),
							id = $this.attr('href'),
							$section = $(id);

						// No section for this link? Bail.
							if ($section.length < 1)
								return;

						// Scrollex.
							$section.scrollex({
								mode: 'middle',
								initialize: function() {

									// Deactivate section.
										if (browser.canUse('transition'))
											$section.addClass('inactive');

								},
								enter: function() {

									// Activate section.
										$section.removeClass('inactive');

									// No locked links? Deactivate all links and activate this section's one.
										if ($nav_a.filter('.active-locked').length == 0) {

											$nav_a.removeClass('active');
											$this.addClass('active');

										}

									// Otherwise, if this section's link is the one that's locked, unlock it.
										else if ($this.hasClass('active-locked'))
											$this.removeClass('active-locked');

								}
							});

					});

		}

	// Scrolly.
		$('.scrolly').scrolly({
			speed: 1000
		});



// // Sketchfab Viewer API: Annotation hit also picks mesh
// const version = '1.10.1';
// const uid = '205ebdec7304449bb8d2effbfe272ec8';
// const iframe = document.getElementById('api-frame');
// const client = new window.Sketchfab(version, iframe);
// let api;

// const error = err => console.error('Sketchfab API error:', err);

// var audioSample1;
// var audioPlaying1;

// function toggleAudio1(doPause, doPlay) {

//   if (!audioSample1) return;
//   if (doPause) audioSample1.pause();
//   else if (doPlay) audioSample1.play();
// }


// var audioSample2;
// var audioPlaying2;

// function toggleAudio2(doPause, doPlay) {

//   if (!audioSample2) return;
//   if (doPause) audioSample2.pause();
//   else if (doPlay) audioSample2.play();
// }

// var audioSample3;
// var audioPlaying3;

// function toggleAudio3(doPause, doPlay) {

//   if (!audioSample3) return;
//   if (doPause) audioSample3.pause();
//   else if (doPlay) audioSample3.play();
// }

// var audioSample4;
// var audioPlaying4;

// function toggleAudio4(doPause, doPlay) {

//   if (!audioSample4) return;
//   if (doPause) audioSample4.pause();
//   else if (doPlay) audioSample4.play();
// }


// function skfbStart() {
//   const success = apiClient => {
//     api = apiClient;
//     api.start();
//     api.addEventListener('viewerready', () => {

//       window.console.log('viewer ready');

//       api.addEventListener('annotationSelect', function(index) {

//         window.console.log('Selected annotation', index);
//         console.log("select " + index);
//         if (index == -1) {
//         // pause sounds
//           toggleAudio1(true, false);
//           toggleAudio2(true, false);
//         }
//         else if (index == 1) {
//         // play sound 1
//           toggleAudio1(true, false);
//           toggleAudio2(false, true);
//         } else {
//         // play sound 2
//           toggleAudio1(false, true);
//           toggleAudio2(true, false);
//         }
//       });
//     });
//   };

//   client.init(uid, {
//     annotation: [1-7], // Usage: Setting to [1 – 100] will automatically load that annotation when the viewer starts.
//     annotations_visible: 1, // Usage: Setting to 0 will hide annotations by default.
//     autospin: 0, // Usage: Setting to any other number will cause the model to automatically spin around the z-axis after loading.
//     autostart: 1, // Usage: Setting to 1 will make the model load immediately once the page is ready, rather than waiting for a user to click the Play button.
//     cardboard: 0, // Usage: Start the viewer in stereoscopic VR Mode built for Google Cardboard and similar devices.
//     camera: 1, // Usage: Setting to 0 will skip the initial animation that occurs when a model is loaded, and immediately show the model in its default position.
//     preload: 1, // Usage: Setting to 1 will force all resources (textures) to download before the scene is displayed.
//     ui_stop: 0, // Usage: Setting to 0 will hide the "Disable Viewer" button in the top right so that users cannot stop the 3D render once it is started.
//     transparent: 0, // Usage: Setting to 1 will make the model's background transparent
//     ui_animations: 0, // Usage: Setting to 0 will hide the animation menu and timeline.
//     ui_annotations: 0, // Usage: Setting to 0 will hide the Annotation menu.
//     ui_controls: 1, // Usage: Setting to 0 will hide all the viewer controls at the bottom of the viewer (Help, Settings, Inspector, VR, Fullscreen, Annotations, and Animations).
//     ui_fullscreen: 1, // Usage: Setting to 0 will hide the Fullscreen button.
//     ui_general_controls: 1, // Usage: Setting to 0 will hide main control buttons in the bottom right of the viewer (Help, Settings, Inspector, VR, Fullscreen).
//     ui_help: 0, // Usage: Setting to 0 will hide the Help button.
//     ui_hint: 1, // Usage: Setting to 0 will always hide the viewer hint animation ("click & hold to rotate"). Setting to 1 will show the hint the first time per browser session (using a cookie). Setting to 2 will always show the hint.
//     ui_infos: 0, // Usage: Setting to 0 will hide the model info bar at the top of the viewer.
//     ui_inspector: 0, // Usage: Setting to 0 will hide the inspector button.
//     ui_settings: 0, // Usage: Setting to 0 will hide the Settings button.
//     ui_vr: 0, // Usage: Setting to 0 will hide the View in VR button.
//     ui_ar: 1, // Usage: Setting to 0 will hide the View in AR button.
//     ui_watermark_link: 0, // Usage: Setting to 0 remove the link from the Sketchfab logo watermark.
//     ui_color: '00a8c0', // Usage: Setting to a hexidecimal color code (without the #) or a HTML color name will change the color of the viewer loading bar.
//     ui_watermark: 0, // Usage: Setting to 0 remove the Sketchfab logo watermark.

//     success: success,
//     error: error,
//     version: version
//   });

// }


// document.addEventListener("DOMContentLoaded", function(event) {

//   // sound can be paused by user, browser, only way to know is to listen 
//   // to the events

//   audioSample1 = document.getElementById('audio1');
//   audioSample1.addEventListener("playing", function(event) {
//     audioPlaying1 = true;
//   });
//   audioSample1.addEventListener("pause", function(event) {
//     audioPlaying1 = false;
//   });

//   audioSample2 = document.getElementById('audio2');
//   audioSample2.addEventListener("playing", function(event) {
//     audioPlaying2 = true;
//   });
//   audioSample2.addEventListener("pause", function(event) {
//     audioPlaying2 = false;
//   });

//   audioSample3 = document.getElementById('audio3');
//   audioSample3.addEventListener("playing", function(event) {
//     audioPlaying3 = true;
//   });
//   audioSample3.addEventListener("pause", function(event) {
//     audioPlaying3 = false;
//   });
//   skfbStart();
// });
var version = "1.11.0";
var urlid = "5ba193e012a84dae822ff3c2ea7a7959";

// this array will hold the audio samples
let audiosamples = []

// Add your samples to the array. 
audiosamples.push(document.getElementById('audio1'))
audiosamples.push(document.getElementById('audio2'))
audiosamples.push(document.getElementById('audio3'))
audiosamples.push(document.getElementById('audio4'))
audiosamples.push(document.getElementById('audio5'))
audiosamples.push(document.getElementById('audio6'))
audiosamples.push(document.getElementById('audio7'))
audiosamples.push(document.getElementById('audio8'))
audiosamples.push(document.getElementById('audio9'))

// This function loops over each sample in the array and pauses it, unless
// the sampleID matches the index of the sample in the array
function toggleAudio(sampleID) {
  for (let n = 0; n < audiosamples.length; n++) {
  	if (sampleID === n) {
    	audiosamples[n].play()
    } else {
      audiosamples[n].pause()
    }
  }
}

function actionSkfb() {
  // initialize
  var iframe = document.getElementById("api-frame");
  var client = new window.Sketchfab(version, iframe);

  var error = function () {
    console.error("Sketchfab API error");
  };

  var success = function (api) {
    api.start(function () {    
      api.addEventListener("viewerready", function () {
        // Toggle audio when selecting an annotation.
        // ATTENTION: annotation 1 has the index 0. This is a bit confusing.
        api.addEventListener('annotationSelect', function(index) {
          console.log('Selected annotation', index);
          toggleAudio(index)
        });        
      });
    });
  };
  
  client.init(urlid, {
    success: success,
    error: error,
    ui_stop: 0,
    ui_inspector: 0,
    ui_infos: 0, 
    ui_controls: 0, 
    scrollwheel: 1,
    ui_watermark: 0
  });
}
actionSkfb();
})(jQuery);