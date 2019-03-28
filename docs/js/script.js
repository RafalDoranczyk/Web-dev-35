
/** NAVIGATION AND HEADER FUNCTIONS */

//NAV MOBILE ANIMATION VARIABLES
const nav = $('.home .nav');
const navHeight = $('.home .nav').height();
//NAV MOBILE ANIMATION VARS


//REUSABLE FUNCTION THAT SCROLLS DOCUMENT ON CLICK
const scrollToSection = (height) => {
  $('html,body').animate({
    scrollTop: height - (navHeight)
  }, 'slow')
};

//ALL SECTIONS OFFSET 
let aboutHeight = $('.about').offset().top;
const home = $('.home').offset().top;
const headerButton = document.querySelector('.header__button')
const allLinks = [...document.querySelectorAll('.link__default')];


//SCROLLING TO EACH SECTION IF LINK CLASS === SECTION ID
allLinks.forEach(link => {
  link.addEventListener('click', () => {
    const section = (`.${link.id}`)
    const sectionHeight = $(section).offset().top;
    $('.nav__list').removeClass('nav__list--active');
    if (document.body.classList.contains('hidden')) {
      document.body.classList.remove('hidden');
      $('.nav__burger--span').removeClass('nav__burger--span--active')
    }
    scrollToSection(sectionHeight)
  })
})

//SCROLLING IF WE HIT HEADER BUTTON
headerButton.addEventListener('click', () => {
  scrollToSection(aboutHeight)
})




//ABOUT BANNER VARIABLES
const numbers = [42, 123, 15, 99, 24];
const bannerFromTop = $('.banner').offset().top;
const bannerHeight = $('.banner').height();
const spanNumbers = [...$('.banner__number')];
//ABOUT BANNER VARIABLES END




//HEADER ANIMATION 
const headerText = [
  {
    firstTitle: 'welcome',
    secondTitle: 'to mogo',
  },
  {
    firstTitle: 'check',
    secondTitle: 'our work',
  },
  {
    firstTitle: 'meet ',
    secondTitle: 'our team',
  },
  {
    firstTitle: 'contact ',
    secondTitle: 'with us',
  }
];
const stripesItems = [...document.querySelectorAll('.stripes__item')];
const headerTitle = document.querySelector('.home .header__title');

const changeHeaderTitle = () => {
  let i = 1;
  this.headerTitleID = setInterval(() => {
    stripesItems.forEach(item => item.classList.remove('stripes__item--active'));
    if (i === headerText.length) i = 0;
    headerTitle.innerHTML = `${headerText[i].firstTitle} <span class="header__title--second">${headerText[i].secondTitle}</span>`
    stripesItems[i].classList.add('stripes__item--active')
    i++;
  }, 3000)
};
changeHeaderTitle();
//HEADER ANIMATION END


//MOBILE BURGER
const menu = document.querySelector('.nav__list');
const burgerSpans = document.querySelectorAll('.nav__burger--span');
document.querySelector('.nav__burger').addEventListener('click', () => {
  menu.classList.toggle('nav__list--active');
  document.body.classList.toggle('hidden');
  burgerSpans.forEach(span => span.classList.toggle('nav__burger--span--active'));
});




//MOBILE BURGER END





//ABOUT SECTION
//REUSABLE FUNCTION THAT RETURNS AN ARRAY OF ITEMS WITH TRUE IF ITEM IS IN WINDOW OR FALSE IF NOT
const isItemInWindow = (itemsArray, scrollTop) => {
  const results = [];
  $(itemsArray).each(function (index) {
    const elementTop = $(this).offset().top;
    const elementBottom = elementTop + $(this).outerHeight();
    const viewportTop = scrollTop
    const viewportBottom = viewportTop + $(window).height();
    if (elementBottom > viewportTop && elementTop + $(this).outerHeight() < viewportBottom) {
      results[index] = true;
    } else {
      results[index] = false;
    }
  })
  return results;
}

//WORKS ON ALL ITEMS THAT HAVE 'gallery__item' class
const aboutGalleryItems = [...$('.gallery__item')];


//FEATURES SECTION

const featuresItems = [...document.querySelectorAll('.features .box__item')];



//SERVICES SECTION
const buttonsToClick = [...$('.skillsBox__button')];
const descriptionsToShow = [...$('.skillsBox__description')];
const arrows = [...$('.skillsBox__arrow')];
//FUNCTION THAT OPENS CLICKED BUTTON AND CLOSES ANOTHERS
buttonsToClick.forEach((button, index) => {
  button.addEventListener('click', () => {
    if (descriptionsToShow[index].classList.contains('skillsBox__description--active')) {
      descriptionsToShow[index].classList.remove('skillsBox__description--active');
      arrows[index].classList.remove('skillsBox__arrow--active');
    } else {
      descriptionsToShow.forEach(show => show.classList.remove('skillsBox__description--active'));
      arrows.forEach(arrow => arrow.classList.remove('skillsBox__arrow--active'));
      descriptionsToShow[index].classList.add('skillsBox__description--active');
      arrows[index].classList.add('skillsBox__arrow--active');
    }
  }
  )
}
);

//SERVICES BANNER SECTION OWL CAROUSEL
const serviceBanner = $('.serviceBanner__opinionBox');
serviceBanner.owlCarousel({
  loop: true,
  nav: true,
  items: 1,
  margin: 40,
})




//SCROLL LISTENER!
document.addEventListener('scroll', () => {
  const scrollTop = $(window).scrollTop();



  //MEDIA QUERIES
  const mobile = () => {
    if (screen.height > screen.width && screen.height < 800) return true;
    return false;
  }


  //CHECKS IF GALLERY ELEMENT IS VISIBLE IN WINDOW OR NOT, WORKS ON MOBILES ONLY
  if (mobile()) {
    const results = isItemInWindow(aboutGalleryItems, scrollTop);
    for (let i = 0; i < results.length; i++) {
      if (results[i]) {
        aboutGalleryItems[i].classList.add('gallery__item--active')
      } else if (results[i] === false && aboutGalleryItems[i].classList.contains('gallery__item--active')) {
        aboutGalleryItems[i].classList.remove('gallery__item--active')
      }
    };
  }


  //NAV MOBILE FIXED ANIMATION

  if (scrollTop >= navHeight) {
    nav.addClass('nav--active');
  } else if (scrollTop === 0) {
    nav.removeClass('nav--active');
  }

  //ABOUTBANNER SECTION
  if (scrollTop >= bannerFromTop - bannerHeight * 2) {
    spanNumbers.forEach((span, index) => {
      let i = 0
      let flag = false;
      if (span.textContent < numbers[index]) {
        setInterval(() => {
          if (span.textContent == numbers[index] && !flag) {
            flag = !flag;
            setTimeout(() => {
              span.classList.add('banner__number--active')
            }, 100);
          } else if (span.textContent < numbers[index]) {
            span.textContent = i++;
          }
        }, 5);
      }
    })
  }

  //FEATURES SECTION
  if (mobile()) {
    let isFeatureItemShowed = isItemInWindow(featuresItems, scrollTop);
    featuresItems.forEach(item => {
      if (item.classList.contains('box__item--active')) return;
      for (let i = 0; i < featuresItems.length; i++) {
        if (isFeatureItemShowed[i]) {
          featuresItems[i].classList.add('box__item--active')
        }
      }
    })

  }





});


//PROJECTSBANNER CAROUSEL

$('.projectsBanner').owlCarousel({
  loop: true,
  nav: true,
  items: 1,
  margin: 40,
})