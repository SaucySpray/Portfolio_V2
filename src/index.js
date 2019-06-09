import './css/style.styl'
import './css/reset.styl'
import './css/landing.styl'
import './css/menu.styl'
import './css/web.styl'
import './css/illustrations.styl'
import './css/photography.styl'
import './css/footer.styl'

import Animation from './js/Animation'
import Interaction from './js/Interaction'

const $container = document.querySelector('.canvas')
window.onload = () => new Animation($container)

new Interaction()