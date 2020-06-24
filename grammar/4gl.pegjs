{

const keywordList = [
  //"arg_val",
  //"arr_count",
  //"arr_curr",
  //"errorlog",
  //"fgl_keyval",
  //"fgl_lastkey",
  //"infield",
  //"int_flag",
  //"quit_flag",
  //"num_args",
  //"scr_line",
  //"set_count",
  //"showhelp",
  //"sqlca",
  //"sqlcode",
  //"sqlerrd",
  //"startlog",
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
  program   : "program",
  keyword   : "keyword",
  whitespace: "whitespace",
  comment   : "comment",
  identifier: "identifier",
  main      : "main",
  global    : "global",
  function  : "function",
  command   : "command",
  string    : "string",  
  number    : "number",
  unknown   : "unknown",
}

const DataType = {
  integer: "integer"
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

function addComment(value) {
  return node(TokenType.comment, value);
}

function addMain(code) {
  const info = { id: "main", arguments: [], block: code}
  
  return node(TokenType.main, info.id, info);
}

function addFunction(id, _arguments, code) {
  const info = { id: id, arguments: _arguments, block: code}

  return node(TokenType.function, id.value, info);
}

function addCommand(command) {
  return node(TokenType.command, command);
}

function addNumber(dataType, value) {
  const info = { type: dataType }

  return node(TokenType.number, value, info);

}

function node(_type, value, info) {
  if (value) {
    const _location = location();
    const offset = { start: _location.start.offset, end: _location.end.offset }
    const obj = { type: _type, value: value, offset: offset };

    if (info) obj.info = info;

    return obj;
  }
}

}

start
  = l:line*

line
  = SPACE? session SPACE? comment?
  / comment
  / SPACE

session
  = modular 
  / globals
  / function

comment
  = c:$("#" ((!(NL) .)*) NL) //{ return addComment(c) }
  / c:$("--" ((!(NL) .)*)  NL) //{ return addComment(c) }
  / c:$("{" (!"}".*)"}")  //{ return addComment(c) }


modular
  = define+

globals
  = b:(
      GLOBALS SPACE
        (define 
        / SPACE
        / comment)*
      END SPACE GLOBALS SPACE
    ) //{ return addGlobal(b)}

function 
  = MAIN SPACE
        b:blockCommand?
      END SPACE MAIN SPACE
    { return addMain(b) }
    / FUNCTION SPACE i:ID p:parameterList 
        b:blockCommand?
      END SPACE FUNCTION SPACE
      { return addFunction(i,p,b) }
    
blockCommand
  = SPACE                             { return [] }
  / c:command                         { return [ c ] }
  / b:commands+                       { return b }
  / b:commands+ c:command+            { return b.concat(c) }

commands
  = c:command { return c }    

command
  = c:(define 
    / display
    / call
    )  { return addCommand(c) }

define
  = SPACE? DEFINE SPACE ID SPACE types SPACE comment? 

display
  = SPACE? DISPLAY SPACE expressions SPACE comment? 

call
  = SPACE? CALL SPACE ID SPACE? argumentList SPACE comment? 

expressions
  = expression

expression
  = string_exp

argumentList
  = '(' SPACE? ')'                              { return [] }
  / '(' a:arg_expression ')'                    { return [ a ] }
  / '(' a:arg_value_list+ ')'                   { return a }
  / '(' l:arg_value_list+ a:arg_expression+ ')' { return l.concat(a) }

arg_expression
  = SPACE? e:expressions SPACE? { return e }    

arg_value_list
  = SPACE? e:expressions SPACE? ',' SPACE? { return e }

parameterList
  = '(' SPACE? ')'                          { return [] }
  / '(' p:param_id ')'                      { return [ p ] }
  / '(' p:param_value_list+ ')'             { return p }
  / '(' l:param_value_list+ p:param_id+ ')' { return l.concat(p) }

param_id
  = SPACE? v:ID SPACE?                  { return v }

param_value_list
  = SPACE? v:ID SPACE? ',' SPACE?       { return } 

types
  = INT
  / STRING
  / $(CHAR '(' integer_exp ')') 

ID
  = id:$([a-zA-Z_]([a-zA-Z0-9_]*)) { return addId(id) }

DEFINE
  = k:'define'i { return addKeyword(k)}

CHAR
  = k:'char'i { return addKeyword(k)}

CALL
  = k:'call'i { return addKeyword(k)}

DISPLAY
  = k:'display'i { return addKeyword(k)}

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

integer_exp
  = t:integer_text                   { return addNumber(DataType.integer, parseInt(text, 10)) }

integer_text
  = '+'? d:$(DIGIT+) !'.'
  / '-'  d:$(DIGIT+) !'.'

string_exp
  = s:(double_quoted_multiline_string
  / double_quoted_single_line_string
  / single_quoted_multiline_string
  / single_quoted_single_line_string)    { return node(TokenType.string, s) }

double_quoted_multiline_string
  = $('"""' NL? chars:multiline_string_char* '"""')
double_quoted_single_line_string
  = $('"' chars:string_char* '"')
single_quoted_multiline_string
  = $("'''" NL? chars:multiline_literal_char*"'''")
single_quoted_single_line_string
  = $("'" chars:literal_char*"'")

string_char
  = $(!'"' char:.)

literal_char
   = (!"'" char:.)

multiline_string_char
  = multiline_string_delim / (!'"""' char:.)

multiline_string_delim
  = '\\' NL NLS*                        

multiline_literal_char
  = (!"'''" char:.)

OPERATOR
  = o:[~!@%^&*()-+=|/{}[\]:;<>,.?#_] 
//   {
//     return node(TokenType.operator, o);
// }

DIGIT
  = [0-9]

SPACE 
  = s:$([ \t\n\r]+) //{ return addSpace(s) }
  / s:NL+

NL
  = s:$("\n" /"\r\n") //{ return addSpace(s) }

NLS = NL / SPACE

EOF
  = !.
