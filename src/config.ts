const CATEGORY_4GL: string = "$GL";
const SINCE: string = "0.0.0";

export const options: {} = {
  keywordsCase: {
    since: SINCE,
    category: CATEGORY_4GL,
    type: "choice",
    choices: [{ value: "upper" }, { value: "lower" }, { value: "ignore" }],
    default: "upper",
    description: "Put keywords to upper or lowser case. (4GL)",
  },
  stringStyle: {
    since: SINCE,
    category: CATEGORY_4GL,
    type: "choice",
    choices: [
      { value: "double-quotes" },
      { value: "single-quotes" },
      { value: "ignore" },
    ],
    default: "ignore",
    description: "Star/end strings with quotes. (4GL)",
  },
  formatNumber: {
    since: SINCE,
    category: CATEGORY_4GL,
    type: "boolean",
    default: false,
    description: "Format number, e.g. 1234 is formatted to 1,234. (4GL)",
  },
  operatorSpacing: {
    since: SINCE,
    category: CATEGORY_4GL,
    type: "boolean",
    default: true,
    description: "Spacing in operators. (4GL)",
  },
  alignFields: {
    since: SINCE,
    category: CATEGORY_4GL,
    type: "boolean",
    default: true,
    description: "Align field definition in DEFINE statment. (4GL)",
  },
};

export const prettierOptions: any = {
  //--no-bracket-spacing
  //--write
  //--check
} 