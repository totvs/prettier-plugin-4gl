import { options } from './config';
import { printToken } from './printers';
import { parser as tds_parser } from '@totvs/tds-parsers';
import { IParserOptions } from '@totvs/tds-parsers/typings/config';
import { ASTNode } from '@totvs/tds-parsers/typings/ast_node';
import { AST } from 'prettier';

const PRAGMA = '--@format';

const languages = [
  {
    extensions: ['.4gl', '.per'],
    name: '4GL',
    parsers: ['4gl'],
    vscodeLanguageIds: ['4gl'],
  },
];

function hasPragma(text: string) {
  return text.startsWith(PRAGMA);
}

function insertPragma(text: string) {
  return PRAGMA + '\n' + text;
}

function parser(
  text: string,
  api,
  options: IParserOptions
): ASTNode | undefined {
  try {
    const parserInfo: any = {
      debug: false,
      filepath: options.filepath,
      parser: options.parser,
      fileext: options.fileext,
    };

    const result: any = tds_parser(text, parserInfo);
    if (result.error) {
      throw result.error;
    }

    return result.ast;
  } catch (error) {
    if (error.location) {
      console.error(
        `Sintax error: [${error.location.start.line}:${error.location.start.column}] ${error.message}`
      );
    } else {
      console.error(error);
    }
    throw error;
  }

  return undefined;
}

const parsers = {
  '4gl': {
    parse: (text, api, options) => {
      return parser(text, api, options);
    },
    astFormat: '4gl-token',
    hasPragma: hasPragma,
    insertPragma: insertPragma,
  },
};

function preprocess(ast: AST, options: object): AST {
  return ast;
}

const printers = {
  '4gl-token': {
    print: printToken,
    insertPragma: insertPragma,
    preprocess: preprocess,
  },
};

//necessário exportar dessa forma para ser reconhecido como adicional do Prettier.
module.exports = {
  name: 'prettier-plugin-4gl',
  languages,
  parsers,
  printers,
  options,
};
