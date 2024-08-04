
//*? Configuración global de Phaser 

const configGame = {
    type: Phaser.AUTO, //Intenta hacer uso de webgl y si no de canvas
    width: 256,
    height: 244,
    backgroundColor: '#049cd8',
    parent: 'game',
    scene: {
        preload, //Se ejecuta para precargar recursos
        create, //Se ejecuta cuando el juego empieza
        update, // Se actualiza todo el rato en cada frame
    }
}

new Phaser.Game(configGame)

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
        { frameWidth: 18, frameHeight: 16 }
    )


}


function create() {
    //* image(x, y, 'id-de-la-imagen') Estas cordenadas parten del centro de la imagen
    this.add.image(100, 50, 'cloud1')
        .setOrigin(0, 0) //* Indicamos la posicion del inicio de la imagen
        .setScale(0.15)

    this.add.tileSprite(0, configGame.height, configGame.width, 32, 'floorbricks')


    this.add.sprite(50, 200, 'mario')
        .setOrigin(0, 1)


}



function update() {
    console.log('update')
}

