function registerEventListeners(){
  var hamburger = document.getElementById('hamburger');

  hamburger.addEventListener('click', function(e){
    var mobileNavContainer = document.getElementById('mobile-nav-container');
    console.log(parseInt(mobileNavContainer.style.height));
    if(parseInt(mobileNavContainer.style.height == 0) || !parseInt(mobileNavContainer.style.height))
      mobileNavContainer.style.height = '70px';
    else
      mobileNavContainer.style.height = '0px';
  })
}

document.addEventListener("DOMContentLoaded", function() {
  registerEventListeners();
});