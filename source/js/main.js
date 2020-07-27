'use strict';
(function () {
  var buttonPrev = document.querySelector('.images__button_left');
  var buttonNext = document.querySelector('.images__button_right');
  var previewsItems = document.querySelectorAll('.previews__item');
  var mainImage = document.querySelector('.images__main').querySelector('img');

  var getActiveItemNumber = function (items, activeClassName) {
    for (var i = 0; i < items.length; i++) {
      if (items[i].classList.contains(activeClassName)) {
        return i;
      }
    }
    return 1;
  };

  buttonNext.addEventListener('click', function (e) {
    e.preventDefault();
    if (buttonNext.disabled === false) {
      if (buttonPrev.disabled === true) {
        buttonPrev.classList.remove('images__button_disabled');
        buttonPrev.disabled = false;
      }
      var activeItemNumber = getActiveItemNumber(previewsItems, 'previews__item_active');
      if (activeItemNumber <= previewsItems.length - 2) {
        previewsItems[activeItemNumber].classList.remove('previews__item_active');
        previewsItems[activeItemNumber + 1].classList.add('previews__item_active');
        mainImage.src = previewsItems[activeItemNumber + 1].dataset.image;
        mainImage.srcset = previewsItems[activeItemNumber + 1].dataset.srcset;
      }
      if (activeItemNumber === previewsItems.length - 2) {
        buttonNext.disabled = true;
        buttonNext.classList.add('images__button_disabled');
      }
    }
  });

  buttonPrev.addEventListener('click', function (e) {
    e.preventDefault();
    if (buttonPrev.disabled === false) {
      if (buttonNext.disabled === true) {
        buttonNext.classList.remove('images__button_disabled');
        buttonNext.disabled = false;
      }
      var activeItemNumber = getActiveItemNumber(previewsItems, 'previews__item_active');
      if (activeItemNumber >= 1) {
        previewsItems[activeItemNumber].classList.remove('previews__item_active');
        previewsItems[activeItemNumber - 1].classList.add('previews__item_active');
        mainImage.src = previewsItems[activeItemNumber - 1].dataset.image;
        mainImage.srcset = previewsItems[activeItemNumber - 1].dataset.srcset;
      }
      if (activeItemNumber === 1) {
        buttonPrev.disabled = true;
        buttonPrev.classList.add('images__button_disabled');
      }
    }
  });

  var tabsLinks = document.querySelectorAll('.tabs__link');
  var tabsItems = document.querySelectorAll('.tabs__item');

  for (var i = 0; i < tabsLinks.length; i++) {
    tabsLinks[i].addEventListener('click', function (e) {
      e.preventDefault();
      var hrefElement = document.querySelector(e.target.getAttribute('href'));
      var tabsPanels = document.querySelectorAll('.tabs__panel');
      for (var j = 0; j < tabsPanels.length; j++) {
        tabsPanels[j].classList.remove('tabs__panel_active');
        tabsPanels[j].classList.remove('in');
      }
      hrefElement.classList.add('tabs__panel_active');
      setTimeout(function () {
        hrefElement.classList.add('in');
      }, 150);
      for (var k = 0; k < tabsItems.length; k++) {
        tabsItems[k].classList.remove('tabs__item_active');
        tabsItems[k].classList.remove('tabs__item_hover');
      }
      e.target.parentNode.classList.add('tabs__item_active');
    });
  }

  for (var y = 0; y < tabsLinks.length; y++) {
    tabsLinks[y].addEventListener('mouseover', function (e) {
      e.preventDefault();
      if (!e.target.parentNode.classList.contains('tabs__item_active')) {
        e.target.parentNode.classList.add('tabs__item_hover');
      }
    });

    tabsLinks[y].addEventListener('mouseout', function (e) {
      e.preventDefault();
      if (!e.target.parentNode.classList.contains('tabs__item_active')) {
        e.target.parentNode.classList.remove('tabs__item_hover');
      }
    });
  }

  var addReview = document.querySelector('.reviews__new');
  var popupContainer = document.querySelector('.popup-container');
  var popupClose = document.querySelector('.popup__close');
  var reviewsList = document.querySelector('.reviews__list');
  var reviewsItem = document.querySelector('.reviews__item');
  var reviewName = document.getElementById('review-name');
  var reviewText = document.getElementById('review-text');
  var form = popupContainer.querySelector('.popup__form');
  var popupRateItems = form.querySelectorAll('.popup__star');
  var rating = 0;

  var submitForm = function () {
    var newReviewsItem = reviewsItem.cloneNode(true);
    var reviewsHeading = newReviewsItem.querySelector('h3');
    var reviewsAdvantages = newReviewsItem.querySelector('.reviews__mark_advantages').querySelector('p');
    var reviewsMinuses = newReviewsItem.querySelector('.reviews__mark_minuses').querySelector('p');
    var reviewsComment = newReviewsItem.querySelector('.reviews__comment-text');
    var reviewsRateItems = newReviewsItem.querySelectorAll('.reviews__rate-item');
    var reviewsAdvice = newReviewsItem.querySelector('.reviews__advice');
    if (reviewName.value !== '' && reviewText.value !== '') {
      reviewsHeading.textContent = reviewName.value;
      reviewsAdvantages.textContent = document.getElementById('review-advantages').value;
      reviewsMinuses.textContent = document.getElementById('review-minuses').value;
      reviewsComment.innerHTML = '<p>' + reviewText.value.replace(/\r?\n/g, '<br/>') + '</p>';
      reviewsList.appendChild(newReviewsItem);
      for (var n = 0; n < reviewsRateItems.length; n++) {
        reviewsRateItems[n].classList.remove('reviews__rate-item_red');
      }
      for (var m = 0; m < popupRateItems.length; m++) {
        if (popupRateItems[m].checked) {
          rating = popupRateItems[m].value;
          break;
        }
      }
      for (var j = 0; j < rating; j++) {
        reviewsRateItems[j].classList.add('reviews__rate-item_red');
      }
      if (Number(rating) > 3) {
        reviewsAdvice.innerHTML = 'Советует';
      }
      if (Number(rating) === 3) {
        reviewsAdvice.innerHTML = 'Ездить можно';
      }
      if (Number(rating) < 3) {
        reviewsAdvice.innerHTML = 'Не советует';
      }
      popupContainer.style.display = 'none';
      cleanForm();
      return;
    }
    if (reviewName.value === '') {
      if (reviewText.value !== '') {
        reviewText.classList.remove('popup__textarea_empty');
        reviewText.parentNode.classList.remove('popup__textarea-wrap_empty');
      }
      reviewName.classList.add('popup__input_empty');
      reviewName.parentNode.classList.add('popup__input-wrap_empty');
    }
    if (reviewText.value === '') {
      if (reviewName.value !== '') {
        reviewName.classList.remove('popup__input_empty');
        reviewName.parentNode.classList.remove('popup__input-wrap_empty');
      }
      reviewText.classList.add('popup__textarea_empty');
      reviewText.parentNode.classList.add('popup__textarea-wrap_empty');
    }
  };

  var cleanForm = function () {
    reviewName.value = '';
    document.getElementById('review-advantages').value = '';
    document.getElementById('review-minuses').value = '';
    reviewText.value = '';
    reviewName.classList.remove('popup__input_empty');
    reviewName.parentNode.classList.remove('popup__input-wrap_empty');
    reviewText.classList.remove('popup__textarea_empty');
    reviewText.parentNode.classList.remove('popup__textarea-wrap_empty');
    for (var a = 0; a < popupRateItems.length; a++) {
      if (popupRateItems[a].checked) {
        popupRateItems[a].checked = false;
      }
    }
    rating = 0;
  };

  reviewName.addEventListener('input', function (e) {
    e.preventDefault();
    reviewName.classList.remove('popup__input_empty');
    reviewName.parentNode.classList.remove('popup__input-wrap_empty');
  });

  reviewText.addEventListener('input', function (e) {
    e.preventDefault();
    reviewText.classList.remove('popup__textarea_empty');
    reviewText.parentNode.classList.remove('popup__textarea-wrap_empty');
  });

  addReview.addEventListener('click', function (e) {
    e.preventDefault();
    popupContainer.style.display = 'flex';
    reviewName.focus();
  });

  popupClose.addEventListener('click', function (e) {
    e.preventDefault();
    popupContainer.style.display = 'none';
    cleanForm();
  });

  popupContainer.addEventListener('click', function (e) {
    if (e.target === popupContainer) {
      popupContainer.style.display = 'none';
      cleanForm();
    }
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    submitForm();
  });

  document.addEventListener('keydown', function (e) {
    if (popupContainer.style.display === 'flex' && e.code === 'Escape') {
      popupContainer.style.display = 'none';
      cleanForm();
    }
  });
})();
