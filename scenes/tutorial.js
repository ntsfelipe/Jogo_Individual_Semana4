class Tutorial extends Phaser.Scene {
    constructor() {
        super("Tutorial"); // Define o nome da cena como "Tutorial"
    };
    create() {

        // Adiciona o background do tutorial
        this.add.image(gameWidth/2, gameHeight/2, 'bgTutorial').setScale(0.25);

        // Adiciona um botão de voltar à tela de tutorial
        this.voltar = this.add.image(40, 20, 'botaoVoltar').setScale(0.2).setInteractive();

        // Adiciona os textos das teclas de comando
        this.add.text(88, gameHeight/2 - 20, 'Pular', {fontFamily: "Roboto", fontSize: '10px', fill: '#ffffff'});
        this.add.text(30, gameHeight/2 + 10, 'Esquerda', {fontFamily: "Roboto", fontSize: '10px', fill: '#ffffff'});
        this.add.text(127, gameHeight/2 + 10, 'Direita', {fontFamily: "Roboto", fontSize: '10px', fill: '#ffffff'});
        this.add.text(260, gameHeight/2 + 10, 'Atacar', {fontFamily: "Roboto", fontSize: '10px', fill: '#ffffff'});


        // Adiciona os sprites dos botões de comando
        this.add.sprite(100, gameHeight/2, 'botaoTeclado', 0).setScale(1.3);
        this.add.sprite(84, gameHeight/2 + 16, 'botaoTeclado', 2).setScale(1.3);
        this.add.sprite(116, gameHeight/2 + 16, 'botaoTeclado', 3).setScale(1.3);
        this.add.sprite(300, gameHeight/2 + 16, 'botaoTeclado', 41).setScale(1.3);


        // Faz com que ao tocar no botão de voltar
        this.voltar.on('pointerdown', () => {
            this.scene.resume('TelaStart'); // Retome a cena da tela de start
            this.scene.stop(); // Pare a cena atual
        })
    };
}