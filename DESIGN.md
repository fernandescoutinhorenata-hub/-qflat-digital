---
name: Qflat Digital
description: Fusão elegante da precisão mecânica 3D com a fluidez do design digital.
colors:
  primary: "#7c3aed"
  accent: "#f97316"
  neutral-bg: "#ffffff"
  neutral-fg: "#110b1a"
  neutral-gray-light: "#f0edf5"
  neutral-gray-mid: "#807c8a"
typography:
  display:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "clamp(36px, 5vw, 60px)"
    fontWeight: 700
    lineHeight: 1.1
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.7
rounded:
  sm: "4px"
  md: "6px"
  lg: "12px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.neutral-bg}"
    rounded: "{rounded.sm}"
    padding: "14px 28px"
    typography:
      fontFamily: "Space Grotesk, sans-serif"
      fontWeight: 700
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    rounded: "{rounded.sm}"
    padding: "12px 24px"
---

# Design System: Qflat Digital

## 1. Overview

**Creative North Star: "Precision Alchemy" (Alquimia de Precisão)**

O sistema de design visual da flat. representa o equilíbrio perfeito entre o rigor técnico da manufatura física 3D e a expressividade livre da agência digital. Em vez de adotar caminhos genéricos e amigáveis, a interface adota uma postura **Restrita e Editorial**, inspirada em designs arquitetônicos e publicações de luxo. 

As superfícies são guiadas por cantos vivos moderados (4px a 12px), tipografia geométrica imponente e caixas de texto com espaçamento clássico. A sensação tridimensional e física é inserida com responsabilidade por meio de camadas sobrepostas táteis reais, sombras de elevação calculadas e micro-animações exponenciais limpas que comunicam agilidade insuperável de entrega.

**Key Characteristics:**
- Estética editorial sofisticada com tipografia marcante.
- Cantos vivos semi-retangulares (eliminando formas circulares/pílulas genéricas).
- Sombras físicas táteis e reativas a estados de interação.
- Contraste absoluto e pureza de tokens para entrega rápida e clara de informação.

---

## 2. Colors

O esquema de cores une a energia radiante das reações físicas com tons profundos e neutros refinados.

### Primary
- **Alquimia Púrpura** (`#7c3aed` / `oklch(45% 0.22 280)`): Cor conceitual e marcante. Utilizada de forma seletiva para sublinhar a marca, cabeçalhos dinâmicos, destaques pontuais e interações secundárias.

### Accent
- **Chama Rápida** (`#f97316` / `oklch(68% 0.19 45)`): Cor aceleradora de alta energia. Empregada estritamente em botões primários de conversão (CTAs) e emblemas temporários de grande importância.

### Neutral
- **Branco Puro** (`#ffffff` / `oklch(100% 0.005 280)`): A tela limpa do design, usada em fundos para maximizar o contraste.
- **Preto Alquímico** (`#110b1a` / `oklch(18% 0.04 280)`): Preto sutilmente azulado/púrpura de altíssima densidade usado para cabeçalhos e textos principais.
- **Cinza Reagente** (`#f0edf5` / `oklch(94% 0.01 280)`): Usado em divisores limpos, fundos de seções secundárias e bordas finas estruturais.
- **Cinza Alquímico** (`#807c8a` / `oklch(50% 0.02 280)`): Para textos de apoio. Deve ser usado com cautela em fundos claros para não falhar nos critérios de acessibilidade.

### Named Rules
**The 10% Accent Rule (Regra do Accent 10%).** A cor de destaque Accent (`#f97316`) deve ocupar no máximo 10% da área visível de qualquer seção ou tela. Seu papel é direcionar o olhar para ações cruciais (CTAs), não preencher layouts.

**The Contrast Rule (Regra do Contraste Absoluto).** Nenhum texto no site deve ficar abaixo da taxa de contraste de 4.5:1 exigida pelo padrão WCAG AA. O uso de cinzas claros e lavados sobre fundos brancos é estritamente proibido.

---

## 3. Typography

**Display Font:** Space Grotesk (com fallback sans-serif)  
**Body Font:** Inter (com fallback sans-serif)  

A tipografia estabelece um contraste nítido entre a geometria angular contemporânea das manchetes e a sobriedade limpa e altamente legível do texto corrido.

### Hierarchy
- **Display** (Bold (700), `clamp(36px, 5vw, 60px)`, `line-height: 1.1`): Manchetes de hero e títulos principais de seções.
- **Headline** (Semi-Bold (600), `28px`, `1.2`): Títulos de seções intermediárias.
- **Title** (Bold (700), `18px`, `1.3`): Títulos de cards e modais de produtos.
- **Body** (Regular (400), `15px`, `1.7`): Texto de leitura geral. Comprimento de linha restrito a 65–75 caracteres para otimizar a fadiga ocular.
- **Label** (Bold (700), `11px`, `letter-spacing: 0.08em`, `text-transform: uppercase`): Badges, mini-cabeçalhos secundários e textos funcionais pequenos.

### Named Rules
**The Editorial Title Rule (Regra dos Títulos Editoriais).** Títulos e subtítulos principais de seções devem possuir um forte contraste de escala (mínimo de 1.25x entre níveis) e usar capitalização ou variações de peso geométrico para evitar layouts visualmente monótonos.

---

## 4. Elevation

O sistema visual simula relevos reais e o posicionamento de peças em camadas físicas por meio de uma elevação controlada e refinada.

### Shadow Vocabulary
- **Táctil (Lifted)** (`box-shadow: 0 12px 32px oklch(45% 0.22 280 / 0.12)`): Sombras de elevação de grandes containers e modais, simulando peças físicas sobre a mesa.
- **Micro-Interativa** (`box-shadow: 0 4px 12px oklch(45% 0.22 280 / 0.06)`): Sombra sutil para repouso em cards interativos.

### Named Rules
**The Interactive Elevation Rule (Regra da Elevação Interativa).** Superfícies são levemente elevadas ou planas em repouso. Sombras mais profundas e nítidas surgem apenas como resposta ativa de estado (hover, focus), simulando a atração física ao clique do usuário.

---

## 5. Components

Os componentes visuais adotam um visual cirúrgico, robusto e livre de excessos.

### Buttons
- **Shape:** Semi-retangulares estritos, cantos levemente arredondados (`rounded.sm` / 4px).
- **Primary:** Preenchimento com Accent (`colors.accent`), texto branco, fonte display bold, padding (`14px 28px`), caixa alta com espaçamento largo (`letter-spacing: 0.06em`).
- **Secondary / Outline:** Fundo transparente, borda de `1px` sólida da cor primária (`colors.primary`), cantos retangulares, preenchimento tátil ao interagir.
- **Hover / Focus:** Transição rápida exponencial (`transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1)`), aplicando leve translação para cima (`translateY(-2px)`) e elevação da sombra.

### Cards / Containers
- **Corner Style:** Cantos moderados (`rounded.lg` / 12px) para seções principais.
- **Background:** Branco puro (`colors.neutral-bg`) ou cinza muito suave, com borda nítida de `1px` em `colors.neutral-gray-light` para delimitar planos físicos.
- **Internal Padding:** Spacing generoso (`spacing.lg` / 24px) para evitar aglomeração de conteúdo.

### Inputs / Fields
- **Style:** Fundo cinza suave (`colors.neutral-gray-light`), borda cinza fina, cantos de 4px (`rounded.sm`), altura física mínima de 44px para toque fácil.
- **Focus:** Borda ativa na cor primária (`colors.primary`), sem brilhos ou halos borrados secundários.

---

## 6. Do's and Don'ts

### Do:
- **Do** usar cantos vivos e semi-retangulares (`rounded.sm` / 4px) para botões, inputs e formulários interativos.
- **Do** manter todos os textos principais em total conformidade com a taxa de contraste mínima de 4.5:1 (WCAG AA).
- **Do** concentrar a cor de destaque `Chama Rápida` (`#f97316`) apenas nos botões de conversão e elementos de ação chave.
- **Do** usar transições exponenciais suaves e rápidas (`0.2s`) para reforçar a sensação de agilidade e precisão.

### Don't:
- **Don't** criar botões no estilo pílula com cantos completamente arredondados (`rounded: 99px`), evitando clichês de IA.
- **Don't** utilizar degradês artificiais de cor em textos (`background-clip: text`) ou glassmorphism borrado decorativo.
- **Don't** sobrecarregar o site com layouts repetitivos de grades de cards idênticos ou grandes blocos cinzas sem cuidado visual.
- **Don't** usar sombras escuras, saturadas ou pesadas que pareçam sujas; todas as elevações devem usar opacidades extremamente baixas.
