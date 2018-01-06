function registerEventListeners(){
  var hamburger = document.getElementById('hamburger');

  hamburger.addEventListener('click', function(e){
    var headerContainer = document.getElementById('header-container'),
      mobileNavContainer = document.getElementById('mobile-nav-container');
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