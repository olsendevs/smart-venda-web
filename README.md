# Smart Venda Frontend
Este projeto foi desenvolvido utilizando as seguintes tecnologias:

- TypeScript: Uma linguagem de programação superset do JavaScript que oferece tipagem estática opcional.

- Node.js: Um ambiente de execução JavaScript server-side que permite a construção de aplicações escaláveis e eficientes.

- Next.js: Um framework React que facilita a construção de aplicativos web modernos, trazendo a renderização do lado do servidor e muitos recursos prontos para uso.

- React: Uma biblioteca JavaScript para construção de interfaces de usuário, utilizada para criar componentes reutilizáveis e dinâmicos.

- Tailwind CSS: Um framework de utilitários CSS altamente configurável que facilita a criação de designs modernos e responsivos.

## Executando o Projeto
A seguir, estão os passos necessários para executar este projeto.

### Pré Requesitos
Antes de iniciar, certifique-se de ter os seguintes requisitos instalados:

- Node.js: É necessário ter o Node.js instalado. Saiba como instalá-lo em: 
https://www.nodejs.org
- Docker: Para facilitar a execução, recomendamos instalar o Docker. Saiba como instalá-los em: 
https://www.docker.com

### Instalação do Projeto

1. No seu terminal, clone o repositório para o seu ambiente local.
````bash
git clone https://github.com/dwpl15/smart-venda-web.git
````
2. Acesse a pasta do projeto
````bash
cd smart-venda-web
````
1. Na raiz do projeto **/smart-venda-web** execute o docker:
   1. Construa a Imagem Docker:
    ````bash
    docker build -t smart-web-frontend .
    ````
    2. Crie e Inicie um Contêiner:
    ````bash
    docker run -p 3000:3000 smart-web-frontend
    ````

### Acessando o projeto
- O projeto estará hospedado em http://localhost:3000

