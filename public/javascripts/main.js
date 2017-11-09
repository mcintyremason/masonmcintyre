function initSliderOne(){
  $('.slider-for').slick({
   slidesToShow: 1,
   slidesToScroll: 1,
   arrows: false,
   fade: true,
   asNavFor: '.slider-nav'
 });
 $('.slider-nav').slick({
   slidesToShow: 3,
   slidesToScroll: 1,
   asNavFor: '.slider-for',
   dots: true,
   centerMode: true,
   focusOnSelect: true
 });
}

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

$(document).ready(function(){
  registerEventListeners();
});
