const parser_4gl = require("./4gl.js");
function parser(text, options) {
    try {
        return parser_4gl.parse(text, options);
    }
    catch (error) {
        if (error.location) {
            console.error(`Sintax error: [${error.location.start.line}:${error.location.start.column}] ${error.message}`);
        }
        else {
            console.log(error);
        }
        throw error;
    }
    return [];
}
module.exports = parser;
//# sourceMappingURL=parsers.js.map