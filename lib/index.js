const parser_4gl = require("./4gl.js");

// const languages = [
//   {
//     name: "Python",
//     parsers: ["python"],
//     extensions: [".py"],
//     tmScope: "source.py",
//     aceMode: "text",
//     liguistLanguageId: 303,
//     vscodeLanguageIds: ["python"]
//   }
// ];

const {
  doc: {
    builders: { concat },
  },
} = require("prettier");

const languages = [
  {
    extensions: [".4gl"],
    name: "4GL",
    parsers: ["4gl-parser"],
    vscodeLanguageIds: ["4gl"]
  },
];

const parsers = {
  "4gl-parser": {
    parse: (text) => {
      try {
        return parser_4gl.parse(text);
      } catch (error) {
        if (error.location) {
          console.error(
            `Sintax error: [${error.location.start.line}:${error.location.start.column}] ${error.message}`
          );
        } else {
          console.log(error);
        }
        throw error;
      }

      return [];
    },
    astFormat: "4gl-ast",
  },
};

const printers = {
  "4gl-ast": {
    print: () => (path, options, print) => {
      const node = path.getValue();
    
      return node;
    }
  },
};

module.exports = {
  name: "prettier-plugin-4gl",
  languages,
  parsers,
  printers,
};
