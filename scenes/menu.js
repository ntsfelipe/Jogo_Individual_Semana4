class Menu extends Phaser.Scene {
    constructor(){
        super("Menu"); // Define o nome da cena como "Menu"
    }

    create() {
        // Adiciona a imagem de fundo do menu
        this.add.image(gameWidth / 2, 90, 'backgroundMenu').setScale(0.25);
        
        // Adiciona o texto "Pause" na tela
        this.pause = this.add.text(gameWidth / 2 - 65, gameHeight / 2 - 50, "Pause", { 
            fontFamily: "Roboto", 
            fontSize: '45px', 
            fill: '#ffffff' 
        });

        // Adiciona o texto "Continuar"
        this.continuar = this.add.text(gameWidth / 2 - 50, gameHeight / 2 + 20, "Continuar", { 
            fontFamily: "Roboto", 
            fontSize: '20px', 
            fill: '#ffffff' 
        }).setInteractive();

        // Adiciona um evento para quando o jogador clicar no botão "Continuar"
        this.continuar.on('pointerdown', () => {
            this.scene.stop('Menu'); // Fecha a cena do menu de pausa
            this.scene.resume('faseBase'); // Retoma a fase que estava pausada
        });
    };
};
