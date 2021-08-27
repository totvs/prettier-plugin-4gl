import { IParserOptions } from '@totvs/tds-parsers/typings/config';
import { options } from './config';
import { printProgram, printToken } from './printers';

const tds_parser = require('@totvs/tds-parsers').tds_parser;

const PRAGMA = '--@format';

const languages = [
  {
    extensions: ['.4gl', '.per'],
    name: '4GL',
    parsers: ['4gl', '4gl-token'],
    vscodeLanguageIds: ['4gl'],
  },
  {
    extensions: ['.prw'],
    name: 'Adv/PL',
    parsers: ['advpl', 'advpl-token'],
    vscodeLanguageIds: ['advpl'],
  },
];

function locStart(ast: any) {
  let offset = 0;

  if (Array.isArray(ast)) {
    if (ast.length > 0) {
      for (let index = 0; index < ast.length; index++) {
        const element = ast[index];
        offset = locStart(element);
        if (offset !== 0) {
          break;
        }
      }
    }
  } else if (!ast.offset) {
    offset = locStart(ast.value);
  } else if (ast.kind) {
    offset = ast.offset.start;
  }

  return offset;
}

function locEnd(ast: any) {
  let offset = Infinity;

  if (Array.isArray(ast)) {
    if (ast.length > 0) {
      for (let index = 0; index < ast.length; index++) {
        const element = ast[index];
        offset = locEnd(element);
        if (offset !== 0) {
          break;
        }
      }
    }
  } else if (!ast.offset) {
    offset = locEnd(ast.value);
  } else if (ast.kind) {
    offset = ast.offset.end;
  }

  return offset;
}

function hasPragma(text: string) {
  return text.startsWith(PRAGMA);
}

function insertPragma(text: string) {
  return PRAGMA + '\n' + text;
}

function prettierParser(text: string, api: any, options: IParserOptions): any {
  try {
    const parserInfo: any = {
      ...options,
      debug: false,
    };

    text += text.endsWith('\n') ? '' : '\n';

    const result: any = tds_parser(text, parserInfo); //EOL obrigatório na última linha
    if (result.error) {
      throw result.error;
    }

    return result.ast;
  } catch (error) {
    if (error.line) {
      console.error(
        `Sintax error: [${error.line}:${error.column}] ${error.message}\n${
          text.split('\n')[error.line - 1]
        }\n${'-'.repeat(error.column - 1)}^`
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
    parse: (text: string, api: any, options: IParserOptions) => {
      return prettierParser(text, api, {
        ...options,
        parserProcess: 'program',
      });
    },
    astFormat: 'program',
    locStart: locStart,
    locEnd: locEnd,
    hasPragma: hasPragma,
  },
  '4gl-token': {
    parse: (text: string, api: any, options: IParserOptions) => {
      return prettierParser(text, api, { ...options, parserProcess: 'token' });
    },
    astFormat: 'token',
    locStart: locStart,
    locEnd: locEnd,
    hasPragma: hasPragma,
  },
};

const printers = {
  program: {
    print: printProgram,
    insertPragma: insertPragma,
  },
  token: {
    print: printToken,
    insertPragma: insertPragma,
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
