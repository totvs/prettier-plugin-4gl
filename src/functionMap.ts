//import { util } from "prettier";
//const { printDocToDebug } = require("prettier").doc.debug;

import { util } from "prettier";
import { ASTNode } from "tds-parsers/typings/ast_node";

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
} = require("prettier").doc.builders;

const { stripTrailingHardline, removeLines } = require("prettier").doc.utils;

function buildProgram(path, print, options) {
  const node: ASTNode =  path.getValue();

  return concat(path.map(print, 'children'));
}

function buildBlock(path, print, options) {
  //const node: ASTNode =  path.getValue();
  const begin = path.call(print, "beginBlock");
  const body = concat(path.map(print, "bodyBlock"));
  const end = path.call(print, "endBlock");

  return concat([begin, line, indent(body), line, end, line]);
}

function buildKeyword(path, print, options) {
  const node: ASTNode =  path.getValue();
  let value = node.source;

  if (options.keywordsCase === "upper") {
    value = value.toUpperCase();
  } else if (options.keywordsCase === "lower") {
    value = value.toLowerCase();
  }

  return value;
}

function buildWhiteSpace(path, print, options) {
  const node: ASTNode =  path.getValue();
  let value = node.source;

  if (options.useTabs) {
    value = value.replace(" ".repeat(options.tabWidth), "\t");
  } else {
    value = value.replace(/\\t/g, " ".repeat(options.tabWidth));
  }

  return value;
}

function buildNewLine(path, print, options) {
  const node: ASTNode =  path.getValue();
  let value = node.source;

  return line;
}

function buildIdentifier(path, print, options) {
  const node: ASTNode =  path.getValue();
  let value = node.source;

  return value;
}

function buildOperator(path, print, options) {
  const node: ASTNode =  path.getValue();
  const value = node.source;
  let result = value;
  
  if (options.operatorSpacing == node.get("spacing")) {
    result = (node.get("spacing").match(/before|both/) ? " ":"") 
      + result
      + (node.get("spacing").match(/after|both/) ? " ":"")
  }

  return result;
}






function buildString(path, print, options) {
  const node: ASTNode =  path.getValue();
  const value = node.source;
  let result = undefined;

  if (options.stringOption === "ignore") {
    result = value.toString();
  } else if (options.stringOption === "single-quotes") {
    result = util.makeString(value.substring(1, value.length - 1), "'", true);
  } else {
    //double-quotes
    result = util.makeString(value.substring(1, value.length - 1), '"', true);
  }

  return result;
}


function buildOpenOperator(path, print, options) {
  return buildOperator(path, print, options);
}

function buildCloseOperator(path, print, options) {
  return buildOperator(path, print, options);
}

function buildNumber(path, print, options) {
  const node: ASTNode =  path.getValue();
  const value: Number = Number.parseFloat(node.source);
  let result = undefined;

  if (options.formatNumber) {
    result = value.toLocaleString("en");
  } else {
    result = value.toLocaleString();
  }

  return result;
}

let _builderMap;

function builderMap(_options) {
  const options = _options;
  const map: {} = {};
  const options4GLDef: {} = require("./config").options;

  Object.keys(options4GLDef).forEach((key) => {
    if (options[key] == undefined) {
      options[key] = options4GLDef[key];
    }
  });

  map["program"] = (path, print) => buildProgram(path, print, options);
  map["block"] = (path, print) => buildBlock(path, print, options);
  map["keyword"] = (path, print) => buildKeyword(path, print, options);
  map["whiteSpace"] = (path, print) => buildWhiteSpace(path, print, options);
  map["newLine"] = (path, print) => buildNewLine(path, print, options);
  map["identifier"] = (path, print) => buildIdentifier(path, print, options);
  map["operator"] = (path, print) => buildOperator(path, print, options);
  map["comment"] = (path, print) => concat(path.map(print, "source"));
  map["string"] = (path, print) => buildString(path, print, options);
  map["number"] = (path, print) => buildNumber(path, print, options);
  
  // map.bracket = (path, print) => buildBracket(path, print, options);
  // map.command = (path, print) => buildCommand(path, print, options);
  // map.double_operator = (path, print) => buildOperator(path, print, options);
  // map.function = (path, print) => buildFunction(path, print, options);
  // map.globals = (path, print) => concat(path.map(print, "value"));
  // map.list = (path, print) => join(", ", path.map(print, "value"));
  // map.main = (path, print) => buildFunction(path, print, options);
  // map.open_operator = (path, print) => buildOperator(path, print, options);
  // map.operator = (path, print) => buildOperator(path, print, options);
  // map.variable = (path, print) => path.call(print, "value");
  // map.constant = (path, print) => path.map(print, "value");
  // map.expression = (path, print) => path.map(print, "value");

  return map;
}

function resetFunctionMap() {
  _builderMap = undefined;
}

export function printElement(path, options, print) {
  if (!_builderMap) {
    _builderMap = builderMap(options);
  }

  const node: ASTNode =  path.getValue();
  const builder = _builderMap[node.type];
  let result: any = undefined;

  if (builder) {
    result = builder(path, print, options);
  }

  return result;
}

module.exports = { printElement, resetFunctionMap };
