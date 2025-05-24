// Video Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
  // Initialize the Owl Carousel for videos with only 1 item visible
  $('.video-carousel').owlCarousel({
    items: 1,
    loop: true,
    margin: 10,
    nav: true,
    navText: [
      '<i class="icon-arrow-left"></i>',
      '<i class="icon-arrow-right"></i>'
    ],
    dots: true,
    autoplay: false,
    onInitialized: checkVideoOrientation,
    onTranslated: handleVideoChange
  });

  // Check if videos are portrait or landscape
  function checkVideoOrientation() {
    const videos = document.querySelectorAll('.carousel-video');
    
    videos.forEach(video => {
      video.addEventListener('loadedmetadata', function() {
        const container = this.closest('.video-player-container');
        if (this.videoHeight > this.videoWidth) {
          container.classList.add('portrait');
        }
      });
    });
  }

  // Handle video change in carousel
  function handleVideoChange(event) {
    // Pause all videos
    const videos = document.querySelectorAll('.carousel-video');
    videos.forEach(video => {
      video.pause();
    });
  }

  // Manage video playing state
  const allVideos = document.querySelectorAll('.carousel-video');
  allVideos.forEach(video => {
    // Pause other videos when one starts playing
    video.addEventListener('play', function() {
      allVideos.forEach(otherVideo => {
        if (otherVideo !== this) {
          otherVideo.pause();
        }
      });
    });
  });

  // Pause videos when scrolling out of view
  window.addEventListener('scroll', function() {
    const videoSection = document.getElementById('student-testimonials');
    if (videoSection) {
      const rect = videoSection.getBoundingClientRect();
      const isVisible = (
        rect.top >= -videoSection.offsetHeight &&
        rect.bottom <= window.innerHeight + videoSection.offsetHeight
      );
      
      if (!isVisible) {
        const videos = document.querySelectorAll('.carousel-video');
        videos.forEach(video => {
          if (!video.paused) {
            video.pause();
          }
        });
      }
    }
  });
});
