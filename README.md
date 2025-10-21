Projeto Web — Vite + React + Supabase

Aplicação web desenvolvida em React + TypeScript, com Vite, Tailwind CSS e shadcn-ui.
O sistema utiliza o Supabase como banco de dados (PostgreSQL + Auth + Storage) e é publicado na Vercel.

⚙️ Tecnologias utilizadas

Frontend: React + TypeScript

Estilos: Tailwind CSS + shadcn-ui

Banco de Dados: Supabase (Postgres + Auth + Storage)

Deploy: Vercel

Gerenciador de pacotes: npm

🚀 Como configurar o projeto do zero
1. Clonar o repositório

Crie um novo repositório na sua conta do GitHub e clone este projeto para sua máquina:

git clone <URL_DO_SEU_REPOSITORIO>
cd <NOME_DO_PROJETO>

2. Instalar dependências

Com o Node.js instalado (versão LTS), rode:

npm install

3. Criar um projeto no Supabase

Acesse https://supabase.com

Clique em New Project

Escolha um nome e senha para o banco

Aguarde o provisionamento do projeto

Vá até Project Settings → API e copie:

Project URL

anon public key

service_role key (opcional, se for usar funções serverless)

4. Configurar variáveis de ambiente

Crie um arquivo chamado .env na raiz do projeto e adicione as credenciais do seu Supabase:

VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua_chave_publica_anon


⚠️ Importante: nunca envie o .env para o GitHub.
Essas chaves também devem ser adicionadas nas Environment Variables da Vercel (passo 7).

5. Migrar o banco de dados (dump.sql)

O projeto já possui um arquivo chamado dump.sql (ou migration.sql) contendo toda a estrutura e dados necessários do banco.

Passo a passo para importar no Supabase:

Baixe o arquivo dump.sql presente neste repositório

No painel do seu Supabase, vá em SQL Editor

Clique em Upload file (ícone de pasta) e selecione o arquivo dump.sql

Após carregar o conteúdo, clique em Run

Espere até que todas as tabelas e policies sejam criadas

Ao final, o seu banco estará idêntico ao ambiente original — com as tabelas, colunas, relações e permissões configuradas.

6. Rodar o projeto localmente

Com o banco configurado e o .env preenchido, execute:

npm run dev


Abra o navegador em http://localhost:5173
.

7. Deploy na Vercel

Crie uma conta em https://vercel.com

Clique em Add New → Project → Import Git Repository

Selecione o repositório do projeto

Adicione as variáveis de ambiente:

VITE_SUPABASE_URL

VITE_SUPABASE_ANON_KEY

Clique em Deploy

A Vercel detecta automaticamente o Vite e faz o build.
Após o deploy, o sistema estará acessível no domínio gerado.

8. (Opcional) Conectar domínio próprio

Na Vercel:

Vá em Project → Settings → Domains

Clique em Add Domain

Digite o domínio do cliente (ex: meusite.com)

Siga as instruções de DNS exibidas na tela

✅ Checklist final

 Projeto clonado e configurado no GitHub do cliente

 Supabase criado com o dump.sql importado

 Variáveis .env configuradas localmente

 Deploy realizado com sucesso na Vercel

 Sistema funcionando com o banco do cliente
