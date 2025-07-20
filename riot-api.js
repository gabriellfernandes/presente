// Configurações da API da Riot Games
class RiotAPI {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseURL = 'https://br1.api.riotgames.com';
        this.datadragonURL = 'https://ddragon.leagueoflegends.com/cdn';
        this.currentVersion = '13.24.1'; // Atualizar conforme necessário
    }

    // Função auxiliar para CORS
    async fetchWithCORS(url) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }
        return await response.json();
    }

    // Obter conta por Riot ID (nome#tag)
    async getAccountByRiotId(gameName, tagLine) {
        try {
            const url = `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}?api_key=${this.apiKey}`;
            return await this.fetchWithCORS(url);
        } catch (error) {
            console.error('Erro ao buscar conta:', error);
            throw error;
        }
    }

    // Obter dados do invocador por PUUID
    async getSummonerByPuuid(puuid, region = 'br1') {
        try {
            const url = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${this.apiKey}`;
            return await this.fetchWithCORS(url);
        } catch (error) {
            console.error('Erro ao buscar invocador:', error);
            throw error;
        }
    }

    // Obter dados de ranked do jogador
    async getRankedData(puuid, region = 'br1') {
        try {
            const url = `https://${region}.api.riotgames.com/lol/league/v4/entries/by-puuid/${puuid}?api_key=${this.apiKey}`;
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`Erro ${response.status}: ${response.statusText}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Erro ao buscar dados ranqueados:', error);
            throw error;
        }
    }

    // Obter histórico de partidas
    async getMatchHistory(puuid, region = 'americas', count = 10) {
        try {
            const url = `https://${region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=${count}&api_key=${this.apiKey}`;
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`Erro ${response.status}: ${response.statusText}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Erro ao buscar histórico:', error);
            throw error;
        }
    }

    // Obter detalhes de uma partida específica
    async getMatchDetails(matchId, region = 'americas') {
        try {
            const url = `https://${region}.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${this.apiKey}`;
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`Erro ${response.status}: ${response.statusText}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Erro ao buscar detalhes da partida:', error);
            throw error;
        }
    }

    // Obter dados de todos os campeões
    async getChampionsData() {
        try {
            const url = `${this.datadragonURL}/${this.currentVersion}/data/pt_BR/champion.json`;
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`Erro ${response.status}: ${response.statusText}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Erro ao buscar dados dos campeões:', error);
            throw error;
        }
    }

    // Obter URL da imagem do campeão
    getChampionImageURL(championName) {
        return `${this.datadragonURL}/${this.currentVersion}/img/champion/${championName}.png`;
    }

    // Obter URL da imagem do perfil
    getProfileIconURL(profileIconId) {
        return `${this.datadragonURL}/${this.currentVersion}/img/profileicon/${profileIconId}.png`;
    }    // Obter dados de maestria de campeões
    async getChampionMastery(puuid, region = 'br1') {
        try {
            const url = `https://${region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}?api_key=${this.apiKey}`;
            return await this.fetchWithCORS(url);
        } catch (error) {
            console.error('Erro ao buscar maestria:', error);
            throw error;
        }
    }

    // Obter dados de todos os campeões
    async getChampionsData() {
        try {
            const url = `${this.datadragonURL}/${this.currentVersion}/data/pt_BR/champion.json`;
            return await this.fetchWithCORS(url);
        } catch (error) {
            console.error('Erro ao buscar dados dos campeões:', error);
            throw error;
        }
    }

    // Método simplificado para obter top campeões do jogador
    async getTopChampions(riotId) {
        try {
            // Separar nome e tag (exemplo: "Biscoito Meow#2233")
            const [gameName, tagLine] = riotId.split('#');
            
            // 1. Buscar conta por Riot ID
            const account = await this.getAccountByRiotId(gameName, tagLine);

            console.log('🔍 Conta encontrada:', account);
            
            // 2. Buscar dados do invocador
            const summoner = await this.getSummonerByPuuid(account.puuid);

            console.log('🔍 Invocador encontrado:', summoner);
            
            // 3. Buscar maestria de campeões
            const mastery = await this.getChampionMastery(summoner.puuid);
            
            // 4. Buscar dados dos campeões
            const championsData = await this.getChampionsData();

            // 5. pegar icones dos campeões
            const icons = Object.values(championsData.data).reduce((acc, champ) => {
                acc[champ.id] = this.getChampionImageURL(champ.name);

                return acc;
            }, {});
            
            // 6. Processar top 4 campeões
            const topChampions = mastery.slice(0, 4).map(champ => {
                const championInfo = Object.values(championsData.data).find(c => parseInt(c.key) === champ.championId);
                
                return {
                    name: championInfo ? championInfo.name : 'Desconhecido',
                    level: champ.championLevel,
                    points: champ.championPoints,
                    id: championInfo ? championInfo.id : null,
                    icon: icons[championInfo.id] || null
                };
            });

            console.log('🎮 Top campeões carregados:', topChampions);
            return topChampions;
            
        } catch (error) {
            console.error('❌ Erro ao buscar top campeões:', error);
            throw error;
        }
    }
}

// Exportar para uso global
window.RiotAPI = RiotAPI;
