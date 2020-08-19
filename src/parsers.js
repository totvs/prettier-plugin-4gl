const parser_4gl = require("@totvs/tds-parsers/lib").parser;

function parser(text, options) {
  try {
    const opt = { vscodeLanguageId: "4gl"};
    return parser_4gl(text, opt);
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
}

module.exports = parser;
