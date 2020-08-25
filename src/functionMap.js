const {
  concat,
  join,
  line,
  ifBreak,
  group,
  hardline,
  fill,
  indent,
} = require("prettier").doc.builders;

const options4GLDef = require("./config").options;
const options4GL = {};

function buildComment(path, print) {
  const node = path.getValue();

  return path.call(print, "value");
}

function buildWhitespace(path, print, { tabWidth, useTabs }) {
  const node = path.getValue();
  let value = node.value;

  if (useTabs) {
    value = value.replace(" ".repeat(tabWidth), "\t");
  } else {
    value = value.replace(/\\t/g, " ".repeat(tabWidth));
  }

  return concat(value);
}

function buildBlock(path, print) {
  const node = path.getValue();

  return indent(concat(path.map(print, "value")));
}

function buildCommand(path, print) {
  const node = path.getValue();

  return concat(path.map(print, "value"));
}

function buildKeyword(path, print, keywordsCase) {
  const node = path.getValue();
  let value = node.value;

  if (keywordsCase === "upper") {
    value = value.toUpperCase();
  } else if (keywordsCase === "lower") {
    value = value.toLowerCase();
  }

  return value;
}

function buildString(path, print, stringOption) {
  const node = path.getValue();
  const result = [];
  const value = node.value.value[1];

  if (stringOption === "none") {
    result.push(node.value.value.join(""));
  } else if (stringOption === "single-quotes") {
    result.push("'");
    result.push(value.replace(/\'/g, "''")); //@acandido - verificar scape de aspas
    result.push("'");
  } else {
    //double-quotes
    result.push('"');
    result.push(value.replace(/\"/g, '""')); //@acandido - verificar scape de aspas
    result.push('"');
  }

  return result.join("");
}

function buildIdentifier(path, print) {
  const node = path.getValue();

  return path.call(print, "value");
}

function buildBracket(path, print, bracketSpacing) {
  const node = path.getValue();
  const value = node.value;
  let result = value;

  if (bracketSpacing) {
    result = concat([" ", value, " "]);
  }

  return result;
}

function buildOperator(path, print, operatorSpacing) {
  const node = path.getValue();
  const value = node.value;
  let result = value;

  if (operatorSpacing) {
    result = concat([" ", value, " "]);
  }

  return result;
}

function buildList(path, print, operatorSpacing) {
  const node = path.getValue();
  const values = path.map(print, "value");

  if (operatorSpacing) {
    result = join(", ", values);
  } else {
    result = join(",", values);
  }

  return result;
}

function buildNumber(path, print, formatNumber) {
  const node = path.getValue();
  const value = node.value;
  let result = value.value;

  if (formatNumber) {
    result = result.toLocaleString("en");
  } else {
    result = result.toString();
  }

  return result;
}

function buildVariable(path, print, formatNumber) {
  const node = path.getValue();

  return path.call(print, "value");
}

let _builderMap;

function builderMap(options) {
  const map = {};

  Object.keys(options4GLDef).forEach((key) => {
    if (options[key]) {
      options4GL[key] = options[key];
    }
  });

  map.program = (path, print) => concat(path.map(print, "value"));
  map.main = (path, print) => concat(path.map(print, "value"));
  map.function = (path, print) => concat(path.map(print, "value"));
  map.keyword = (path, print) =>
    buildKeyword(path, print, options4GL.keywordsCase);
  map.comment = (path, print) => buildComment(path, print, options4GL);
  map.whitespace = (path, print) =>
    buildWhitespace(path, print, {
      tabWidth: options.tabWidth,
      useTabs: options.useTabs,
    });
  map.block = (path, print) => buildBlock(path, print);
  map.command = (path, print) => buildCommand(path, print);
  map.string = (path, print) =>
    buildString(path, print, options4GL.stringStyle);
  map.identifier = (path, print) => buildIdentifier(path, print);
  map.bracket = (path, print) =>
    buildBracket(path, print, options.bracketSpacing);
  map.number = (path, print) => buildNumber(path, print, options.formatNumber);
  map.variable = (path, print) =>
    buildVariable(path, print, options.formatNumber);
  map.operator = (path, print) =>
    buildOperator(path, print, options.operatorSpacing);
  map.list = (path, print) => buildList(path, print, options.operatorSpacing);

  return map;
}

function resetFunctionMap() {
  _builderMap = undefined;
}

function printElement(path, options, print) {
  if (!_builderMap) {
    _builderMap = builderMap(options);
  }

  const node = path.getValue();
  if (Array.isArray(node)) {
    return concat(path.map(print));
  }

  if (!node.kind || node.kind == undefined) {
    console.log(JSON.stringify(node));
  }

  const buildProcess = _builderMap[node.kind];

  if (buildProcess) {
    return buildProcess(path, print, options);
  }

  return concat(`< no build process [${node.kind}]>`);
}

module.exports = { printElement, resetFunctionMap };
