# AgendaFácil NAF

## Rodando localmente

Sqlite já vem pré-instalado na maioria das distribuições Linux. Para utilizar a versão correta do Ruby, recomendamos utilizar o [Asdf](https://asdf-vm.com/) ou [Mise](https://mise.jdx.dev/getting-started.html)

### Instalando as dependências

Para instalar a versão do Ruby com o Asdf ou Mise, [é necessário instalar algumas dependências de sistema primeiro](https://github.com/rbenv/ruby-build/wiki#suggested-build-environment)

```sh
asdf install # (ou `mise install`)instala a versão do node indicada no .tool-versions
cd backend && bundle # Instala todas as dependências do Rails
rails db:migrate # Cria todas as tabelas necessárias para o banco de dados
npm i # Instala as dependências do React
```

E então rode o projeto com:

```sh
npm run dev # levanta o servidor do app e api simultaneamente
```

## Projeto feito por

1. João Paulo Da Costa Rosa - 06007776
2. Leonardo Gurgel Maciel Ferreira - 06010973
