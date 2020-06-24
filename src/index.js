"use strict";
const parser_4gl = require("./4gl-parser.js");

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
    vscodeLanguageIds: ["4gl"],
  },
];

const parsers = {
  "4gl-parser": {
    parse: (text) => {
      try {
        return parser_4gl.parse(text);
      } catch (error) {
        if (error.location){
        console.error(`Sintax error: [${error.location.start.line}:${error.location.start.column}] ${error.message}`);
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

function printjson(path, options, print) {
  const node = path.getValue();

  return JSON.stringify(node);
}


function print4gl(path, options, print) {
  const node = path.getValue();
  
  if (!node) {
    return "";
  }

  if (typeof node === "string") {
    return node;
  }

  if (Array.isArray(node)) {
    return concat(path.map(print));
  }

  // switch (node.type) {
  //   case "ws":
  //   case "nl":
  //     return node.value;
  //   case "keyword":
  //     return node.value.toLowerCase();
  //   case "word":
  //     return node.value.toUpperCase();
  //   case "operator":
  //     return node.value;
  //   case "string":
  //     return node.value;
  //   default:
  //     //throw new Error("unknown 4GL type: " + JSON.stringify(node));
  // }
  
  return JSON.stringify(node, null, 2);
}

const printers = {
  "4gl-ast": {
    print: printjson //print4gl,
  },
};

module.exports = {
  languages,
  parsers,
  printers,
};
