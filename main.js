(() => {
  const S = window.SITE;
  const C = S.cs2;
  const PAGE = document.body.dataset.page || "home";
  // Discord só aparece com um convite de verdade
  const temDiscord = /^https?:\/\/(discord\.gg|discord\.com\/invite)\/(?!seu-convite)[\w-]+/.test(S.discord || "");
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const fmt = (n, d = 0) => n.toLocaleString("pt-BR", { minimumFractionDigits: d, maximumFractionDigits: d });
  const pad = (n) => String(n).padStart(2, "0");
  const slug = (t) => t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const touch = matchMedia("(hover: none)").matches;

  const NAV = [
    { id: "home", href: "index.html", label: "Início" },
    { id: "projetos", href: "projetos.html", label: "Projetos" },
    { id: "videos", href: "videos.html", label: "Vídeos" },
    { id: "hobbies", href: "hobbies.html", label: "Hobbies" },
    { id: "servidores", href: "servidores.html", label: "Servidores" },
    { id: "sobre", href: "sobre.html", label: "Sobre" },
  ];

  /* =========================================================
     PEDAÇOS REUTILIZÁVEIS
     ========================================================= */
  const split = (txt) => `<span class="split" aria-label="${txt}">${[...txt].map((c, i) => c === " " ? `<span class="sp"> </span>` : `<span class="c" style="--i:${i}">${c}</span>`).join("")}</span>`;
  const star = `<svg viewBox="0 0 24 24" class="ico-star"><path d="M12 2l2.6 7.4H22l-6 4.6 2.3 7.4L12 17l-6.3 4.4L8 14 2 9.4h7.4z" fill="none" stroke="currentColor" stroke-width="1"/></svg>`;
  const divider = `<div class="divider reveal"><span></span><i>${star}</i><span></span></div>`;
  const arrow = `<svg viewBox="0 0 24 24" class="ico-arrow"><path d="M4 12h15m-6-6 6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>`;

  const head = (num, title, desc = "", link = "") => `
    <div class="shead">
      <div>
        <p class="eyebrow reveal">${num}</p>
        <h2 class="stitle">${split(title)}</h2>
        ${desc ? `<p class="sdesc reveal">${desc}</p>` : ""}
      </div>
      ${link ? `<a class="more reveal" href="${link.href}">${link.label} ${arrow}</a>` : ""}
    </div>`;

  const pageHero = (crumb, title, sub) => `
    <section class="phero">
      <p class="crumb reveal"><a href="index.html">Início</a> <span>/</span> ${crumb}</p>
      <h1 class="phero__title metal">${split(title)}</h1>
      <p class="phero__sub reveal">${sub}</p>
      ${divider}
    </section>`;

  const viz = {
    jarvis: `<div class="v-jarvis"><i></i><i></i><i></i><b></b><span>J.A.R.V.I.S</span></div>`,
    herobrine: `<div class="v-hero"><div class="v-hero__head"><i></i><i></i></div><div class="v-hero__fog"></div><span>UNDER THE TRAGEDY</span></div>`,
    video: `<div class="v-video"><div class="v-video__wave">${"<i></i>".repeat(28)}</div><div class="v-video__tl"><i></i><i></i><i></i><i></i></div><b class="v-video__rec">● REC</b></div>`,
    server: `<div class="v-server"><p>&gt; iniciando servidor 5v5...</p><p>&gt; carregando plugins <b>OK</b></p><p>&gt; minecraft online <b>OK</b></p><p>&gt; status: <b>ONLINE</b><i></i></p></div>`,
    web: `<div class="v-web"><div class="v-web__bar"><i></i><i></i><i></i></div><div class="v-web__body"><b></b><span></span><span></span><span></span></div></div>`,
  };

  const cover = (p) => p.img
    ? `<div class="cover"><img src="${p.img}" alt="${p.titulo}" loading="lazy"><span class="cover__shine"></span></div>`
    : viz[p.visual] || viz.web;
  const badge = (p) => p.status === "dev" ? `<em class="badge badge--dev">Em desenvolvimento</em>` : p.downloads ? `<em class="badge badge--dl">Download</em>` : `<em class="badge">Online</em>`;
  const projLink = (p) => p.link || `projetos.html#${slug(p.titulo)}`;
  const card = (p) => `
    <a class="card reveal" href="${projLink(p)}">
      <div class="card__top"><span>${p.tag}</span>${badge(p)}</div>
      <div class="card__viz">${cover(p)}</div>
      <h3>${p.titulo}</h3>
      <p>${p.texto}</p>
      <div class="card__foot"><span>${(p.itens || []).slice(0, 2).join(" · ")}</span><b>Detalhes ${arrow}</b></div>
    </a>`;

  const thumb = (id) => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
  const vcard = (v, i) => `
    <button class="vcard reveal" data-video="${i}">
      <span class="vcard__img"><img src="${thumb(v.id)}" alt="" loading="lazy" onerror="this.onerror=null;this.src='https://i.ytimg.com/vi/${v.id}/hqdefault.jpg'"><span class="play">▶</span></span>
      <span class="vcard__tag">${v.tag}</span>
      <span class="vcard__t">${v.titulo}</span>
    </button>`;

  const marquee = (words) => {
    const row = words.map((w) => `<span>${w}</span><i>✦</i>`).join("");
    return `<div class="marquee"><div class="marquee__track">${row}${row}</div></div>`;
  };

  const numbered = (items) => `
    <div class="numbered">
      ${items.map((it, i) => `<div class="num reveal">
        <span class="num__n">${pad(i + 1)}</span>
        <div><h3>${it.titulo}</h3><span class="num__line"></span><p>${it.texto}</p></div>
      </div>`).join("")}
    </div>`;

  const cta = (title, text) => `
    <section class="cta sec">
      ${divider}
      <h2 class="cta__title metal">${split(title)}</h2>
      <p class="sdesc reveal">${text}</p>
      <div class="btns reveal"><a class="btn btn--solid" href="servidores.html">Entrar nos servidores</a>${temDiscord ? `<a class="btn" href="${S.discord}" target="_blank" rel="noopener">Discord</a>` : ""}</div>
    </section>`;

  /* =========================================================
     LAYOUT COMPARTILHADO
     ========================================================= */
  function chrome() {
    const navLinks = NAV.map((n, i) => `<a href="${n.href}" class="${n.id === PAGE ? "active" : ""}"><i>${pad(i + 1)}</i><span>${n.label}</span></a>`).join("");
    document.body.insertAdjacentHTML("afterbegin", `
      <div class="curtain" id="curtain"><span class="curtain__mark">C</span></div>
      <canvas id="bg"></canvas>
      <div class="vignette"></div>
      <div class="cursor" id="cursor"></div><div class="cursor-dot" id="cursorDot"></div>
      <div class="progress" id="progress"></div>
      <header class="hdr" id="hdr">
        <a href="index.html" class="brand"><span class="brand__mark">C</span><span class="brand__txt">${S.nome}<small>${S.cargo}</small></span></a>
        <nav class="hdr__nav">${navLinks}</nav>
        ${temDiscord ? `<a href="${S.discord}" class="hdr__cta" target="_blank" rel="noopener"><span></span>Entrar no Discord</a>` : `<a href="servidores.html" class="hdr__cta"><span></span>Jogar agora</a>`}
        <button class="burger" id="burger" aria-label="Menu"><span></span><span></span></button>
      </header>
      <div class="menu" id="menu">${navLinks}</div>`);
    document.body.insertAdjacentHTML("beforeend", `
      <footer class="ftr">
        ${divider}
        <h2 class="ftr__big metal">${S.nome}</h2>
        <nav class="ftr__nav">${NAV.map((n) => `<a href="${n.href}">${n.label}</a>`).join("")}</nav>
        <div class="ftr__social">${S.redes.filter((r) => /^https?:\/\//.test(r.link) && !/seu-convite/.test(r.link)).map((r) => `<a class="btn" href="${r.link}" target="_blank" rel="noopener">${r.nome}</a>`).join("")}</div>
        <p class="ftr__copy">© ${new Date().getFullYear()} ${S.nome} · a.k.a. ${S.nick} no jogo</p>
      </footer>
      <div class="toast" id="toast"></div>
      <div class="modal" id="modal"><div class="modal__box"><button class="modal__x" id="modalX" aria-label="Fechar">✕</button><div class="modal__frame" id="modalFrame"></div></div></div>`);
  }

  /* =========================================================
     PÁGINAS
     ========================================================= */
  const pages = {
    home() {
      return `
      <section class="hero">
        <p class="eyebrow reveal">✦ ${S.cargo} · Dev · Editor · Gamer ✦</p>
        <h1 class="hero__title metal">${split(S.nome)}</h1>
        <p class="hero__aka reveal">a.k.a. <b>${S.nick}</b> — só dentro do jogo</p>
        <p class="hero__sub reveal">${S.frase}</p>
        <div class="btns reveal"><a class="btn btn--solid" href="projetos.html">Ver projetos</a><a class="btn" href="projetos.html#under-the-tragery">Baixar jogos</a></div>
        <div class="hero__tags reveal">${["Under the Tragery", "The Hollow Scripture", "JARVIS", "Squad Strike"].map((t) => `<span>${t}</span>`).join("<i>·</i>")}</div>
        <a href="#destaques" class="scroll-hint" aria-label="Rolar"><span></span></a>
      </section>

      <section class="sec" id="destaques">
        ${head("Projetos", "Em destaque", "Dois jogos prontos para baixar e o meu assistente de IA.", { href: "projetos.html", label: "Ver todos" })}
        <div class="cards">${S.projetos.slice(0, 3).map(card).join("")}</div>
      </section>

      ${marquee(["Under the Tragery", "The Hollow Scripture", "JARVIS", "Squad Strike", "Absolute Launcher", "Edits de F1", "Fragmovies", "Minecraft"])}

      <section class="sec">
        ${head("Edições", "Últimos vídeos", "Edits de Fórmula 1 e fragmovies de CS2.", { href: "videos.html", label: "Ver vídeos" })}
        <div class="vgrid">${S.videos.map(vcard).join("")}</div>
      </section>

      <section class="sec">
        ${head("O que eu faço", "Por que eu")}
        ${numbered(S.oQueFaco)}
      </section>

      ${cta("Bora jogar junto", "Os servidores 5v5 de CS2 e de Minecraft estão abertos. Bora jogar!")}`;
    },

    projetos() {
      return `
      ${pageHero("Projetos", "Projetos", "Jogos, mods, IA, apps e edições. Os que estão prontos você já pode baixar.")}
      <section class="sec">
        <div class="features">
          ${S.projetos.map((p, i) => `
            <article class="feature reveal ${i % 2 ? "feature--flip" : ""}" id="${slug(p.titulo)}">
              <div class="feature__viz">${cover(p)}</div>
              <div class="feature__body">
                <span class="feature__n">${pad(i + 1)}</span>
                <div class="feature__tags"><span class="tag">${p.tag}</span>${badge(p)}${p.versao ? `<span class="ver">v${p.versao}</span>` : ""}</div>
                <h3>${p.titulo}</h3>
                ${p.sub ? `<p class="feature__sub">${p.sub}</p>` : ""}
                <p>${p.texto}</p>
                <ul>${(p.itens || []).map((t) => `<li>${t}</li>`).join("")}</ul>
                <div class="feature__actions">
                  ${(p.downloads || []).map((d) => `<a class="btn btn--solid dl" href="${d.url}" rel="noopener"><svg viewBox="0 0 24 24"><path d="M12 3v12m-5-5 5 5 5-5M4 20h16" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>${d.label}<small>${d.info}</small></a>`).join("")}
                  ${p.repo ? `<a class="btn" href="${p.repo}" target="_blank" rel="noopener">GitHub</a>` : ""}
                  ${p.link ? `<a class="btn" href="${p.link}">${p.linkLabel || "Ver"}</a>` : ""}
                  ${p.status === "dev" ? `<span class="soon">✦ Ainda não disponível para download</span>` : ""}
                </div>
                ${p.downloads ? `<p class="feature__note">Só o executável. O código-fonte ainda não foi publicado.</p>` : ""}
              </div>
            </article>`).join("")}
        </div>
      </section>
      ${cta("Tem uma ideia", "Quer trocar ideia sobre algum projeto ou fazer algo junto? Me chama nas redes.")}`;
    },

    videos() {
      const v = S.videos[0];
      return `
      ${pageHero("Vídeos", "Edições", "Edits de Fórmula 1 e fragmovies de CS2. Clique para assistir aqui mesmo.")}
      <section class="sec">
        <div class="player reveal" id="player">
          <button class="player__screen" data-video="0" id="playerBtn">
            <img id="playerImg" src="${thumb(v.id)}" alt="" onerror="this.onerror=null;this.src='https://i.ytimg.com/vi/${v.id}/hqdefault.jpg'">
            <span class="play play--big">▶</span>
          </button>
          <div class="player__info">
            <span class="tag" id="playerTag">${v.tag}</span>
            <h3 id="playerTitle">${v.titulo}</h3>
            <a class="more" href="${S.youtube}" target="_blank" rel="noopener">Canal no YouTube ${arrow}</a>
          </div>
        </div>
        <div class="vgrid vgrid--list">${S.videos.map(vcard).join("")}</div>
      </section>
      ${marquee(["Thunderstruck", "Fragmovie", "F1", "CS2", "Edits", "Transições", "Ritmo"])}
      ${cta("Curtiu as edições", "Se inscreve no canal e acompanha os próximos vídeos.")}`;
    },

    hobbies() {
      const circ = 2 * Math.PI * 34;
      const maxR = Math.max(...C.temporadas.map((t) => t.melhor), 20000);
      const bars = (list, label) => {
        const max = Math.max(...list.map((x) => x.valor));
        return list.map((x, i) => `<div class="bar reveal"><span class="bar__i">${pad(i + 1)}</span><span class="bar__name">${x.nome}</span><div class="bar__track"><i style="--w:${x.valor / max}"></i></div><span class="bar__val">${fmt(x.valor)} <small>${label}</small></span></div>`).join("");
      };
      return `
      ${pageHero("Hobbies", "Hobbies", "O que eu faço quando não estou criando alguma coisa nova.")}
      <section class="sec">
        <div class="hobbies">
          ${S.hobbies.map((h, i) => `<article class="hobby reveal"><span class="hobby__n">${pad(i + 1)}</span><span class="hobby__icon">${h.icone}</span><h3>${h.titulo}</h3><p>${h.texto}</p></article>`).join("")}
        </div>
      </section>

      <section class="sec cs" id="cs2">
        ${head("Hobby · Counter-Strike 2", "Na mira", `Jogando como <b>${S.nick}</b> · ${C.periodo} · dados do <a href="https://csstats.gg/player/${S.steamId}" target="_blank" rel="noopener">csstats.gg</a>`)}
        <div class="premier reveal">
          <div class="premier__ring">
            <svg viewBox="0 0 200 200"><defs><linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#6f86ff"/><stop offset="100%" stop-color="#c6a8ff"/></linearGradient></defs>
              <circle cx="100" cy="100" r="88" class="ring-bg"/><circle cx="100" cy="100" r="88" class="ring-fg" id="ringFg"/></svg>
            <div class="premier__val"><small>Premier</small><b class="count" data-to="${C.premier.atual}">0</b><span>${C.premier.temporada}</span></div>
          </div>
          <div class="premier__side">
            <div class="pill"><small>Recorde da temporada</small><b class="count" data-to="${C.premier.melhor}">0</b></div>
            <div class="pill"><small>Vitórias na temporada</small><b class="count" data-to="${C.premier.vitoriasTemporada}">0</b></div>
            <div class="pill"><small>Próxima meta</small><b>20.000</b></div>
          </div>
        </div>
        <div class="stat-grid">${C.gerais.map((s) => `<div class="stat reveal"><b class="count" data-to="${s.valor}" data-dec="${s.decimais || 0}" data-suf="${s.sufixo || ""}">0</b><small>${s.rotulo}</small></div>`).join("")}</div>
        <div class="detail-grid">${C.detalhes.map((d) => `<div class="detail reveal"><small>${d.rotulo}</small><b class="count" data-to="${d.valor}" data-suf="${d.sufixo || ""}">0</b></div>`).join("")}</div>

        <h4 class="sub reveal">Clutches</h4>
        <div class="clutches">${C.clutches.map((c) => `<div class="clutch reveal"><svg viewBox="0 0 80 80"><circle cx="40" cy="40" r="34" class="c-bg"/><circle cx="40" cy="40" r="34" class="c-fg" style="stroke-dasharray:${circ};stroke-dashoffset:${circ}" data-off="${circ * (1 - c.pct / 100)}"/></svg><b class="count" data-to="${c.pct}" data-suf="%">0</b><span>${c.nome}</span><small>${c.wl}</small></div>`).join("")}</div>

        <div class="two-col">
          <div><h4 class="sub reveal">Mapas mais jogados</h4><div class="bars">${bars(C.mapas, "partidas")}</div></div>
          <div><h4 class="sub reveal">Mais kills por arma</h4><div class="bars">${bars(C.armas, "kills")}</div></div>
        </div>

        <h4 class="sub reveal">Vitórias em outros modos</h4>
        <div class="modes">${C.outrosModos.map((m) => `<div class="mode reveal"><b class="count" data-to="${m.vitorias}">0</b><small>${m.nome}</small></div>`).join("")}</div>

        <h4 class="sub reveal">Temporadas Premier</h4>
        <div class="seasons">${C.temporadas.map((t) => `<div class="season reveal"><span class="season__name">${t.nome}</span><div class="season__bar"><i class="best" style="--w:${t.melhor / maxR}"></i><i class="cur" style="--w:${t.atual / maxR}"></i></div><span class="season__val"><b>${fmt(t.atual)}</b>recorde ${fmt(t.melhor)} · ${t.vitorias}V</span></div>`).join("")}</div>
      </section>`;
    },

    servidores() {
      const cats = [
        { id: "todos", label: "Todos" },
        { id: "cs2", label: "CS2 5v5" },
        { id: "minecraft", label: "Minecraft" },
        { id: "outros", label: "Outros jogos" },
      ];
      const IP = (S.servidoresIP || "").trim();
      const oculto = !IP && !!S.statusUrl;   // servidores no ar, mas o IP não é público
      const pronto = !!IP || oculto;
      return `
      ${pageHero("Servidores", "Servidores", "CS2 5v5, Minecraft com vários modos e a campanha do Herobrine. Escolha um e entre.")}
      <section class="sec">
        ${pronto ? `<p class="srv-live reveal" id="srvLive"><i></i><span>Verificando servidores…</span></p>` : `<p class="srv-live srv-live--soon reveal"><i></i><span>Os servidores estão sendo preparados. Em breve no ar!</span></p>`}
        <div class="tabs reveal" id="tabs">${cats.map((c, i) => `<button class="tab ${i ? "" : "active"}" data-cat="${c.id}">${c.label}</button>`).join("")}<span class="tabs__ink" id="ink"></span></div>
        <div class="srvs" id="srvs">
          ${S.servidores.map((s) => {
            const ativo = pronto && !s.breve;
            const end = !ativo ? "em breve" : oculto ? "" : IP + (s.porta && s.porta !== 25565 ? ":" + s.porta : "");
            const cs = s.categoria === "cs2";
            return `<article class="srv reveal" data-cat="${s.categoria}" ${ativo && s.id ? `data-id="${s.id}"` : ""}>
              <div class="srv__game">${s.jogo === "Minecraft" ? "MC" : s.jogo === "Outros" ? "✦" : s.jogo}</div>
              <div class="srv__main">
                <span class="srv__status ${ativo ? "srv__status--check" : "srv__status--soon"}"><i></i><b>${ativo ? "Verificando" : "Em breve"}</b></span>
                <h3>${s.nome}</h3>
                <p class="srv__game-name">${s.jogo}<span class="srv__players"></span></p>
                <ul>${s.infos.map((x) => `<li>${x}</li>`).join("")}</ul>
              </div>
              ${oculto && ativo ? (s.entrar ? `<div class="srv__ip"><small>No servidor</small><small class="srv__cmd">digite <code>${s.entrar}</code></small></div>` : `<div class="srv__ip"></div>`) : `<div class="srv__ip"><small>Endereço</small><code>${end}</code>${ativo && s.entrar ? `<small class="srv__cmd">depois digite <code>${s.entrar}</code></small>` : ""}</div>`}
              <div class="srv__btns">
                ${ativo && !oculto ? `<button class="btn" data-copy="${cs ? "connect " + end : end}">Copiar IP</button>` : ""}
                ${ativo && !oculto && cs ? `<a class="btn btn--solid" href="steam://connect/${end}">Entrar</a>` : ""}
                ${s.extra ? `<a class="btn" href="${s.extra.url}">${s.extra.label}</a>` : ""}
                ${!ativo && temDiscord ? `<a class="btn" href="${S.discord}" target="_blank" rel="noopener">Avisar no Discord</a>` : ""}
              </div>
            </article>`;
          }).join("")}
        </div>
      </section>
      <section class="sec">
        ${head("Passo a passo", "Como entrar")}
        ${numbered(oculto ? [
          { titulo: "CS2", texto: "Abra o console (tecla ') e use o comando connect com o endereço do servidor." },
          { titulo: "Minecraft", texto: "Multijogador → Adicionar servidor. Na primeira vez faça /register; depois use /server survival, bedwars ou criativo." },
          { titulo: "Hollow Scripture", texto: "Instale o NeoForge 1.20.1 e o mod (página Projetos) antes de entrar." },
          { titulo: "Status", texto: "Esta página mostra ao vivo quem está online em cada servidor." },
        ] : [
          { titulo: "CS2", texto: "Clique em Entrar, ou copie o IP, abra o console (tecla ') e cole o connect." },
          { titulo: "Minecraft", texto: "Multijogador → Adicionar servidor → cole o IP. No lobby, use /server survival, bedwars ou criativo." },
          { titulo: "Hollow Scripture", texto: "Instale o NeoForge 1.20.1 e o mod, depois entre pelo IP com :25566." },
          ...(temDiscord ? [{ titulo: "Discord", texto: "Entre no Discord para marcar partidas e ver novidades." }] : []),
        ])}
      </section>
      ${cta("Te vejo no servidor", "Qualquer problema para entrar, me chama nas redes.")}`;
    },

    sobre() {
      const cup = `<svg viewBox="0 0 64 64" fill="none"><path d="M20 8h24v14a12 12 0 0 1-24 0V8Z" stroke="currentColor" stroke-width="1.5"/><path d="M20 12H10v4a10 10 0 0 0 10 10M44 12h10v4a10 10 0 0 1-10 10" stroke="currentColor" stroke-width="1.5"/><path d="M29 34h6v12h-6zM20 46h24v8H20z" stroke="currentColor" stroke-width="1.5"/></svg>`;
      return `
      ${pageHero("Sobre", "Quem sou", `${S.nome} — ${S.cargo.toLowerCase()}, dev, editor e gamer.`)}
      <section class="sec about">
        <div class="about__text" id="sobreTexto">${S.sobre.map((p) => `<p>${p.split(" ").map((w) => `<span class="w">${w}</span>`).join(" ")}</p>`).join("")}</div>
        <div class="facts">${S.fatos.map((f) => `<div class="fact reveal"><b class="metal">${f.valor}</b><small>${f.rotulo}</small></div>`).join("")}</div>
      </section>
      <section class="sec">
        ${head("Conquistas", "Troféus", "A estante ainda está vazia. <em>Por enquanto.</em>")}
        <div class="shelf">${S.trofeus.map((t) => `<div class="trophy reveal"><div class="trophy__cup">${cup}</div><h4>${t.nome}</h4><p>${t.dica}</p></div>`).join("")}</div>
      </section>
      ${cta("Vamos conversar", "Projetos, partidas ou edições: me acha nas redes aí embaixo.")}`;
    },
  };

  /* =========================================================
     MONTAGEM
     ========================================================= */
  chrome();
  $("#app").innerHTML = (pages[PAGE] || pages.home)();

  /* =========================================================
     CORTINA / LOADER / TRANSIÇÃO ENTRE PÁGINAS
     ========================================================= */
  const curtain = $("#curtain");
  const first = !sessionStorage.getItem("seen");
  sessionStorage.setItem("seen", "1");
  curtain.classList.add(first ? "first" : "quick");
  const openPage = () => {
    curtain.classList.add("open");
    document.body.classList.add("ready");
  };
  setTimeout(openPage, first ? 900 : 60);

  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[href]");
    if (!a || a.target === "_blank" || e.ctrlKey || e.metaKey || e.shiftKey) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin || !url.pathname.endsWith(".html") && url.pathname !== "/") return;
    if (url.pathname === location.pathname) return; // âncora na mesma página
    e.preventDefault();
    curtain.classList.remove("open", "first", "quick");
    curtain.classList.add("leave");
    setTimeout(() => (location.href = a.href), 550);
  });
  addEventListener("pageshow", (e) => { if (e.persisted) { curtain.classList.remove("leave"); openPage(); } });

  /* =========================================================
     MENU, HEADER, TOAST, MODAL DE VÍDEO, ABAS
     ========================================================= */
  const burger = $("#burger"), menu = $("#menu");
  burger.addEventListener("click", () => { burger.classList.toggle("open"); menu.classList.toggle("open"); });

  const toast = $("#toast");
  const showToast = (msg) => {
    toast.textContent = msg; toast.classList.add("show");
    clearTimeout(toast._t); toast._t = setTimeout(() => toast.classList.remove("show"), 1800);
  };

  const modal = $("#modal"), frame = $("#modalFrame");
  const openVideo = (i) => {
    const v = S.videos[i];
    frame.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0" title="${v.titulo}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
    modal.classList.add("open");
  };
  const closeVideo = () => { modal.classList.remove("open"); setTimeout(() => (frame.innerHTML = ""), 400); };
  $("#modalX").addEventListener("click", closeVideo);
  modal.addEventListener("click", (e) => { if (e.target === modal) closeVideo(); });
  addEventListener("keydown", (e) => { if (e.key === "Escape") closeVideo(); });

  document.addEventListener("click", (e) => {
    const cp = e.target.closest("[data-copy]");
    if (cp) { navigator.clipboard?.writeText(cp.dataset.copy); showToast(`Copiado: ${cp.dataset.copy}`); return; }
    const vb = e.target.closest("[data-video]");
    if (!vb) return;
    const i = +vb.dataset.video;
    // Na página de vídeos, os cards trocam o destaque; o destaque abre o player
    if (PAGE === "videos" && !vb.id) {
      const v = S.videos[i];
      $("#playerBtn").dataset.video = i;
      const img = $("#playerImg");
      img.style.opacity = 0;
      setTimeout(() => { img.src = thumb(v.id); img.onerror = () => { img.onerror = null; img.src = `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`; }; img.style.opacity = 1; }, 250);
      $("#playerTitle").textContent = v.titulo;
      $("#playerTag").textContent = v.tag;
      $$(".vcard").forEach((c) => c.classList.toggle("active", c === vb));
      $("#player").scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    openVideo(i);
  });
  if (PAGE === "videos") $$(".vcard")[0]?.classList.add("active");

  /* Status ao vivo dos servidores (JSON publicado pela VPS) */
  async function atualizarStatus() {
    const live = $("#srvLive");
    if (!live) return;
    let dados = null;
    if (S.statusUrl) {
      try {
        const r = await fetch(S.statusUrl, { cache: "no-store" });
        if (r.ok) dados = (await r.json()).servidores;
      } catch (_) { /* sem conexão com a VPS */ }
    }
    let on = 0, total = 0, jogadores = 0;
    $$(".srv[data-id]").forEach((card) => {
      const st = card.querySelector(".srv__status"), info = dados && dados[card.dataset.id];
      const pl = card.querySelector(".srv__players");
      total++;
      st.classList.remove("srv__status--check", "srv__status--off");
      if (!dados) { st.querySelector("b").textContent = "Endereço"; st.classList.add("srv__status--check"); pl.textContent = ""; return; }
      if (info && info.online) {
        on++; jogadores += info.jogadores || 0;
        st.querySelector("b").textContent = "Online";
        pl.textContent = ` · ${info.jogadores}/${info.max} jogadores${info.mapa ? " · " + info.mapa : ""}`;
      } else {
        st.classList.add("srv__status--off");
        st.querySelector("b").textContent = "Offline";
        pl.textContent = "";
      }
    });
    live.classList.toggle("srv-live--off", !!dados && on === 0);
    live.querySelector("span").textContent = !dados
      ? (S.statusUrl ? "Não deu para verificar agora. Tente o IP mesmo assim." : "Copie o IP e entre.")
      : `${on} de ${total} servidores online · ${jogadores} jogando agora`;
  }
  if (PAGE === "servidores") { atualizarStatus(); setInterval(atualizarStatus, 30000); }

  const tabs = $("#tabs");
  if (tabs) {
    const ink = $("#ink");
    const moveInk = (b) => { ink.style.width = b.offsetWidth + "px"; ink.style.transform = `translateX(${b.offsetLeft}px)`; };
    tabs.addEventListener("click", (e) => {
      const b = e.target.closest(".tab");
      if (!b) return;
      $$(".tab", tabs).forEach((t) => t.classList.toggle("active", t === b));
      moveInk(b);
      const cat = b.dataset.cat;
      $$(".srv").forEach((s, i) => {
        const show = cat === "todos" || s.dataset.cat === cat;
        s.classList.toggle("hide", !show);
        if (show) { s.style.animation = "none"; s.offsetWidth; s.style.animation = `pop 0.6s var(--ease-out) ${i * 0.06}s both`; }
      });
    });
    requestAnimationFrame(() => moveInk($(".tab.active", tabs)));
    addEventListener("resize", () => moveInk($(".tab.active", tabs)));
  }

  /* =========================================================
     REVEAL + CONTADORES
     ========================================================= */
  function countUp(el) {
    if (el._done) return;
    el._done = true;
    const to = parseFloat(el.dataset.to), dec = +(el.dataset.dec || 0), suf = el.dataset.suf || "";
    if (reduceMotion) { el.textContent = fmt(to, dec) + suf; return; }
    const t0 = performance.now(), dur = 1800;
    const step = (now) => {
      const k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 4);
      el.textContent = fmt(to * e, dec) + suf;
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const el = en.target;
      el.classList.add("in");
      if (el.classList.contains("count")) countUp(el);
      $$(".count", el).forEach(countUp);
      $$(".c-fg", el).forEach((c) => (c.style.strokeDashoffset = c.dataset.off));
      if (el.classList.contains("premier")) $("#ringFg").style.strokeDashoffset = 553 * (1 - Math.min(1, C.premier.atual / 20000));
      io.unobserve(el);
    });
  }, { threshold: 0, rootMargin: "0px 0px -8% 0px" });
  $$(".reveal, .split, .divider").forEach((el) => {
    const sib = [...el.parentElement.children].filter((c) => c.classList.contains("reveal"));
    if (sib.length > 1) el.style.setProperty("--delay", `${(sib.indexOf(el) % 6) * 0.08}s`);
    io.observe(el);
  });
  $$(".count").forEach((el) => { if (!el.closest(".reveal")) io.observe(el); });

  /* =========================================================
     SCROLL (um rAF por frame)
     ========================================================= */
  const prog = $("#progress"), hdr = $("#hdr");
  const words = $$(".about__text .w"), aboutText = $("#sobreTexto");
  const heroTitle = $(".hero__title");
  let docH = 1, aboutTop = 0, aboutH = 0, lastOn = -1, ticking = false;
  const measure = () => {
    docH = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    if (aboutText) { const r = aboutText.getBoundingClientRect(); aboutTop = r.top + scrollY; aboutH = r.height; }
  };
  function update() {
    ticking = false;
    const y = scrollY;
    prog.style.transform = `scaleX(${y / docH})`;
    hdr.classList.toggle("scrolled", y > 30);
    if (heroTitle && y < innerHeight) {
      heroTitle.style.transform = `translate3d(0,${y * 0.25}px,0)`;
      heroTitle.style.opacity = Math.max(0, 1 - y / (innerHeight * 0.8));
    }
    if (words.length) {
      const k = Math.min(1, Math.max(0, (y + innerHeight * 0.85 - aboutTop) / (aboutH + innerHeight * 0.3)));
      const on = Math.floor(k * words.length);
      if (on !== lastOn) { words.forEach((w, i) => w.classList.toggle("on", i < on)); lastOn = on; }
    }
  }
  const req = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  addEventListener("scroll", req, { passive: true });
  addEventListener("resize", () => { measure(); sizeCanvas(); req(); });
  addEventListener("load", () => { measure(); req(); });
  document.fonts?.ready.then(() => { measure(); req(); });
  measure(); update();

  /* =========================================================
     CURSOR + TILT + MAGNÉTICO
     ========================================================= */
  const cur = $("#cursor"), dot = $("#cursorDot");
  let mx = innerWidth / 2, my = innerHeight / 2, cx = mx, cy = my, running = false;
  function loop() {
    cx += (mx - cx) * 0.2; cy += (my - cy) * 0.2;
    cur.style.transform = `translate3d(${cx}px,${cy}px,0)`;
    if (Math.abs(mx - cx) + Math.abs(my - cy) > 0.3) requestAnimationFrame(loop); else running = false;
  }
  if (!touch) {
    addEventListener("mousemove", (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate3d(${mx}px,${my}px,0)`;
      if (!running) { running = true; requestAnimationFrame(loop); }
    }, { passive: true });
    document.addEventListener("mouseover", (e) => cur.classList.toggle("hover", !!e.target.closest("a, button, .hobby, .trophy")));

    $$(".feature__viz, .card").forEach((c) => {
      let raf = 0;
      c.addEventListener("mousemove", (e) => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
          c.style.setProperty("--mx", x * 100 + "%"); c.style.setProperty("--my", y * 100 + "%");
          c.style.transform = `perspective(1000px) rotateY(${(x - 0.5) * 6}deg) rotateX(${(0.5 - y) * 6}deg) translateY(-4px)`;
        });
      });
      c.addEventListener("mouseleave", () => { cancelAnimationFrame(raf); c.style.transform = ""; });
    });
    $$(".btn").forEach((b) => {
      b.addEventListener("mousemove", (e) => {
        const r = b.getBoundingClientRect();
        b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.2}px,${(e.clientY - r.top - r.height / 2) * 0.3}px)`;
      });
      b.addEventListener("mouseleave", () => (b.style.transform = ""));
    });
  }

  /* =========================================================
     FUNDO: poeira brilhante subindo (leve)
     ========================================================= */
  const cv = $("#bg"), ctx = cv.getContext("2d");
  let dust = [], W = 0, H = 0, on = !reduceMotion;
  function sizeCanvas() {
    const dpr = Math.min(1.5, devicePixelRatio || 1);
    W = innerWidth; H = innerHeight;
    cv.width = W * dpr; cv.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.min(touch ? 35 : 70, Math.floor(W / 18));
    dust = Array.from({ length: n }, () => newDust(true));
  }
  function newDust(anywhere) {
    return { x: Math.random() * W, y: anywhere ? Math.random() * H : H + 10, r: Math.random() * 1.4 + 0.3, v: Math.random() * 0.35 + 0.08, s: Math.random() * 6.28, a: Math.random() * 0.6 + 0.2 };
  }
  sizeCanvas();
  function draw(t) {
    if (!on) return;
    ctx.clearRect(0, 0, W, H);
    for (const d of dust) {
      d.y -= d.v; d.x += Math.sin(t / 2000 + d.s) * 0.15;
      if (d.y < -10) Object.assign(d, newDust(false));
      ctx.globalAlpha = d.a * (0.6 + 0.4 * Math.sin(t / 700 + d.s));
      ctx.fillStyle = d.r > 1.2 ? "#d9ccff" : "#8fa0ff";
      ctx.fillRect(d.x, d.y, d.r, d.r);
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }
  if (on) requestAnimationFrame(draw);
  document.addEventListener("visibilitychange", () => {
    const was = on; on = !document.hidden && !reduceMotion;
    if (on && !was) requestAnimationFrame(draw);
  });
})();
