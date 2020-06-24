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
  variable  : "variable",
  expression: "expression",
  operator  : "operator",
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

function addVar(variable, index) {
  const info = { index: index}
              
  return node(TokenType.variable, variable, info);
}

function addFunction(id, _arguments, code) {
  const info = { id: id, arguments: _arguments, block: code}

  return node(TokenType.function, id.value, info);
}

function addExpression(operator, expression) {
  const info = { operator: operator, expression: expression}

  return node(TokenType.expression, "", info);
}

function addOperator(operator) {
  return node(TokenType.operator, operator);
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
    ) { return addGlobal(b)}

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
  = c:commands+
  
commands
  = SPACE? c:command SPACE? comment? NL? { return c }
    / SPACE
    / comment

command
  = c:(define 
    / display
    / call
    )  { return addCommand(c) }

define
  = DEFINE SPACE ID SPACE types  

display
  = DISPLAY SPACE expressions 

call
  = CALL SPACE ID SPACE? argumentList (SPACE RETURNING SPACE receivingVariables)?

expressions
  = l:exp_list+ e:expression { return l.concat(e)}
  / l:exp_list+              { return l }
  / e:expression             { return [ e ]}

exp_list
  = SPACE? e:expression SPACE? o:OPERATOR SPACE?  { return addExpression(o, e)}

expression
  = string_exp
  / integer_exp
  / variable
  
argumentList
  = O_PARENTHESIS SPACE? C_PARENTHESIS                              { return [] }
  / O_PARENTHESIS a:arg_value C_PARENTHESIS                    { return [ a ] }
  / O_PARENTHESIS a:arg_value_list+ C_PARENTHESIS                   { return a }
  / O_PARENTHESIS l:arg_value_list+ a:arg_value+ C_PARENTHESIS { return l.concat(a) }

arg_value
  = SPACE? e:expressions SPACE? { return e }    

arg_value_list
  = SPACE? e:expressions SPACE? COMMA SPACE? { return e }

parameterList
  = O_PARENTHESIS SPACE? C_PARENTHESIS                          { return [] }
  / O_PARENTHESIS p:param_id C_PARENTHESIS                      { return [ p ] }
  / O_PARENTHESIS p:param_value_list+ C_PARENTHESIS             { return p }
  / O_PARENTHESIS l:param_value_list+ p:param_id+ C_PARENTHESIS { return l.concat(p) }

param_value_list
  = SPACE? v:ID SPACE? COMMA SPACE?       { return } 

param_id
  = SPACE? v:ID SPACE?                  { return v }

receivingVariables
  = l:var_list+ v:variable+              { return l.concat(v) }
  / l:var_list+                          { return l }
  / v:variable                           { return [ v ] }

var_list
  = SPACE? v:variable SPACE? COMMA SPACE?  { return }

variable
  = v:$(ID POINT ID)                { return addVar(v) }    
  / v:$(ID POINT ASTERISK)                { return addVar(v) }    
  / v:ID O_BRACKET i:expressions C_BRACKET    { return addVar(v, i) }
  / v:ID                          { return addVar(v) }    

types
  = INT
  / STRING
  / $(CHAR O_PARENTHESIS integer_exp C_PARENTHESIS) 

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

RETURNING
  = k:'returning'i { return addKeyword(k)}

OPERATOR
  = o:[~!@%^&*-+=|/{}\:;<>?#_] { addOperator(o) } 

O_PARENTHESIS
  = o:'('  { addOperator(o) };

C_PARENTHESIS
  = o:')'  { addOperator(o) };

O_BRACKET
  = o:'['  { addOperator(o) };

C_BRACKET
  = o:']'  { addOperator(o) };

POINT
  = o:'.'  { addOperator(o) };

COMMA
  = o:','  { addOperator(o) };

ASTERISK
  = o:'*'  { addOperator(o) };

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
  = s:(double_quoted_string
  / single_quoted_string)    { return node(TokenType.string, s) }

double_quoted_string
  = $('"' (!'"' .)* '"')

single_quoted_string
  = $("'" (!"'" .)* "'")

DIGIT
  = [0-9]

SPACE 
  = s:$([ \t\n\r]+) { return addSpace(s) }
  / s:NL+

NL
  = s:$("\n" /"\r\n") { return addSpace(s) }

NLS = NL / SPACE

EOF
  = !.
