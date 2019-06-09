export default class Interaction {
    constructor() {
        /**
         * Variables
         */
        this.isPoped = false
        this.titleTab = ['WEB', 'ILLUSTRATIONS', 'PHOTOGRAPHY']
        this.titleScrollMargin = 320

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

        this.screenPos = {
            web: this.$web.offsetTop - this.titleScrollMargin,
            illustrations: this.$illustrations.offsetTop - this.titleScrollMargin,
            photography: this.$photography.offsetTop - this.titleScrollMargin,
            footer: this.$footer.offsetTop
        }

        /**
         * ScrollMagic
         */
        this.controller = new ScrollMagic.Controller()

        this.scene1 = new ScrollMagic.Scene({
            triggerElement: '.web',
            duration: 100,
            offset: 50
        })
        this.scene1.setClassToggle('fade-in')
        this.scene1.addTo(this.controller)

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
        })

        this.$burger.addEventListener('click', () => {
            this.popMenu()
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