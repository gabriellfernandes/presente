function createStars() {
    const starsContainer = document.getElementById('stars');

    for (let i = 0; i < 300; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.width = Math.random() * 3 + 1 + 'px';
        star.style.height = star.style.width;
        star.style.animationDelay = Math.random() * 3 + 's';
        starsContainer.appendChild(star);
    }

    console.log('🌠 Estrelas criadas!');
}

const champions = [
    {
        name: "Yuumi",
        icon: "",
        message: "Você é como um livro mágico que nunca acaba… e cada página sua me ensina a amar mais. ✨"
    },
];

const finalMessage = {
    name: "FELIZ ANIVERSÁRIO!",
    icon: "🎉",
    message: "Hoje é seu aniversário e eu só queria dizer o quanto sou grato por viver ao seu lado há 4 anos. Você é carinhosa, determinada, talentosa (e viciada em joguinhos de simulação kkk), e mesmo achando que eu sou meio garotão, você me aguenta e me ama do seu jeitinho. Eu te admiro mais do que consigo explicar e te amo mais do que qualquer coisa no mundo. Feliz aniversário, minha campeã. ❤️ 🎂❤️✨"
};

let isAnimating = false;

const API_KEY = "RGAPI-b347b67a-bd4c-41e8-a41c-29a13381c6bc";
const RIOT_ID = "Biscoito Meow#2233";

async function loadRiotData() {
    try {
        console.log('🎮 Carregando dados do League of Legends...');

        updateChampionsWithRiotData([
            { name: 'Yuumi' },
            { name: 'Soraka' },
            { name: 'Sona' },
            { name: 'Lulu' }
        ]);

        console.log('✅ Dados carregados com sucesso!');

    } catch (error) {
        console.log('⚠️ Erro ao carregar dados da Riot API, usando dados padrão:', error.message);
    }
}

function updateChampionsWithRiotData(topChampions) {
    const championMessages = {
        'Yuumi': "Tudo começou com você sendo minha Yuumi — sempre ao meu lado, sempre presente, como se tivesse uma ligação mágica entre a gente. Mesmo nos momentos difíceis, você tava ali, deixando tudo mais leve. É como se estivéssemos escrevendo juntos nosso próprio grimório, página por página, há 4 anos. 💫",
        'Soraka': "Mas não dá pra contar nossa história sem lembrar que você tem o coração da Soraka. Sempre tão cuidadosa, tão sensível às dores que nem mostro. Você cura com seu carinho do seu jeitinho que só você tem. Forte, firme, mesmo sendo uma estrela doce. 🌠",
        'Sona': "Você também é como a Sona — não precisa dizer muito pra tocar fundo em mim. Seu jeito calmo, seu silêncio cheio de significado, seu cuidado em cada detalhe... quando tudo parece barulhento demais, você é minha música tranquila. A melodia que acalma minha alma. 🎵",
        'Lulu': "E claro, você tem a alma da Lulu — criativa, divertida, única. Com seu brilho, você transforma qualquer momento simples em algo mágico. Parece até feitiço como você colore minha vida. Mas o que me encanta de verdade é a força que você tem por trás desse seu jeito doce. ✨",
    };

    champions.length = 0;

    topChampions.forEach(champ => {
        const customMessage = championMessages[champ.name];
        champions.push({
            name: '',
            icon: '',
            message: customMessage
        });
    });

    console.log('🎯 Campeões atualizados:', champions.map(c => c.name));
}

function createFirework(x, y) {
    const colors = ['#FFD600', '#FF6B9D', '#C77DFF', '#7209B7', '#FFFFFF'];
    const fireworkContainer = document.getElementById('fireworkContainer');

    for (let i = 0; i < 15; i++) {
        const firework = document.createElement('div');
        firework.className = 'firework';
        const color = colors[Math.floor(Math.random() * colors.length)];
        firework.style.background = color;
        firework.style.color = color;
        firework.style.left = x + 'px';
        firework.style.top = y + 'px';
        firework.style.boxShadow = `0 0 20px ${color}`;

        const angle = (i * 24) * (Math.PI / 180);
        const distance = 120 + Math.random() * 100;
        const endX = x + Math.cos(angle) * distance;
        const endY = y + Math.sin(angle) * distance;

        firework.style.setProperty('--end-x', endX + 'px');
        firework.style.setProperty('--end-y', endY + 'px');

        firework.animate([
            {
                transform: 'translate(0, 0) scale(1)',
                opacity: 1,
                boxShadow: `0 0 20px ${color}`
            },
            {
                transform: `translate(${endX - x}px, ${endY - y}px) scale(0)`,
                opacity: 0,
                boxShadow: `0 0 50px ${color}`
            }
        ], {
            duration: 1200 + Math.random() * 600,
            easing: 'ease-out'
        });

        fireworkContainer.appendChild(firework);

        setTimeout(() => {
            if (firework.parentNode) {
                firework.parentNode.removeChild(firework);
            }
        }, 1500);
    }
}

function createMultipleFireworks() {
    const positions = [
        { x: window.innerWidth * 0.2, y: window.innerHeight * 0.3 },
        { x: window.innerWidth * 0.8, y: window.innerHeight * 0.2 },
        { x: window.innerWidth * 0.1, y: window.innerHeight * 0.7 },
        { x: window.innerWidth * 0.9, y: window.innerHeight * 0.8 },
        { x: window.innerWidth * 0.5, y: window.innerHeight * 0.1 },
        { x: window.innerWidth * 0.7, y: window.innerHeight * 0.6 }
    ];

    positions.forEach((pos, index) => {
        setTimeout(() => createFirework(pos.x, pos.y), index * 200);
    });
}

async function createAnimationCard(champion, isFinal = false) {
    const card = document.createElement('div');
    card.className = `animation-card${isFinal ? ' final-card' : ''}`;

    card.innerHTML = `
        <div class="champion-name">${champion.name}</div>
        <div class="love-message">${champion.message}</div>
    `;

    const container = document.querySelector('#messageContainer');
    const cardRemove = container.querySelector('.animation-card');
    console.log('🔍 Verificando se há cartão existente para remover:', cardRemove);

    if (cardRemove) {
        cardRemove.style = "animation: fadeOut 0.6s forwards; opacity: 0;";

        const temp = new Promise((resolve) => {
            setTimeout(resolve, 600);
        });

        await temp;

        container.innerHTML = '';
    }

    container.appendChild(card);

    document.body.appendChild(container);

    createCardParticles(card, isFinal);

    const temp = new Promise((resolve) => {
        setTimeout(resolve, 600);
    });

    await temp;

    card.classList.add('show');

    if (isFinal) {
        card.classList.add('pulse-effect');
    }


    return card;
}

function createCardParticles(card, isFinal = false) {
    const particleCount = isFinal ? 30 : 20;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const isCircle = Math.random() > 0.5;

        particle.className = `card-particle ${isCircle ? 'circle' : 'square'}`;

        const size = 3 + Math.random() * 6;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';

        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';

        const opacity = 0.3 + Math.random() * 0.2;
        particle.style.backgroundColor = `rgba(255, 214, 0, ${opacity})`;

        const duration = 8 + Math.random() * 6;
        const delay = Math.random() * 3;

        particle.style.animationDuration = duration + 's';
        particle.style.animationDelay = delay + 's';

        card.appendChild(particle);
    }
}

async function startAnimation() {
    if (isAnimating) return;
    isAnimating = true;

    await loadRiotData();

    const initialCard = document.getElementById('initialCard');
    initialCard.style.opacity = '0';
    initialCard.style.transform = 'scale(0.8)';
    initialCard.style.display = 'none';

    const positions = [
        { x: window.innerWidth * 0.1, y: window.innerHeight * 0.2 },
        { x: window.innerWidth * 0.8, y: window.innerHeight * 0.1 },
        { x: window.innerWidth * 0.2, y: window.innerHeight * 0.7 },
        { x: window.innerWidth * 0.9, y: window.innerHeight * 0.8 },
        { x: window.innerWidth * 0.6, y: window.innerHeight * 0.3 }
    ];

    champions.forEach(async (champion, index) => {
        setTimeout(async () => {
            await createAnimationCard(champion, positions[index]);
        }, index * 20000);
    });

    setTimeout(async () => {
        await createAnimationCard(finalMessage, true);

        while (true) {
            createMultipleFireworks();

            await new Promise(resolve => setTimeout(resolve, 1000));
        }



    }, champions.length * 19000 + 100);
}

document.getElementById('initialCard').addEventListener('mouseenter', startAnimation);

function createGeometricShapes() {
    const shapesContainer = document.getElementById('geometricShapes');
    const shapeTypes = ['circle', 'triangle', 'square', 'hexagon'];

    for (let i = 0; i < 25; i++) {
        const shape = document.createElement('div');
        const shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];

        shape.className = `shape ${shapeType}`;

        let size;
        switch (shapeType) {
            case 'circle':
                size = 20 + Math.random() * 40;
                shape.style.width = size + 'px';
                shape.style.height = size + 'px';
                break;
            case 'square':
                size = 15 + Math.random() * 30;
                shape.style.width = size + 'px';
                shape.style.height = size + 'px';
                break;
            case 'triangle':
                break;
            case 'hexagon':
                break;
        }

        shape.style.left = Math.random() * 100 + '%';
        shape.style.top = Math.random() * 100 + '%';

        shape.style.animationDuration = (4 + Math.random() * 6) + 's';
        shape.style.animationDelay = Math.random() * 5 + 's';

        shapesContainer.appendChild(shape);
    }

    console.log('🔷 Formas geométricas criadas!');
}

window.addEventListener('load', () => {
    createStars();
    createGeometricShapes();
    loadRiotData();

    setTimeout(() => {
        const initialCard = document.getElementById('initialCard');
        initialCard.classList.add('show');

        createCardParticles(initialCard, false);
    }, 500);
});