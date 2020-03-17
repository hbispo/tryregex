# Aprenda Regex

O Aprenda Regex é um tutorial interativo de expressões regulares traduzido do [Try Regex](http://tryregex.com/), que foi inspirado pelo [Try Ruby](http://tryruby.org/) e [Try Haskell](http://tryhaskell.org/). Confira em <https://gaia.blockstack.org/hub/14hc2iL6BKgdVpJh7FBssFRsZWM1iffiHZ/experimenteregex/1.0/index.html>.

O projeto original, Try Regex, foi concebido na [HackKing's Hackathon](http://www.hackkings.org/) in London.

## Instalando

O Aprenda Regex utiliza o [gulp](http://gulpjs.com/) para as builds e outras ferramentas de desenvolvimento, e o [bower](http://bower.io/) para gerenciar pacotes. Para instalar, rode os seguintes comandos:

```
npm install
bower install
```

É necessário que o Node (>= 0.9), o npm e o bower estejam instalados.

## Rodando

É HTML estático, então você não precisa de nada especial para servir os arquivos. Entretanto, o gulp adiciona um tanto de ferramentas que torna tudo mais fácil durante o desenvolvimento. Você pode rodar `gulp build` para transformar o código LESS em CSS, você pode usar `gulp lint` para lintar o seu código, e você pode usar o `gulp` para rodar o [browser-sync](http://browsersync.io/) e um monitor de LESS para compilar e injetar mudanças conforme elas são feitas.


## Licença

O Aprenda Regex é distribuído sob a licença MIT.
