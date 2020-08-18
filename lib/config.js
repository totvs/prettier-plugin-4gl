"use strict";
const CATEGORY_4GL = "4GL";
module.exports = {
    options: {
        keywordsCase: {
            since: "0.0.0",
            category: CATEGORY_4GL,
            type: "choice",
            choices: [
                { value: "upper" },
                { value: "lower" },
                { value: "none" }
            ],
            default: "upper",
            description: "Put keywords to upper or lowser case. (4GL)",
        },
    },
};
//# sourceMappingURL=config.js.map