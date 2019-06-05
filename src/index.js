import './css/style.styl'

import './css/reset.styl'

import explosion from '../static/img/explosion_white.png'

import * as THREE from 'three'
import OrbitControls from 'three-orbitcontrols'

import vertexStatic from './glsl/static.vert'
import vertexWobble from './glsl/wobble.vert'
import fragmentWobble from './glsl/wobble.frag'

export default class Confettis {
    constructor(_DOMel) {
        // DOM config
        this.$container = _DOMel
        this.containerSize = {
            width: this.$container.offsetWidth,
            height: this.$container.offsetHeight,
        }
        this.isOver = false

        /**
         * Camera
         */
        this.cameraProps = {
            fov: 75,
            aspect: this.containerSize.width / this.containerSize.height,
            near: 1,
            far: 10000,
            target: 40,
        }

        this.camera = new THREE.PerspectiveCamera(
            this.cameraProps.fov,
            this.cameraProps.aspect,
            this.cameraProps.near,
            this.cameraProps.far,
        )
        this.initCamera()

        /**
         * Scene
         */
        this.scene = new THREE.Scene()
        this.scene.autoUpdate = true
        this.scene.background = new THREE.Color( 0x000000 );

        /**
         * Renderer
         */
        this.renderer = new THREE.WebGLRenderer({
            alpha: false,
        })

        // Append Canvas
        this.renderer.domElement.classList.add('confettis')
        this.$container.appendChild(this.renderer.domElement)



        /**
         * Magic here
         */
        this.increment = 0;
        this.explosion = new Image()
        this.explosion.src = explosion
        this.loader = new THREE.TextureLoader()
        this.start = Date.now()
        this.materialTab = []
        this.meshTab = []
        this.animate = false
        this.transition = false

        // Create material textures
        // kernel texture
        this.createMaterial(this.loader.load(this.explosion.src), false, vertexWobble, fragmentWobble)
        this.materialTab[0].name = "kernel"
        // atmosphere texture
        this.createMaterial(this.loader.load(this.explosion.src), true, vertexStatic, fragmentWobble)
        this.materialTab[1].name = "atmosphere"

        // skybox
        this.skyboxObject = new THREE.Mesh(
            new THREE.SphereGeometry(100, 64),
            new THREE.MeshBasicMaterial({
                color: 0xFFFFFF,
                side: THREE.BackSide
            })
        )

        // Create object3D
        this.createPlanet(this.materialTab[0], 10)
        this.materialTab[0].color = 0xFFFFFF
        this.materialTab[0].side = THREE.BackSide
        this.createPlanet(this.materialTab[1], 5)

        this.scalingUp = 0
        
        /**
         * Controler
         */
        this.controler = null
        this.controlerProps = {
            zoom: {
                min: 44,
                max: 44,
                speed: 0.2
            },
            rotateSpeed: 0.2,
            damping: 1
        }
        this.initControler()

        /**
         * Events & Animation
         */
        this.isPoped = false
        window.addEventListener('resize', () => this.resize())
        window.addEventListener('click', () => {
            if(this.animate) {
                this.transition = true
            }
        })

        this.loop = this.loop.bind(this)
        this.loop()
    }
    /**
     * Scale
     */
    scale ( mesh, scale ) {
        scale = scale * 4.2
        mesh.scale.x = scale
        mesh.scale.y = scale
        mesh.scale.z = scale
        if( ! mesh.geometry.boundingBox ) mesh.geometry.computeBoundingBox()
    }

    /**
     * CreatePlanet
     */
    createMaterial(_texture, _isTransparent, _vertex, _fragment) {
        this.material = new THREE.ShaderMaterial({
            uniforms: {
                tExplosion: {
                    type: "t",
                    value: _texture
                },
                time: { // float initialized to ('(0)')
                    type: "f",
                    value: 0.0
                }
            },
            vertexShader: _vertex,
            fragmentShader: _fragment
        })
        this.material.transparent = _isTransparent;

        this.materialTab.push(this.material)
    }

    createPlanet(_material, _radius) {
        //create a mesh
        if(_radius) {
            this.mesh = new THREE.Mesh(
                new THREE.IcosahedronGeometry(_radius, 6),
                _material
            )
            this.meshTab.push(this.mesh)
        }

        // append to scene
        this.scene.add(this.mesh)
    }

    /**
     * Responsive
     */
    resize() {
        this.containerSize.width = window.innerWidth
        this.containerSize.height = window.innerHeight

        // keep aspect ratio of camera
        this.camera.aspect = this.containerSize.width / this.containerSize.height
        this.camera.updateProjectionMatrix()

        this.renderer.setSize(this.containerSize.width / this.containerSize.height)
    }

    /**
     * Init configurations
     */
    initCamera() {
        this.camera.lookAt(new THREE.Vector3(0, 0, this.cameraProps.far))
        this.camera.position.set(0, 0, this.cameraProps.target)
        this.camera.updateProjectionMatrix()
    }

    initControler() {
        this.controler = new OrbitControls(this.camera, this.renderer.domElement)
        this.controler.minDistance = this.controlerProps.zoom.min
        this.controler.maxDistance = this.controlerProps.zoom.max
        this.controler.rotateSpeed = this.controlerProps.zoom.speed
        this.controler.autoRotate = false
        this.controler.autoRotateSpeed = this.controlerProps.rotateSpeed
        this.controler.enableDamping = true
        this.controler.enablePan = false
        this.dampingFactor = this.controlerProps.damping
    }

    /**
     * Animate
     */
    easeInOutCubic(t, v) { return t<.5 ? (v*2)*t*t*t : (t-(v/2))*(v*t-v)*(v*t-v)+(v/2) }

    update() {
        // Experience
        // this.increment += 0.1
        // this.mesh.position.x = Math.cos(this.increment)
        // this.mesh.position.y = Math.cos(-3 * (this.increment))

        // Update
        this.controler.update()
        this.renderer.setSize(this.containerSize.width, this.containerSize.height)
    }

    render() {
        this.materialTab[0].uniforms[ 'time' ].value = .00015 * ( Date.now() - this.start )
        this.materialTab[1].uniforms[ 'time' ].value = .000025 * ( Date.now() - this.start )
        this.renderer.render(this.scene, this.camera)
    }

    loop() {
        if(!this.isOver) {
            window.requestAnimationFrame(this.loop)
        }

        // Animate atmosphere
        if(this.scalingUp < 1) {
            // Scale up fast or slower
            this.scalingUp += 0.020
            this.scale(this.meshTab[1], this.easeInOutCubic(this.scalingUp, 2))
            setTimeout(() => this.animate = true, 1400)
        }

        // Animate atmosphere
        if(this.transition) {
            this.scalingUp += 0.020
            this.scale(this.meshTab[0], this.easeInOutCubic(this.scalingUp, 0.5))
            this.scale(this.meshTab[1], this.easeInOutCubic(this.scalingUp, 2))
            this.transition = true
            setTimeout(() => {this.scene.add(this.skyboxObject)}, 1500)
            setTimeout(() => {this.isOver = true}, 2500)
        }

        if(this.isOver) {
            this.scene.remove(this.meshTab[0])
            this.scene.remove(this.meshTab[1])
            this.controler.enabled = false
            setTimeout(() => {
                document.body.removeChild(this.$container)
                document.querySelector('.main').style.display = 'flex'
                // document.querySelector('.main').style.top = 0
                document.body.style.overflow = visible
            }, 200)
        }

        // Renderer & Update
        this.update()
        this.render()
    }
}

const $container = document.querySelector('.canvas')

// new Confettis($container)

class Portfolio {
    constructor() {
        // DOM
        this.$burger = document.querySelector('.header-menu')
        this.$burgerEl = document.querySelector('.header-menu-el')
        this.$burgerEl1 = document.querySelector('.header-menu-el-1')
        this.$burgerEl2 = document.querySelector('.header-menu-el-2')
        this.$burgerEl3 = document.querySelector('.header-menu-el-3')
        this.$sideMenu = document.querySelector('.side-menu')

        // Variables
        this.isPoped = false

        // Events
        this.$burger.addEventListener('click', () => {
            this.popMenu()
        })
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
}

new Portfolio()