import { createAnimations } from "./animations.js"
import { loadSounds } from "./music/index.js"



//*? Configuración global de Phaser 
const configGame = {
    type: Phaser.AUTO, //Intenta hacer uso de webgl y si no de canvas
    width: 256,
    height: 244,
    backgroundColor: '#049cd8',
    parent: 'game',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload, //Se ejecuta para precargar recursos
        create, //Se ejecuta cuando el juego empieza
        update, // Se actualiza todo el rato en cada frame
    }
}

new Phaser.Game(configGame) //*? Inicializacion

//* this --> game --> el juego que estamos ejecutando
function preload() {

    //*con esto cargamos un recurso
    this.load.image(
        'cloud1', //*id de la imagen   
        'assets/scenery/overworld/cloud1.png' //*ruta de la imagen
    )

    this.load.image(
        'floorbricks',
        'assets/scenery/overworld/floorbricks.png'
    )


    this.load.spritesheet(
        'mario',
        'assets/entities/mario.png',
        //*Ancho = Propiedades de la imagen --> ej. 108 x 16 --> Dividir el numero de la izquierda entre el numero de frames --> 108 / 6 = 18 
        //*Altura = Propiedades de la imagen --> Segundo numero.
        { frameWidth: 18, frameHeight: 16 }
    )

    //*Sonidos
    loadSounds(this)


}


function create() {
    //* image(x, y, 'id-de-la-imagen') Estas cordenadas parten del centro de la imagen
    this.add.image(100, 50, 'cloud1')
        .setOrigin(0, 0) //* Indicamos la posicion del inicio de la imagen
        .setScale(0.15)


    this.floor = this.physics.add.staticGroup()

    this.floor.create(0, configGame.height - 16, 'floorbricks')
        .setOrigin(0, 0.5)
        .refreshBody()

    this.floor.create(150, configGame.height - 16, 'floorbricks')
        .setOrigin(0, 0.5)
        .refreshBody()

    //*!Forma sin fisicas
    // this.add.tileSprite(0, configGame.height - 32, 64, 32, 'floorbricks')
    //     .setOrigin(0, 0)

    // this.add.tileSprite(100, configGame.height - 32, 64, 32, 'floorbricks')
    //     .setOrigin(0, 0)

    //Para poder usar eventos sobre este sprite necesitamos instanciarlo en una variable.
    // this.mario = this.add.sprite(50, 210, 'mario')
    //     .setOrigin(0, 1)

    this.mario = this.physics.add.sprite(50, 160, 'mario')
        .setOrigin(0, 1)
        .setCollideWorldBounds(true).
        setGravityY(500)

    //*Limites del mundo
    this.physics.world.setBounds(0, 0, 2000, configGame.height)

    //*Colisiones entre mario y el suelo
    this.physics.add.collider(this.mario, this.floor)


    //*Cámara
    this.cameras.main.setBounds(0, 0, 2000, configGame.height)
    this.cameras.main.startFollow(this.mario)

    //*?Animaciones
    createAnimations(this)
    //*?Bindeo de teclas
    this.keys = this.input.keyboard.createCursorKeys()


}



function update() {
    if (this.mario.isDead) return

    //*? Movimiento
    if (this.keys.left.isDown) {
        this.mario.anims.play('mario-walk', true)
        this.mario.x -= 1
        this.mario.flipX = true //Girar el sprite en caso de ir a la izquierda
    } else if (this.keys.right.isDown) {
        this.mario.anims.play('mario-walk', true)
        this.mario.x += 1
        this.mario.flipX = false //Restablecee la posicion del sprite si va a la derecha

    } else {
        this.mario.anims.play('mario-idle', true) //* Si no reseteamos la animacion entraria en bucle infinito
    }


    //*? Salto
    if (this.keys.up.isDown && this.mario.body.touching.down) {
        this.mario.anims.play('mario-jump', true)
        this.mario.setVelocityY(-300)
    }

    if (this.mario.y >= configGame.height) {
        this.mario.isDead = true
        this.mario.anims.play('mario-dead')
        this.mario.setCollideWorldBounds(false)
        this.sound.play('gameover')

        setTimeout(() => {
            this.mario.setVelocityY(-350)
        }, 100)

        setTimeout(() => {
            this.scene.restart()
        }, 2000)
    }


}

