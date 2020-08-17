"use strict";

const CATEGORY_4GL = "4GL";

function normalize(options) {
  return Object.assign(
    // {
    //   keywordsCase: "upper",
    // },
    options
  );
}

module.exports = {
  normalize,
  options: {
    keywordsCase: {
      since: "0.0.0",
      category: CATEGORY_4GL,
      type: "choice",
      choices: [
        { value: "upper" },
        { value: "lower" },
        { value: "none" }
      ],
      default: "upper",
      description: "Put keywords to upper or lowser case. (4GL)",
    },
  },
};
