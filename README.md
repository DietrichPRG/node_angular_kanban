# Kanban Board

Todo o projeto está configurado para rodar no docker.
Tecnologias:
Front: Angular + Typescript
Back: NodeJS + Typescript + Express + Redis + MongoDB

### Desafio front
Foi feito em angular com Typescript, Lazy Loading, Material, AuthGuard, Autenticação JWT e tela de login, bem como um interceptor para redirecionar ao login caso o token expire ou o usuario tente acessar a rota diretamente.

### Desafio back
Implementado em nodeJS com Typescript, gerando token JWT e os dados sendo persistidos em mongoDB, com as sessões sendo gerenciadas pelo redis.

### Desafio full
Juntei a implementação do back e do front feito nas atividades anteriores

# Como executar

**- importante ter o docker instalado**
Basta acessar uma das pastas:
- desafio-tecnico-backend
- desafio-tecnico-frontend
- desafio-tecnico-fullstack

E então executar o seguinte comando:
> docker compose up -d --build

O projeto será acessivel via **localhost:3000**

**- importante: apagar as maquinas dockers geradas quando for trocar a pasta**