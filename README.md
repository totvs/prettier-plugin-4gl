# Prettier 4GL Plugin

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

## Instalação

```
npm install prettier-plugin-4gl --save-dev
```

## Uso e opções

### Opções

-V, --version output the version number

-v, --verbose detalha a execução (default: true)

--no-banner omite a abertura

-h, --help display help for command

### Linha de comando

```
npm formatter-4gl [options]
```

### Embarcado

Nesse modo informe as opções usando o nome longo da opção sem o `--`.

```Typescript
  const options: any = { ... } //Prettier Options and Formatter 4GL Options*
  //Full source
  let result: any = prettier.format(content, {
    parser: "4gl-source",
    ...options,
  });
```

```Typescript
  const options: any = { ..., //Prettier Options and Formatter 4GL Options*
    rangeStart: <start offset>,
    rangeEnd: <end offset>
  }
  //Range source
  let result: any = prettier.format(content, {
    parser: "4gl-token",
    ...options,
  });
```

## Mantenedor

<table>
  <tr>
    <td align="center"><a href="https://twitter.com/TOTVSDevelopers"><img src="https://avatars2.githubusercontent.com/u/20243897?v=4?s=100" width="100px;" alt=""/><br /><sub><b>TOTVS S.A.</b></sub></a><br /><a href="#maintenance-totvs" title="Maintenance">🚧</a> <a href="#plugin-totvs" title="Plugin/utility libraries">🔌</a> <a href="#projectManagement-totvs" title="Project Management">📆</a></td>
    </tr>
</table>

## Colaboradores

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/brodao"><img src="https://avatars0.githubusercontent.com/u/949914?v=4?s=50" width="50px;" alt=""/><br /><sub><b>Alan Cândido</b></sub></a><br /><a href="https://github.com/totvs/@totvs/prettier-plugin-4gl/commits?author=brodao" title="Code">💻</a> <a href="https://github.com/totvs/@totvs/prettier-plugin-4gl/commits?author=brodao" title="Documentation">📖</a> <a href="https://github.com/totvs/@totvs/prettier-plugin-4gl/commits?author=brodao" title="Tests">⚠️</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
