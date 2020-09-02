const chalk = require("chalk");
const program = require("commander");
const chalkRaw = new chalk.Instance({ raw: ["bold", {}], level: 0 });

type Color = (...text: string[]) => string;

let _bundleProgressBar: any;
let _oraSpinner: any;

let _printNewLineBeforeNextLog = false;

// const output = fs.createWriteStream('./stdout.log');
// const errorOutput = fs.createWriteStream('./stderr.log');
// // Custom simple logger
// const logger = new Console({ stdout: output, stderr: errorOutput });
// // use it like console
// const count = 5;
// logger.log('count: %d', count);
// // In stdout.log: count 5

function _maybePrintNewLine() {
  if (_printNewLineBeforeNextLog) {
    _printNewLineBeforeNextLog = false;
    console.log("");
  }
}

function consoleLog(...args: any[]) {
  _maybePrintNewLine();
  console.log(...args);
}

function consoleWarn(...args: any[]) {
  _maybePrintNewLine();
  console.log(...args);
}

function consoleError(...args: any[]) {
  _maybePrintNewLine();
  console.log(...args);
}

function respectProgressBars(commitLogs: () => void) {
  if (_bundleProgressBar) {
    _bundleProgressBar.terminate();
    _bundleProgressBar.lastDraw = "";
  }
  if (_oraSpinner) {
    _oraSpinner.stop();
  }
  commitLogs();

  if (_bundleProgressBar) {
    _bundleProgressBar.render();
  }
  if (_oraSpinner) {
    _oraSpinner.start();
  }
}

function getPrefix(chalkColor: Color) {
  return chalkColor(`[${new Date().toTimeString().slice(0, 8)}]`);
}

function withPrefixAndTextColor(
  args: any[],
  chalkColor: Color = logger.chalk.gray
) {
  if (program.nonInteractive) {
    return [getPrefix(chalkColor), ...args.map((arg) => arg)];
  } else {
    return args.map((arg) => arg);
  }
}

function withPrefix(args: any[], chalkColor = logger.chalk.gray) {
  if (program.nonInteractive) {
    return [getPrefix(chalkColor), ...args];
  } else {
    return args;
  }
}

function adjustRaw() {
  logger.chalk = logger.config.raw ? chalkRaw : chalk;
}

function logger(...args: any[]) {
  adjustRaw();

  respectProgressBars(() => {
    consoleLog(...withPrefix(args));
  });
}

logger.nested = (message: any) => {
  respectProgressBars(() => {
    consoleLog(message);
  });
};

logger.newLine = function newLine() {
  respectProgressBars(() => {
    consoleLog("");
  });
};

logger.printNewLineBeforeNextLog = function printNewLineBeforeNextLog() {
  _printNewLineBeforeNextLog = true;
};

logger.error = function error(...args: any[]) {
  adjustRaw();

  respectProgressBars(() => {
    consoleError(...withPrefixAndTextColor(args, logger.chalk.red));
  });
};

logger.warn = function warn(...args: any[]) {
  adjustRaw();

  respectProgressBars(() => {
    consoleWarn(...withPrefixAndTextColor(args, logger.chalk.yellow));
  });
};

logger.gray = (...args: any[]) => {
  adjustRaw();

  respectProgressBars(() => {
    consoleLog(...withPrefixAndTextColor(args));
  });
};

logger.verbose = (text: string | string[], args?: any) => {
  if (!logger.config.verboseEnable) {
    return;
  }

  if (args) {
    logger.warn(text);
    Object.keys(args).forEach((key) => {
      logger.nested(`  ${key} ${logger.chalk.bold(args[key])}`);
    });
  } else {
    logger.gray(text);
  }
};

logger.chalk = chalk;

logger.config = {
  raw: false,
  verboseEnable: false,
  showSplash: false,
};

export interface IAppInfo {
  name: string;
  version: string;
  description: string;
  url: string;
}

function appText(appInfo: IAppInfo): string[] {
  return [
    `${logger.chalk.bold("TDS")} - ${appInfo.name}`,
    `Version: [${appInfo.version}]`,
    `${appInfo.description}`,
    `See ${appInfo.url}`,
  ];
}

function banner(appInfo: IAppInfo): string[] {
  const b = logger.chalk.bold;
  /* prettier-ignore-start */
  return [
    "---------------------------v---------------------------------------------------",
    "   //////  ////    //////  |  TOTVS Developer Studio: " + appInfo.name,
    "    //    //  //  //       |  Version " + appInfo.version,
    "   //    //  //  //////    |  TOTVS Technology",
    "  //    //  //      //     |  " + appInfo.description,
    " //    ////    //////      |  " + appInfo.url,
    " --------------------------^---------------------------------------------------",
  ];
  /* prettier-ignore-end */
}

logger.showBanner = (appInfo: IAppInfo) => {
  adjustRaw();

  const description = appInfo.description;

  if (!logger.config.showSplash) {
    appText(appInfo).forEach((line: string) => logger.gray(line));
  } else {
    banner(appInfo).forEach((line: string) => logger.gray(line));
  }
};

export default logger;
