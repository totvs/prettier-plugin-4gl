import { options } from "./config";
import parser from "./parsers";
import { printJSON, printToken } from "./printers";

const PRAGMA = "--@format";

const languages = [
  {
    extensions: [".4gl"],
    name: "4GL",
    //parsers: ["4gl-source", "4gl-token"],
    parsers: ["4gl-token"],
    vscodeLanguageIds: ["4gl"],
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

const parsers = {
  // "4gl-source": {
  //   parse: (text, api, options) => {
  //     return parser_4gl(text, api, options);
  //   },
  //   astFormat: "4gl-source",
  //   locStart: locStart,
  //   locEnd: locEnd,
  //   hasPragma: hasPragma,
  // },
  "4gl-token": {
    parse: (text, api, options) => {
      return parser(text, api, options);
    },
    astFormat: "4gl-token",
    locStart: locStart,
    locEnd: locEnd,
    hasPragma: hasPragma,
  },
};

const printers = {
  "4gl-ast": {
    print: printJSON,
  },
  // "4gl-source": {
  //   print: print_4gl.printSource,
  //   insertPragma: insertPragma,
  // },
  "4gl-token": {
    print: printToken,
    insertPragma: insertPragma,
  },};

module.exports = {
  name: "prettier-plugin-4gl",
  languages,
  parsers,
  printers,
  options,
};
