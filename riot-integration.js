// Configurações e utilitários para integração com Riot API
class RiotGameIntegration {
    constructor() {
        this.riotAPI = null;
        this.currentPlayerData = null;
        this.isLoaded = false;
    }

    // Inicializar com a chave da API
    initialize(apiKey) {
        this.riotAPI = new RiotAPI(apiKey);
        this.isLoaded = true;
        console.log('🎮 Riot API inicializada com sucesso!');
    }

    // Verificar se a API está configurada
    isInitialized() {
        return this.isLoaded && this.riotAPI !== null;
    }

    // Buscar e exibir dados do jogador
    async loadPlayerData(summonerName) {
        if (!this.isInitialized()) {
            throw new Error('API da Riot não foi inicializada. Use initialize(apiKey) primeiro.');
        }

        try {
            console.log(`🔍 Buscando dados para: ${summonerName}...`);
            
            // Mostrar loading
            this.showLoading();
            
            const playerData = await this.riotAPI.getPlayerFullData(summonerName);
            this.currentPlayerData = playerData;
            
            // Buscar dados dos campeões para nomes
            const championsData = await this.riotAPI.getChampionsData();
            
            // Processar dados
            const processedData = this.processPlayerData(playerData, championsData);
            
            // Esconder loading
            this.hideLoading();
            
            // Exibir dados na interface
            this.displayPlayerData(processedData);
            
            console.log('✅ Dados carregados com sucesso!', processedData);
            
            return processedData;
            
        } catch (error) {
            this.hideLoading();
            console.error('❌ Erro ao carregar dados:', error);
            this.showError(error.message);
            throw error;
        }
    }

    // Processar dados do jogador
    processPlayerData(playerData, championsData) {
        const { summoner, rankedData, mastery, matchHistory } = playerData;
        
        // Processar dados ranqueados
        const soloQueue = rankedData.find(queue => queue.queueType === 'RANKED_SOLO_5x5');
        const flexQueue = rankedData.find(queue => queue.queueType === 'RANKED_FLEX_SR');
        
        // Processar maestria dos campeões
        const championsList = championsData.data;
        const topChampions = mastery.map(champ => {
            const championInfo = Object.values(championsList).find(c => parseInt(c.key) === champ.championId);
            return {
                ...champ,
                name: championInfo ? championInfo.name : 'Desconhecido',
                id: championInfo ? championInfo.id : null,
                image: championInfo ? this.riotAPI.getChampionImageURL(championInfo.id) : null
            };
        });

        return {
            summoner: {
                name: summoner.name,
                level: summoner.summonerLevel,
                profileIcon: this.riotAPI.getProfileIconURL(summoner.profileIconId)
            },
            ranked: {
                soloQueue: soloQueue ? {
                    tier: soloQueue.tier,
                    rank: soloQueue.rank,
                    points: soloQueue.leaguePoints,
                    wins: soloQueue.wins,
                    losses: soloQueue.losses
                } : null,
                flexQueue: flexQueue ? {
                    tier: flexQueue.tier,
                    rank: flexQueue.rank,
                    points: flexQueue.leaguePoints,
                    wins: flexQueue.wins,
                    losses: flexQueue.losses
                } : null
            },
            topChampions,
            totalMatches: matchHistory.length
        };
    }

    // Exibir dados na interface
    displayPlayerData(data) {
        const container = document.getElementById('riotDataContainer') || this.createDataContainer();
        
        container.innerHTML = `
            <div class="riot-player-card">
                <div class="player-header">
                    <img src="${data.summoner.profileIcon}" alt="Profile Icon" class="profile-icon">
                    <div class="player-info">
                        <h3>${data.summoner.name}</h3>
                        <p>Nível ${data.summoner.level}</p>
                    </div>
                </div>
                
                <div class="ranked-info">
                    <h4>🏆 Dados Ranqueados</h4>
                    ${this.getRankedHTML(data.ranked.soloQueue, 'Solo/Duo')}
                    ${this.getRankedHTML(data.ranked.flexQueue, 'Flex')}
                </div>
                
                <div class="mastery-info">
                    <h4>⭐ Top 5 Campeões</h4>
                    <div class="champions-grid">
                        ${data.topChampions.map(champ => `
                            <div class="champion-mastery">
                                <img src="${champ.image}" alt="${champ.name}" class="champion-img">
                                <div class="mastery-details">
                                    <p class="champion-name">${champ.name}</p>
                                    <p class="mastery-level">Nível ${champ.championLevel}</p>
                                    <p class="mastery-points">${champ.championPoints.toLocaleString()} pontos</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    // Gerar HTML para dados ranqueados
    getRankedHTML(rankData, queueType) {
        if (!rankData) {
            return `<p>${queueType}: Não ranqueado</p>`;
        }
        
        const winRate = Math.round((rankData.wins / (rankData.wins + rankData.losses)) * 100);
        
        return `
            <div class="rank-queue">
                <p><strong>${queueType}:</strong> ${rankData.tier} ${rankData.rank} (${rankData.points} LP)</p>
                <p>Vitórias: ${rankData.wins} | Derrotas: ${rankData.losses} | Taxa de Vitória: ${winRate}%</p>
            </div>
        `;
    }

    // Criar container para dados
    createDataContainer() {
        const container = document.createElement('div');
        container.id = 'riotDataContainer';
        container.className = 'riot-data-container';
        document.body.appendChild(container);
        return container;
    }

    // Mostrar loading
    showLoading() {
        const loading = document.getElementById('loadingSpinner') || this.createLoadingSpinner();
        loading.style.display = 'flex';
    }

    // Esconder loading
    hideLoading() {
        const loading = document.getElementById('loadingSpinner');
        if (loading) {
            loading.style.display = 'none';
        }
    }

    // Criar spinner de loading
    createLoadingSpinner() {
        const spinner = document.createElement('div');
        spinner.id = 'loadingSpinner';
        spinner.className = 'loading-spinner';
        spinner.innerHTML = `
            <div class="spinner"></div>
            <p>Carregando dados do League of Legends...</p>
        `;
        spinner.style.display = 'none';
        document.body.appendChild(spinner);
        return spinner;
    }

    // Mostrar erro
    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `
            <p>❌ Erro: ${message}</p>
            <button onclick="this.parentElement.remove()">Fechar</button>
        `;
        document.body.appendChild(errorDiv);
        
        // Remover após 5 segundos
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 5000);
    }

    // Integrar com as animações existentes
    enhanceChampionsWithRiotData() {
        if (!this.currentPlayerData || !this.currentPlayerData.topChampions) {
            console.log('Dados do jogador não disponíveis para integração');
            return;
        }

        // Atualizar array de campeões com dados reais
        const realChampions = this.currentPlayerData.topChampions.slice(0, 5);
        
        // Substituir campeões existentes por dados reais
        champions.length = 0; // Limpar array existente
        
        realChampions.forEach(champ => {
            champions.push({
                name: champ.name,
                icon: `<img src="${champ.image}" alt="${champ.name}" style="width: 60px; height: 60px; border-radius: 50%;">`,
                message: `${champ.name} é um dos seus campeões favoritos! Nível ${champ.championLevel} de maestria ⭐`
            });
        });

        console.log('🎮 Campeões atualizados com dados reais da Riot API!');
    }
}

// Criar instância global
window.riotIntegration = new RiotGameIntegration();
