import { printElement } from "./functionMap";

const {
  doc: {
    builders: { concat, group },
  },
} = require("prettier");

export function printJSON(path, options, print, args) {
  const node = path.getValue();

  return JSON.stringify(node, undefined, 2);
}

export function printSource(path, options, print, args) {
  const node = path.getValue();

  if (!node) {
    return "";
  }

  if (typeof node === "string") {
    return node;
  }

  if (Array.isArray(node)) {
    return concat(path.map(print));
  }

  let result = printElement(path, options, print);

  if (!result) {
    const node = path.getValue();
    result = JSON.stringify(node, undefined, 3);
  }

  return result;
}

export function printToken(path, options, print, args) {
  const node = path.getValue();

  if (!node) {
    return "";
  }

  if (typeof node === "string") {
    return node;
  }

  if (Array.isArray(node)) {
    return concat(path.map(print));
  }

  let result = printElement(path, options, print);

  if (!result) {
    const node = path.getValue();
    result = JSON.stringify(node, undefined, 3);
  }

  return result;
}
