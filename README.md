# Prettier 4GL Plugin

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

## Instalação

Primero, efetuar a instalação do [Prettier](https://prettier.io/docs/en/install.html) e em seguida esta extensão.

Para uso local:

```
npm install prettier-plugin-4gl --save-dev
```

Para uso global:

```
npm install prettier-plugin-4gl -g
```

## Opções

### Prettier

Para [detalhes sobre configuração e chaves](https://https://prettier.io/docs/en/options.html) do Prettier.
Abaixo, configurações do _Prettier_ utilizados pela extensão.

| Chave             | Uso                                                                    |
| ----------------- | ---------------------------------------------------------------------- |
| --tab-width <int> | Número de espaços por nível de indentação.                             |
|                   | Padrão: 2                                                              |
| --use-tabs        | Recuar com tabulações em vez de espaços.                               |
|                   | Padrão: false                                                          |
| --insert-pragma   | Insere '@format' no inicio do do arquivo.                              |
|                   | Padrão false                                                           |
| --require-pragma  | Requer que '@prettier' ou '@format' esteja presente no arquivo.        |
|                   | Padrão: false                                                          |
| -w, --write       | Grava o arquivo formato. Cuidado: o arquivo original será sobrescrito. |
|                   | Padrão: false                                                          |

### 4GL

Chaves específicas para formatação de fontes 4GL.

| Chave                      | Uso                                                                        |
| -------------------------- | -------------------------------------------------------------------------- | ------------- | ----------------------------------------------------------- | --------------------------------- | ------------- | ------- | ------------------------------------------------------- |
| --4gl-align-fields         | Alinhar identificação de campos em comandos DEFINE/RECORD. Padrão: false   |
| --4gl-align-comment <int>  | Coluna de alinhamento de comentário de fim de linha. Padrão: 0 (desligado) |
| --4gl-braces               | Espaçamento entre chaves. Padrão: false                                    |
| --4gl-bracket              | Espaçamento entre colchetes. Padrão: false                                 |
| --4gl-comma                | Espaçamento após virgulas de separção. Padrão: false                       |
| --4gl-format-number        | Formata números, p.e. 1234 é formatado para 1,234.                         | Padrão: false |
| upper                      |
| --4gl-max-empty-line <int> | Máximo de linhas em branco na sequência. Padrão: 0 (sem limite)            |
| --4gl-math-operators       | Espaçamento em operadores matemáticos. Padrão: false                       |
| --4gl-parenthesis          | Espaçamento entre parenteses. Padrão: false                                |
| --4gl-keywords-case <upper | lower                                                                      | ignore>       | Coloca palavras-chaves em maiúsculas ou minúsculas. Padrão: | --4gl-string-style <double-quotes | single-quotes | ignore> | Usar aspas simples ou duplas em strings. Padrão: ignore |

### Uso em linha de comando

> Detalhes sobre o [uso em CLI](https://prettier.io/docs/en/cli.html).

> Em determinados sistemas operacionais ou devido a politicas de segurança, pode ser necessário configurações adicionais. Veja a documentação específica do seu sistema operacional ou acione o resposável de infra-estrutura/segurança.

```
npm prettier --parser=4gl [options]
```

### Integração com editores

Ver [Editor Integration](https://prettier.io/docs/en/editors.html).

Nesse modo informe as opções usando o nome longo da opção sem o `--` e as letras precedidas por '-' em maiúsculas, na sessão `4gl.formatter` no arquivo `settings.json`.

```JSON
{
  ...
  "4gl.formatter": {
    "keywordsCase": "upper",
    "stringStyle": "ignore",
    "formatNumber": false,
    "operatorSpacing": false
  }
  ...
```

### Embarcado

Nesse modo, informe as opções usando o nome longo das opções sem o `--`.

```Typescript
  const options: any = { ... } //Prettier Options and Formatter 4GL Options*
  //Full source
  let result: any = prettier.format(content, {
    parser: "4gl",
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
    <td align="center"><a href="https://github.com/brodao"><img src="https://avatars0.githubusercontent.com/u/949914?v=4?s=50" width="50px;" alt=""/><br /><sub><b>Alan Cândido</b></sub></a><br /><a href="https://github.com/totvs/prettier-plugin-4gl/commits?author=brodao" title="Code">💻</a> <a href="https://github.com/totvs/prettier-plugin-4gl/commits?author=brodao" title="Documentation">📖</a> <a href="https://github.com/totvs/prettier-plugin-4gl/commits?author=brodao" title="Tests">⚠️</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
