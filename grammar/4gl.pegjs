{

const keywordList = [
"AFTER",
"ALL",
"AND",
"ANY",
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
"FREE",
"FROM",
"GROUP",
"HAVING",
"HEADER",
"HELP",
"HIDE",
"HOLD",
"IF",
"IN",
"INCLUDE",
"INDEX",
"INITIALIZE",
"INPUT",
"INSERT",
"INSTRUCTIONS",
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
"MOD",
"MODE",
"NAME",
"NEED",
"NEXT",
"NO",
"NOENTRY",
"NOT",
"NOTFOUND",
"NULL",
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
"SELECT",
"SET",
"SHARE",
"SHOW",
"SKIP",
"SLEEP",
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
"WORK"
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
  builtInVar: "builtInVar",
  unknown   : "unknown",
}

const ConstType = {
  integer: "integer",
  string : "string"
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
  const info = { index: index }
              
  return node(TokenType.variable, variable, info);
}

function addBuiltInVar(variable) {
  return node(TokenType.builtInVar, variable);
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

function addString(value) {
  const info = { type: ConstType.string }

  return node(TokenType.string, value, info);

}

function node(_type, value, info) {
  if (value) {
    const _location = location();
    const offset = { start: _location.start.offset, end: _location.end.offset }
    const obj = { type: _type, value: value, offset: offset }

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
  = c:$("#"  ((!(NL)  .)*) NL)  { return addComment(c) }
  / c:$("--" ((!(NL)  .)*) NL)  { return addComment(c) }
  / c:$("{"  ((!("}") .)*) "}") { return addComment(c) }

modular
  = define+

globals
  = b:(
      GLOBALS SPACE
        (define 
        / SPACE
        / comment)*
      END SPACE GLOBALS SPACE
    ) { return addGlobal(b) }

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
    / let
    )  { return addCommand(c) }

define
  = DEFINE SPACE ID SPACE dataType 

display
  = DISPLAY SPACE expressions 

call
  = CALL SPACE ID SPACE? argumentList (SPACE RETURNING SPACE receivingVariables)?

let
  = LET receivingVariables SPACE? EQUAL SPACE? expressions

expressions
  = l:exp_list+ e:expression { return l.concat(e) }
  / l:exp_list+              { return l }
  / e:expression             { return [ e ]}

exp_list
  = SPACE? e:expression SPACE? o:OPERATOR SPACE?  { return addExpression(o, e) }

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
  = v:$(ID DOT ID)                          { return addVar(v) }    
  / v:$(ID DOT ASTERISK)                    { return addVar(v) }    
  / v:ID O_BRACKET i:expressions C_BRACKET    { return addVar(v, i) }
  / v:ID                                      { return addVar(v) }    
  / v:builtInVariables                        { return v }

builtInVariables
  = v:'arg_val'i      { return addBuiltInVar(v) }
  / v:'arr_count'i    { return addBuiltInVar(v) }
  / v:'arr_curr'i     { return addBuiltInVar(v) }
  / v:'errorlog'i     { return addBuiltInVar(v) }
  / v:'fgl_keyval'i   { return addBuiltInVar(v) }
  / v:'fgl_lastkey'i  { return addBuiltInVar(v) }
  / v:'infield'i      { return addBuiltInVar(v) }
  / v:'int_flag'i     { return addBuiltInVar(v) }
  / v:'quit_flag'i    { return addBuiltInVar(v) }
  / v:'num_args'i     { return addBuiltInVar(v) }
  / v:'scr_line'i     { return addBuiltInVar(v) }
  / v:'set_count'i    { return addBuiltInVar(v) }
  / v:'showhelp'i     { return addBuiltInVar(v) }
  / v:'sqlca'i        { return addBuiltInVar(v) }
  / v:'sqlcode'i      { return addBuiltInVar(v) }
  / v:'sqlerrd'i      { return addBuiltInVar(v) }
  / v:'startlog'i     { return addBuiltInVar(v) }

dataType
  = simpleDataType
  / structuredDataType
  / largeDataType

simpleDataType
  = numberType
  / timeType
  / characterType

numberType
  = $(BIGINT / INTEGER / INT)
  / $(SMALLINT)
  / $((DECIMAL / DEC / NUMERIC / MONEY) (O_PARENTHESIS scale C_PARENTHESIS)?)
  / $((DOUBLE_PRECISION / FLOAT) (O_PARENTHESIS integer_exp C_PARENTHESIS)?)
  / $((REAL / SMALLFLOAT))

timeType
  = $(DATETIME SPACE datetimeQualifier) 
  / $(DATE)
  / $(INTERVAL)

characterType
  = $((CHARACTER / CHAR) (O_PARENTHESIS integer_exp C_PARENTHESIS)?)
  / $(NCHAR (O_PARENTHESIS integer_exp C_PARENTHESIS)?)
  / $((VARCHAR / NVARCHAR) (O_PARENTHESIS integer_exp C_PARENTHESIS?))

largeDataType
  = $(BYTE)
  / $(TEXT)

structuredDataType
  = $(ARRAY O_BRACKET sizeArray C_BRACKET SPACE OF SPACE (simpleDataType / recordDataType / largeDataType)) 
  / $(DYNAMIC_ARRAY )
  / recordDataType 
  
sizeArray
  = integer_exp ((COMMA integer_exp)+)?

recordDataType
  = (RECORD SPACE LIKE tableQualifier columnQualifier)
  / RECORD 
      member
    END SPACE RECORD

datetimeQualifier
  = datetimeQualifierWord SPACE TO SPACE datetimeQualifierWord 
  
datetimeQualifierWord
  = YEAR 
  / MONTH
  / DAY
  / HOUR
  / MINUTE
  / SECOND
  / FRACTION (O_PARENTHESIS scale C_PARENTHESIS)?
  
scale
 = integer_exp (COMMA integer_exp)?

member
  = LIKE tableQualifier columnQualifier
  / identifierList

identifierList
  = l:identifier_list+ i:identifier+  { return l.concat(i) }
  / l:identifier_list+                { return l }
  / i:identifier                      { return [ i ] }

identifier_list
  = SPACE? i:identifier SPACE? COMMA SPACE?    { return i } 

identifier
  = SPACE? i:ID SPACE simpleDataType SPACE?    { return i }

tableQualifier
  = s:((ID (AT ID)? COLON)? o:(ID DOT / D_QUOTE ID DOT D_QUOTE / S_QUOTE ID DOT S_QUOTE))?

columnQualifier
  = ID DOT (ID / ASTERISK)
 
ID
  = id:$([a-zA-Z_]([a-zA-Z0-9_]*)) { return addId(id) }

DEFINE
  = k:'define'i { return addKeyword(k) }

CALL
  = k:'call'i { return addKeyword(k) }

DISPLAY
  = k:'display'i { return addKeyword(k) }

END
  = k:'end'i { return addKeyword(k) }

FUNCTION 
  = k:'function'i { return addKeyword(k) }

GLOBALS
  = k:'globals'i { return addKeyword(k) }

LET
  = k:'let'i { return addKeyword(k) }

MAIN
  = k:'main'i { return addKeyword(k) }

STRING
  = k:'string'i { return addKeyword(k) }

RETURNING
  = k:'returning'i { return addKeyword(k) }

OPERATOR
  = o:[~!@%^&*-+|/{}\:;<>?#_] { addOperator(o) } 

EQUAL
  = o:'='  { addOperator(o) }

O_PARENTHESIS
  = o:'('  { addOperator(o) }

C_PARENTHESIS
  = o:')'  { addOperator(o) }

O_BRACKET
  = o:'['  { addOperator(o) }

C_BRACKET
  = o:']'  { addOperator(o) }

AT
  = o:'@'  { addOperator(o) }

DOT
  = o:'.'  { addOperator(o) }

COLON
  = o:':'  { addOperator(o) }

COMMA
  = o:','  { addOperator(o) }

ASTERISK
  = o:'*'  { addOperator(o) }

ARRAY
  = k:'array'i { return addKeyword(k) }  

BIGINT 
  = k:'bigint'i { return addKeyword(k) }  

BYTE 
  = k:'byte'i { return addKeyword(k) }  

CHAR 
  = k:'CHAR'i { return addKeyword(k) }  

CHARACTER 
  = k:'character'i { return addKeyword(k) }  

DATE 
  = k:'date'i { return addKeyword(k) }  

DATETIME 
  = k:'datetime'i { return addKeyword(k) }  

DEC 
  = k:'dec'i { return addKeyword(k) }  

DECIMAL 
  = k:'decimal'i { return addKeyword(k) }  

DOUBLE_PRECISION 
  = k:$('double'i SPACE 'precision'i) { return addKeyword(k) }  

DYNAMIC_ARRAY  
  = k:$('dynamic'i SPACE 'array'i) { return addKeyword(k) }  

FLOAT 
  = k:'float'i { return addKeyword(k) }  

INT 
  = k:'int'i { return addKeyword(k) }  

INTEGER 
  = k:'integer'i { return addKeyword(k) }  

INTERVAL 
  = k:'interval'i { return addKeyword(k) }  

LIKE 
  = k:'like'i { return addKeyword(k) }  

MONEY 
  = k:'money'i { return addKeyword(k) }  

NCHAR 
  = k:'nchar'i { return addKeyword(k) }  

NUMERIC 
  = k:'numeric'i { return addKeyword(k) }  

NVARCHAR
  = k:'nvarchar'i { return addKeyword(k) }  

OF
  = k:'of'i { return addKeyword(k) }  

REAL
  = k:'real'i { return addKeyword(k) }  

RECORD
  = k:'record'i { return addKeyword(k) }  

SMALLFLOAT
  = k:'smallfloat'i { return addKeyword(k) }  

SMALLINT
  = k:'smallint'i { return addKeyword(k) }  

TEXT
  = k:'text'i { return addKeyword(k) }  

TO
  = k:'to'i { return addKeyword(k) }  

VARCHAR
  = k:'varchar'i { return addKeyword(k) }  

YEAR 
  = k:'year'i { return addKeyword(k) }  

MONTH
  = k:'month'i { return addKeyword(k) }  

DAY
  = k:'day'i { return addKeyword(k) }  

HOUR
  = k:'hour'i { return addKeyword(k) }  

MINUTE
  = k:'minute'i { return addKeyword(k) }  

SECOND
  = k:'second'i { return addKeyword(k) }  

FRACTION 
  = k:'fraction'i { return addKeyword(k) }  

// words
//   = (word (SPACE / NL))+

// word
//   = w:([a-zA-Z0-9_]+)  {
//     const word = w.join("");
//     const _type = keywordList.indexOf(word.toUpperCase()) === -1?TokenType.word:TokenType.keyword;

//   return node(_type, word);
// }

integer_exp
  = t:integer_text                   { return addNumber(ConstType.integer, parseInt(text, 10)) }

integer_text
  = '+'? d:$(DIGIT+) !'.'
  / '-'  d:$(DIGIT+) !'.'

string_exp
  = s:(double_quoted_string
  / single_quoted_string)    { return addString(s) }

double_quoted_string
  = $(D_QUOTE double_quoted_char* D_QUOTE)

single_quoted_string
  = $(S_QUOTE single_quoted_char* S_QUOTE)

double_quoted_char
  = ESCAPED / (!D_QUOTE c:. { return c })

single_quoted_char
  = ESCAPED / (!S_QUOTE c:. { return c })

D_QUOTE
  = '"'

S_QUOTE
  = "'"

ESCAPED
  = '\\"'                { return '"'  }
  / "\\'"                { return "'"  }
  / '\\\\'               { return '\\' }
  / '\\b'                { return '\b' }
  / '\\t'                { return '\t' }
  / '\\n'                { return '\n' }
  / '\\f'                { return '\f' }
  / '\\r'                { return '\r' }

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
