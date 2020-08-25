const parser_4gl = require("./parsers");
const print_4gl = require("./printers");
const options = require("./config").options;
const PRAGMA = "--@format";

const languages = [
  {
    extensions: [".4gl"],
    name: "4GL",
    parsers: ["4gl-parser"],
    vscodeLanguageIds: ["4gl"],
  },
];

function locStart(ast) {
  let offsetStart = 0;

  if (Array.isArray(ast)) {
    if (ast.length > 0) {
      offsetStart = locStart(ast[0]);
    }
  } else if (ast.kind) {
    offsetStart = ast.offset.start;
  }

  return offsetStart;
}

function locEnd(ast) {
  let offsetEnd = Infinity;

  if (Array.isArray(ast)) {
    if (ast.length > 0) {
      offsetEnd = locEnd(ast[ast.length - 1]);
    }
  } else if (ast.kind) {
    offsetEnd = ast.offset.end;
  }

  return offsetEnd;
}

function hasPragma(text) {
  return text.startsWith(PRAGMA);
}

function insertPragma(text) {
  return PRAGMA + "\n" + text;
}

const parsers = {
  "4gl-parser": {
    parse: (text, options) => {
      return parser_4gl(text, options);
    },
    astFormat: "4gl-source",
    locStart: locStart,
    locEnd: locEnd,
    hasPragma: hasPragma,
  },
};

const printers = {
  "4gl-ast": {
    print: print_4gl.printJSON,
  },
  "4gl-source": {
    print: print_4gl.printSource,
    insertPragma: insertPragma,
  },
};

module.exports = {
  name: "prettier-plugin-4gl",
  languages,
  parsers,
  printers,
  options,
};
