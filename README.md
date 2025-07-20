# 🎮 Projeto de Aniversário com Integração League of Legends

Um projeto especial de aniversário que combina animações românticas com dados reais do League of Legends através da Riot Games API.

## ✨ Funcionalidades

### Animação Original
- Animação interativa de aniversário
- Estrelas piscando
- Fogos de artifício
- Cards com mensagens de amor
- Tema League of Legends

### Nova Integração Riot API
- 🎯 Conexão com a API oficial da Riot Games
- 📊 Exibição de dados do jogador em tempo real
- 🏆 Informações de rank (Solo/Duo e Flex)
- ⭐ Top 5 campeões com maestria
- 🖼️ Imagens reais dos campeões
- 💾 Salvamento automático das configurações

## 🚀 Como Usar

### 1. Obter API Key da Riot Games
1. Acesse [Riot Developer Portal](https://developer.riotgames.com/)
2. Faça login com sua conta Riot
3. Vá para "PERSONAL API KEY"
4. Copie sua API Key (válida por 24 horas)

### 2. Configurar o Projeto
1. Abra o arquivo `index.html` no navegador
2. No painel "League of Legends API":
   - Cole sua API Key no primeiro campo
   - Digite o nome do invocador no segundo campo
   - Clique em "Conectar API"
   - Clique em "Carregar Dados"

### 3. Usar a Animação
- Passe o mouse sobre o card central para iniciar a animação
- Os campeões mostrados serão baseados nos dados reais do jogador
- As configurações ficam salvas para próximas sessões

## 📁 Estrutura do Projeto

```
projeto/
├── index.html              # Página principal
├── style.css              # Estilos da animação original
├── riot-styles.css        # Estilos da integração Riot API
├── script.js              # Lógica principal e animações
├── riot-api.js            # Classe para comunicação com Riot API
├── riot-integration.js    # Integração entre API e interface
└── README.md              # Este arquivo
```

## 🔧 Principais Classes e Funções

### RiotAPI
- `getSummonerByName()` - Buscar dados do invocador
- `getRankedData()` - Informações de rank
- `getChampionMastery()` - Maestria dos campeões
- `getMatchHistory()` - Histórico de partidas
- `getChampionsData()` - Dados de todos os campeões

### RiotGameIntegration
- `initialize()` - Configurar API
- `loadPlayerData()` - Carregar dados completos
- `displayPlayerData()` - Mostrar na interface
- `enhanceChampionsWithRiotData()` - Integrar com animação

## 🎨 Personalização

### Modificar Mensagens
Edite o array `champions` em `script.js` para personalizar as mensagens.

### Alterar Visual
- `style.css` - Estilos da animação principal
- `riot-styles.css` - Estilos dos dados do LoL

### Adicionar Funcionalidades
- Histórico detalhado de partidas
- Comparação entre jogadores
- Estatísticas avançadas
- Integração com outros jogos Riot

## 🌟 Funcionalidades Avançadas

### Auto-salvamento
- API Key e nome do invocador ficam salvos no navegador
- Carregamento automático na próxima visita

### Tratamento de Erros
- Mensagens de erro amigáveis
- Validação de dados de entrada
- Fallback para dados offline

### Responsivo
- Interface adaptável para mobile
- Otimizado para diferentes tamanhos de tela

## 🚨 Limitações da API

- **Development API Key**: Válida por 24 horas
- **Rate Limit**: 100 requests por 2 minutos
- **Regiões**: Configurado para Brasil (BR1)
- **CORS**: Pode precisar de servidor local para desenvolvimento

## 💡 Dicas de Uso

1. **Primeira vez**: Configure a API antes de usar a animação
2. **API Key expirada**: Gere uma nova no portal da Riot
3. **Nome não encontrado**: Verifique se o invocador existe na região BR
4. **Dados não carregam**: Verifique console do navegador para erros

## 🎁 Personalização Romântica

O projeto combina:
- 💖 Mensagens de amor personalizadas
- 🎮 Paixão por League of Legends
- ✨ Dados reais do jogo
- 🎂 Celebração de aniversário

Perfeito para surpreender alguém especial que ama LoL! 

---

Feito com ❤️ para uma pessoa muito especial! 🎉
