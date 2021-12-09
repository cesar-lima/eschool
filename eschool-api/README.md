#Baixar MySQL
docker run --detach --name=eschool-mysql -p 3306:3306 -e MYSQL_DATABASE=eschool MYSQL_ROOT_PASSWORD=root -d mysql/mysql-server:latest

#Rodar Docker compose
docker compose up

#Roda Migration para criar tabelas
yarn prisma migrate deploy
