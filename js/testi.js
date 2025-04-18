var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
  grabCusor: true,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  console.log("swper", swiper)