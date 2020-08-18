const parser_4gl = require("./parsers");
const print_4gl = require("./printers");
const options = require("./config").options;
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
    }
    else if (ast.kind) {
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
    }
    else if (ast.kind) {
        offsetEnd = ast.offset.end;
    }
}
const parsers = {
    "4gl-parser": {
        parse: (text, options) => {
            return parser_4gl(text, options);
        },
        astFormat: "4gl-ast",
        locStart: locStart,
        locEnd: locEnd,
    },
};
const printers = {
    "4gl-ast": {
        print: print_4gl.printJSON
    },
    "4gl-source": {
        print: print_4gl.printSource
    }
};
module.exports = {
    name: "prettier-plugin-4gl",
    languages,
    parsers,
    printers,
    options,
};
//# sourceMappingURL=index.js.map