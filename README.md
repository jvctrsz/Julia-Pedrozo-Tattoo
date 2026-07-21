# Julia Pedrozo Tattoo

Site desenvolvido para uma tatuadora, com foco em seu portfólio. Entregando um site intuitivo, responsivo e que representa sua identidade visual.

O projeto foi criado com o foco de apresentar os trabalhos da tatuadora, facilitar o acesso às informações de contato e oferecer uma experiência simples, visual e objetiva para clientes.

## Deploy

Este é um projeto em produção com domínio próprio.
* [www.juliapedrozotattoo.com.br](https://www.juliapedrozotattoo.com.br)

## Sobre o projeto

O objetivo do projeto foi criar um portfólio digital profissional para a tatuadora Julia Pedrozo, reunindo informações sobre seu trabalho, estilos de tatuagem, portfólio, dúvidas frequentes e formas de contato.

Além das páginas públicas, o projeto também possui uma área administrativa para gerenciamento separado de trabalhos realizados e artes disponíveis.

## Funcionalidades

* Página inicial com os principais trabalhos
* Página de portfólio
* Página de artes disponíveis para tatuagem
* Página sobre a profissional
* Página de contato
* Página de perguntas frequentes
* Layout responsivo
* Área administrativa
* Upload e gerenciamento separado de trabalhos realizados e artes disponíveis
* Integração com Cloudinary para armazenamento de imagens
* Integração com PostgreSQL hospedado no Neon via Prisma
* Deploy em produção com domínio próprio

## Tecnologias utilizadas

* Next.js
* React
* TypeScript
* Tailwind CSS
* Prisma
* Neon
* Cloudinary
* SWR
* Vercel
* Vercel Analytics
* Vercel Speed Insights
* Headless UI

## Trabalhos realizados e artes disponíveis

Os trabalhos são classificados no banco pelo campo `Image.type`:

* `REALIZADO`: trabalhos concluídos exibidos em `/portfolio`;
* `DISPONIVEL`: artes autorais disponíveis exibidas em `/disponiveis`.

Registros anteriores à classificação permanecem como `REALIZADO` por meio do valor padrão definido no schema e na migration. O painel `/admin` possui áreas separadas para publicar, listar e excluir cada tipo.

As rotas existentes aceitam o tipo público `realizado` ou `disponivel`:

* `GET /api/images?type=realizado|disponivel` lista somente a coleção solicitada;
* `POST /api/images` recebe `type` e exige autenticação;
* `GET /api/cloudinary/sign?type=realizado|disponivel` escolhe a pasta no servidor.

Uploads realizados continuam na pasta `tattoo-portfolio`. Artes disponíveis usam exclusivamente `tattoo-portfolio-disponiveis`. O cliente não pode escolher outra pasta, e o cadastro valida se o `publicId` pertence à pasta esperada.

O painel usa Headless UI para a navegação acessível entre os dois tipos de trabalho.

## Aprendizados

Este projeto foi meu primeiro contato prático com Next.js um projeto.

Durante o desenvolvimento, pude entender melhor a estrutura do App Router, organização de páginas e deploy em produção com Vercel.

Também tive que lidar com conceitos importantes de SEO e performance, aplicando boas práticas de estrutura semântica, metadados, responsividade e otimização de imagens. Com esses ajustes, o projeto alcançou scores entre 90 e 100 em SEO no Lighthouse e apresentou boas métricas de carregamento no Vercel Speed Insights.

Além disso, o projeto reforçou minha experiência com entrega para cliente real, integração com serviços externos como Cloudinary e Neon.

## Autor

Desenvolvido por [João Victor Matias](https://github.com/jvctrsz).

* [LinkedIn](https://www.linkedin.com/in/jvctrsz)
* [E-mail](mailto:jvictor26dev@gmail.com)
