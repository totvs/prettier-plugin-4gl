{

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
  keyword: 2,
  whitespace: 3,
  comment: 4,
  identifier: 5,
  main: 6,
  global: 7,
  function: 8,
  block: 9,
  unknown: 0
}

function addKeyword(value) {
  return node(TokenType.keyword, value);
}

function addGlobal(value) {
  return node(TokenType.global, value);
}

function addId(id) {
  return node(TokenType.identifier, joinAll(id));
}

function addSpace(value) {
  if (value instanceof Array) {
    return node(TokenType.whitespace, joinAll(value));
  } else{ 
    return node(TokenType.whitespace, value);
  }
}

function joinAll(value) {
  let result = "";

  if (value instanceof Array) {
    value.forEach(function (element) {
      if (element instanceof Array) {
          result = result + joinAll(element)
      } else {
          result = result + element;
      }
    });
  } else {
    result = value;
  }  

  return result;
}

function notNullValues(value) {
  if (value instanceof Array) {
    return value[1]
  };

  return value;
}

function addComment(start, content, finish) {
  const value = [];
  
  value.push(start);
  if (content instanceof Array) {
    value.push(content.map(notNullValues).join(""));
  } else {
    value.push(content);
  }
  if (finish) {
    value.push(finish);
  }

  return node(TokenType.comment, value.join(""));
}

function addMain(value) {
  return node(TokenType.main, value);
}

function addFunction(value) {
  return node(TokenType.function, value);
}

function addBlock(value) {
  return node(TokenType.block, value);
}

function node(_type, value, info, key) {
  if (value) {
    var obj = { type: _type, value: value, location: location() };

    if (info) obj.info = info;
    if (key) obj.key = key;

    return obj;
  }
}

}

start
  = l:line*

line
  = SPACE? command SPACE? comment?
  / comment
  / SPACE

command
  = modular 
  / globals
  / function

comment
  = c1:"#" c2:((!(NL) .)*) NL { return addComment(c1, c2) }
  / c1:"--" c2:((!(NL) .)*)  NL { return addComment(c1, c2) }
  / c1:"{" c2:(!"}".*) c3:"}"  { return addComment(c1, c2, c3) }


modular
  = define+

globals
  = b:(
      GLOBALS SPACE
        (define 
        / SPACE
        / comment)*
      END SPACE GLOBALS SPACE
    ) { return addGlobal(b)}

function 
  = b:(
      MAIN SPACE
        (b:blockCommand { return addBlock(b) })?
      END SPACE MAIN SPACE
    ) { return addMain(b) }
    / b:(
      FUNCTION SPACE ID parameterList
        (b:blockCommand { return addBlock(b) })?
      END SPACE FUNCTION SPACE
    ) { return addFunction(b) }
    
blockCommand
  = (define 
    / SPACE
    / comment)*

define
  = DEFINE SPACE ID SPACE types SPACE comment?

parameterList
  = '(' SPACE? ')'                          { return [] }
  / '(' p:param_id ')'                      { return [ p ] }
  / '(' p:param_value_list+ ')'             { return p }
  / '(' p:param_value_list+ v:param_id+ ')' { return p.concat(v) }

param_id
  = param_sep? v:ID param_sep?                  { return addId(v) }

param_value_list
  = param_sep? v:ID param_sep? ',' param_sep?   { return v }

param_sep
  = SPACE

types
  = INT
  / STRING

ID
  = id:([a-zA-Z_]([a-zA-Z0-9_]*)) { return addId(id) }

DEFINE
  = k:'define'i { return addKeyword(k)}

END
  = k:'end'i { return addKeyword(k)}

FUNCTION 
  = k:'function'i { return addKeyword(k)}

GLOBALS
  = k:'globals'i { return addKeyword(k)}

INT
  = k:'integer'i { return addKeyword(k)}

MAIN
  = k:'main'i { return addKeyword(k)}

STRING
  = k:'string'i { return addKeyword(k)}

// words
//   = (word (SPACE / NL))+

// word
//   = w:([a-zA-Z0-9_]+)  {
//     const word = w.join("");
//     const _type = keywordList.indexOf(word.toUpperCase()) === -1?TokenType.word:TokenType.keyword;

//   return node(_type, word);
// }

// string
//   = double_quoted_multiline_string
//   / double_quoted_single_line_string
//   / single_quoted_multiline_string
//   / single_quoted_single_line_string

// double_quoted_multiline_string
//   = s:('"""' NL? chars:multiline_string_char* '"""')  { return node(TokenType.string_double,s) }
// double_quoted_single_line_string
//   = '"' chars:string_char* '"'                    { return node(TokenType.string_double,chars.join(''), {subType: '"' }) }
// single_quoted_multiline_string
//   = "'''" NL? chars:multiline_literal_char* "'''" { return node(TokenType.string_single,chars.join(''), {subType: "'" }) }
// single_quoted_single_line_string
//   = "'" chars:literal_char* "'"                   { return node(TokenType.string_single,chars.join(''), {subType: "'" }) }

// string_char
//   = (!'"' char:. { return char })

// literal_char
//   = (!"'" char:. { return char })


// multiline_string_char
//   = multiline_string_delim / (!'"""' char:. { return char})

// multiline_string_delim
//   = '\\' NL NLS*                        { return '' }

// multiline_literal_char
//   = (!"'''" char:. { return char })

OPERATOR
  = o:[~!@%^&*()-+=|/{}[\]:;<>,.?#_] 
//   {
//     return node(TokenType.operator, o);
// }

SPACE 
  = s:[ \t\n\r]+ { return addSpace(s) }
  / s:NL+ { return addSpace(s) }

//    {
//   return node(TokenType.whitespace, s.join(""));
// }

NL
  = s:("\n" / "\r\n") { return addSpace(s) }

NLS = NL / SPACE

EOF
  = !.
