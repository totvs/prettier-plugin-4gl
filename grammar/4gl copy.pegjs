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
  return node(TokenType.identifier, id);
}

function addSpace(value) {
    return node(TokenType.whitespace, value);
}

function notNullValues(value) {
  if (value instanceof Array) {
    return value[1]
  };

  return value;
}

function addComment(value) {

  return node(TokenType.comment, value);
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

    return { type: _type, value: value }; //obj;
  }
}

}

start
  = l:line+

line
  = SPACE? session SPACE? comment?
  / comment
  / SPACE

session
  = modular 
  / globals
  / function

comment
  = c:$("#" ((!(NL) .)*) NL) { return addComment(c) }
  / c:$("--" ((!(NL) .)*)  NL) { return addComment(c) }
  / c:$("{" (!"}".*) "}")  { return addComment(c) }

modular
  = (d:defineBlock     { return addBlock(d) })?

globals
  = b:(
      GLOBALS SPACE
        (d:defineBlock     { return addBlock(d) })?
      END SPACE GLOBALS SPACE
    ) { return addGlobal(b)}

function 
  = b:(
      MAIN SPACE
        (d:defineBlock     { return addBlock(d) })?
        (b:blockCommand    { return addBlock(b) })?
      END SPACE MAIN SPACE
    ) { return addMain(b) }
    / b:(
      FUNCTION SPACE ID arguments
        (d:define*)
        (b:blockCommand { return addBlock(b) })?
      END SPACE FUNCTION SPACE
    ) { return addFunction(b) }
    
blockCommand
  =  s:SPACE+                  { return s }
    / c:comment 

defineBlock
  = (define 
    / SPACE
    / comment)*

define
  = DEFINE SPACE ID SPACE types SPACE comment?
    
arguments
  = '(' SPACE? ')'                          { return [] }
  / '(' a:argument_id ')'                   { return [ a ] }
  / '(' l:argument_list+ ')'                { return l }
  / '(' l:argument_list+ a:argument_id+ ')' { return l.concat(a) }

argument_id
  = SPACE? i:ID SPACE?                      

argument_list
  = SPACE? i:ID SPACE? ',' SPACE?           

types
  = INT
  / STRING

ID
  = id:$([a-zA-Z_]([a-zA-Z0-9_]*)) { return addId(id) }

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
  = s:$([ \t\n\r]+) { return addSpace(s) }
  / s:$(NL+)  { return addSpace(s) }

NL
  = s:("\n" / "\r\n") { return addSpace(s) }

NLS = NL / SPACE

EOF
  = !.
