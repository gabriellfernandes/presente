// Criar estrelas no fundo
function createStars() {
    const starsContainer = document.getElementById('stars');
    for (let i = 0; i < 150; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.width = Math.random() * 3 + 1 + 'px';
        star.style.height = star.style.width;
        star.style.animationDelay = Math.random() * 3 + 's';
        starsContainer.appendChild(star);
    }
}

// Dados dos campeões
const champions = [
    {
        name: "Ahri",
        icon: "🦊",
        message: "Como a Ahri, você me enfeitiça com seu charme irresistível ✨"
    },
    {
        name: "Jinx",
        icon: "💥",
        message: "Você traz a mesma energia explosiva da Jinx para minha vida!"
    },
    {
        name: "Lux",
        icon: "⭐",
        message: "Assim como a Lux, você ilumina todos os meus dias ☀️"
    },
    {
        name: "Seraphine",
        icon: "🎵",
        message: "Sua voz melodiosa me acalma como a da Seraphine 🎶"
    },
    {
        name: "Miss Fortune",
        icon: "🏴‍☠️",
        message: "Você conquistou meu coração como uma verdadeira pirata!"
    }
];

const finalMessage = {
    name: "FELIZ ANIVERSÁRIO!",
    icon: "🎉",
    message: "Você é a pessoa mais especial do mundo! Te amo mais que tudo nesta vida! 🎂❤️✨"
};

let isAnimating = false;

function createFirework(x, y) {
    const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff'];
    const fireworkContainer = document.getElementById('fireworkContainer');

    for (let i = 0; i < 12; i++) {
        const firework = document.createElement('div');
        firework.className = 'firework';
        firework.style.background = colors[Math.floor(Math.random() * colors.length)];
        firework.style.left = x + 'px';
        firework.style.top = y + 'px';

        const angle = (i * 30) * (Math.PI / 180);
        const distance = 100 + Math.random() * 100;
        const endX = x + Math.cos(angle) * distance;
        const endY = y + Math.sin(angle) * distance;

        firework.style.setProperty('--end-x', endX + 'px');
        firework.style.setProperty('--end-y', endY + 'px');

        firework.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${endX - x}px, ${endY - y}px) scale(0)`, opacity: 0 }
        ], {
            duration: 1000 + Math.random() * 500,
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

function createAnimationCard(champion, position, isFinal = false) {
    const card = document.createElement('div');
    card.className = `animation-card${isFinal ? ' final-card' : ''}`;

    card.style.left = position.x + 'px';
    card.style.top = position.y + 'px';

    card.innerHTML = `
        <div class="champion-icon">${champion.icon}</div>
        <div class="champion-name">${champion.name}</div>
        <div class="love-message">${champion.message}</div>
    `;

    document.body.appendChild(card);

    setTimeout(() => {
        card.classList.add('show');
        if (isFinal) {
            card.classList.add('pulse-effect');
        }
    }, 100);

    return card;
}

function startAnimation() {
    if (isAnimating) return;
    isAnimating = true;

    const initialCard = document.getElementById('initialCard');
    initialCard.style.opacity = '0';
    initialCard.style.transform = 'scale(0.8)';

    const positions = [
        { x: window.innerWidth * 0.1, y: window.innerHeight * 0.2 },
        { x: window.innerWidth * 0.8, y: window.innerHeight * 0.1 },
        { x: window.innerWidth * 0.2, y: window.innerHeight * 0.7 },
        { x: window.innerWidth * 0.9, y: window.innerHeight * 0.8 },
        { x: window.innerWidth * 0.6, y: window.innerHeight * 0.3 }
    ];

    const allCards = [];

    // Criar cards dos campeões
    champions.forEach((champion, index) => {
        setTimeout(() => {
            const card = createAnimationCard(champion, positions[index]);
            allCards.push(card);

            // Remover card após um tempo
            setTimeout(() => {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    if (card.parentNode) {
                        card.parentNode.removeChild(card);
                    }
                }, 500);
            }, 2000);

        }, index * 800);
    });

    // Criar card final
    setTimeout(() => {
        const finalPosition = {
            x: window.innerWidth / 2 - 150,
            y: window.innerHeight / 2 - 100
        };

        const finalCard = createAnimationCard(finalMessage, finalPosition, true);

        // Iniciar fogos de artifício
        setTimeout(() => {
            createMultipleFireworks();

            // Repetir fogos periodicamente
            const fireworkInterval = setInterval(() => {
                createMultipleFireworks();
            }, 2000);

            // Parar fogos após 10 segundos
            setTimeout(() => {
                clearInterval(fireworkInterval);
            }, 10000);

        }, 500);

        // Reset após 15 segundos
        setTimeout(() => {
            finalCard.style.opacity = '0';
            finalCard.style.transform = 'scale(0.8)';
            setTimeout(() => {
                if (finalCard.parentNode) {
                    finalCard.parentNode.removeChild(finalCard);
                }
                // Restaurar card inicial
                initialCard.style.opacity = '1';
                initialCard.style.transform = 'scale(1)';
                isAnimating = false;
            }, 500);
        }, 15000);

    }, champions.length * 800 + 1000);
}

// Event listeners
document.getElementById('initialCard').addEventListener('mouseenter', startAnimation);

// Inicializar
window.addEventListener('load', () => {
    createStars();
});