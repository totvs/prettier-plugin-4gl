import { parser as tds_parser } from "tds-parsers";

function parser(text: string, api, options) {
  try {
    return tds_parser(text + "\n", options); //EOL obrigatório na última linha
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

export default parser;
