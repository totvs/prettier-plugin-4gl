const CATEGORY_4GL: string = "$GL";
const SINCE: string = "0.0.0";

export const options: {} = {
  "4glKeywordsCase": {
    since: SINCE,
    category: CATEGORY_4GL,
    type: "choice",
    choices: [{ value: "upper" }, { value: "lower" }, { value: "ignore" }],
    default: "upper",
    description: "Put keywords to upper or lowser case.",
  },
  "4glStringStyle": {
    since: SINCE,
    category: CATEGORY_4GL,
    type: "choice",
    choices: [
      { value: "double-quotes" },
      { value: "single-quotes" },
      { value: "ignore" },
    ],
    default: "ignore",
    description: "Start/end strings with quotes.",
  },
  "4glFormatNumber": {
    since: SINCE,
    category: CATEGORY_4GL,
    type: "boolean",
    default: false,
    description: "Format number, e.g. 1234 is formatted to 1,234.",
  },
  "4glOperatorSpacing": {
    since: SINCE,
    category: CATEGORY_4GL,
    type: "choice",
    choices: [
      { value: "before" },
      { value: "after" },
      { value: "both" },
    ],
    default: "",
    description: "Spacing in operators.",
  },
  "4glAlignFields": {
    since: SINCE,
    category: CATEGORY_4GL,
    type: "boolean",
    default: true,
    description: "Align field definition in DEFINE statment.",
  },
};

export const prettierOptions: any = {
  //--no-bracket-spacing
  //--write
  //--check
} 