# BILINHO — Impressão 3D Sob Demanda

![BILINHO](https://img.shields.io/badge/Status-Live-success)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)

Portfólio e marketplace de impressão 3D personalizada. Do conceito à realidade com qualidade profissional.

## 🚀 Características

- **Catálogo de Produtos** — 6 categorias com filtros dinâmicos (categoria, material, personalização)
- **Modais Interativos** — Visualização detalhada de produtos com galeria de imagens e customização
- **Formulário Multi-etapas** — Sistema de orçamento em 3 passos com validação
- **Design Responsivo** — Otimizado para desktop, tablet e mobile
- **Tweaks Panel** — Painel de personalização ao vivo (cores, conteúdo, layout)
- **Animações Suaves** — Transições e hover states com CSS e React

## 🛠️ Tecnologias

- **React 18.3.1** — UI components
- **Babel Standalone** — JSX transform inline
- **CSS-in-JS** — Estilos inline com variáveis CSS
- **Google Fonts** — Space Grotesk + Inter

## 📂 Estrutura do Projeto

```
BILINHO/
├── index.html          # Página principal + setup React/Babel
├── app.jsx             # Componentes React (App, Hero, Products, etc.)
├── tweaks-panel.jsx    # Sistema de tweaks reutilizável
├── uploads/            # Assets de referência
└── README.md
```

## 🎨 Componentes Principais

### `<Hero />`
Seção de abertura com título, CTA, visual 3D animado e stats bar

### `<ProductsSection />`
Grid de produtos com:
- Sistema de filtros (categoria, material, personalização)
- Cards com hover effects
- Modal de detalhes (`<ProductModal />`)

### `<HowItWorks />`
Timeline do processo em 4 etapas

### `<PortfolioSection />`
Galeria de projetos antes/depois + projeto em destaque

### `<ReviewsSection />`
Grid de avaliações com estrelas e avatares

### `<QuoteModal />`
Formulário de orçamento em 3 etapas:
1. Dados de contato
2. Tipo de projeto
3. Descrição detalhada

## 🎛️ Tweaks Disponíveis

Ative o painel de Tweaks via toolbar para customizar:

- **Cores** — Cor de destaque (CTA) e fundo escuro
- **Conteúdo** — Título do hero e texto do botão CTA
- **Layout** — Estilo de cards (shadow/border/flat)
- **Toggle** — Mostrar/ocultar seção de avaliações

## 🚀 Como Usar

### Opção 1: Abrir Direto no Navegador
1. Clone o repositório
2. Abra `index.html` no navegador
3. Pronto! Sem build necessário.

### Opção 2: Servidor Local
```bash
# Com Python 3
python -m http.server 8000

# Com Node.js
npx serve

# Acesse http://localhost:8000
```

## 📝 Personalização

### Alterar Cores
Edite as variáveis CSS em `index.html`:
```css
:root {
  --purple: oklch(45% 0.22 280);
  --orange: oklch(68% 0.19 45);
  --purple-dark: oklch(18% 0.12 280);
}
```

### Adicionar Produtos
Em `app.jsx`, edite o array `PRODUCTS`:
```javascript
const PRODUCTS = [
  {
    id: 7,
    name: "Seu Novo Produto",
    category: "Categoria",
    material: "PLA",
    customization: "Alta",
    price: "A partir de R$ 99",
    badge: "NOVO",
    color: "oklch(60% 0.18 200)",
    description: "Descrição completa...",
    details: ["Item 1", "Item 2"],
    images: ["color1", "color2", "color3"],
    reviews: []
  }
];
```

### Conectar Formulário
O modal de orçamento (`<QuoteModal />`) simula envio. Para integrar:

**Opção A: Email (Formspree)**
```javascript
const handleSubmit = async () => {
  await fetch('https://formspree.io/f/YOUR_ID', {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: { 'Content-Type': 'application/json' }
  });
  setSubmitted(true);
};
```

**Opção B: WhatsApp Direct**
```javascript
const handleSubmit = () => {
  const msg = `Nome: ${formData.name}\nEmail: ${formData.email}\nProjeto: ${formData.type}\n\n${formData.description}`;
  window.open(`https://wa.me/5500000000000?text=${encodeURIComponent(msg)}`);
  setSubmitted(true);
};
```

## 🎯 Próximos Passos

- [ ] Substituir placeholders de imagem por fotos reais dos produtos
- [ ] Conectar formulário a backend/WhatsApp API
- [ ] Adicionar Google Analytics
- [ ] Implementar lightbox para galeria de portfólio
- [ ] SEO: meta tags, Open Graph, structured data
- [ ] Adicionar animações de scroll (Intersection Observer)

## 📄 Licença

Projeto criado para demonstração. Personalize livremente para seu uso.

## 📧 Contato

**BILINHO**  
WhatsApp: (00) 0 0000-0000  
Email: ola@bilinho.com

---

Feito com ♥ e impressão 3D
