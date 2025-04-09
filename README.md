# Fundação Escola de Comércio Álvares Penteado

A Fundação Escola de Comércio Álvares Penteado (FECAP) é uma instituição de ensino superior sem fins lucrativos, reconhecida por seu pioneirismo e excelência na área de Gestão de Negócios. Fundada em 2 de junho de 1902 por Antônio de Álvares Leite Penteado e Horácio Berlinck, a FECAP surgiu da necessidade de formar profissionais qualificados para a gestão das organizações, contribuindo para o desenvolvimento econômico do país.

Ao longo de sua trajetória, a FECAP foi responsável por marcos significativos na educação brasileira, como a criação do primeiro curso técnico de Contabilidade e do primeiro curso superior de Economia do país. Além disso, a instituição detém a mais antiga certificação de utilidade pública do Brasil, concedida em 1915.

A sede histórica da FECAP, conhecida como Palácio do Comércio, foi projetada pelo arquiteto sueco Carlos Ekman e inaugurada em 12 de dezembro de 1908. Localizado no Largo São Francisco, o edifício apresenta uma arquitetura que mescla elementos do art nouveau e do estilo clássico, sendo tombado como patrimônio histórico da cidade de São Paulo desde a década de 1990.

Atualmente, a FECAP oferece uma variedade de cursos de graduação, pós-graduação e extensão, mantendo seu compromisso com a formação de profissionais altamente qualificados na área de negócios. A instituição também se destaca por sua infraestrutura moderna e por iniciativas de pesquisa e desenvolvimento, consolidando-se como referência no cenário educacional brasileiro.

# Petshop System 🐶

## Desenvolvedor

[Gustavo Roberto](https://www.linkedin.com/in/gustavo-roberto-0aa488288/) 👨‍💻

## Orientadores

<a href="https://www.linkedin.com/in/eduardo-savino-gomes-77833a10/">Dr. Eduardo Savino Gomes</a>

<a href="https://www.linkedin.com/in/francisco-escobar/">Me. Francisco de Souza Escobar</a>

<a href="https://www.linkedin.com/in/aimarlopes/">Me. Aimar Martins Lopes</a>

<a href="https://www.linkedin.com/in/jbuesso/">Dr. Jose Carlos Buesso Junior</a>

<a href="https://www.linkedin.com/in/victorbarq/?originalSubdomain=br">Dr. Victor Rosetti de Quiroz</a>

## Descrição

O Sistema de Agendamento de Banhos em Pet Shop é uma aplicação web desenvolvida com o objetivo de facilitar o agendamento de banhos para animais de estimação em pet shops. O sistema permite que usuários realizem o cadastro e login de forma segura, com autenticação baseada em tokens JWT e criptografia de senhas utilizando Bcrypt. Após autenticados, os usuários podem agendar banhos para seus pets, informando dados como nome, raça, data, horário e observações, além de realizar o upload obrigatório de uma imagem do animal, que é armazenada localmente no servidor.

A aplicação foi construída com tecnologias modernas, utilizando HTML5 e CSS3 no front-end, e Node.js com o framework Express no back-end. O banco de dados utilizado é o MySQL, onde são armazenadas todas as informações dos usuários e dos agendamentos. O sistema conta com uma API completa que permite o cadastro, leitura, edição e exclusão dos agendamentos, e protege suas rotas privadas com middleware que verifica a validade dos tokens de autenticação.

Além das funcionalidades básicas, o sistema também oferece possibilidades de recursos avançados, como login com conta Google via OAuth2, visualização prévia da imagem antes do envio, controle para evitar agendamentos com horários duplicados e logout automático por expiração de sessão.

## 🛠 Estrutura de pastas

    petshop/
    ├── documents/
    │
    ├── images/
    │
    ├── src/
    │   ├── backend/
    │   │   ├── config/
    │   │   │   └── db.js
    │   │   ├── controllers/
    │   │   ├── middleware/
    │   │   ├── models/
    │   │   ├── routes/
    │   │   ├── uploads/
    │   │   ├── .env
    │   │   ├── app.js
    │   │   └── package.json
    │   │
    │   ├── frontend/
    │   │   ├── index.html
    │   │   ├── login.html
    │   │   ├── cadastro.html
    │   │   ├── dashboard.html
    │   │   ├── agendamentos.html
    │   │   └── css/
    │   │       └── style.css
    │   │
    │   └── banco_petshop.sql
    │
    ├── .gitignore
    │
    └── README.md

## 🛠 Instalação

Nenhuma, basta acessar o site [aqui](#).

## 💻 Configuração para Desenvolvimento

Descreva como instalar todas as dependências para desenvolvimento e como rodar um test-suite automatizado de algum tipo. Se necessário, faça isso para múltiplas plataformas.

Para abrir este projeto você necessita das seguintes ferramentas:

-<a href="https://godotengine.org/download">GODOT</a>

```sh
make install
npm test
Coloque código do prompt de comnando se for necessário
```

## 📋 Licença/License


## 🎓 Referências

Aqui estão as referências usadas no projeto.

1. <https://github.com/iuricode/readme-template>
2. <https://github.com/gabrieldejesus/readme-model>
3. <https://creativecommons.org/share-your-work/>
4. <https://freesound.org/>
5. Músicas por: <a href="https://freesound.org/people/DaveJf/sounds/616544/"> DaveJf </a> e <a href="https://freesound.org/people/DRFX/sounds/338986/"> DRFX </a> ambas com Licença CC 0.
