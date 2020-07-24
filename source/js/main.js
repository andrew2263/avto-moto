(() => {
    let buttonPrev = document.querySelector('.images__button_left');
    let buttonNext = document.querySelector('.images__button_right');
    let previewsItems = document.querySelectorAll('.previews__item');
    let mainImage = document.querySelector('.images__main').querySelector('img');

    let getActiveItemNumber = (items, activeClassName) => {
        for (let i = 0; i < items.length; i++) {
            if (items[i].classList.contains(activeClassName)) {
                return i;
            }
        }
    }

    buttonNext.addEventListener('click', (e) => {
        e.preventDefault();
        if (buttonNext.disabled === false) {
            if (buttonPrev.disabled === true) {
                buttonPrev.classList.remove('images__button_disabled');
                buttonPrev.disabled = false;
            }
            let activeItemNumber = getActiveItemNumber(previewsItems, 'previews__item_active');
            if (activeItemNumber <= previewsItems.length - 2) {
                previewsItems[activeItemNumber].classList.remove('previews__item_active');
                previewsItems[activeItemNumber + 1].classList.add('previews__item_active');
                mainImage.src = previewsItems[activeItemNumber + 1].dataset.image;
            }
            if (activeItemNumber === previewsItems.length - 2) {
                buttonNext.disabled = true;
                buttonNext.classList.add('images__button_disabled');
            }
        }
    });

    buttonPrev.addEventListener('click', (e) => {
        e.preventDefault();
        if (buttonPrev.disabled === false) {
            if (buttonNext.disabled === true) {
                buttonNext.classList.remove('images__button_disabled');
                buttonNext.disabled = false;
            }
            let activeItemNumber = getActiveItemNumber(previewsItems, 'previews__item_active');
            if (activeItemNumber >= 1) {
                previewsItems[activeItemNumber].classList.remove('previews__item_active');
                previewsItems[activeItemNumber - 1].classList.add('previews__item_active');
                mainImage.src = previewsItems[activeItemNumber - 1].dataset.image;
            }
            if (activeItemNumber === 1) {
                buttonPrev.disabled = true;
                buttonPrev.classList.add('images__button_disabled');
            }
        }
    });

    let tabsLinks = document.querySelectorAll('.tabs__link');
    let tabsItems = document.querySelectorAll('.tabs__item');

    for (let tabsLink of tabsLinks) {
        tabsLink.addEventListener('click', (e) => {
            e.preventDefault();
            let hrefElement = document.querySelector(tabsLink.getAttribute('href'));
            for (let tabsPanel of hrefElement.parentNode.children) {
                tabsPanel.classList.remove('tabs__panel_active');
                setTimeout(() => {
                    tabsPanel.classList.remove('in');
                }, 150);
            }
            hrefElement.classList.add('tabs__panel_active');
            setTimeout(() => {
               hrefElement.classList.add('in'); 
            }, 150);
            for (let tabsItem of tabsItems) {
                tabsItem.classList.remove('tabs__item_active');
                tabsItem.classList.remove('tabs__item_hover');
            }
            tabsLink.parentNode.classList.add('tabs__item_active');
        });
    }

    for (let tabsLink of tabsLinks) {
            tabsLink.addEventListener('mouseover', (e) => {
                e.preventDefault();
                if (!tabsLink.parentNode.classList.contains('tabs__item_active')) {
                    tabsLink.parentNode.classList.add('tabs__item_hover');
                }
            });

            tabsLink.addEventListener('mouseout', (e) => {
                e.preventDefault();
                if (!tabsLink.parentNode.classList.contains('tabs__item_active')) {
                    tabsLink.parentNode.classList.remove('tabs__item_hover');
                }
            });

        
    }

    let addReview = document.querySelector('.reviews__new');
    let popupContainer = document.querySelector('.popup-container');
    let popupClose = document.querySelector('.popup__close');
    let reviewsList = document.querySelector('.reviews__list');
    let reviewsItem = document.querySelector('.reviews__item');
    let reviewName = document.getElementById('review-name');
    let reviewText = document.getElementById('review-text');
    let form = popupContainer.querySelector('.popup__form');
    let popupRateItems = form.querySelectorAll('.popup__star');
    let rating = 0;

    let submitForm = () => {
        let newReviewsItem = reviewsItem.cloneNode(true);
        let reviewsHeading = newReviewsItem.querySelector('h3');
        let reviewsAdvantages = newReviewsItem.querySelector('.reviews__mark_advantages').querySelector('p');
        let reviewsMinuses = newReviewsItem.querySelector('.reviews__mark_minuses').querySelector('p');
        let reviewsComment = newReviewsItem.querySelector('.reviews__comment-text');
        let reviewsRateItems = newReviewsItem.querySelectorAll('.reviews__rate-item');
        let reviewsAdvice = newReviewsItem.querySelector('.reviews__advice');
        if (reviewName.value !== '' && reviewText.value !== '') {
            reviewsHeading.textContent = reviewName.value;
            reviewsAdvantages.textContent = document.getElementById('review-advantages').value;
            reviewsMinuses.textContent = document.getElementById('review-minuses').value;
            reviewsComment.innerHTML = '<p>' + reviewText.value.replace(/\r?\n/g, '<br/>') + '</p>';
            reviewsList.appendChild(newReviewsItem);
            for (let i = 0; i < reviewsRateItems.length; i++) {
                reviewsRateItems[i].classList.remove('reviews__rate-item_red');
            }
            for (let k = 0; k < popupRateItems.length; k++) {
                if (popupRateItems[k].checked) {
                    rating = popupRateItems[k].value;
                    break;
                }
            }
            for (let j = 0; j < rating; j++) {
                reviewsRateItems[j].classList.add('reviews__rate-item_red');
            }
            if (rating > 3) {
                reviewsAdvice.innerHTML = 'Советует';
            }
            if (rating == 3) {
                reviewsAdvice.innerHTML = 'Ездить можно';
            }
            if (rating < 3) {
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
    }

    let cleanForm = () => {
        reviewName.value = '';
        document.getElementById('review-advantages').value = '';
        document.getElementById('review-minuses').value = '';
        reviewText.value = '';reviewName.classList.remove('popup__input_empty');
        reviewName.parentNode.classList.remove('popup__input-wrap_empty');
        reviewText.classList.remove('popup__textarea_empty');
        reviewText.parentNode.classList.remove('popup__textarea-wrap_empty');
        for (let i = 0; i < popupRateItems.length; i++) {
            if (popupRateItems[i].checked) {
                popupRateItems[i].checked = false;
            }
        }
        rating = 0;
    }

    reviewName.addEventListener('input', (e) => {
        e.preventDefault();
        reviewName.classList.remove('popup__input_empty');
        reviewName.parentNode.classList.remove('popup__input-wrap_empty');
    });

    reviewText.addEventListener('input', (e) => {
        e.preventDefault();
        reviewText.classList.remove('popup__textarea_empty');
        reviewText.parentNode.classList.remove('popup__textarea-wrap_empty');
    })

    addReview.addEventListener('click', (e) => {
        e.preventDefault();
        popupContainer.style.display = 'flex';
        reviewName.focus();
    });

    popupClose.addEventListener('click', (e) => {
        e.preventDefault();
        popupContainer.style.display = 'none';
        cleanForm();
    });

    popupContainer.addEventListener('click', (e) => {
        if  (e.target === popupContainer) {
            popupContainer.style.display = 'none';
            cleanForm();
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        submitForm();
    })

    document.addEventListener('keydown', (e) => {
        if (popupContainer.style.display === 'flex' && e.code === 'Escape') {
            popupContainer.style.display = 'none';
            cleanForm();
        }
    })
})();