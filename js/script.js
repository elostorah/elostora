
window.addEventListener("load", () => {


    const stakeCards = document.querySelectorAll('.stakeholder-card');
    const leftArrows = document.querySelector('.left-arrow-s');
    const rightArrows = document.querySelector('.right-arrow-s');
    const stakeEvents = document.querySelector('#xy');


    let currentCardIndexs = 0;
    let scrollBy;
    let inlinebehave = "start";
    const smallDevice = window.matchMedia("(min-width: 768px)");
    const mediumDevice = window.matchMedia("(min-width: 992px)");
    const largeDevice = window.matchMedia("(min-width: 1200px)");

    smallDevice.addListener(handleDeviceChange);
    mediumDevice.addListener(handleDeviceChange);
    largeDevice.addListener(handleDeviceChange);

    function handleDeviceChange() {
        inlinebehave = "start";
        if (largeDevice.matches) scrollBy = 3;
        else if (mediumDevice.matches) scrollBy = 2;
        else if (smallDevice.matches) scrollBy = 1;
        else {
            scrollBy = 1;
            inlinebehave = "center"
        }
    }

    // Run it initially
    handleDeviceChange();
    let startX;



    ////////////////
    function setActiveCards() {
        stakeCards.forEach((card, index) => {
            if (index === currentCardIndexs) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
    }

    function scrollLefts() {
        try {
            if (currentCardIndexs > 0) {
                currentCardIndexs -= scrollBy;

                stakeCards[currentCardIndexs].scrollIntoView({ block: 'nearest', behavior: 'smooth', inline: inlinebehave });

            }
        } catch (err) {
            currentCardIndexs = 0;

        }
        setActiveCards();
    }

    function scrollRights() {
        try {
            if (currentCardIndexs < stakeCards.length - 1) {
                currentCardIndexs += scrollBy;

                stakeCards[currentCardIndexs].scrollIntoView({ block: 'nearest', behavior: 'smooth', inline: inlinebehave });

            }
        } catch (err) {
            currentCardIndexs = stakeCards.length - 1;

        }
        setActiveCards();
    }


    function handleTouchStarts(event) {
        startX = event.touches[0].pageX;
    }

    function handleTouchMoves(event) {

        if (!startX) {
            return;
        }

        let diffX = startX - event.touches[0].pageX;

        if (diffX > 0 && currentCardIndexs < stakeCards.length - 1) {
            try {
                currentCardIndexs += scrollBy;

                stakeCards[currentCardIndexs].scrollIntoView({ block: 'nearest', behavior: 'smooth', inline: inlinebehave });
            } catch (err) {
                currentCardIndexs = stakeCards.length - 1;


            }
        } else if (diffX < 0 && currentCardIndexs > 0) {
            try {
                currentCardIndexs -= scrollBy;

                stakeCards[currentCardIndexs].scrollIntoView({ block: 'nearest', behavior: 'smooth', inline: inlinebehave });
            } catch (err) {
                currentCardIndexs = 0;


            }
        }

        startX = null;
    }

    function handleTouchEnds(event) {
        startX = null;
    }
    //////////////



    setActiveCards();
    leftArrows.addEventListener('click', scrollLefts);
    rightArrows.addEventListener('click', scrollRights);
    stakeEvents.addEventListener('touchstart', handleTouchStarts, { passive: true });
    stakeEvents.addEventListener('touchmove', handleTouchMoves, { passive: true });
    stakeEvents.addEventListener('touchend', handleTouchEnds, { passive: true });








})