export const languages: {
    extensions: string[];
    name: string;
    parsers: string[];
    vscodeLanguageIds: string[];
}[];
export const parsers: {
    "4gl-parser": {
        parse: (text: any, options: any) => any[];
        astFormat: string;
        locStart: typeof locStart;
        locEnd: typeof locEnd;
    };
};
export const printers: {
    "4gl-ast": {
        print: (path: any, options: any, print: any, args: any) => string;
    };
    "4gl-source": {
        print: (path: any, options: any, print: any, args: any) => any;
    };
};
export const options: {
    keywordsCase: {
        since: string;
        category: string;
        type: string;
        choices: {
            value: string;
        }[];
        default: string;
        description: string;
    };
};
declare function locStart(ast: any): number;
declare function locEnd(ast: any): void;
export declare const name: string;
export {};
//# sourceMappingURL=index.d.ts.map