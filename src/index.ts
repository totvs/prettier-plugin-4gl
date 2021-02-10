import { options } from "./config";
import { printToken } from "./printers";
import { parser as tds_parser } from "tds-parsers";
import { IParserOptions } from "tds-parsers/typings/config";
import { ASTNode } from "tds-parsers/typings/ast_node";

const PRAGMA = "--@format";

const languages = [
  {
    extensions: [".4gl", ".per"],
    name: "4GL",
    parsers: ["4gl"],
    vscodeLanguageIds: ["4gl"],
  },
  {
    extensions: [".4gl"],
    name: "AdvPL",
    parsers: ["advpl"],
    vscodeLanguageIds: ["advpl"],
  },
];

function locStart(ast) {
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

function locEnd(ast) {
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

function hasPragma(text) {
  return text.startsWith(PRAGMA);
}

function insertPragma(text) {
  return PRAGMA + "\n" + text;
}

function parser(text: string, api, options: IParserOptions): ASTNode | undefined {
  try {
    const parserInfo: any = {
      debug: false,
      filepath: options.filepath,
      parser: options.parser,
      fileext: options.fileext
    };

    const result: any = tds_parser(text + "\n", parserInfo); //EOL obrigatório na última linha
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
  "4gl": {
    parse: (text, api, options) => {
      return parser(text, api, options);
    },
    astFormat: "4gl-token",
    locStart: locStart,
    locEnd: locEnd,
    hasPragma: hasPragma
  },
  "advpl": {
    parse: (text, api, options) => {
      return parser(text, api, options);
    },
    astFormat: "advpl-token",
    // locStart: locStart,
    // locEnd: locEnd,
    hasPragma: hasPragma,
  },
};

const printers = {
  "4gl-token": {
    print: printToken,
    insertPragma: insertPragma,
  },
  "advpl-token": {
    print: printToken,
    insertPragma: insertPragma,
  },
};

//necessário exportar dessa forma para ser reconhecido como adicional do Prettier.
module.exports = {
  name: "prettier-plugin-4gl",
  languages,
  parsers,
  printers,
  options,
};
