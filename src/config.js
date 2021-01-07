"use strict";

const CATEGORY_4GL = "4GL";

module.exports = {
  options: {
    keywordsCase: {
      since: "0.0.0",
      category: CATEGORY_4GL,
      type: "choice",
      choices: [{ value: "upper" }, { value: "lower" }, { value: "ignore" }],
      default: "upper",
      description: "Put keywords to upper or lowser case. (4GL)",
    },
    stringStyle: {
      since: "0.0.0",
      category: CATEGORY_4GL,
      type: "choice",
      choices: [
        { value: "double-quotes" },
        { value: "single-quotes" },
        { value: "ignore" },
      ],
      default: "ignore",
      description: "Start and end strings with quotes. (4GL)",
    },
    formatNumber: {
      since: "0.0.0",
      category: CATEGORY_4GL,
      type: "boolean",
      default: false,
      description: "Format number, e.g. 1234 is formatted to 1,234. (4GL)",
    },
    operatorSpacing: {
      since: "0.0.0",
      category: CATEGORY_4GL,
      type: "boolean",
      default: true,
      description: "Spacing in operators. (4GL)",
    },
    //EXPERIMENTAL. não habilitar. 
    // alignFields: {
    //   since: "0.0.0",
    //   category: CATEGORY_4GL,
    //   type: "boolean",
    //   default: true,
    //   description: "Align field definition. (4GL)",
    // },
  },
};
