module.exports = /*
 * Generated by PEG.js 0.10.0.
 *
 * http://pegjs.org/
 */
(function() {
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

        peg$c0 = function() {return problem},
        peg$c1 = "var",
        peg$c2 = peg$literalExpectation("var", false),
        peg$c3 = ";",
        peg$c4 = peg$literalExpectation(";", false),
        peg$c5 = ",",
        peg$c6 = peg$literalExpectation(",", false),
        peg$c7 = function(variableName) {variables.push(variableName)},
        peg$c8 = /^[a-zA-Z]/,
        peg$c9 = peg$classExpectation([["a", "z"], ["A", "Z"]], false, false),
        peg$c10 = "Z:",
        peg$c11 = peg$literalExpectation("Z:", false),
        peg$c12 = "->",
        peg$c13 = peg$literalExpectation("->", false),
        peg$c14 = function(target) {return setTarget(target)},
        peg$c15 = "<=",
        peg$c16 = peg$literalExpectation("<=", false),
        peg$c17 = function(constraint) {return addMatrixRow()},
        peg$c18 = function(variableName) {isExistingVariable(variableName)},
        peg$c19 = "*",
        peg$c20 = peg$literalExpectation("*", false),
        peg$c21 = function(multiplier) {tmp.push(parseFloat(multiplier))},
        peg$c22 = /^[0-9]/,
        peg$c23 = peg$classExpectation([["0", "9"]], false, false),
        peg$c24 = function(sign, number) { return sign + number.join(""); },
        peg$c25 = /^[\-]/,
        peg$c26 = peg$classExpectation(["-"], false, false),
        peg$c27 = function(sign) {return sign},
        peg$c28 = /^[+\-]/,
        peg$c29 = peg$classExpectation(["+", "-"], false, false),
        peg$c30 = function(constraint) {constraints.push(parseFloat(constraint))},
        peg$c31 = "min",
        peg$c32 = peg$literalExpectation("min", false),
        peg$c33 = "max",
        peg$c34 = peg$literalExpectation("max", false),
        peg$c35 = /^[ \t\n\r]/,
        peg$c36 = peg$classExpectation([" ", "\t", "\n", "\r"], false, false),
        peg$c37 = peg$otherExpectation("whitespace"),

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
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$parsevariableDefinitions();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parseexpression();
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parseexpression();
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parsetargetExpression();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c0();
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

      return s0;
    }

    function peg$parsevariableDefinitions() {
      var s0, s1;

      s0 = [];
      s1 = peg$parsevariableDefinition();
      if (s1 !== peg$FAILED) {
        while (s1 !== peg$FAILED) {
          s0.push(s1);
          s1 = peg$parsevariableDefinition();
        }
      } else {
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parsevariableDefinition() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 3) === peg$c1) {
        s1 = peg$c1;
        peg$currPos += 3;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c2); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsewhitespace();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsevariableName();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsewhitespace();
            if (s4 !== peg$FAILED) {
              s5 = [];
              s6 = peg$parseextraVariable();
              while (s6 !== peg$FAILED) {
                s5.push(s6);
                s6 = peg$parseextraVariable();
              }
              if (s5 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 59) {
                  s6 = peg$c3;
                  peg$currPos++;
                } else {
                  s6 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c4); }
                }
                if (s6 !== peg$FAILED) {
                  s7 = peg$parsewhitespace();
                  if (s7 !== peg$FAILED) {
                    s1 = [s1, s2, s3, s4, s5, s6, s7];
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

      return s0;
    }

    function peg$parseextraVariable() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 44) {
        s1 = peg$c5;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c6); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsewhitespace();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsevariableName();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsewhitespace();
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

    function peg$parsevariableName() {
      var s0, s1;

      s0 = peg$currPos;
      s1 = peg$parseindentifier();
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c7(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parseindentifier() {
      var s0;

      if (peg$c8.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c9); }
      }

      return s0;
    }

    function peg$parsetargetExpression() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 2) === peg$c10) {
        s1 = peg$c10;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c11); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsewhitespace();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsepartialExpression();
          if (s3 !== peg$FAILED) {
            s4 = [];
            s5 = peg$parseextraPart();
            while (s5 !== peg$FAILED) {
              s4.push(s5);
              s5 = peg$parseextraPart();
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parsewhitespace();
              if (s5 !== peg$FAILED) {
                if (input.substr(peg$currPos, 2) === peg$c12) {
                  s6 = peg$c12;
                  peg$currPos += 2;
                } else {
                  s6 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c13); }
                }
                if (s6 !== peg$FAILED) {
                  s7 = peg$parsewhitespace();
                  if (s7 !== peg$FAILED) {
                    s8 = peg$parsetarget();
                    if (s8 !== peg$FAILED) {
                      s9 = peg$parsewhitespace();
                      if (s9 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c14(s8);
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

    function peg$parseexpression() {
      var s0, s1, s2, s3, s4, s5, s6;

      s0 = peg$currPos;
      s1 = peg$parsepartialExpression();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parseextraPart();
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parseextraPart();
        }
        if (s2 !== peg$FAILED) {
          if (input.substr(peg$currPos, 2) === peg$c15) {
            s3 = peg$c15;
            peg$currPos += 2;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c16); }
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parsewhitespace();
            if (s4 !== peg$FAILED) {
              s5 = peg$parseconstraint();
              if (s5 !== peg$FAILED) {
                s6 = peg$parsewhitespace();
                if (s6 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c17(s5);
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

      return s0;
    }

    function peg$parsepartialExpression() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10;

      s0 = peg$currPos;
      s1 = peg$parsemultiplier();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsewhitespace();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsevariable();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsewhitespace();
            if (s4 !== peg$FAILED) {
              s5 = peg$parseoperator();
              if (s5 !== peg$FAILED) {
                s6 = peg$parsewhitespace();
                if (s6 !== peg$FAILED) {
                  s7 = peg$parsemultiplier();
                  if (s7 !== peg$FAILED) {
                    s8 = peg$parsewhitespace();
                    if (s8 !== peg$FAILED) {
                      s9 = peg$parsevariable();
                      if (s9 !== peg$FAILED) {
                        s10 = peg$parsewhitespace();
                        if (s10 !== peg$FAILED) {
                          s1 = [s1, s2, s3, s4, s5, s6, s7, s8, s9, s10];
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
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseextraPart() {
      var s0, s1, s2, s3, s4, s5, s6;

      s0 = peg$currPos;
      s1 = peg$parseoperator();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsewhitespace();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsemultiplier();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsewhitespace();
            if (s4 !== peg$FAILED) {
              s5 = peg$parsevariable();
              if (s5 !== peg$FAILED) {
                s6 = peg$parsewhitespace();
                if (s6 !== peg$FAILED) {
                  s1 = [s1, s2, s3, s4, s5, s6];
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

      return s0;
    }

    function peg$parsevariable() {
      var s0, s1;

      s0 = peg$currPos;
      s1 = peg$parseindentifier();
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c18(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parsemultiplier() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = peg$parsenumber();
      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 42) {
          s2 = peg$c19;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c20); }
        }
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c21(s1);
          s0 = s1;
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

    function peg$parsenumber() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$parsesign();
      if (s1 !== peg$FAILED) {
        s2 = [];
        if (peg$c22.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c23); }
        }
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            if (peg$c22.test(input.charAt(peg$currPos))) {
              s3 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c23); }
            }
          }
        } else {
          s2 = peg$FAILED;
        }
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c24(s1, s2);
          s0 = s1;
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

    function peg$parsesign() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      if (peg$c25.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c26); }
      }
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        if (peg$c25.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c26); }
        }
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c27(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parseoperator() {
      var s0;

      if (peg$c28.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c29); }
      }

      return s0;
    }

    function peg$parseconstraint() {
      var s0, s1;

      s0 = peg$currPos;
      s1 = peg$parsenumber();
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c30(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parsetarget() {
      var s0;

      if (input.substr(peg$currPos, 3) === peg$c31) {
        s0 = peg$c31;
        peg$currPos += 3;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c32); }
      }
      if (s0 === peg$FAILED) {
        if (input.substr(peg$currPos, 3) === peg$c33) {
          s0 = peg$c33;
          peg$currPos += 3;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c34); }
        }
      }

      return s0;
    }

    function peg$parsewhitespace() {
      var s0, s1;

      s0 = [];
      if (peg$c35.test(input.charAt(peg$currPos))) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c36); }
      }
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

      return s0;
    }

    function peg$parse_() {
      var s0, s1;

      peg$silentFails++;
      s0 = [];
      if (peg$c35.test(input.charAt(peg$currPos))) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c36); }
      }
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
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c37); }
      }

      return s0;
    }


    	var variables = [];
        var constraints = [];
        var aMatrix = [];
        var tmp = [];
        
        var problem = {
        	variables: variables,
            constraints: constraints,
            A: aMatrix
        }

        function isExistingVariable(actualVar) { 
        	var returnValue;
        	if (variables.includes(actualVar)) {
            	returnValue = actualVar;
            } else {
            	throw new SyntaxError(actualVar + " variable doesn't exist. You can use only: " + variables)
            }
            return returnValue;
        }
        
        function addMatrixRow() {
        	if(aMatrix[0] != undefined && aMatrix[0].length != tmp.length) {
            	throw new SyntaxError("Number of variables should be equal to variables of the first expression")
            }
        	aMatrix.push(tmp);
            tmp = [];
        }
        
        function setTarget(target) {
        	problem.target = target;
            addMatrixRow();
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

  return {
    SyntaxError: peg$SyntaxError,
    parse:       peg$parse
  };
})();
