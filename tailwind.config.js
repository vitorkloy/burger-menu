/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage:{
        'home': "url('/assets/bg.png')",
      },
      backgroundColor:{
        'modal': "rgba(0, 0, 0, 0.7)",
      },
    },
  },
  plugins: [],
}

/*
  content: 
    informa ao Tailwind CSS quais arquivos ele deve observar para identificar classes CSS. 
    No caso, ele está configurado para procurar por arquivos .html e .js dentro do diretório atual e em todos os subdiretórios.

  theme: 
    permite customizar o tema padrão do Tailwind CSS. 
    A propriedade extend está vazia neste caso, o que significa que nenhum ajuste está sendo feito no tema padrão.

  plugins: 
    permite adicionar plugins adicionais ao Tailwind CSS para estender sua funcionalidade.  
    Também não há nenhum plugin sendo adicionado nessa configuração.
*/