import { EASTType, ASTNode } from '@totvs/tds-parsers';
import { util } from 'prettier';
import prettier = require('prettier');

const {
  join,
  line,
  ifBreak,
  group,
  hardline,
  softline,
  fill,
  indent,
  dedent,
  markAsRoot,
  dedentToRoot,
  addAlignmentToDoc,
} = prettier.doc.builders;

const { stripTrailingHardline, removeLines } = prettier.doc.utils;

let preserverEndLine = false;
let nextStatementHardLine = true;

export function printJSON(path: any, options: any, print: any, args: any) {
  const node = path.getValue();

  return JSON.stringify(node, undefined, 2);
}

export function printToken(path: any, options: any, print: any, args: any) {
  const node = path.getValue();

  if (!node) {
    return '';
  }

  if (typeof node === 'string') {
    return node;
  }

  if (Array.isArray(node)) {
    return path.map(print);
  }

  let result: any = undefined;

  switch (node.type) {
    case EASTType.token:
      result = path.map(print, 'children');
      break;

    case EASTType.statement:
      result = buildStatement(path, print, options);
      break;

    case EASTType.keyword:
      result = buildKeyword(path, print, options);
      break;

    case EASTType.string:
      result = buildString(path, print, options);
      break;

    case EASTType.number:
      result = buildNumber(path, print, options);
      break;

    default:
      const node = path.getValue();
      result = node.source ? node.source : node;
      break;
  }

  if (result === undefined) {
    const node = path.getValue();
    result = JSON.stringify(node, undefined, 3);
  }

  return result;
}

export function printProgram(path: any, options: any, print: any, args: any) {
  const node = path.getValue();

  if (!node) {
    return '';
  }

  if (typeof node === 'string') {
    return node;
  }

  if (Array.isArray(node)) {
    return path.map(print);
  }

  let result: any = undefined;

  switch (node.type) {
    case EASTType.token:
      result = path.map(print, 'children');
      break;

    case EASTType.program:
      result = path.map(print, 'children');
      break;

    case EASTType.block:
      result = path.map(print, 'children');
      if (node.getAttribute('recordBlock')) {
        const elements: prettier.Doc[] = result[1][0].map((element: any) => [
          group(element),
          line,
        ]);

        result = [result[0], indent([hardline, elements]), hardline, result[2]];
      } else {
        result = [result[0], indent([line, result[1]]), result[2]];
      }
      break;
    case EASTType.beginBlock:
      result = path.map(print, 'children');
      break;
    case EASTType.bodyBlock:
      result = path.map(print, 'children');
      break;
    case EASTType.endBlock:
      result = path.map(print, 'children');
      break;

    case EASTType.argumentList:
      result = buildArgumentList(path, print, options);
      break;

    case EASTType.statement:
      result = buildStatement(path, print, options);
      break;

    case EASTType.keyword:
      result = buildKeyword(path, print, options);
      break;

    case EASTType.whiteSpace:
      result = buildWhiteSpace(path, print, options);
      break;

    case EASTType.endLine:
      if (!preserverEndLine) {
        result = buildEndLine(path, print, options);
      } else {
        result = [hardline];
        preserverEndLine = false;
      }
      break;

    case EASTType.newLine:
      if (!preserverEndLine) {
        result = buildNewLine(path, print, options);
      } else {
        result = [hardline];
        preserverEndLine = false;
      }
      break;

    case EASTType.identifier:
      result = buildIdentifier(path, print, options);
      break;

    case EASTType.operator:
      result = buildOperator(path, print, options);
      break;

    case EASTType.operatorBraces:
      result = buildOperatorBraces(path, print, options);
      break;

    case EASTType.operatorBracket:
      result = buildOperatorBracket(path, print, options);
      break;

    case EASTType.operatorMath:
      result = buildOperatorMath(path, print, options);
      break;

    case EASTType.operatorParenthesis:
      result = buildOperatorParenthesis(path, print, options);
      break;

    case EASTType.operatorSeparator:
      result = buildOperatorSeparator(path, print, options);
      break;

    case EASTType.comment:
      result = buildComment(path, print, options);
      break;

    case EASTType.blockComment:
      result = buildBlockComment(path, print, options);
      break;

    case EASTType.singleComment:
      result = buildSingleComment(path, print, options);
      break;

    case EASTType.string:
      result = buildString(path, print, options);
      break;

    case EASTType.number:
      result = buildNumber(path, print, options);
      break;

    default:
      console.error('Invalid EASType: ' + node.type);
      result = undefined;
      break;
  }

  if (result === undefined) {
    const node = path.getValue();
    result = JSON.stringify(node, undefined, 3);
  }

  return result;
}

function buildArgumentList(path: any, print: any, options: any) {
  const open = path.map(print, 'children');

  return open;
}

function keyword(node: ASTNode, options: any) {
  let value = node.source;

  if (options['4glKeywordsCase'] === 'upper') {
    value = value.toUpperCase();
  } else if (options['4glkeywordsCase'] === 'lower') {
    value = value.toLowerCase();
  }

  return value;
}

function buildStatement(path: any, print: any, options: any) {
  const node: ASTNode = path.getValue();
  const value = [nextStatementHardLine ? hardline : '', keyword(node, options)];

  if (value[1].toString().toUpperCase() === 'END') {
    nextStatementHardLine = false;
  } else {
    nextStatementHardLine = true;
  }

  return value;
}

function buildKeyword(path: any, print: any, options: any) {
  const node: ASTNode = path.getValue();
  const value = keyword(node, options);

  return value;
}

function buildWhiteSpace(path: any, print: any, options: any) {
  const node: ASTNode = path.getValue();
  let value = node.source;

  if (options.useTabs) {
    value = value.replace(' '.repeat(options.tabWidth), '\t');
  } else {
    value = value.replace(/\\t/g, ' '.repeat(options.tabWidth));
  }

  return value;
}

function buildEndLine(path: any, print: any, options: any) {
  return path.map(print, 'source');
}

function buildNewLine(path: any, print: any, options: any) {
  //const node: ASTNode = path.getValue();

  return '';
}

function buildIdentifier(path: any, print: any, options: any) {
  const node: ASTNode = path.getValue();
  let value = node.source;

  return value;
}

function buildOperator(path: any, print: any, options: any) {
  const node: ASTNode = path.getValue();
  const value = node.source;
  let result = value;

  return result;
}

function buildOperatorBraces(path: any, print: any, options: any) {
  const node: ASTNode = path.getValue();
  const value = node.source;
  let result = value;

  if (options['4glBraces']) {
    result = result === '{' ? '{ ' : ' }';
  }

  return result;
}

function buildOperatorBracket(path: any, print: any, options: any) {
  const node: ASTNode = path.getValue();
  const value = node.source;
  let result = value;

  if (options['4glBracket']) {
    result = result === '[' ? '[ ' : ' ]';
  }

  return result;
}

function buildOperatorMath(path: any, print: any, options: any) {
  const node: ASTNode = path.getValue();
  const value = node.source;
  let result = value;

  if (options['4glMathOperators']) {
    result = ' ' + result + ' ';
  }

  return result;
}

function buildOperatorParenthesis(path: any, print: any, options: any) {
  const node: ASTNode = path.getValue();
  const value = node.source;
  let result = value;

  if (options['4glParenthesis']) {
    result = result === '(' ? '( ' : ' )';
  }

  return result;
}

function buildBlockComment(path: any, print: any, options: any) {
  const node: ASTNode = path.getValue();
  const value = node.source;
  preserverEndLine = true;

  return value;
}

function buildSingleComment(path: any, print: any, options: any) {
  const node: ASTNode = path.getValue();
  const value = node.source;

  preserverEndLine = true;

  return value;
}

function buildComment(path: any, print: any, options: any) {
  const node: ASTNode = path.getValue();
  let value = node.source;

  if (value.endsWith('\n')) {
    value = value.substring(0, value.indexOf('\n') + 1); //pode ser uma sequencia, p.e. #(comment)\n\n\n
  }

  return value;
}

function buildOperatorSeparator(path: any, print: any, options: any) {
  const node: ASTNode = path.getValue();
  const value = node.source;
  let result = value;

  if (options['4glComma']) {
    result += ' ';
  }

  return result;
}

function buildString(path: any, print: any, options: any) {
  const node: ASTNode = path.getValue();
  const value = node.source;
  let result = undefined;

  if (options['4glStringStyle'] === 'ignore') {
    result = value.toString();
  } else if (options['4glStringStyle'] === 'single-quotes') {
    result = util.makeString(value.substring(1, value.length - 1), "'", true);
  } else {
    //double-quotes
    result = util.makeString(value.substring(1, value.length - 1), '"', true);
  }

  return result;
}

function buildNumber(path: any, print: any, options: any) {
  const node: ASTNode = path.getValue();
  const value: Number = Number.parseFloat(node.source);
  let result = undefined;

  if (options['4glFormatNumber']) {
    result = value.toLocaleString('en');
  } else {
    result = Number(value).toString();
  }

  return result;
}
