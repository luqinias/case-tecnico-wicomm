# Amakha Paris · Home (Case Técnico Wicomm)

Reprodução da home **Amakha Paris** a partir do Figma do teste prático da Wicomm, feita com
**React + TypeScript + Tailwind CSS**. Tem carrinho com mini cart lateral, carrosséis, menus,
contagem regressiva, favoritos, busca e newsletter, e funciona do celular ao desktop.

- **Página publicada:** _adicionar link da Vercel após o deploy_
- **Layout de referência:** frame `AMAKHA - HOME` (1280 × 5959)

---

## Sumário

1. [Como rodar](#como-rodar)
2. [Tecnologias](#tecnologias)
3. [Estrutura do projeto](#estrutura-do-projeto)
4. [Do Figma ao código](#do-figma-ao-código)
5. [Como cada critério foi atendido](#como-cada-critério-foi-atendido)
6. [Decisões tomadas](#decisões-tomadas)
7. [Uso de IA e metodologia (spec-kit)](#uso-de-ia-e-metodologia-spec-kit)
8. [O que eu faria com mais tempo](#o-que-eu-faria-com-mais-tempo)

---

## Como rodar

Pré-requisito: **Node.js 20+** (desenvolvido com Node 24).

```bash
npm install
npm run dev          # http://localhost:5173
```

| Script                    | O que faz                                                         |
| ------------------------- | ----------------------------------------------------------------- |
| `npm run dev`             | Servidor de desenvolvimento (Vite)                                |
| `npm run build`           | Checa tipos, gera o bundle e **pré-renderiza** o HTML da home     |
| `npm run preview`         | Serve o build de produção (`dist/`)                               |
| `npm test`                | Testes com Vitest + Testing Library                               |
| `npm run lint`            | Lint com oxlint (inclui regras de acessibilidade `jsx-a11y`)      |
| `npm run typecheck`       | TypeScript em modo `strict`                                       |
| `npm run figma:export`    | Baixa imagens/ícones do Figma (requer `FIGMA_TOKEN`, ver abaixo)  |
| `npm run images:optimize` | Converte as imagens exportadas para WebP 1x/2x em `public/images` |

Os assets já otimizados estão versionados, então **não é preciso token do Figma para rodar o projeto**.

---

## Tecnologias

| Camada    | Escolha                                                      | Por quê                                                             |
| --------- | ------------------------------------------------------------ | ------------------------------------------------------------------- |
| Estrutura | HTML semântico via **React 19 (JSX)**                        | Componentes reutilizáveis para cards, carrosséis e seções repetidas |
| Linguagem | **TypeScript** (`strict`)                                    | Contratos claros entre dados e componentes                          |
| Estilo    | **Tailwind CSS v4**                                          | Tokens do Figma centralizados em `@theme`, sem CSS duplicado        |
| Build     | **Vite** + pré-renderização com `react-dom/server`           | HTML pronto no primeiro byte, hidratado no cliente                  |
| Testes    | **Vitest** + **Testing Library**                             | Testes de comportamento (o que a pessoa usuária vê e faz)           |
| Qualidade | **oxlint** (com `jsx-a11y`) + **Prettier**                   | Lint rápido com regras de acessibilidade                            |
| Imagens   | **sharp** (WebP 1x/2x) e **SVGO**                            | Assets leves, com `srcset`/`sizes`                                  |
| Fontes    | **@fontsource** (Poppins e Inter, só `latin` e pesos usados) | Self-hosted, sem requisição a terceiros                             |

Não usei biblioteca de UI nem de carrossel. O carrossel, o drawer e o restante foram feitos no projeto.

---

## Estrutura do projeto

```text
scripts/
  figma-assets.json        # mapa nome → id do nó no Figma
  figma-export.mjs         # exporta PNG 2x / SVG pela API do Figma
  optimize-images.mjs      # PNG → WebP 1x e 2x (sharp)
  prerender.mjs            # injeta o HTML renderizado em dist/index.html
public/images/             # imagens otimizadas (WebP)
src/
  index.css                # Tailwind + tokens do Figma (@theme) + utilitários próprios
  App.tsx                  # composição da página (ordem das seções do Figma)
  entry-server.tsx         # render para a pré-renderização
  types/                   # Product, CartItem, Banner, NavItem...
  data/                    # conteúdo: produtos, menu, banners, blog, rodapé (separado da UI)
  lib/                     # formatação BRL, imagem/srcset, localStorage seguro, validação
  hooks/                   # useCarousel, useCountdown, usePersistence, useLockBodyScroll
  context/                 # carrinho (reducer puro + provider) e favoritos
  components/
    ui/                    # genéricos: Carousel, Drawer, Icon, Price, SectionTitle, BannerLink
    layout/                # AnnouncementBar, Header, MainNav, MobileMenu, SearchBar, Footer...
    product/               # ProductCard, ProductShelf
    cart/                  # MiniCart, CartLine
  sections/                # seções da home: Hero, Ofertas, Benefícios, Blog, Causas...
```

Os componentes de `ui/` não sabem nada do domínio. As três prateleiras do layout usam o mesmo
`ProductShelf`, e todo carrossel da página (banner, prateleiras e Instagram) é o mesmo `Carousel`.

---

## Do Figma ao código

Para chegar perto do pixel, eu não medi o layout "no olho". Em vez disso, li o **arquivo do Figma
pela API REST** com um token pessoal só de leitura (escopo `file_content:read`). Fiz assim:

1. **Árvore do frame em JSON** (`GET /v1/files/:key`): auto-layout, paddings, gaps, raios, sombras,
   fontes (família, peso, tamanho, line-height, letter-spacing) e cores de cada nó.
2. **Tokens**: as cores e sombras que se repetem viraram variáveis do Tailwind em `src/index.css`
   (`--color-brand: #ffb802`, `--shadow-card`, `--color-ink-soft: #595959`…). O container de 1168px
   com gutter de 56px virou o utilitário `container-page`.
3. **Assets** (`GET /v1/images/:key`): imagens renderizadas em **2x** e ícones em **SVG**, direto dos
   nós do layout (`scripts/figma-export.mjs`). Depois:
   - fotos e banners → **WebP 1x/2x** com sharp (de ~6,5 MB em PNG para ~900 KB);
   - ícones de uma cor → componente `Icon` com `currentColor`, que herda a cor do contexto;
   - logos, bandeiras de pagamento e ícones de benefícios → SVG otimizados com SVGO.
4. **Validação visual**: comparei capturas do build (Playwright/Chromium) com o render do frame,
   lado a lado. Em 1280px as seções ficam a **±3 px** da posição vertical do Figma (o rodapé começa
   exatamente em `y = 5189`, como no layout).

O Figma do teste também tinha **camadas ocultas** com dicas de comportamento, e usei essas pistas:

- o submenu **"CONSULTOR"** (Quero ser / Já sou / Encontre um Consultor / Criar Minha Loja Online)
  virou o dropdown de **Revenda**;
- o botão **"COMPRAR"** oculto e o primeiro card com tags indicam o **estado de hover** do card;
- o texto oculto **"Fale com a gente"** virou o rótulo que expande no botão flutuante de WhatsApp.

---

## Como cada critério foi atendido

| Critério (peso)                       | O que foi feito                                                                                                                                                                                                                                                                                                                                         |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Fidelidade ao layout (30)**         | Medidas, fontes e cores tiradas da API do Figma; imagens exportadas do próprio arquivo; comparação visual automatizada com o frame.                                                                                                                                                                                                                     |
| **Qualidade do código (20)**          | TypeScript `strict`; conteúdo em `src/data` separado da UI; componentes genéricos reaproveitados; reducer do carrinho puro e testado; lint e tipos sem avisos.                                                                                                                                                                                          |
| **Responsividade (15)**               | Mobile-first com 4 faixas (celular, `md` 768, `lg` 1024, `xl` 1200). Prateleiras mostram 2/3/4/5 cards. Menu vira gaveta lateral. Banners reorganizam em grid. Sem rolagem horizontal de 320 a 1920px.                                                                                                                                                  |
| **Interações e funcionalidades (15)** | Carrinho com **mini cart lateral** (adicionar, somar quantidade, +/−, remover, subtotal, barra de frete grátis, persistência). Carrosséis com setas em loop, bolinhas e swipe. Dropdowns. Busca com sugestões que adicionam ao carrinho. Contagem regressiva. Favoritos com contador. Newsletter com validação. Hover nos cards e banners.              |
| **HTML semântico e a11y (10)**        | Landmarks (`header`, `nav`, `main`, `section`, `footer`, `search`), um `h1` e hierarquia de títulos; `alt` descritivo (banners trazem o texto da arte no `alt`); skip link; foco visível; tudo operável por teclado; `<dialog>` nativo no mini cart/menu (foco preso e Esc); `aria-expanded`, `aria-current`, `aria-pressed`; `prefers-reduced-motion`. |
| **Git e README (5)**                  | Commits pequenos em Conventional Commits ao longo do desenvolvimento; este README.                                                                                                                                                                                                                                                                      |
| **Performance (5)**                   | HTML **pré-renderizado** e hidratado; WebP com `srcset`/`sizes`; `width`/`height` em toda imagem (CLS ≈ 0); `loading="lazy"` abaixo da dobra; preload + `fetchpriority="high"` no banner; fontes self-hosted só com os pesos usados.                                                                                                                    |

**Lighthouse (build local, `vite preview` sem compressão):**

| Perfil  | Performance | Acessibilidade | Boas práticas | SEO |
| ------- | ----------- | -------------- | ------------- | --- |
| Desktop | 100         | 96             | 100           | 100 |
| Mobile  | 91–96       | 96             | 100           | 100 |

O único item de acessibilidade pendente é contraste, explicado nas decisões abaixo.

**Testes** (`npm test`): reducer do carrinho, mini cart integrado ao card (adicionar, somar,
alterar, remover, persistir, fechar), contagem regressiva com timers falsos e validação/feedback
da newsletter.

---

## Decisões tomadas

O layout traz só o desktop e um estado de cada componente. Onde faltou informação, decidi o
seguinte:

**Comportamento**

- **Hover do card de produto.** O primeiro card do Figma mostra "COMPRAR" e as tags de cupom, e os
  outros não. Li isso como estado de hover: em dispositivos com mouse, botão e tags aparecem no
  hover ou no foco do teclado. Em telas de toque (sem hover) ficam **sempre visíveis**, senão não
  daria para comprar no celular. A área de conteúdo tem altura fixa no desktop para o hover não
  mexer no layout.
- **Mini cart.** Abre ao adicionar um produto e pelo ícone do header. Produto repetido soma a
  quantidade em vez de duplicar a linha. Diminuir até 0 remove o item. Mostra quanto falta para o
  frete grátis (R$ 199,90, valor da barra de anúncio). "Finalizar compra" só avisa que é uma
  demonstração. O carrinho e os favoritos persistem no `localStorage`.
- **Carrosséis.** Usam CSS scroll-snap, então o swipe no celular é nativo. As setas fazem loop
  (do fim voltam ao início), o que deixa as duas sempre ativas como no Figma. As bolinhas
  representam as posições possíveis: com 8 produtos e 5 visíveis são **4 bolinhas**, igual ao
  layout. **Não coloquei autoplay**: banner que se move sozinho atrapalha a leitura e exigiria
  controle de pausa (WCAG 2.2.2).
- **Banner principal.** O Figma tem 1 arte e 3 bolinhas. Os slides 2 e 3 são composições em
  HTML/CSS na mesma linguagem visual (painel rosa e chamada em branco), em vez de repetir a mesma
  imagem.
- **Contagem regressiva.** Começa em **02d 12h 25m 45s** (os valores do Figma) a partir do
  carregamento e para em zero. O dígito das unidades de segundo "rola", reproduzindo o efeito
  sugerido no layout.
- **Dropdowns.** Abrem no hover com mouse e no clique/Enter com teclado ou toque. Esc fecha e
  devolve o foco. Usei o visual do submenu "CONSULTOR" para todos.
- **Busca.** Filtra o catálogo local (ignora acentos) e mostra sugestões. Clicar numa sugestão
  adiciona o produto ao carrinho.
- **WhatsApp.** Botão fixo alinhado à borda direita do container (como no frame), que expande
  "Fale com a gente" no hover ou foco.

**Conteúdo**

- **Produtos.** O layout repete o mesmo card ("Perfume Feminino Athena") em todas as posições. Usei
  as embalagens das imagens (Athena, Fortune, RB, DB, Chic Woman) para dar nomes diferentes, e
  criei versões "de bolso 15ml" (citadas no banner) para ter 8 itens por prateleira. Os preços
  seguem o Figma (R$ 320 → R$ 255, "12x R$ 18,75").
- **Contador do carrinho.** No Figma aparece "3". Aqui ele começa vazio e reflete o carrinho real.
- **Links institucionais.** Apontam para `#` porque estão fora do escopo de uma página única.

**Visual e acessibilidade**

- **Contraste da cor da marca.** O amarelo `#FFB802` com texto branco (selo "10%") e o
  "FRETE GRATIS" amarelo sobre branco não atingem 4.5:1. Mantive as cores do Figma por
  fidelidade, porque é a identidade da marca. Num projeto real eu levaria isso ao time de design
  (por exemplo, um tom mais escuro só para texto).
- **Faixa de benefícios.** No Figma os textos estão convertidos em vetores (fonte original
  indisponível). Reescrevi como texto real em Poppins, para ser legível por leitores de tela e
  traduzível, e usei os ícones exportados.
- **Breakpoint `xl` em 1200px.** Assim uma janela de 1280px com barra de rolagem (~1265px úteis)
  ainda mostra 5 cards por prateleira, como no layout.
- **Mobile.** Header com menu hambúrguer e busca em linha própria. Prateleiras com 2 cards e
  swipe. Banners de categoria em grid 2×2. Rodapé em colunas empilhadas. As artes dos banners
  mantêm a proporção, porque cortar esconderia o texto que faz parte da imagem.
- **Pré-renderização.** O HTML da home é gerado no build e hidratado no cliente. Para o HTML e o
  primeiro render baterem, a leitura do `localStorage` acontece depois da montagem
  (`usePersistence`).

---

## Uso de IA e metodologia (spec-kit)

O case permite IA, e eu usei o **Claude Code (Anthropic)** como assistente no desenvolvimento.
Revisei e entendo cada linha entregue. Acho que vale documentar **como** usei, porque foi o que
mais influenciou a fidelidade do resultado.

### Figma integrado localmente

Em vez de trabalhar com prints, dei ao assistente **acesso de leitura ao arquivo do Figma pela API
REST** (token pessoal só com `file_content:read`, revogado ao fim do trabalho). Com isso o
assistente leu a árvore de nós do frame e extraiu valores exatos:

- tipografia por camada (ex.: títulos de seção em Poppins 600 20/26; preço em Poppins 700 14;
  selo "10%" em Inter 500 13 com letter-spacing −1.56);
- auto-layout (ex.: cards de 226px com gap de 9px; prateleira com 16px entre título e lista;
  seções separadas por 32px);
- efeitos (ex.: sombra do card `0 0 4px rgba(0,0,0,.15)`; blur de 50px nos círculos da barra de
  anúncio, recriados com `radial-gradient`);
- camadas ocultas que revelaram intenções de interação (dropdown "CONSULTOR", botão "COMPRAR",
  rótulo "Fale com a gente").

Os scripts usados para isso ficaram no repositório (`scripts/figma-export.mjs` e
`scripts/figma-assets.json`), para que o processo seja reproduzível.

### spec-kit

Planejei o trabalho com a metodologia do [**spec-kit**](https://github.com/github/spec-kit) (GitHub),
seguindo o fluxo **constituição → especificação → plano → tarefas → implementação**:

1. **Constituição.** Um princípio para cada critério de avaliação, **na ordem dos pesos do case**
   (Fidelidade 30 → Performance 5), com regras verificáveis. Por exemplo: "cores só via tokens",
   "bloco repetido 2+ vezes vira componente", "sem rolagem horizontal de 320 a 1920px".
2. **Especificação.** Histórias de usuário com prioridade (vitrine fiel e carrinho como P1;
   responsividade, interações e teclado como P2; newsletter e busca como P3), requisitos
   funcionais testáveis, casos de borda (localStorage indisponível, contador em zero, movimento
   reduzido) e critérios de sucesso.
3. **Plano técnico.** Stack, estrutura de pastas, modelo de dados (produto, item do carrinho,
   transições do reducer) e contratos dos componentes reutilizáveis.
4. **Tarefas.** 48 tarefas por fase e por história, implementadas em sequência e conferidas
   contra a constituição.

Os artefatos do spec-kit (`.specify/`, `specs/`) ficaram **apenas localmente** (no
`.gitignore`), para não poluir o repositório com arquivos de planejamento. O resultado deles está
resumido neste README.

---

## O que eu faria com mais tempo

- **Testes end-to-end e visuais** (Playwright), com comparação automática de screenshot contra o
  Figma no CI.
- **Artes mobile dos banners.** Pediria ao design versões verticais do banner principal e dos
  banners de lançamento (no celular a arte larga fica pequena).
- **Contraste.** Validaria com o design um tom de amarelo/ouro para textos sobre branco.
- **Dados de uma API** (ex.: catálogo VTEX) no lugar dos dados estáticos, com estados de carregamento.
- **Página de produto e checkout**, com rotas para os links que hoje são `#`.
- **Imagens em AVIF** com fallback WebP e um tamanho intermediário (1,5x) no `srcset`.
- **Storybook** para documentar os componentes de `ui/` e seus estados (hover, foco, vazio).
- **CI** (GitHub Actions) rodando lint, tipos, testes e Lighthouse a cada push.
