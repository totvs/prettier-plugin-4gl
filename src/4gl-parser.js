/*
 * Generated by PEG.js 0.10.0.
 *
 * http://pegjs.org/
 */

"use strict";

function peg$subclass(child, parent) {
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor();
}

function peg$SyntaxError(message, expected, found, location) {
  this.message  = message;
  this.expected = expected;
  this.found    = found;
  this.location = location;
  this.name     = "SyntaxError";

  if (typeof Error.captureStackTrace === "function") {
    Error.captureStackTrace(this, peg$SyntaxError);
  }
}

peg$subclass(peg$SyntaxError, Error);

peg$SyntaxError.buildMessage = function(expected, found) {
  var DESCRIBE_EXPECTATION_FNS = {
        literal: function(expectation) {
          return "\"" + literalEscape(expectation.text) + "\"";
        },

        "class": function(expectation) {
          var escapedParts = "",
              i;

          for (i = 0; i < expectation.parts.length; i++) {
            escapedParts += expectation.parts[i] instanceof Array
              ? classEscape(expectation.parts[i][0]) + "-" + classEscape(expectation.parts[i][1])
              : classEscape(expectation.parts[i]);
          }

          return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";
        },

        any: function(expectation) {
          return "any character";
        },

        end: function(expectation) {
          return "end of input";
        },

        other: function(expectation) {
          return expectation.description;
        }
      };

  function hex(ch) {
    return ch.charCodeAt(0).toString(16).toUpperCase();
  }

  function literalEscape(s) {
    return s
      .replace(/\\/g, '\\\\')
      .replace(/"/g,  '\\"')
      .replace(/\0/g, '\\0')
      .replace(/\t/g, '\\t')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/[\x00-\x0F]/g,          function(ch) { return '\\x0' + hex(ch); })
      .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return '\\x'  + hex(ch); });
  }

  function classEscape(s) {
    return s
      .replace(/\\/g, '\\\\')
      .replace(/\]/g, '\\]')
      .replace(/\^/g, '\\^')
      .replace(/-/g,  '\\-')
      .replace(/\0/g, '\\0')
      .replace(/\t/g, '\\t')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/[\x00-\x0F]/g,          function(ch) { return '\\x0' + hex(ch); })
      .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return '\\x'  + hex(ch); });
  }

  function describeExpectation(expectation) {
    return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
  }

  function describeExpected(expected) {
    var descriptions = new Array(expected.length),
        i, j;

    for (i = 0; i < expected.length; i++) {
      descriptions[i] = describeExpectation(expected[i]);
    }

    descriptions.sort();

    if (descriptions.length > 0) {
      for (i = 1, j = 1; i < descriptions.length; i++) {
        if (descriptions[i - 1] !== descriptions[i]) {
          descriptions[j] = descriptions[i];
          j++;
        }
      }
      descriptions.length = j;
    }

    switch (descriptions.length) {
      case 1:
        return descriptions[0];

      case 2:
        return descriptions[0] + " or " + descriptions[1];

      default:
        return descriptions.slice(0, -1).join(", ")
          + ", or "
          + descriptions[descriptions.length - 1];
    }
  }

  function describeFound(found) {
    return found ? "\"" + literalEscape(found) + "\"" : "end of input";
  }

  return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
};

function peg$parse(input, options) {
  options = options !== void 0 ? options : {};

  var peg$FAILED = {},

      peg$startRuleFunctions = { start: peg$parsestart },
      peg$startRuleFunction  = peg$parsestart,

      peg$c0 = "#",
      peg$c1 = peg$literalExpectation("#", false),
      peg$c2 = peg$anyExpectation(),
      peg$c3 = "--",
      peg$c4 = peg$literalExpectation("--", false),
      peg$c5 = "{",
      peg$c6 = peg$literalExpectation("{", false),
      peg$c7 = "}",
      peg$c8 = peg$literalExpectation("}", false),
      peg$c9 = "(",
      peg$c10 = peg$literalExpectation("(", false),
      peg$c11 = ")",
      peg$c12 = peg$literalExpectation(")", false),
      peg$c13 = /^[a-zA-Z_]/,
      peg$c14 = peg$classExpectation([["a", "z"], ["A", "Z"], "_"], false, false),
      peg$c15 = /^[a-zA-Z0-9_]/,
      peg$c16 = peg$classExpectation([["a", "z"], ["A", "Z"], ["0", "9"], "_"], false, false),
      peg$c17 = function(id) {

          return id.join("");
        },
      peg$c18 = "define",
      peg$c19 = peg$literalExpectation("define", true),
      peg$c20 = function(k) { return nodeKeyword(k)},
      peg$c21 = "end",
      peg$c22 = peg$literalExpectation("end", true),
      peg$c23 = "function",
      peg$c24 = peg$literalExpectation("function", true),
      peg$c25 = "globals",
      peg$c26 = peg$literalExpectation("globals", true),
      peg$c27 = "integer",
      peg$c28 = peg$literalExpectation("integer", true),
      peg$c29 = "main",
      peg$c30 = peg$literalExpectation("main", true),
      peg$c31 = "string",
      peg$c32 = peg$literalExpectation("string", true),
      peg$c33 = /^[~!@%\^&*()-+=|\/{}[\]:;<>,.?#_]/,
      peg$c34 = peg$classExpectation(["~", "!", "@", "%", "^", "&", "*", "(", [")", "+"], "=", "|", "/", "{", "}", "[", "]", ":", ";", "<", ">", ",", ".", "?", "#", "_"], false, false),
      peg$c35 = /^[ \t\n\r]/,
      peg$c36 = peg$classExpectation([" ", "\t", "\n", "\r"], false, false),
      peg$c37 = "\n",
      peg$c38 = peg$literalExpectation("\n", false),
      peg$c39 = "\r\n",
      peg$c40 = peg$literalExpectation("\r\n", false),

      peg$currPos          = 0,
      peg$savedPos         = 0,
      peg$posDetailsCache  = [{ line: 1, column: 1 }],
      peg$maxFailPos       = 0,
      peg$maxFailExpected  = [],
      peg$silentFails      = 0,

      peg$result;

  if ("startRule" in options) {
    if (!(options.startRule in peg$startRuleFunctions)) {
      throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
    }

    peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
  }

  function text() {
    return input.substring(peg$savedPos, peg$currPos);
  }

  function location() {
    return peg$computeLocation(peg$savedPos, peg$currPos);
  }

  function expected(description, location) {
    location = location !== void 0 ? location : peg$computeLocation(peg$savedPos, peg$currPos)

    throw peg$buildStructuredError(
      [peg$otherExpectation(description)],
      input.substring(peg$savedPos, peg$currPos),
      location
    );
  }

  function error(message, location) {
    location = location !== void 0 ? location : peg$computeLocation(peg$savedPos, peg$currPos)

    throw peg$buildSimpleError(message, location);
  }

  function peg$literalExpectation(text, ignoreCase) {
    return { type: "literal", text: text, ignoreCase: ignoreCase };
  }

  function peg$classExpectation(parts, inverted, ignoreCase) {
    return { type: "class", parts: parts, inverted: inverted, ignoreCase: ignoreCase };
  }

  function peg$anyExpectation() {
    return { type: "any" };
  }

  function peg$endExpectation() {
    return { type: "end" };
  }

  function peg$otherExpectation(description) {
    return { type: "other", description: description };
  }

  function peg$computePosDetails(pos) {
    var details = peg$posDetailsCache[pos], p;

    if (details) {
      return details;
    } else {
      p = pos - 1;
      while (!peg$posDetailsCache[p]) {
        p--;
      }

      details = peg$posDetailsCache[p];
      details = {
        line:   details.line,
        column: details.column
      };

      while (p < pos) {
        if (input.charCodeAt(p) === 10) {
          details.line++;
          details.column = 1;
        } else {
          details.column++;
        }

        p++;
      }

      peg$posDetailsCache[pos] = details;
      return details;
    }
  }

  function peg$computeLocation(startPos, endPos) {
    var startPosDetails = peg$computePosDetails(startPos),
        endPosDetails   = peg$computePosDetails(endPos);

    return {
      start: {
        offset: startPos,
        line:   startPosDetails.line,
        column: startPosDetails.column
      },
      end: {
        offset: endPos,
        line:   endPosDetails.line,
        column: endPosDetails.column
      }
    };
  }

  function peg$fail(expected) {
    if (peg$currPos < peg$maxFailPos) { return; }

    if (peg$currPos > peg$maxFailPos) {
      peg$maxFailPos = peg$currPos;
      peg$maxFailExpected = [];
    }

    peg$maxFailExpected.push(expected);
  }

  function peg$buildSimpleError(message, location) {
    return new peg$SyntaxError(message, null, null, location);
  }

  function peg$buildStructuredError(expected, found, location) {
    return new peg$SyntaxError(
      peg$SyntaxError.buildMessage(expected, found),
      expected,
      found,
      location
    );
  }

  function peg$parsestart() {
    var s0, s1;

    s0 = [];
    s1 = peg$parseline();
    while (s1 !== peg$FAILED) {
      s0.push(s1);
      s1 = peg$parseline();
    }

    return s0;
  }

  function peg$parseline() {
    var s0, s1, s2, s3, s4, s5, s6;

    s0 = peg$currPos;
    s1 = [];
    s2 = peg$parseSPACE();
    while (s2 !== peg$FAILED) {
      s1.push(s2);
      s2 = peg$parseSPACE();
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parsecommand();
      if (s2 !== peg$FAILED) {
        s3 = [];
        s4 = peg$parseSPACE();
        while (s4 !== peg$FAILED) {
          s3.push(s4);
          s4 = peg$parseSPACE();
        }
        if (s3 !== peg$FAILED) {
          s4 = [];
          s5 = peg$parsecomment();
          while (s5 !== peg$FAILED) {
            s4.push(s5);
            s5 = peg$parsecomment();
          }
          if (s4 !== peg$FAILED) {
            s5 = [];
            s6 = peg$parseNL();
            if (s6 !== peg$FAILED) {
              while (s6 !== peg$FAILED) {
                s5.push(s6);
                s6 = peg$parseNL();
              }
            } else {
              s5 = peg$FAILED;
            }
            if (s5 === peg$FAILED) {
              s5 = peg$parseEOF();
            }
            if (s5 !== peg$FAILED) {
              s1 = [s1, s2, s3, s4, s5];
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    if (s0 === peg$FAILED) {
      s0 = peg$parseEMPTY_LINE();
    }

    return s0;
  }

  function peg$parsecommand() {
    var s0;

    s0 = peg$parsecomment();
    if (s0 === peg$FAILED) {
      s0 = peg$parsemodular();
      if (s0 === peg$FAILED) {
        s0 = peg$parseglobals();
        if (s0 === peg$FAILED) {
          s0 = peg$parsefunction();
        }
      }
    }

    return s0;
  }

  function peg$parsecomment() {
    var s0, s1, s2, s3, s4, s5;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 35) {
      s1 = peg$c0;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c1); }
    }
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$currPos;
      s4 = peg$currPos;
      peg$silentFails++;
      s5 = peg$parseNL();
      if (s5 === peg$FAILED) {
        s5 = peg$parseEOF();
      }
      peg$silentFails--;
      if (s5 === peg$FAILED) {
        s4 = void 0;
      } else {
        peg$currPos = s4;
        s4 = peg$FAILED;
      }
      if (s4 !== peg$FAILED) {
        if (input.length > peg$currPos) {
          s5 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s5 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c2); }
        }
        if (s5 !== peg$FAILED) {
          s4 = [s4, s5];
          s3 = s4;
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$currPos;
        s4 = peg$currPos;
        peg$silentFails++;
        s5 = peg$parseNL();
        if (s5 === peg$FAILED) {
          s5 = peg$parseEOF();
        }
        peg$silentFails--;
        if (s5 === peg$FAILED) {
          s4 = void 0;
        } else {
          peg$currPos = s4;
          s4 = peg$FAILED;
        }
        if (s4 !== peg$FAILED) {
          if (input.length > peg$currPos) {
            s5 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c2); }
          }
          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      }
      if (s2 !== peg$FAILED) {
        s1 = [s1, s2];
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      if (input.substr(peg$currPos, 2) === peg$c3) {
        s1 = peg$c3;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c4); }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        s4 = peg$currPos;
        peg$silentFails++;
        s5 = peg$parseNL();
        if (s5 === peg$FAILED) {
          s5 = peg$parseEOF();
        }
        peg$silentFails--;
        if (s5 === peg$FAILED) {
          s4 = void 0;
        } else {
          peg$currPos = s4;
          s4 = peg$FAILED;
        }
        if (s4 !== peg$FAILED) {
          if (input.length > peg$currPos) {
            s5 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c2); }
          }
          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$currPos;
          s4 = peg$currPos;
          peg$silentFails++;
          s5 = peg$parseNL();
          if (s5 === peg$FAILED) {
            s5 = peg$parseEOF();
          }
          peg$silentFails--;
          if (s5 === peg$FAILED) {
            s4 = void 0;
          } else {
            peg$currPos = s4;
            s4 = peg$FAILED;
          }
          if (s4 !== peg$FAILED) {
            if (input.length > peg$currPos) {
              s5 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c2); }
            }
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        }
        if (s2 !== peg$FAILED) {
          s1 = [s1, s2];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 123) {
          s1 = peg$c5;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c6); }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$currPos;
          s3 = peg$currPos;
          peg$silentFails++;
          if (input.charCodeAt(peg$currPos) === 125) {
            s4 = peg$c7;
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c8); }
          }
          peg$silentFails--;
          if (s4 === peg$FAILED) {
            s3 = void 0;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
          if (s3 !== peg$FAILED) {
            s4 = [];
            if (input.length > peg$currPos) {
              s5 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c2); }
            }
            while (s5 !== peg$FAILED) {
              s4.push(s5);
              if (input.length > peg$currPos) {
                s5 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c2); }
              }
            }
            if (s4 !== peg$FAILED) {
              s3 = [s3, s4];
              s2 = s3;
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
          if (s2 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 125) {
              s3 = peg$c7;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c8); }
            }
            if (s3 !== peg$FAILED) {
              s1 = [s1, s2, s3];
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      }
    }

    return s0;
  }

  function peg$parsemodular() {
    var s0, s1;

    s0 = [];
    s1 = peg$parsedefine();
    if (s1 !== peg$FAILED) {
      while (s1 !== peg$FAILED) {
        s0.push(s1);
        s1 = peg$parsedefine();
      }
    } else {
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseglobals() {
    var s0, s1, s2, s3, s4, s5;

    s0 = peg$currPos;
    s1 = peg$parseGLOBALS();
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$parsedefine();
      if (s3 === peg$FAILED) {
        s3 = peg$parseEMPTY_LINE();
      }
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$parsedefine();
        if (s3 === peg$FAILED) {
          s3 = peg$parseEMPTY_LINE();
        }
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parseEND();
        if (s3 !== peg$FAILED) {
          s4 = [];
          s5 = peg$parseSPACE();
          if (s5 !== peg$FAILED) {
            while (s5 !== peg$FAILED) {
              s4.push(s5);
              s5 = peg$parseSPACE();
            }
          } else {
            s4 = peg$FAILED;
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parseGLOBALS();
            if (s5 !== peg$FAILED) {
              s1 = [s1, s2, s3, s4, s5];
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsefunction() {
    var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;

    s0 = peg$currPos;
    s1 = peg$parseMAIN();
    if (s1 === peg$FAILED) {
      s1 = null;
    }
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$parseSPACE();
      if (s3 !== peg$FAILED) {
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parseSPACE();
        }
      } else {
        s2 = peg$FAILED;
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parseFUNCTION();
        if (s3 !== peg$FAILED) {
          s4 = [];
          s5 = peg$parseSPACE();
          if (s5 !== peg$FAILED) {
            while (s5 !== peg$FAILED) {
              s4.push(s5);
              s5 = peg$parseSPACE();
            }
          } else {
            s4 = peg$FAILED;
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parseID();
            if (s5 !== peg$FAILED) {
              s6 = [];
              s7 = peg$parseSPACE();
              while (s7 !== peg$FAILED) {
                s6.push(s7);
                s7 = peg$parseSPACE();
              }
              if (s6 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 40) {
                  s7 = peg$c9;
                  peg$currPos++;
                } else {
                  s7 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c10); }
                }
                if (s7 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 41) {
                    s8 = peg$c11;
                    peg$currPos++;
                  } else {
                    s8 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c12); }
                  }
                  if (s8 !== peg$FAILED) {
                    s9 = peg$parseEMPTY_LINE();
                    if (s9 !== peg$FAILED) {
                      s1 = [s1, s2, s3, s4, s5, s6, s7, s8, s9];
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsedefine() {
    var s0, s1, s2, s3, s4;

    s0 = peg$currPos;
    s1 = peg$parseDEFINE();
    if (s1 !== peg$FAILED) {
      s2 = peg$parseID();
      if (s2 !== peg$FAILED) {
        s3 = peg$parsetypes();
        if (s3 !== peg$FAILED) {
          s4 = peg$parseEMPTY_LINE();
          if (s4 !== peg$FAILED) {
            s1 = [s1, s2, s3, s4];
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsetypes() {
    var s0;

    s0 = peg$parseINT();
    if (s0 === peg$FAILED) {
      s0 = peg$parseSTRING();
    }

    return s0;
  }

  function peg$parseID() {
    var s0, s1, s2, s3, s4;

    s0 = peg$currPos;
    s1 = peg$currPos;
    if (peg$c13.test(input.charAt(peg$currPos))) {
      s2 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c14); }
    }
    if (s2 !== peg$FAILED) {
      s3 = [];
      if (peg$c15.test(input.charAt(peg$currPos))) {
        s4 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s4 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c16); }
      }
      if (s4 !== peg$FAILED) {
        while (s4 !== peg$FAILED) {
          s3.push(s4);
          if (peg$c15.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c16); }
          }
        }
      } else {
        s3 = peg$FAILED;
      }
      if (s3 !== peg$FAILED) {
        s2 = [s2, s3];
        s1 = s2;
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
    } else {
      peg$currPos = s1;
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c17(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parseEMPTY_LINE() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    s1 = [];
    s2 = peg$parseSPACE();
    if (s2 !== peg$FAILED) {
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        s2 = peg$parseSPACE();
      }
    } else {
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$parseNL();
      if (s3 !== peg$FAILED) {
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parseNL();
        }
      } else {
        s2 = peg$FAILED;
      }
      if (s2 === peg$FAILED) {
        s2 = peg$parseEOF();
      }
      if (s2 !== peg$FAILED) {
        s1 = [s1, s2];
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    if (s0 === peg$FAILED) {
      s0 = peg$parseNL();
    }

    return s0;
  }

  function peg$parseDEFINE() {
    var s0, s1;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 6).toLowerCase() === peg$c18) {
      s1 = input.substr(peg$currPos, 6);
      peg$currPos += 6;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c19); }
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c20(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parseEND() {
    var s0, s1;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 3).toLowerCase() === peg$c21) {
      s1 = input.substr(peg$currPos, 3);
      peg$currPos += 3;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c22); }
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c20(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parseFUNCTION() {
    var s0, s1;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 8).toLowerCase() === peg$c23) {
      s1 = input.substr(peg$currPos, 8);
      peg$currPos += 8;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c24); }
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c20(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parseGLOBALS() {
    var s0, s1;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 7).toLowerCase() === peg$c25) {
      s1 = input.substr(peg$currPos, 7);
      peg$currPos += 7;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c26); }
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c20(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parseINT() {
    var s0, s1;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 7).toLowerCase() === peg$c27) {
      s1 = input.substr(peg$currPos, 7);
      peg$currPos += 7;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c28); }
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c20(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parseMAIN() {
    var s0, s1;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 4).toLowerCase() === peg$c29) {
      s1 = input.substr(peg$currPos, 4);
      peg$currPos += 4;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c30); }
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c20(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parseSTRING() {
    var s0, s1;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 6).toLowerCase() === peg$c31) {
      s1 = input.substr(peg$currPos, 6);
      peg$currPos += 6;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c32); }
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c20(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parseOPERATOR() {
    var s0;

    if (peg$c33.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c34); }
    }

    return s0;
  }

  function peg$parseSPACE() {
    var s0, s1;

    s0 = [];
    if (peg$c35.test(input.charAt(peg$currPos))) {
      s1 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c36); }
    }
    if (s1 !== peg$FAILED) {
      while (s1 !== peg$FAILED) {
        s0.push(s1);
        if (peg$c35.test(input.charAt(peg$currPos))) {
          s1 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c36); }
        }
      }
    } else {
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseNL() {
    var s0;

    if (input.charCodeAt(peg$currPos) === 10) {
      s0 = peg$c37;
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c38); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 2) === peg$c39) {
        s0 = peg$c39;
        peg$currPos += 2;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c40); }
      }
    }

    return s0;
  }

  function peg$parseNLS() {
    var s0;

    s0 = peg$parseNL();
    if (s0 === peg$FAILED) {
      s0 = peg$parseSPACE();
    }

    return s0;
  }

  function peg$parseEOF() {
    var s0, s1;

    s0 = peg$currPos;
    peg$silentFails++;
    if (input.length > peg$currPos) {
      s1 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c2); }
    }
    peg$silentFails--;
    if (s1 === peg$FAILED) {
      s0 = void 0;
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }



  const keywordList = [
    // "arg_val",
    // "arr_count",
    // "arr_curr",
    // "errorlog",
    // "fgl_keyval",
    // "fgl_lastkey",
    // "infield",
    // "int_flag",
    // "quit_flag",
    // "num_args",
    // "scr_line",
    // "set_count",
    // "showhelp",
    // "sqlca",
    // "sqlcode",
    // "sqlerrd",
    // "startlog",
    "AFTER",
    "ALL",
    "AND",
    "ANY",
    "ARRAY",
    "ASC",
    "ASCII",
    "ASCENDING",
    "AT",
    "ATTRIBUTE",
    "ATTRIBUTES",
    "AUTONEXT",
    "AVG",
    "BEFORE",
    "BEGIN",
    "BETWEEN",
    "BORDER",
    "BOTTOM",
    "BY",
    "CALL",
    "CASE",
    "CHAR",
    "CLEAR",
    "CLIPPED",
    "CLOSE",
    "COLUMN",
    "COLUMNS",
    "COMMAND",
    "COMMENTS",
    "COMMIT",
    "CONSTRAINT",
    "CONSTRUCT",
    "CONTINUE",
    "COUNT",
    "CREATE",
    "CURRENT",
    "CURSOR",
    "DATABASE",
    "DATE",
    "DATETIME",
    "DAY",
    "DECIMAL",
    "DECLARE",
    "DEFAULTS",
    "DEFER",
    "DEFINE",
    "DELETE",
    "DELIMITERS",
    "DELIMITER",
    "DESC",
    "DESCENDING",
    "DIRTY",
    "DISPLAY",
    "DISTINCT",
    "DOWNSHIFT",
    "DROP",
    "ELSE",
    "END",
    "ERROR",
    "EVERY",
    "EXCLUSIVE",
    "EXECUTE",
    "EXIT",
    "EXISTS",
    "EXTEND",
    "EXTERNAL",
    "FALSE",
    "FETCH",
    "FIELD",
    "FILE",
    "FINISH",
    "FIRST",
    "FLUSH",
    "FOR",
    "FOREACH",
    "FORM",
    "FORMAT",
    "FRACTION",
    "FREE",
    "FROM",
    "FUNCTION",
    "GROUP",
    "HAVING",
    "HEADER",
    "HELP",
    "HIDE",
    "HOLD",
    "HOUR",
    "IF",
    "IN",
    "INCLUDE",
    "INDEX",
    "INITIALIZE",
    "INPUT",
    "INSERT",
    "INSTRUCTIONS",
    "INTEGER",
    "INTERRUPT",
    "INTERVAL",
    "INTO",
    "IS",
    "ISOLATION",
    "KEY",
    "LABEL",
    "LAST",
    "LEFT",
    "LENGTH",
    "LET",
    "LIKE",
    "LINE",
    "LINES",
    "LOAD",
    "LOCK",
    "LOG",
    "MAIN",
    "MARGIN",
    "MATCHES",
    "MAX",
    "MDY",
    "MENU",
    "MESSAGE",
    "MIN",
    "MINUTE",
    "MOD",
    "MODE",
    "MONTH",
    "NAME",
    "NEED",
    "NEXT",
    "NO",
    "NOENTRY",
    "NOT",
    "NOTFOUND",
    "NULL",
    "OF",
    "ON",
    "OPEN",
    "OPTION",
    "OPTIONS",
    "OR",
    "ORDER",
    "OTHERWISE",
    "OUTER",
    "OUTPUT",
    "PAGE",
    "PAGENO",
    "PIPE",
    "PREPARE",
    "PREVIOUS",
    "PRIMARY",
    "PRINT",
    "PROGRAM",
    "PROMPT",
    "PUT",
    "QUIT",
    "READ",
    "RECORD",
    "REPORT",
    "RETURN",
    "RETURNING",
    "REVERSE",
    "RIGTH",
    "ROLLBACK",
    "ROW",
    "ROWS",
    "RUN",
    "SCREEN",
    "SCROLL",
    "SECOND",
    "SELECT",
    "SET",
    "SHARE",
    "SHOW",
    "SKIP",
    "SLEEP",
    "SMALLINT",
    "SPACE",
    "SPACES",
    "SQL",
    "START",
    "STEP",
    "STOP",
    "SUM",
    "TABLE",
    "TABLES",
    "TEMP",
    "THEN",
    "TIME",
    "TO",
    "TODAY",
    "TOP",
    "TRAILER",
    "TRUE",
    "TYPE",
    "UNCONSTRAINED",
    "UNION",
    "UNIQUE",
    "UNITS",
    "UNLOAD",
    "UNLOCK",
    "UNLOAD",
    "UPDATE",
    "UPSHIFT",
    "USING",
    "VALUES",
    "VARCHAR",
    "WAIT",
    "WAITING",
    "WEEKDAY",
    "WHEN",
    "WHENEVER",
    "WHERE",
    "WHILE",
    "WINDOW",
    "WITH",
    "WITHOUT",
    "WORDWRAP",
    "WORK",
    "YEAR"
  ]

  //Compatibilizar com Token4glType em index.ts
  const TokenType = {
    program: 1,
    block: 2,
    keyword: 3,
    string: 4,
    operator: 5,
    whitespace: 6,
    lineComment: 7,
    blockComment: 8,
    newLine: 11,
    unknown: 0
  }

  function nodeKeyword(value) {
    return node(TokenType.keyword, value);
  }

  function node(_type, value, info, key) {
    var obj = { type: _type, value: value, location: location() };

    if (info) obj.info = info;
    if (key) obj.key = key;

    return obj;
  }



  peg$result = peg$startRuleFunction();

  if (peg$result !== peg$FAILED && peg$currPos === input.length) {
    return peg$result;
  } else {
    if (peg$result !== peg$FAILED && peg$currPos < input.length) {
      peg$fail(peg$endExpectation());
    }

    throw peg$buildStructuredError(
      peg$maxFailExpected,
      peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,
      peg$maxFailPos < input.length
        ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
        : peg$computeLocation(peg$maxFailPos, peg$maxFailPos)
    );
  }
}

module.exports = {
  SyntaxError: peg$SyntaxError,
  parse:       peg$parse
};
