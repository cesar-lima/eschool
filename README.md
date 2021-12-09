<h1 align="center">
Eschool
</h1>

## Começando

1. Instalar docker com WSL (https://www.docker.com/get-started) e seguir todas as instruções de instalação <br />
2. Clone este repositório usando `git clone https://github.com/cesar-lima/eschool.git`<br />
3. Mova-se para o diretório do projeto: `cd eschool` <br />
4. Instalar e realizar o build das aplicações: `docker compose up -d` e aguardar até que tudo seja instalado. Isso pode levar alguns minutos <br />
5. Rodar script para inserir insformações no banco de dados: `docker container exec eschool-api npm run deploy:db` <br />
6. Para concluir acesse http://localhost:8080/ no seu navegador.
7. Já existe uma conta de administrador definida, as informações para fazer login com ela são: <br /> 
email: root@eschool.com<br />
senha: abc123
