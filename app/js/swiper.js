$(()=> {
    let swiper = new Swiper('.swiper-container', {
        loop: false, //когда включен делает дублирующие слайды
        allowTouchMove: false, //когда false можно переключить слайд только кнопкой prev, next
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
    });
});