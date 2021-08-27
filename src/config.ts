const CATEGORY_4GL: string = '4GL';
const SINCE: string = '0.0.0';

export const options: {} = {
  '4glKeywordsCase': {
    since: SINCE,
    category: CATEGORY_4GL,
    type: 'choice',
    choices: [{ value: 'upper' }, { value: 'lower' }, { value: 'ignore' }],
    default: 'upper',
    description: 'Put keywords to upper or lowser case.',
  },
  '4glStringStyle': {
    since: SINCE,
    category: CATEGORY_4GL,
    type: 'choice',
    choices: [
      { value: 'double-quotes' },
      { value: 'single-quotes' },
      { value: 'ignore' },
    ],
    default: 'ignore',
    description: 'Start/end strings with quotes.',
  },
  '4glFormatNumber': {
    since: SINCE,
    category: CATEGORY_4GL,
    type: 'boolean',
    default: false,
    description: 'Format number, e.g. 1234 is formatted to 1,234.',
  },
  '4glBraces': {
    since: SINCE,
    category: CATEGORY_4GL,
    type: 'boolean',
    default: false,
    description: 'Spacing in Braces operator.',
  },
  '4glBracket': {
    since: SINCE,
    category: CATEGORY_4GL,
    type: 'boolean',
    default: false,
    description: 'Spacing in Bracket operator.',
  },
  '4glParenthesis': {
    since: SINCE,
    category: CATEGORY_4GL,
    type: 'boolean',
    default: false,
    description: 'Spacing in Parenthesis operator.',
  },
  '4glComma': {
    since: SINCE,
    category: CATEGORY_4GL,
    type: 'boolean',
    default: false,
    description: 'Spacing in Comma operator.',
  },
  '4glMathOperators': {
    since: SINCE,
    category: CATEGORY_4GL,
    type: 'boolean',
    default: false,
    description: 'Spacing in Mathematical operators.',
  },
  // '4glAlignFields': {
  //   since: SINCE,
  //   category: CATEGORY_4GL,
  //   type: 'int',
  //   default: 0,
  //   description:
  //     'Align field name with padding spaces in DEFINE/RECORD statment.',
  // },
  // '4glAlignComment': {
  //   since: SINCE,
  //   category: CATEGORY_4GL,
  //   type: 'boolean',
  //   default: false,
  //   description: 'End of line comment alignment column.',
  // },
};

export const prettierOptions: any = {
  printWidth: 80,
  useTabs: false,
  tabWidth: 2,
  insertPragma: true,
  requirePragma: false,
};
