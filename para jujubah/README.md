# 💕 Pedido de Amor

Site interativo de pedido de amor com botão que foge, pétalas caindo e chuva de corações.

## Como subir no GitHub Pages (passo a passo)

### 1. Crie um repositório no GitHub
- Acesse [github.com](https://github.com) → clique em **New repository**
- Nome sugerido: `pedido-de-amor`
- Deixe como **Public** (obrigatório para GitHub Pages gratuito)
- **Não** marque nenhuma opção de inicialização
- Clique em **Create repository**

### 2. Suba o projeto pelo terminal

```bash
# Dentro da pasta do projeto:
git init
git add .
git commit -m "💕 primeiro commit"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/pedido-de-amor.git
git push -u origin main
```
> Substitua `SEU_USUARIO` pelo seu usuário do GitHub.

### 3. Ative o GitHub Pages
- No repositório, vá em **Settings** → **Pages** (menu lateral)
- Em **Source**, selecione **GitHub Actions**
- Salve

### 4. Pronto! 🎉
O site vai buildar automaticamente e em ~2 minutos estará disponível em:
```
https://SEU_USUARIO.github.io/pedido-de-amor/
```

---

## Desenvolvimento local

```bash
npm install
npm run dev
```

## Personalizando a mensagem

Edite o arquivo `src/App.jsx` e altere o trecho:
```jsx
Eu também te amo muito! Você é o amor da minha vida...
```
e também:
```jsx
Te amo muito xuxubah! ❤️❤️
```
