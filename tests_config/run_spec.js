"use strict";

const fs = require("fs");
const path = require("path");
const prettier = require("prettier");

function run_spec(dirname, options) {
  fs.readdirSync(dirname).forEach((filename) => {
    const filepath = dirname + "/" + filename;
    if (
      path.extname(filename) !== ".snap" &&
      fs.lstatSync(filepath).isFile() &&
      filename[0] !== "." &&
      !filename.endsWith(".log") &&
      filename !== "jsfmt.spec.js"
    ) {
      let rangeStart = 0;
      let rangeEnd = Infinity;
      let cursorOffset;

      const source = read(filepath)
        .replace(/\r\n/g, "\n")
        .replace("<<<PRETTIER_RANGE_START>>>", (match, offset) => {
          rangeStart = offset;
          return "";
        })
        .replace("<<<PRETTIER_RANGE_END>>>", (match, offset) => {
          rangeEnd = offset;
          return "";
        });

      const input = source.replace("<|>", (match, offset) => {
        cursorOffset = offset;

        return "";
      });

      const mergedOptions = Object.assign(mergeDefaultOptions(options || {}), {
        filepath,
        rangeStart,
        rangeEnd,
        cursorOffset,
      });

      test(filename, () => {
        const output = prettyprint(input, { ...mergedOptions });

        expect(
          raw(source + "~".repeat(mergedOptions.printWidth) + "\n" + output)
        ).toMatchSnapshot();
      });

      // test(filename, () => {
      //   const output = prettyprint(input, { ...mergedOptions });

      //   expect(
      //     raw(prepare(source) + "~".repeat(mergedOptions.printWidth) + "\n" + prepare(output))
      //   ).toMatchSnapshot();
      // });
    }
  });
}

global.run_spec = run_spec;

function prettyprint(src, options) {
  let result = prettier.format(src, options);

  if (options.cursorOffset >= 0) {
    result = result.formatted || result;
    result =
      result.slice(0, result.cursorOffset) +
      "<|>" +
      result.slice(result.cursorOffset);
  }

  return result.formatted || result;
}

function read(filename) {
  return fs.readFileSync(filename, "utf8");
}

function prepare(content) {
  return content
    .replace(/[ \t]/g, (match, offset) => {
      return "";
    })
    .toUpperCase();
}

/**
 * Wraps a string in a marker object that is used by `./raw-serializer.js` to
 * directly print that string in a snapshot without escaping all double quotes.
 * Backticks will still be escaped.
 */
function raw(string) {
  if (typeof string !== "string") {
    throw new Error("Raw snapshots have to be strings.");
  }
  return { [Symbol.for("raw")]: string };
}

function mergeDefaultOptions(parserConfig) {
  return Object.assign(
    {
      plugins: [path.dirname(__dirname)],
      printWidth: 80,
      loglevel: "debug",
    },
    parserConfig
  );
}
