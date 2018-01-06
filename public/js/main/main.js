function registerEventListeners(){
  var hamburger = document.getElementById('hamburger');
  var lastWindowWidth = window.innerWidth;
  var headerContainer = document.getElementById('header-container'),
      mobileNavContainer = document.getElementById('mobile-nav-container');

  window.addEventListener('resize', function(e){
    if(lastWindowWidth < 768 && window.innerWidth >= 768){
      console.log('hit');
      headerContainer.style.height = '';
      mobileNavContainer.style.height = '0px';
    }
    
    lastWindowWidth = window.innerWidth; 
  });

  hamburger.addEventListener('click', function(e){
    console.log(parseInt(mobileNavContainer.style.height));
    console.log(headerContainer.style.height);
    if(parseInt(mobileNavContainer.style.height == 0) || !parseInt(mobileNavContainer.style.height)){
      headerContainer.style.height = '119px';
      mobileNavContainer.style.height = '45px';
    } else {
      headerContainer.style.height = '74px';
      mobileNavContainer.style.height = '0px';
    }
  })
}

document.addEventListener("DOMContentLoaded", function() {
  registerEventListeners();
});