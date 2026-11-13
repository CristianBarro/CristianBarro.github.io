// ============================================================
//  EDITE AQUI — todo o conteúdo do site sai deste arquivo.
// ============================================================
window.SITE = {
  nome: "Cristian",
  nick: "CHELO", // nick de zoeira dentro do jogo
  cargo: "Criador",
  frase: "Crio jogos, mods, assistentes de IA e edições de vídeo. E cuido dos servidores pra galera jogar junto.",
  discord: "",   // link de convite do Discord (vazio = nada de Discord aparece no site)
  youtube: "https://www.youtube.com/@foxytech7226",
  github: "https://github.com/CristianBarro",

  sobre: [
    "Sou o Cristian. Gosto de pegar uma ideia maluca e transformar em algo que funciona de verdade.",
    "Já fiz um RPG de terror submarino, o Under the Tragery, uma campanha de terror do Herobrine para Minecraft, meu próprio assistente de IA, o JARVIS, e várias edições de F1 e CS2.",
    "Nas horas vagas eu jogo CS2 como CHELO e preparo os servidores onde a galera vai se encontrar.",
  ],
  fatos: [
    { valor: "7", rotulo: "Projetos" },
    { valor: "3", rotulo: "Para baixar" },
    { valor: "3", rotulo: "Edições publicadas" },
    { valor: "∞", rotulo: "Ideias na fila" },
  ],

  // O que eu faço (aparece na página inicial)
  oQueFaco: [
    { titulo: "Jogos", texto: "Under the Tragery, um RPG 2D de terror, e Squad Strike, um FPS tático 5v5." },
    { titulo: "Mods", texto: "The Hollow Scripture, uma campanha de terror do Herobrine para Minecraft." },
    { titulo: "Código", texto: "O JARVIS, meu assistente de IA, e o Absolute Launcher para Minecraft." },
    { titulo: "Edição", texto: "Edits de F1 e fragmovies de CS2 no ritmo da música." },
  ],

  // img: capa em img/ · status: "disponivel" | "dev"
  // downloads: botões de baixar (só executáveis, sem código-fonte)
  projetos: [
    {
      titulo: "Under the Tragery",
      sub: "O Mar Ainda Lembra",
      tag: "Jogo · RPG 2D",
      img: "img/under-the-tragery.jpg",
      status: "disponivel",
      versao: "1.5.0",
      texto: "RPG 2D de exploração submarina, sobrevivência e terror psicológico. Prólogo, três atos, três finais e o modo Vida em Atlântida, com moradia, calendário, romance e família.",
      itens: ["Windows", "Android", "Offline", "3 finais"],
      downloads: [
        { label: "Windows", info: ".exe · 112 MB", url: "https://github.com/CristianBarro/under-the-tragery/releases/download/v1.5.0/Under-the-Tragery-Windows-1.5.0.exe" },
        { label: "Android", info: ".apk · 4,7 MB", url: "https://github.com/CristianBarro/under-the-tragery/releases/download/v1.5.0/Under-the-Tragery-Android-1.5.0.apk" },
      ],
      repo: "https://github.com/CristianBarro/under-the-tragery",
    },
    {
      titulo: "The Hollow Scripture",
      sub: "A Escritura Oca",
      tag: "Mod · Minecraft",
      img: "img/hollow-scripture.jpg",
      status: "disponivel",
      versao: "0.22.0 (dev)",
      texto: "Campanha de terror e RPG para Minecraft. O Santo Sem Nome que a Ordem do Último Sino tentou manter adormecido é o Herobrine. Prólogo, capítulos I a VIII, quatro finais e pós-game.",
      itens: ["Minecraft 1.20.1", "NeoForge", "Herobrine", "4 finais"],
      downloads: [
        { label: "Baixar mod", info: ".jar · 34 MB", url: "https://github.com/CristianBarro/the-hollow-scripture/releases/download/v0.22.0/hollowscripture-0.22.0-conteudo-funcional-dev.jar" },
      ],
      repo: "https://github.com/CristianBarro/the-hollow-scripture",
    },
    {
      titulo: "JARVIS",
      sub: "Assistente de IA",
      tag: "IA · Desktop",
      img: "img/jarvis.jpg",
      status: "dev",
      texto: "Assistente de IA para Windows que roda com modelos locais pelo LM Studio. Conversa e fala em português, cuida da agenda, cria lembretes e tarefas e também funciona com APIs.",
      itens: ["IA local", "Voz em PT-BR", "Agenda", "Lembretes"],
    },
    {
      titulo: "Squad Strike",
      sub: "FPS tático 5v5",
      tag: "Jogo · FPS",
      img: "img/squad-strike.jpg",
      status: "dev",
      texto: "FPS tático competitivo 5 contra 5, por rodadas, com economia, carga para plantar e desarmar, bots e multiplayer online com servidor próprio. Tudo original, feito na Unity.",
      itens: ["5v5", "Unity", "Multiplayer", "Bots"],
    },
    {
      titulo: "Absolute Launcher",
      sub: "Launcher de Minecraft",
      tag: "App · Minecraft",
      img: "img/absolute-launcher.jpg",
      status: "disponivel",
      versao: "0.1.0",
      texto: "Launcher de Minecraft Java leve, feito em Tauri e Rust. Instâncias separadas, Fabric, Forge e NeoForge, mods do Modrinth direto pelo app e pacote de desempenho em um clique.",
      itens: ["Windows", "Fabric/Forge/NeoForge", "Modrinth", "Leve"],
      downloads: [
        { label: "Instalador", info: ".exe · 2,5 MB", url: "https://github.com/CristianBarro/absolute-launcher/releases/download/v0.1.0/Absolute-Launcher-0.1.0-setup.exe" },
        { label: "Portátil", info: ".exe · 7,3 MB", url: "https://github.com/CristianBarro/absolute-launcher/releases/download/v0.1.0/Absolute-Launcher-0.1.0-portatil.exe" },
      ],
      repo: "https://github.com/CristianBarro/absolute-launcher",
    },
    {
      titulo: "Edições de vídeo",
      sub: "F1 e CS2",
      tag: "Vídeo · Edit",
      img: "img/edicoes.jpg",
      status: "disponivel",
      texto: "Edits de Fórmula 1 e fragmovies de CS2 com cortes no ritmo da música, efeitos e transições.",
      itens: ["F1", "Fragmovie", "YouTube"],
      link: "videos.html",
      linkLabel: "Assistir",
    },
    {
      titulo: "Este site",
      sub: "Portfólio",
      tag: "Web",
      visual: "web",
      status: "disponivel",
      texto: "Meu portfólio, feito do zero com HTML, CSS e JavaScript puro, cheio de animações.",
      itens: ["HTML", "CSS", "JavaScript"],
    },
  ],

  // Vídeos do YouTube: só trocar o id (o que vem depois de ?v=)
  videos: [
    { id: "T9TKh5sGg9k", titulo: "Camara Estreia Qualy Thunderstruck", tag: "F1 · Edit" },
    { id: "pfqBG9F7co0", titulo: "CS2 Superman Fragmovie", tag: "CS2 · Fragmovie" },
    { id: "uTB7DdFU8Ss", titulo: "F1 2027 O Tempo passa mas o Brasil Permanece!", tag: "F1 · Edit" },
  ],

  hobbies: [
    { icone: "🎬", titulo: "Edição de vídeo", texto: "Montar edits no ritmo da música é terapia." },
    { icone: "💻", titulo: "Programação", texto: "Criar ferramentas, bots e IAs como o Jarvis." },
    { icone: "⛏️", titulo: "Minecraft & mods", texto: "Criar mods e contar histórias de terror dentro do jogo." },
    { icone: "🏎️", titulo: "Fórmula 1", texto: "Acompanhar as corridas e transformar em edit." },
    { icone: "🎯", titulo: "Counter-Strike 2", texto: "Premier e competitivo como CHELO. Stats logo abaixo." },
    { icone: "🎧", titulo: "Música", texto: "Trilha sonora de toda edição e de toda partida." },
  ],

  // Stats CS2 — fonte: csstats.gg/player/76561199433128268
  steamId: "76561199433128268",
  cs2: {
    periodo: "Últimos 6 meses · 5v5",
    premier: { atual: 18037, melhor: 18582, vitoriasTemporada: 53, temporada: "Season 5" },
    temporadas: [
      { nome: "S3 · 2025", vitorias: 142, atual: 16792, melhor: 17927 },
      { nome: "S4 · 2026", vitorias: 58, atual: 14831, melhor: 19866 },
      { nome: "S5 · 2026", vitorias: 53, atual: 18037, melhor: 18582 },
    ],
    gerais: [
      { rotulo: "K/D", valor: 1.13, decimais: 2 },
      { rotulo: "HLTV Rating", valor: 1.2, decimais: 2 },
      { rotulo: "ADR", valor: 83 },
      { rotulo: "HS %", valor: 50, sufixo: "%" },
      { rotulo: "Win Rate", valor: 49, sufixo: "%" },
      { rotulo: "Partidas", valor: 272 },
    ],
    detalhes: [
      { rotulo: "Kills", valor: 4642 },
      { rotulo: "Mortes", valor: 4126 },
      { rotulo: "Assists", valor: 1276 },
      { rotulo: "Headshots", valor: 2325 },
      { rotulo: "Dano total", valor: 483159 },
      { rotulo: "Rounds", valor: 5837 },
      { rotulo: "Vitórias", valor: 133 },
      { rotulo: "KAST", valor: 74, sufixo: "%" },
      { rotulo: "Clutch 1vX", valor: 19, sufixo: "%" },
      { rotulo: "Entry success", valor: 53, sufixo: "%" },
    ],
    clutches: [
      { nome: "1v1", pct: 74, wl: "84V / 30D" },
      { nome: "1v2", pct: 20, wl: "31V / 121D" },
      { nome: "1v3", pct: 6, wl: "12V / 173D" },
      { nome: "1v4", pct: 2, wl: "3V / 135D" },
      { nome: "1v5", pct: 0, wl: "0V / 82D" },
    ],
    mapas: [
      { nome: "Dust2", valor: 83 },
      { nome: "Mirage", valor: 70 },
      { nome: "Inferno", valor: 30 },
      { nome: "Nuke", valor: 25 },
    ],
    // Confira os nomes das armas no csstats (aba WEAPONS) e ajuste se precisar
    armas: [
      { nome: "AK-47", valor: 1746 },
      { nome: "M4A1-S", valor: 670 },
      { nome: "SMG", valor: 497 },
      { nome: "Pistola", valor: 246 },
    ],
    outrosModos: [
      { nome: "Competitivo", vitorias: 321 },
      { nome: "Wingman", vitorias: 98 },
      { nome: "CS:GO (legado)", vitorias: 62 },
    ],
  },

  trofeus: [
    { nome: "Primeiro campeonato", dica: "Vencer um torneio" },
    { nome: "Jarvis 2.0", dica: "Lançar a próxima versão" },
    { nome: "Mod em destaque", dica: "Under the Tragedy bombar" },
    { nome: "20.000 Premier", dica: "Bater 20k no CS2" },
  ],

  // ---------- Servidores (kit em E:\servidores) ----------
  // Depois de rodar o install.sh na VPS, cole aqui o que ele mostrar no final:
  // Vazio = IP não aparece no site (o status ao vivo continua)
  servidoresIP: "",
  statusUrl: "https://status.badlands.info/status",

  // id: chave no status ao vivo · porta: vazio = 25565 · entrar: comando dentro da rede
  servidores: [
    {
      id: "cs2",
      nome: "5v5 Competitivo",
      jogo: "CS2",
      categoria: "cs2",
      porta: 27015,
      infos: ["5v5", "MR12", "Prorrogação", "10 slots"],
    },
    {
      id: "survival",
      nome: "Survival",
      jogo: "Minecraft",
      categoria: "minecraft",
      entrar: "/server survival",
      infos: ["Vanilla", "Versão 26.3", "Sobrevivência"],
    },
    {
      id: "bedwars",
      nome: "BedWars",
      jogo: "Minecraft",
      categoria: "minecraft",
      entrar: "/server bedwars",
      infos: ["Times", "Proteja sua cama", "Versão 26.3"],
    },
    {
      id: "criativo",
      nome: "Criativo",
      jogo: "Minecraft",
      categoria: "minecraft",
      entrar: "/server criativo",
      infos: ["Construção livre", "WorldEdit", "Versão 26.3"],
    },
    {
      id: "hollow",
      nome: "The Hollow Scripture",
      jogo: "Minecraft",
      categoria: "minecraft",
      porta: 25566,
      infos: ["Campanha do Herobrine", "1.20.1 + NeoForge", "Precisa do mod"],
      extra: { label: "Baixar o mod", url: "projetos.html#the-hollow-scripture" },
    },
    {
      nome: "Próximo jogo",
      jogo: "Outros",
      categoria: "outros",
      breve: true,
      infos: ["Mais jogos chegando"],
    },
  ],

  redes: [
    { nome: "YouTube", link: "https://www.youtube.com/@foxytech7226" },
    { nome: "GitHub", link: "https://github.com/CristianBarro" },
    { nome: "Steam", link: "https://steamcommunity.com/profiles/76561199433128268" },
    { nome: "csstats", link: "https://csstats.gg/player/76561199433128268" },
  ],
};
