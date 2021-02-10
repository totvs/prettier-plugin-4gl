//import { util } from "prettier";
//const { printDocToDebug } = require("prettier").doc.debug;

import { util } from "prettier";
import { ASTNode, EASTType } from "tds-parsers";
import AST = require("tds-parsers/lib/ast_node");

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
  markAsRoot
} = require("prettier").doc.builders;

const { stripTrailingHardline, removeLines } = require("prettier").doc.utils;

function buildProgram(path, print, options) {
  const node: AST.ASTNode = path.getValue();

  return concat(path.map(print, 'children'));
}

function buildBlock(path, print, options) {
  const begin = path.call(print, "children_0");
  const body = path.call(print, "children_1");
  const end = path.call(print, "children_2");

  return concat([indent(begin), body, dedent(end)]);
}

function buildArgumentList(path, print, options) {
  const open = path.call(print, "children");

  return concat(open);
}

function buildKeyword(path, print, options) {
  const node: AST.ASTNode = path.getValue();
  let value = node.source;

  if (options["4glKeywordsCase"] === "upper") {
    value = value.toUpperCase();
  } else if (options["4glkeywordsCase"] === "lower") {
    value = value.toLowerCase();
  }

  return value;
}

function buildWhiteSpace(path, print, options) {
  if ((lastNode.type == EASTType.newLine)) {
    return "";
  }

  const node: AST.ASTNode = path.getValue();
  let value = node.source;

  if (options.useTabs) {
    value = value.replace(" ".repeat(options.tabWidth), "\t");
  } else {
    value = value.replace(/\\t/g, " ".repeat(options.tabWidth));
  }

  return value;
}

function buildEndLine(path, print, options) {

  return concat(path.map(print, "source"));
}

function buildNewLine(path, print, options) {
  // const node: AST.ASTNode = path.getValue();
  // let value = node.source;
  if (lastNode.type == EASTType.newLine) {
    if (options["4glMaxEmptyLines"] != 0) {
      emptyLinesCount++;
      if (emptyLinesCount < options["4glMaxEmptyLines"]) {
        return line;
      } else {
        return "";
      }
    }
  }
  emptyLinesCount=0;

  return line;
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

  if (options["4glBraces"]) {
    result = (result === "{") ? "{ " : " }";
  }

  return result;
}

function buildOperatorBracket(path, print, options) {
  const node: AST.ASTNode = path.getValue();
  const value = node.source;
  let result = value;

  if (options["4glBracket"]) {
    result = (result === "[") ? "[ " : " ]";
  }

  return result;
}

function buildOperatorMath(path, print, options) {
  const node: AST.ASTNode = path.getValue();
  const value = node.source;
  let result = value;

  if (options["4glMathOperators"]) {
    result = " " + result + " ";
  }

  return result;
}

function buildOperatorParenthesis(path, print, options) {
  const node: AST.ASTNode = path.getValue();
  const value = node.source;
  let result = value;

  if (options["4glParenthesis"]) {
    result = (result === "(") ? "( " : " )";
  }

  return result;
}

function buildBlockComment(path, print, options) {
  const node: AST.ASTNode = path.getValue();
  const value = node.source;
  let result = value;

  return value;
}

function buildComment(path, print, options) {
  const node: AST.ASTNode = path.getValue();
  const value = node.source;
  let result = value;

  return value;
}

function buildOperatorSeparator(path, print, options) {
  const node: AST.ASTNode = path.getValue();
  const value = node.source;
  let result = value;

  if (options["4glSeparator"]) {
    result += " )";
  }

  return result;
}

function buildString(path, print, options) {
  const node: AST.ASTNode = path.getValue();
  const value = node.source;
  let result = undefined;

  if (options["4glStringStyle"] === "ignore") {
    result = value.toString();
  } else if (options["4glStringStyle"] === "single-quotes") {
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

  if (options["4glFormatNumber"]) {
    result = value.toLocaleString("en");
  } else {
    result = value.toLocaleString();
  }

  return result;
}

let _builderMap;
let emptyLinesCount = 0;
let lastNode: ASTNode;

function builderMap(_options) {
  const options = _options;
  const defaultOptions: {} = require("./config").get4GLDefaultOptions();

  Object.keys(defaultOptions).forEach((key) => {
    if (options[key] == undefined) {
      options[key] = defaultOptions[key];
    }
  });

  const map: {} = {};
  map[AST.EASTType.program] = (path, print) => buildProgram(path, print, options);
  map[AST.EASTType.block] = (path, print) => buildBlock(path, print, options);
  map[AST.EASTType.argumentList] = (path, print) => buildArgumentList(path, print, options);
  map[AST.EASTType.keyword] = (path, print) => buildKeyword(path, print, options);
  map[AST.EASTType.whiteSpace] = (path, print) => buildWhiteSpace(path, print, options);
  map[AST.EASTType.endLine] = (path, print) => buildEndLine(path, print, options);
  map[AST.EASTType.newLine] = (path, print) => buildNewLine(path, print, options);
  map[AST.EASTType.identifier] = (path, print) => buildIdentifier(path, print, options);
  map[AST.EASTType.operator] = (path, print) => buildOperator(path, print, options);
  map[AST.EASTType.operatorBraces] = (path, print) => buildOperatorBraces(path, print, options);
  map[AST.EASTType.operatorBracket] = (path, print) => buildOperatorBracket(path, print, options);
  map[AST.EASTType.operatorMath] = (path, print) => buildOperatorMath(path, print, options);
  map[AST.EASTType.operatorParenthesis] = (path, print) => buildOperatorParenthesis(path, print, options);
  map[AST.EASTType.operatorSeparator] = (path, print) => buildOperatorSeparator(path, print, options);
  map[AST.EASTType.comment] = (path, print) => buildComment(path, print, options);
  map[AST.EASTType.blockComment] = (path, print) => buildBlockComment(path, print, options);
  map[AST.EASTType.string] = (path, print) => buildString(path, print, options);
  map[AST.EASTType.number] = (path, print) => buildNumber(path, print, options);

  return map;
}

function resetFunctionMap() {
  _builderMap = undefined;
}

export function printElement(path, options, print) {
  if (!_builderMap) {
    _builderMap = builderMap(options);
    lastNode = path.getValue();
  }

  const node: AST.ASTNode = path.getValue();
  const builder = _builderMap[node.type];
  let result: any = undefined;

  if (builder) {
    result = builder(path, print, options);
  }

  if (node.type != EASTType.whiteSpace) {
    lastNode = node;
  }

  return result;
}

module.exports = { printElement, resetFunctionMap };
