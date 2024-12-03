# AgendaFácil NAF

## Rodando localmente

Sqlite já vem pré-instalado na maioria das distribuições Linux. Para utilizar a versão correta do Node, recomendamos utilizar o [Asdf](https://asdf-vm.com/) ou [Mise](https://mise.jdx.dev/getting-started.html)

### Instalando as dependências

Para instalar a versão do Ruby com o Asdf ou Mise, [é necessário instalar algumas dependências de sistema primeiro](https://github.com/rbenv/ruby-build/wiki#suggested-build-environment)

```sh
asdf install # (ou `mise install`)instala a versão do node indicada no .tool-versions
cd backend && bundle # Instala todas as dependências do Rails
```

E então rode o projeto com:

```sh
rails s
```

## Projeto feito por

1. João Paulo Da Costa Rosa - 06007776
2. Leonardo Gurgel Maciel Ferreira - 06010973
