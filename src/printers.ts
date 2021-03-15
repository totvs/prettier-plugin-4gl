import { util } from 'prettier';
import AST = require('tds-parsers/lib/ast_node');

const {
  concat,
  join,
  line,
  ifBreak,
  group,
  hardline,
  softline,
  fill,
  indent,
  dedent,
  trim,
  markAsRoot,
  addAlignmentToDoc,
} = require('prettier').doc.builders;

const { stripTrailingHardline, removeLines } = require('prettier').doc.utils;

export function printJSON(path, options, print, args) {
  const node = path.getValue();

  return JSON.stringify(node, undefined, 2);
}

let ignoreWS: boolean = false;

export function printToken(path, options, print, args) {
  const node = path.getValue();

  if (!node) {
    return '';
  }

  if (typeof node === 'string') {
    return node;
  }

  if (Array.isArray(node)) {
    return treatMap(path.map(print));
  }

  let result: any = undefined;

  switch (node.type) {
    case AST.EASTType.program:
    case AST.EASTType.beginBlock:
    case AST.EASTType.endBlock:
      result = treatMap(path.map(print, 'children'));
      break;

    case AST.EASTType.bodyBlock:
      result = treatMap(path.map(print, 'children'));
      break;

    case AST.EASTType.block:
      const aux: any = treatMap(path.map(print, 'children'));
      result = concat([
        indent(concat([aux.parts[0], aux.parts[1]])),
        line,
        aux.parts[2],
      ]);
      break;

    case AST.EASTType.argumentList:
      result = buildArgumentList(path, print, options);
      break;

    case AST.EASTType.keyword:
      ignoreWS = false;
      result = buildKeyword(path, print, options);
      break;

    case AST.EASTType.whiteSpace:
      if (!ignoreWS) {
        result = buildWhiteSpace(path, print, options);
      } else {
        result = '';
      }
      break;

    case AST.EASTType.endLine:
      ignoreWS = true;
      result = buildEndLine(path, print, options);
      break;

    case AST.EASTType.newLine:
      result = buildNewLine(path, print, options);
      break;

    case AST.EASTType.identifier:
      result = buildIdentifier(path, print, options);
      break;

    case AST.EASTType.operator:
      result = buildOperator(path, print, options);
      break;

    case AST.EASTType.operatorBraces:
      result = buildOperatorBraces(path, print, options);
      break;

    case AST.EASTType.operatorBracket:
      result = buildOperatorBracket(path, print, options);
      break;

    case AST.EASTType.operatorMath:
      result = buildOperatorMath(path, print, options);
      break;

    case AST.EASTType.operatorParenthesis:
      result = buildOperatorParenthesis(path, print, options);
      break;

    case AST.EASTType.operatorSeparator:
      result = buildOperatorSeparator(path, print, options);
      break;

    case AST.EASTType.comment:
      result = path.getValue().source;
      ignoreWS = ignoreWS || result.endsWith('\n');
      if (result.endsWith('\n')) {
        result = result.substring(0, result.length - 1);
        result = concat([result, hardline]);
      }
      break;

    case AST.EASTType.blockComment:
      result = buildBlockComment(path, print, options);
      ignoreWS = ignoreWS || result.endsWith('\n');
      if (result.endsWith('\n')) {
        result = result.substring(0, result.length - 1);
        result = concat([result, hardline]);
      }
      break;

    case AST.EASTType.singleComment:
      result = buildSingleComment(path, print, options);
      break;

    case AST.EASTType.string:
      result = buildString(path, print, options);
      break;

    case AST.EASTType.number:
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

function treatMap(resultMap: any): any {
  let result: any = undefined;

  if (Array.isArray(resultMap)) {
    if (resultMap.length == 0) {
      result = '';
    } else if (resultMap.length == 1) {
      result = resultMap[0];
    } else {
      result = concat(resultMap);
    }
  }

  return result;
}

function buildArgumentList(path, print, options) {
  const open = path.map(print, 'children');

  return concat(open);
}

function buildKeyword(path, print, options) {
  const node: AST.ASTNode = path.getValue();
  let value = node.source;

  if (options['4glKeywordsCase'] === 'upper') {
    value = value.toUpperCase();
  } else if (options['4glkeywordsCase'] === 'lower') {
    value = value.toLowerCase();
  }
  if (value == 'GLOBALS') {
    console.log('');
  }

  return value;
}

function buildWhiteSpace(path, print, options) {
  const node: AST.ASTNode = path.getValue();
  let value = node.source;

  if (options.useTabs) {
    value = value.replace(' '.repeat(options.tabWidth), '\t');
  } else {
    value = value.replace(/\\t/g, ' '.repeat(options.tabWidth));
  }

  return value;
}

function buildEndLine(path, print, options) {
  const value = path.map(print, 'source');

  return concat(value);
}

function buildNewLine(path, print, options) {
  const node: AST.ASTNode = path.getValue();
  const value = node.source;
  const max =
    options['4glMaxEmptyLines'] != 0 ? options['4glMaxEmptyLines'] + 1 : -1;
  const result: any[] = value
    .split('\n')
    .fill(hardline, 0, max)
    .filter((element: any) => {
      return typeof element === 'object';
    });

  return treatMap(result);
}

function buildIdentifier(path, print, options) {
  const node: AST.ASTNode = path.getValue();
  let value = node.source;

  return value;
}

function buildOperator(path, print, options) {
  const node: AST.ASTNode = path.getValue();
  const value = node.source;
  let result = value;

  return result;
}

function buildOperatorBraces(path, print, options) {
  const node: AST.ASTNode = path.getValue();
  const value = node.source;
  let result = value;

  if (options['4glBraces']) {
    result = result === '{' ? '{ ' : ' }';
  }

  return result;
}

function buildOperatorBracket(path, print, options) {
  const node: AST.ASTNode = path.getValue();
  const value = node.source;
  let result = value;

  if (options['4glBracket']) {
    result = result === '[' ? '[ ' : ' ]';
  }

  return result;
}

function buildOperatorMath(path, print, options) {
  const node: AST.ASTNode = path.getValue();
  const value = node.source;
  let result = value;

  if (options['4glMathOperators']) {
    result = ' ' + result + ' ';
  }

  return result;
}

function buildOperatorParenthesis(path, print, options) {
  const node: AST.ASTNode = path.getValue();
  const value = node.source;
  let result = value;

  if (options['4glParenthesis']) {
    result = result === '(' ? '( ' : ' )';
  }

  return result;
}

function buildBlockComment(path, print, options) {
  const node: AST.ASTNode = path.getValue();
  const value = node.source;

  return value;
}

function buildSingleComment(path, print, options) {
  const node: AST.ASTNode = path.getValue();
  const value = node.source;
  let result = value;

  return value;
}

function buildOperatorSeparator(path, print, options) {
  const node: AST.ASTNode = path.getValue();
  const value = node.source;
  let result = value;

  if (options['4glSeparator']) {
    result += ' ';
  }

  return result;
}

function buildString(path, print, options) {
  const node: AST.ASTNode = path.getValue();
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

function buildNumber(path, print, options) {
  const node: AST.ASTNode = path.getValue();
  const value: Number = Number.parseFloat(node.source);
  let result = undefined;

  if (options['4glFormatNumber']) {
    result = value.toLocaleString('en');
  } else {
    result = value.toLocaleString();
  }

  return result;
}
