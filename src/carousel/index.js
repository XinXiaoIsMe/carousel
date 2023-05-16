export default class Carousel {
    constructor(el, {
        defaultIndex,
        duration = 500
    }) {
        this.$el = document.querySelector(el)
        this.oImageWrap = this.$el.querySelector('.carousel__img-wrap')
        this.oImages = this.oImageWrap.getElementsByClassName('carousel__img')
        this.oDotWrap = this.$el.querySelector('.carousel__dot-wrap')
        this.oDots = this.oDotWrap?.querySelectorAll('.carousel__dot')
        this.oArrows = this.$el.querySelectorAll('.carousel__arrow')
        this.duration = duration
        this._imgCount = this.oImages.length
        this._imgWidth = this.oImages[0]?.offsetWidth
        this._index = defaultIndex
        this._timer = null

        this.oImageWrap && this.oImages?.length && this.init()
    }

    static create(type, el, options) {
        const createInstance = module => {
            return new module.default(el, options)
        }

        switch (type) {
            case 'fade':
                return import('./js/Fade.js').then(createInstance)
            case 'slide':
                return import('./js/Slider.js').then(createInstance)
            default:
                return import('./js/Fade.js').then(createInstance)
        }
    }
}