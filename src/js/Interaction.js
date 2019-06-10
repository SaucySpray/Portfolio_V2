import lozad from 'lozad'

export default class Interaction {
    constructor() {
        /**
         * Variables
         */
        this.isPoped = false
        this.titleTab = ['WEB', 'ILLUSTRATIONS', 'PHOTOGRAPHY']
        this.titleScrollMargin = 140

        /**
         * DOM
         */

        // Burger
        this.$burger = document.querySelector('.header-menu')
        this.$burgerEl = document.querySelector('.header-menu-el')
        this.$burgerEl1 = document.querySelector('.header-menu-el-1')
        this.$burgerEl2 = document.querySelector('.header-menu-el-2')
        this.$burgerEl3 = document.querySelector('.header-menu-el-3')
        this.$sideMenu = document.querySelector('.side-menu')

        // Sections
        this.$web = document.querySelector('.web')
        this.$illustrations = document.querySelector('.illustrations')
        this.$photography = document.querySelector('.photography')
        this.$footer = document.querySelector('.footer')
        this.$headerLine = document.querySelector('.header-line')
        this.$headerLineInner = document.querySelector('.header-line-inner')

        // Buttons
        this.$toTop = document.querySelector('.to-top')
        this.$menuWeb = document.querySelector('.menu-nav-el-1')
        this.$menuIllustrations = document.querySelector('.menu-nav-el-2')
        this.$menuPhotography = document.querySelector('.menu-nav-el-3')

        this.screenPos = {
            web: this.$web.offsetTop - this.titleScrollMargin,
            illustrations: this.$illustrations.offsetTop - this.titleScrollMargin,
            photography: this.$photography.offsetTop - this.titleScrollMargin,
            footer: this.$footer.offsetTop
        }

        /**
         * Lazyload
         */
        this.observer = lozad()
        this.observer.observe()

        /**
         * Events
         */
        document.body.addEventListener('scroll', () => {
            if(document.body.scrollTop >= this.screenPos.web && document.body.scrollTop < this.screenPos.illustrations) {
                this.$headerLineInner.innerHTML = ''
                this.$headerLineInner.innerHTML = this.titleTab[0]
            }
            else if(document.body.scrollTop >= this.screenPos.illustrations && document.body.scrollTop < this.screenPos.photography) {
                this.$headerLineInner.innerHTML = ''
                this.$headerLineInner.innerHTML = this.titleTab[1]
            }
            else if(document.body.scrollTop >= this.screenPos.photography && document.body.scrollTop < this.screenPos.footer) {
                this.$headerLineInner.innerHTML = ''
                this.$headerLineInner.innerHTML = this.titleTab[2]
            }
            else if(document.body.scrollTop < this.screenPos.web) {
                this.$headerLineInner.innerHTML = ''
            }
        })

        window.addEventListener('resize', () => {
            this.updateScrollPos()
            if(document.body.offsetWidth < 1023) {
                document.body.scrollTo({
                    top: 0,
                    left: 0,
                })
            }
        })

        this.$burger.addEventListener('click', () => {
            this.popMenu()
        })

        this.$toTop.addEventListener('click', () => {
            document.body.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            })
        })

        this.$menuWeb.addEventListener('click', () => {
            document.body.scrollTo({
                top: this.screenPos.web,
                left: 0,
                behavior: 'smooth'
            })
        })

        this.$menuIllustrations.addEventListener('click', () => {
            document.body.scrollTo({
                top: this.screenPos.illustrations,
                left: 0,
                behavior: 'smooth'
            })
        })

        this.$menuPhotography.addEventListener('click', () => {
            document.body.scrollTo({
                top: this.screenPos.photography,
                left: 0,
                behavior: 'smooth'
            })
        })
    }

    /**
     * TOOLS
     */
    updateScrollPos() {
        this.screenPos.web = this.$web.offsetTop - this.titleScrollMargin
        this.screenPos.illustrations = this.$illustrations.offsetTop - this.titleScrollMargin
        this.screenPos.photography = this.$photography.offsetTop - this.titleScrollMargin
    }

    popMenu() {
        if(!this.isPoped) {
            this.isPoped = true
            this.$sideMenu.classList.toggle('side-menu-anim')

            this.$burgerEl1.classList.toggle('header-menu-el-1-anim')
            this.$burgerEl2.classList.toggle('header-menu-el-2-anim')
            this.$burgerEl3.classList.toggle('header-menu-el-3-anim')
        } else {
            this.isPoped = false
            this.$sideMenu.classList.toggle('side-menu-anim')

            this.$burgerEl1.classList.toggle('header-menu-el-1-anim')
            this.$burgerEl2.classList.toggle('header-menu-el-2-anim')
            this.$burgerEl3.classList.toggle('header-menu-el-3-anim')
        }
    }

    tabThis(_el) {
        let tab = []
        for(let i=0; i<_el.length; i++) {
            tab.push(_el[i])
        }
        return tab
    }
}