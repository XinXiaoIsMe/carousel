import Carousel from '..'
import '../styles/fade.scss'

export default class Fade extends Carousel {
    constructor(el, {
        defaultIndex,
        duration = 500
    }) {
        super(el, {
            defaultIndex,
            duration
        })
    }

    get currentIndex() {
        return this._index
    }

    set currentIndex(newIndex) {
        this.update(() => this._index = newIndex)
    }

    init() {
        this.show()
        this.play()
        this.bindEvent()
    }

    bindEvent() {
        this.$el.addEventListener('mouseenter', this.handleMouseEnter.bind(this), false)
        this.$el.addEventListener('mouseleave', this.handleMouseLeave.bind(this), false)
        this.oDotWrap?.addEventListener('click', this.handleDotClick.bind(this), false)
        this.oArrows[0]?.addEventListener('click', this.handleArrowClick.bind(this, 'left'), false)
        this.oArrows[1]?.addEventListener('click', this.handleArrowClick.bind(this, 'right'), false)
    }

    handleMouseEnter() {
        this._timer && clearInterval(this._timer)
        this._timer = null
        this.oArrows.forEach(oArrow => oArrow.classList.add('fade-in'))
    }

    handleMouseLeave() {
        this.oArrows.forEach(oArrow => oArrow.classList.remove('fade-in'))
        this.play()
    }

    handleDotClick(e) {
        const tar = e.target
        const isDot = tar.classList.contains('carousel__dot')

        if (!isDot) return

        this.currentIndex = [...this.oDots].findIndex(oDot => oDot === tar)
    }

    handleArrowClick(type) {
        if (type === 'left') {
            this.currentIndex = this.currentIndex <= 0 ? this._imgCount - 1 : this.currentIndex - 1
        } else {
            this.currentIndex = this.currentIndex >= this._imgCount - 1 ? 0 : this.currentIndex + 1
        }
    }

    update(setIndex) {
        this.hide()
        setIndex()
        this.show()
    }

    hide() {
        this.oImages[this.currentIndex].classList.remove('fade-in')
        this.oDots?.[this.currentIndex].classList.remove('active')
    }

    show() {
        this.oImages[this.currentIndex].classList.add('fade-in')
        this.oDots?.[this.currentIndex].classList.add('active')
    }

    play() {
        this._timer = setInterval(() => {
            this.currentIndex = this.currentIndex >= this._imgCount - 1
                ? 0
                : (this.currentIndex + 1)
        }, this.duration)
    }
}
