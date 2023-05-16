import Carousel from '..'
import '../styles/slider.scss'

export default class Slider extends Carousel {
    constructor(el, {
        defaultIndex,
        duration = 500
    }) {
        super(el, {
            defaultIndex,
            duration
        })
        this._isArrowClicked = false
    }

    get currentIndex() {
        return this._index
    }

    set currentIndex(newIndex) {
        this.update(() => this._index = newIndex)
    }

    init() {
        this.cloneNode()
        this.update(null, true)
        this.play()
        this.bindEvent()
    }

    cloneNode() {
        const node = this.oImages[0].cloneNode(true)
        this.oImageWrap.appendChild(node)
        this._imgCount = this.oImages.length
    }

    update(setIndex, isInit) {
        let currentIndex
        if (!isInit) {
            currentIndex = this.currentIndex >= this._imgCount - 1 ? 0 : this.currentIndex
            this.oDots[currentIndex].classList.remove('active')
            setIndex()
        }
        currentIndex = this.currentIndex >= this._imgCount - 1 ? 0 : this.currentIndex
        this.oDots[currentIndex].classList.add('active')
    }

    slider() {
        this.oImageWrap.style.transition = 'transform .5s'
        this.oImageWrap.style.transform = `translate3d(${- this.currentIndex * this._imgWidth}px, 0, 0)`
    }

    reset(index) {
        this.oImageWrap.ontransitionend = () => {
            this.currentIndex = index
            this.oImageWrap.style.transition = 'none'
            this.oImageWrap.style.transform = `translate3d(${- index * this._imgWidth}px, 0, 0)`
            this.oImageWrap.ontransitionend = null
        }
    }

    play() {
        this._timer = setInterval(() => {
            this.handleRightArrowClick(true)
        }, this.duration)
    }

    bindEvent() {
        this.$el.addEventListener('mouseenter', this.handleMouseEnter.bind(this), false)
        this.$el.addEventListener('mouseleave', this.handleMouseLeave.bind(this), false)
        this.oDotWrap?.addEventListener('click', this.handleDotClick.bind(this), false)
        this.oArrows[0]?.addEventListener('click', this.handleArrowClick.bind(this, 'left'), false)
        this.oArrows[1]?.addEventListener('click', this.handleArrowClick.bind(this, 'right'), false)
        this.oImageWrap.addEventListener('transitionend', () => this._isArrowClicked = false)
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
        this.slider()
    }

    handleArrowClick(type) {
        if (type === 'left') {
            this.handleLeftArrowClick()
        } else {
            this.handleRightArrowClick()
        }
        this._isArrowClicked = true
    }

    handleLeftArrowClick() {
        if (this._isArrowClicked) return

        this.currentIndex--
        this.slider()
        if (this.currentIndex <= 0) {
            this.reset(this._imgCount - 1)
        }
    }

    handleRightArrowClick(isPlay) {
        if (isPlay || !this._isArrowClicked) {
            this.currentIndex++
            this.slider()
            if (this.currentIndex >= this._imgCount - 1) {
                this.reset(0)
            }
        }
    }
}