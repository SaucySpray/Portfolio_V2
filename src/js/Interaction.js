import ScrollTo from 'scroll-animate-to'

export default class Interaction {
    constructor() {
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

        // Landing
        this.$landingTitle = document.querySelector('.landing-title')

        /**
         * Variables
         */
        this.isPoped = false
        this.titleTab = this.tabThis('Hello humans,')

        /**
         * Events
         */
        this.$burger.addEventListener('click', () => {
            this.popMenu()
        })
    }

    /**
     * TOOLS
     */
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