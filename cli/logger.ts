import { IAppInfo } from "./interfaces";

import chalk = require("chalk");

type Color = (...text: string[]) => string;

let _bundleProgressBar: any;
let _oraSpinner: any;
let _printNewLineBeforeNextLog = false;

let options = {
  verbose: false,
  showBanner: true,
  nonInteractive: false,
  banner: false,
  appInfo: {} as IAppInfo
};


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
  logger.showBanner();

  _maybePrintNewLine();
  console.log(...args);
}

function consoleWarn(...args: any[]) {
  logger.showBanner();

  _maybePrintNewLine();
  console.log(...args);
}

function consoleError(...args: any[]) {
  logger.showBanner();

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

let oldColor: Color;

function getPrefix(chalkColor: Color) {
  if (chalkColor !== oldColor) {
    oldColor = chalkColor;
    return chalkColor(`[${new Date().toTimeString().slice(0, 8)}]`); 
  } else {
    return chalkColor(' '.repeat(10)); 
  }
}

function withPrefix(args: any[], chalkColor = logger.chalk.gray) {
  return [getPrefix(chalkColor), ...args.map((arg) => chalkColor(arg))];
}

function logger(...args: any[]) {
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
  respectProgressBars(() => {
    consoleError(...withPrefix(args, logger.chalk.red));
  });
};

logger.warn = function warn(...args: any[]) {

  respectProgressBars(() => {
    consoleWarn(...withPrefix(args, logger.chalk.yellow));
  });
};

logger.gray = (...args: any[]) => {

  respectProgressBars(() => {
    consoleLog(...withPrefix(args));
  });
};

logger.verbose = (text: string | string[], args?: any) => {
  if (!options.verbose) {
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

logger.setConfig = (config: {}) => {
  options = { ...options, ...config};
}

function appText(): string[] {
  const appInfo: IAppInfo = options.appInfo;
  const b = logger.chalk.bold;

  return [
    `${b("TDS")} - ${b(appInfo.name)} - ${appInfo.description}`,
    `Version: [${appInfo.version}] ${appInfo.url}`,
  ];
}

function banner(): string[] {
  const appInfo: IAppInfo = options.appInfo;

  const b = logger.chalk.bold;
  /* prettier-ignore-start */
  return [
    "---------------------------v---------------------------------------------------",
    "   //////  ////    //////  |  " + b(`TOTVS Developer Studio: ${appInfo.name}`),
    "    //    //  //  //       |  Version " + appInfo.version,
    "   //    //  //  //////    |  TOTVS Technology",
    "  //    //  //      //     |  " + appInfo.description,
    " //    ////    //////      |  " + appInfo.url,
    " --------------------------^---------------------------------------------------",
  ];
  /* prettier-ignore-end */
}

logger.showBanner = () => {
  if (options.banner) {
    return;
  }
  
  options.banner = true;

  if (!options.showBanner) {
    appText().forEach((line: string) => logger.gray(line));
  } else {
    banner().forEach((line: string) => logger.gray(line));
  }
};

export default logger;
