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
            }
            tabsLink.parentNode.classList.add('tabs__item_active');
        })
    }

    let addReview = document.querySelector('.reviews__new');
    let popupContainer = document.querySelector('.popup-container');
    let popupClose = document.querySelector('.popup__close');

    addReview.addEventListener('click', (e) => {
        e.preventDefault();
        popupContainer.style.display = 'flex';
    });

    popupClose.addEventListener('click', (e) => {
        e.preventDefault();
        popupContainer.style.display = 'none';
    })

})();