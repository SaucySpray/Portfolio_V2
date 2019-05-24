import './css/style.styl'

import './css/reset.styl'

import explosion from '../static/explosion.png'

import * as THREE from 'three'
import OrbitControls from 'three-orbitcontrols'


export default class Confettis {
    constructor(_DOMel) {
        // DOM config
        this.$container = _DOMel
        this.containerSize = {
            width: this.$container.offsetWidth,
            height: this.$container.offsetHeight,
        }

        /**
         * Camera
         */
        this.cameraProps = {
            fov: 75,
            aspect: this.containerSize.width / this.containerSize.height,
            near: 1,
            far: 150,
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

        this.material = new THREE.ShaderMaterial({
            uniforms: {
                tExplosion: {
                    type: "t",
                    value: this.loader.load(this.explosion.src)
                },
                time: { // float initialized to ('(0)')
                    type: "f",
                    value: 0.0
                }
            },
            vertexShader: document.getElementById('vertexShader').textContent,
            fragmentShader: document.getElementById('fragmentShader').textContent
        })
        this.mesh = new THREE.Mesh(
            new THREE.IcosahedronGeometry(20, 4),
            this.material
        )
        this.scene.add(this.mesh)



        /**
         * Controler
         */
        this.controler = null
        this.controlerProps = {
            zoom: {
                min: 30,
                max: 90,
                speed: 0.2
            },
            rotateSpeed: 0.2,
            damping: 1
        }
        this.initControler()

        /**
         * Events & Animation
         */
        window.addEventListener('resize', () => this.resize())

        this.loop = this.loop.bind(this)
        this.loop()
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
        this.material.uniforms[ 'time' ].value = .00025 * ( Date.now() - this.start )
        this.renderer.render(this.scene, this.camera)
    }

    loop() {
        window.requestAnimationFrame(this.loop)

        // Renderer & Update
        this.update()
        this.render()
    }
}

const $container = document.querySelector('body')

new Confettis($container)