class Jogo extends Phaser.Scene {
    constructor() { 
        super("faseBase"); // Define o nome da cena como "faseBase"
    };


    
    create() {
        
        // Determina a variável de número de esqueletos
        this.numeroEsqueletos = 0;

        // Adiciona o texto "Kills:"
        this.textoKills = this.add.text(20, 10, 'Kills: ' + this.numeroEsqueletos, {fontFamily: "Roboto", fontSize: '15px', fill: '#ffffff'});

        // Adiciona física nos límites do mundo
        this.physics.world.setBounds(0, 0, gameWidth, gameHeight);


        // Adiciona o som da Espada do jogador
        this.somEspada = this.sound.add('somEspada').setVolume(0.5);


        // Adiciona o som do esqueleto morrendo
        this.somEsqueleto = this.sound.add('somEsqueleto').setVolume(0.5);


        // Adiciona um objeto de movimentação baseado nas teclas do teclado
        this.movimentacao = this.input.keyboard.createCursorKeys();

        // Adiciona um input para a tecla Z do teclado
        this.keyZ = this.input.keyboard.addKey("Z");

        // Adiciona um grupo de esqueletos
        this.esqueletos = this.add.group();

        // Determina a posição X que os esqueletos podem nascer
        this.posicoesEsqueletoX = [gameWidth/2 + 100, gameWidth/2 - 100, gameWidth/2];

        // Determina a posição Y que os esqueletos podem nascer
        this.posicoesEsqueletoY = [gameHeight/2 - 40,  gameHeight/2 - 40, gameHeight/2];
    
        // Cria animação de "idle" do personagem
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('idle', { start: 0, end: 9 }),
            frameRate: 10, // Determina a quantidade de frames que aparecerão em 1 segundo
            repeat: -1 // Repete a animação (loop)
        });

        // Cria animação de movimento para direita do personagem
        this.anims.create({
            key: 'direita',
            frames: this.anims.generateFrameNumbers('direita', { start: 0, end: 15 }),
            frameRate: 16, // Determina a quantidade de frames que aparecerão em 1 segundo
            repeat: -1 //Repete a animação (loop)
        });

        // Cria a animação de ataque do personagem
        this.anims.create({
            key: 'ataque',
            frames: this.anims.generateFrameNumbers('ataque', { start: 0, end: 6 }),
            frameRate: 12, // Determina a quantidade de frames que aparecerão em 1 segundo
            repeat: 0 // Repete a animação (loop)
        });

        // Determina que o personagem começa não atacando
        this.atacando = false;

        // Cria a animação de "idle" do esqueleto
        this.anims.create({
            key: 'idleEsqueleto',
            frames: this.anims.generateFrameNumbers('esqueleto', {start:0, end: 3}),
            frameRate: 4, // Determina a quantidade de frames que aparecerão em 1 segundo
            repeat: -1 // Repete a animação (loop)
        });

        // Adiciona a imagem do botão de pause do jogo
        this.pause = this.add.sprite(gameWidth/2 + 150, gameHeight/2 - 70, 'botao', 9).setScale(0.35).setInteractive();

        // Adiciona um evento para quando o botão "Pause" é clicado
        this.pause.on('pointerdown', () => {
            this.pause.disableInteractive();
            this.scene.pause(); // Pausa a cena 
            this.scene.launch('Menu'); // Abre a cena menu

            this.time.delayedCall(500, () => { // Tempo de espera entre ações
                this.pause.setInteractive(); // Torna o botão interativo novamente
            })
        });

        // Adiciona a imagem do céu
        this.ceu = this.add.image(gameWidth/2, gameHeight/2, 'ceu');

        // Adiciona a imagem das nuvems
        this.nuvems = this.add.tileSprite(gameWidth/2, gameHeight/2, gameWidth, gameHeight, 'nuvems');

        // Adiciona as montanhas e arvores do background
        this.montanha1 = this.add.tileSprite(gameWidth/2, gameHeight/2, gameWidth, gameHeight, 'montanha1');
        this.montanha2 = this.add.tileSprite(gameWidth/2, gameHeight/2, gameWidth, gameHeight, 'montanha2');
        this.montanha3 = this.add.tileSprite(gameWidth/2, gameHeight/2, gameWidth, gameHeight, 'montanha3');
        this.arvores = this.add.tileSprite(gameWidth/2, gameHeight/2, gameWidth, gameHeight, 'arvores');
        this.arvores2 = this.add.tileSprite(gameWidth/2, gameHeight/2, gameWidth, gameHeight, 'arvores2');
        
        // Adiciona a primeira casa do background
        this.casa1 = this.add.sprite(gameWidth/2, gameHeight/2, 'casa1');

        // Adiciona a segunda casa do background
        this.casa2 = this.add.sprite(gameWidth/2, gameHeight/2, 'casa2');

        // Adiciona o chão ao jogo e determina sua física
        this.chao = this.physics.add.staticImage(gameWidth/2, gameHeight/2, 'chao');
        this.chao.setBodySize(gameWidth, 25); // Ajusta o tamanho de sua hitbox
        this.chao.setOffset(0, 156); // Faz com que a hitbox comece num determinado ponto da imagem

        // Adiciona a grama ao background
        this.grama = this.add.tileSprite(gameWidth/2, gameHeight/2, gameWidth, gameHeight, 'grama');

        // Adiciona o player ao jogo
        this.player = this.physics.add.sprite(gameWidth/4, 123, 'idle').play('idle');
        this.physics.add.collider(this.player, this.chao); // Adiciona colisão entre o player e o chão
        this.player.setCollideWorldBounds(true); // Adiciona colisão entre o player e as bordas do mapa
        this.player.setBodySize(20, 32); // Ajusta o tamanho da hitbox do player
        this.player.setOffset(38, 48); // Faz com que a hitbox comece num determinado ponto do sprite

        // Adiciona a plataforma ao jogo
        this.plataforma1 = this.physics.add.staticImage(gameWidth/2, gameHeight/2 + 40, 'plataforma').setScale(1.3); 
        this.physics.add.collider(this.player, this.plataforma1); // Adiciona colisão entre o player e a plataforma
        this.plataforma1.setBodySize(60, 10); // Ajusta o tamanho da hitbox da plataforma
        this.plataforma1.setOffset(0, 25); //Faz com que a hitbox comece num determinado ponto da imagem

        // Adiciona a segunda plataforma ao jogo
        this.plataforma2 = this.physics.add.staticImage(gameWidth/2 + 90, gameHeight/2, 'plataforma').setScale(1.3);
        this.physics.add.collider(this.player, this.plataforma2); // Adiciona colisão entre o player e a plataforma
        this.plataforma2.setBodySize(60, 10); // Ajusta o tamanho da hitbox da plataforma
        this.plataforma2.setOffset(0, 25); //Faz com que a hitbox comece num determinado ponto da imagem
    
        // Adiciona a terceira plataforma ao jogo
        this.plataforma3 = this.physics.add.staticImage(gameWidth/2 - 90, gameHeight/2, 'plataforma').setScale(1.3);
        this.physics.add.collider(this.player, this.plataforma3); // Adiciona colisão entre o player e a plataforma
        this.plataforma3.setBodySize(60, 10); // Ajusta o tamanho da hitbox da plataforma
        this.plataforma3.setOffset(0, 25); //Faz com que a hitbox comece num determinado ponto da imagem

        // Cria a hitbox do ataque
        this.hitboxAtaque = this.physics.add.sprite(this.player.x, this.player.y, null).setSize(30,20).setVisible(false).setImmovable(true);
        this.physics.add.overlap(this.hitboxAtaque, this.esqueletos, this.danoEsqueleto, null, this); // Adiciona sobreposição entre o esqueleto e a hitbox de ataque, também chama a função de dano no esqueleto
        this.hitboxAtaque.body.setAllowGravity(false); // Desativa a gravidade da hitbox do ataque
       
        // Ajusta a profundidade das imagens do jogo
        this.ceu.depth = 0;
        this.nuvems.depth = 1;
        this.montanha1.depth = 1;
        this.montanha2.depth = 2;
        this.montanha3.depth = 3;
        this.arvores2.depth = 4;
        this.casa1.depth = 4;
        this.arvores.depth = 5;
        this.chao.depth = 6;
        this.grama.depth = 7;
        this.player.depth = 8;
        this.plataforma1.depth = 8;
        this.plataforma2.depth = 8;
        this.plataforma3.depth = 8;
        this.pause.depth = 9;
        this.textoKills.depth = 9;

    
        // Adiciona o controle de câmera do jogo
        this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
        this.cameras.main.setBounds(0, 0, gameWidth, gameHeight); 

        // Chama a função que cria o esqueleto
        this.spawnEsqueleto()
    };


    update() {

        // Adiciona o comando para realizar a animação de ataque do jogador
        if (this.keyZ.isDown && !this.atacando) {
            this.atacando = true; // Verifica se o jogador está atacando
            this.player.play('ataque'); // Roda a animação de ataque
            this.somEspada.play(); // Toca o som da espada

            this.hitbox(); // Chama a hitbox
        
            // Se a animação de ataque for concluida
            this.player.on('animationcomplete', (anim) => {
                if (anim.key === 'ataque') {
                    this.atacando = false;  // Faz com que o jogador pare de atacar
                    this.player.play('idle'); // Roda a animação de "idle" do personagem
                };
        });
    };
         
        // Se a seta para direita está pressionada 
        if (this.movimentacao.right.isDown) {
            if (this.player.anims.currentAnim.key !== 'direita' && this.player.anims.currentAnim.key !== 'ataque') { 
                this.player.play('direita'); // Roda a animação do player andando para a direita caso ainda não esteja ou a animação de ataque não esteja ocorrendo
            }
            this.player.setVelocityX(160); // Determina a velocidade de deslocamento do personagem para a direita
            this.player.flipX = false; // Faz com que o personagem não vire no eixo horizontal

        
        } // Se a seta para esquerda está pressionada
        else if (this.movimentacao.left.isDown ) {
            if (this.player.anims.currentAnim.key !== 'direita' && this.player.anims.currentAnim.key !== 'ataque') { 
                this.player.play('direita'); // Roda a animação do player andando para a direita caso ainda não esteja ou a animação de ataque não esteja ocorrendo
            }
            this.player.setVelocityX(-160); // Determina a velocidade de deslocamento do personagem para a esquerda
            this.player.flipX = true; // Faz com que o personagem vire no eixo horizontal (Animação para a esquerda)
            
        } // Caso nenhuma dessas teclas seja pressionada
        else {
            this.player.setVelocityX(0); // Determina a velocidade no eixo horizontal como 0
        };
        
        // Se a seta para cima está pressionada
        if (this.movimentacao.up.isDown) {
            this.player.y -= 5; // Faz com que o personagem se desloque no eixo vertical
        };


        // Se a última animação do personagem for a de ataque e o personagem não estiver mais atacando
        if (this.player.anims.currentAnim.key === 'ataque' && this.player.anims.isPlaying === false && !this.atacando) {
            this.player.play('idle'); // Roda a animação de "idle" do personagem
        };

        // Se nenhuma tecla de movimentação está sendo pressionada
        if (!this.movimentacao.left.isDown && !this.movimentacao.right.isDown && !this.movimentacao.up.isDown && !this.keyZ.isDown && !this.atacando) {
            if (this.player.anims.currentAnim.key !== 'idle') { // E a animação atual não é "idle"
                this.player.play('idle'); // Roda a animação "idle" do personagem
            };
        };



        // Se a vida do esqueleto fica menor ou igual a 0
        if (this.vidaEsqueleto <= 0) {
            if(this.esqueleto && this.vidaEsqueleto <=0) {
                this.esqueleto.destroy(); // Remove o esqueleto
                this.numeroEsqueletos +=1; // Adiciona +1 ao contador de kills
                this.esqueleto = null;
        }
    }

    // Se o número de esqueletos mortos(kills) for igual a 5
    if(this.numeroEsqueletos === 5){
        this.gameOver(); // Chama a função que encerra o jogo
    } 
    
    };
  
    // Função que cria o esqueleto
    spawnEsqueleto() {
        
            // Escolhe uma posição entre as mencionadas no array de posições
            this.posicoes = Phaser.Math.Between(0, 2) ;

            // Adiciona o esqueleto com base nessas posições
            this.esqueleto = this.physics.add.sprite(this.posicoesEsqueletoX[this.posicoes], this.posicoesEsqueletoY[this.posicoes], 'esqueleto').play('idleEsqueleto').setFlipX(true);

            // Adiciona colisão entre o esqueleto, chão e plataformas
            this.physics.add.collider(this.esqueleto, this.chao);
            this.physics.add.collider(this.esqueleto, this.plataforma1);
            this.physics.add.collider(this.esqueleto, this.plataforma2);
            this.physics.add.collider(this.esqueleto, this.plataforma3);

            // Adiciona colisão entre o esqueleto e as bordas do mapa
            this.esqueleto.setCollideWorldBounds(true);

            // Ajusta o tamanho da hitbox do esqueleto
            this.esqueleto.setBodySize(20,32);

            // Determina a vida do esqueleto
            this.esqueleto.vida = 100;

            // Ajusta a profundidade do esqueleto em relação às outras imagens da tela
            this.esqueleto.depth = 9; 

            // Adiciona um novo esqueleto
            this.esqueletos.add(this.esqueleto);

            // Faz com que ele possa nascer olhando para a esquerda ou para a direita
            this.esqueleto.flipX = Phaser.Math.Between(0, 1) === 1;

};
    // Função que cria a hitbox da espada
    hitbox() {
        
        // Deixa a hitbox da espada vísivel
        this.hitboxAtaque.setVisible(false);
        this.hitboxAtaque.x = this.player.flipX // A hitbox muda de orientação de acordo com o lado que o personagem está olhando
        ? this.player.x - this.player.displayWidth / 2 + 20 // ? funciona como um "if" (ainda não entendi direito como funciona, só como aplica)
        : this.player.x + this.player.displayWidth / 2 - 20

        // Determina a posição da hitbox de ataque com base na posição do player
        this.hitboxAtaque.y = this.player.y;
        this.hitboxAtaque.y = this.player.y;
    };
    
    // Função de dano ao esqueleto
    danoEsqueleto() {

        // Verifica se o jogador está atacando
        if (this.atacando) {
            this.esqueleto.destroy(); // Remove o esqueleto
            this.time.delayedCall(300, () => { // Demora 300ms para tocar o som de morte do esqueleto
                this.somEsqueleto.play();
            });
            this.numeroEsqueletos += 1; // Adiciona 1 no número de kills
            this.textoKills.setText('Kills :' + this.numeroEsqueletos);
            
        };
        this.time.delayedCall(200, () => { // Faz com que após 200ms um novo esqueleto spawne
            if(this.numeroEsqueletos <= 4){ // Só spawna o esqueleto se o número de esqueletos na tela for menor que 4
                this.spawnEsqueleto();
            }

         })
    };
    
    // Função de game over
    gameOver() {

        // Adiciona texto de conclusõa do jogo na tela
        this.gameOverText = this.add.text(gameWidth/2 - 80, gameHeight/2 - 75, 'Você ganhou!', {fontFamily: "Roboto", fontSize: '25px', fill: '#00ff00'});

        // Ajusta a profundidade do texto em relação aos itens do jogo
        this.gameOverText.depth = 9;

        // Pausa a cena
        this.scene.pause();
    }
}
