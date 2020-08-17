const parser_4l = require("./parsers");
const print_4gl = require("./printers");
const options = require("./config").options;
const normalize = require("./config").normalize;

const languages = [
  {
    extensions: [".4gl"],
    name: "4GL",
    parsers: ["4gl-parser"],
    vscodeLanguageIds: ["4gl"],
  },
];

const parsers = {
  "4gl-parser": {
    parse: (text, options) => {
      return parser_4l(text, options);
    },
    astFormat: "4gl-source"
  },
};

const printers = {
  "4gl-ast": {
    print: (path, options, print, args) => { //to debug the call it should be that way
      return print_4gl.printJSON(path, normalize(options), print, args);
    },
  },
  "4gl-source": {
    print: (path, options, print, args) => {
      return print_4gl.printSource(path, normalize(options), print, args); //to debug the call it should be that way
    } 
  },
};

module.exports = {
  name: "prettier-plugin-4gl",
  languages,
  parsers,
  printers,
  options,
};
