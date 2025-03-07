class TelaStart extends Phaser.Scene {
    constructor() {
        super("TelaStart"); // Define o nome da cena como "TelaStart"
    }
    
    preload() {
        // Carregamento de imagens de fundo
        this.load.image('bg', 'assets/background/background.png');    
        this.load.image('titulo', 'assets/background/nome.png');
        this.load.image('backgroundMenu', 'assets/background/background_menu.png');
        this.load.image('ceu', 'assets/background/Sky.png');
        this.load.image('nuvems', 'assets/background/Clouds.png');
        this.load.image('montanha1', 'assets/background/Mountain_Back.png');
        this.load.image('montanha2', 'assets/background/Mountain_Middle.png');
        this.load.image('montanha3', 'assets/background/Mountain_Front.png');
        this.load.image('arvores2', 'assets/background/BackgroundTrees.png');
        this.load.image('casa1', 'assets/background/House.png');
        this.load.image('casa2', 'assets/background/Shrine_Single.png');
        this.load.image('arvores', 'assets/background/Trees.png');
        this.load.image('chao', 'assets/background/Ground.png');
        this.load.image('grama', 'assets/background/Gras.png');
        this.load.image('plataforma', 'assets/plataforma/Green.png');
        this.load.image('bgTutorial', 'assets/background/bgTutorial.jpg');
        this.load.image('botaoJogar', 'assets/botoes/botaoJogar.png');
        this.load.image('botaoTutorial', 'assets/botoes/botaoTutorial.png');
        this.load.image('botaoVoltar', 'assets/botoes/botaoVoltar.png');
        this.load.image('portal', 'assets/especiais/portal.png');
        this.load.image('estrela', 'assets/especiais/estrela.png');

        // Carregamento de spritesheets
        this.load.spritesheet('botao', 'assets/botoes/botoes.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('idle', 'assets/samurai/IDLE.png', { frameWidth: 96, frameHeight: 96 });
        this.load.spritesheet('direita', 'assets/samurai/run.png', { frameWidth: 96, frameHeight: 96 });
        this.load.spritesheet('ataque', 'assets/samurai/attack_1.png', { frameWidth: 96, frameHeight: 96 });
        this.load.spritesheet('esqueleto', 'assets/skeleton/esqueletoDiferente2.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('botoes', 'assets/botoes/botoes.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('botaoTeclado', 'assets/botoes/botoesTeclado.png', { frameWidth: 16, frameHeight: 16 });

        // Carregamento de áudios
        this.load.audio('musica', 'assets/sons/som_japones.mp3');
        this.load.audio('somEspada', 'assets/sons/som_espada.mp3');
        this.load.audio('somEsqueleto', 'assets/sons/somDanoEsqueleto.mp3');       
    };

    create() {
        // Adiciona a imagem de fundo
        this.bg = this.add.image(gameWidth / 2, 90, 'bg').setScale(0.25);
        
        // Adiciona a logo/título do jogo
        this.logo = this.add.image(gameWidth / 2, gameHeight / 2 - 30, 'titulo');
        
        // Adiciona o botão de jogar e torna interativo
        this.botao = this.add.image(gameWidth / 2 - 8, gameHeight / 2 + 20, 'botaoJogar')
            .setScale(0.2)
            .setInteractive();
        
        // Adiciona e inicia a música de fundo com volume reduzido
        this.musica = this.sound.add('musica').setVolume(0.1);
        
        // Adiciona o botão do tutorial e torna interativo
        this.botaoTutorial = this.add.image(gameWidth / 2 - 6, gameHeight / 2 + 50, 'botaoTutorial')
            .setScale(0.2)
            .setInteractive();

        // Define evento de clique para o botão do tutorial
        this.botaoTutorial.on('pointerdown', () => {
            this.scene.launch('Tutorial'); // Abre a cena do tutorial
        });
        
        // Reproduz a música em loop
        this.musica.play({ loop: true });

        // Adiciona efeitos visuais de vinheta 
        const fx = this.bg.preFX.addVignette(0.5, 0.5, 0, 0.5);
        const fx2 = this.botao.preFX.addVignette(0.5, 0.5, 0, 0.5);
        const fx3 = this.logo.preFX.addVignette(0.5, 0.5, 0, 0.5);
        const fx4 = this.botaoTutorial.preFX.addVignette(0.5, 0.5, 0, 0.5);

        // Define evento de clique para o botão de jogar
        this.botao.on('pointerdown', () => {
            this.tweens.add({
                targets: [fx, fx2, fx3, fx4], // Aplica efeito nos elementos
                radius: 0, // Reduz o efeito gradualmente
                duration: 2000,
                yoyo: false,
                loop: 0,
                hold: 500,
                ease: 'sine.out',
                onComplete: () => { // Quando a animação termina
                    this.scene.switch("faseBase"); // Muda para a cena "faseBase"
                    this.musica.stop(); // Para a música
                }
            });
        });

        // Animação inicial para o efeito de vinheta
        this.tweens.add({
            targets: [fx, fx2, fx3, fx4],
            radius: 1.5, // Aumenta o efeito inicial
            duration: 2000,
            yoyo: false,
            loop: 0,
            hold: 500,
            ease: 'sine.in'
        });
    };
}
