import Carousel from "./src/carousel"

const carousel1 = Carousel.create('fade', '.carousel-fade', {
    defaultIndex: 0,
    duration: 700
})

const carousel2 = Carousel.create('slide', '.carousel-slider', {
    defaultIndex: 0,
    duration: 700
})

carousel1.then(console.log)
carousel2.then(console.log)
