#!/usr/bin/env node

import * as packageJSON from "../package.json";
import logger from "./logger";
import prettier = require("prettier");
import * as fs from "fs";
import * as path from "path";
import * as glob from "glob";
import * as cliProgress from "cli-progress";

import { AppCommander } from "./appCommander";
import { AppCommand } from "./appCommand";
import { IAppInfo } from "./interfaces";

const DEFAULT_FILES: string[] = [".4gl", ".per"];
const PROGRESS_WIDTH: number = 40;

const appInfo: IAppInfo = {
  name: packageJSON.name,
  description: packageJSON.description,
  version: packageJSON.version,
  displayName: packageJSON.displayName,
  getShortName: () => packageJSON.name,
  url: packageJSON.repository.url,
};

logger.setConfig({ appInfo: appInfo });

const program = new AppCommander({ appInfo: appInfo });
const appCommand: AppCommand = program._command;
let runAction: () => void;

appCommand
  .arguments("<command> [options]")
  .usage("<command> [options]")
  .passCommandToAction(false)
  .allowUnknownOption(true);

const formatCommand: AppCommand = appCommand.command("format"); // , { isDefault: true });
formatCommand
  .allowUnknownOption(true)
  .arguments("[filePattern...]")
  .description("Formata arquivos fontes 4GL", {
    filePattern: "padrão de seleção de arquivo (padrão: [*.4GL, *.PER])",
  })
  .action((filePattern: string[], recursive: boolean) => {
    runAction = () => {
      let files: string[] = [];

      if (filePattern.length === 0) {
        filePattern = ["./**"];
      }

      logger.verbose("running FORMAT");
      logger.verbose("filePattern", filePattern);


      filePattern.forEach((pattern: string) => {
        const auxFiles: string[] = glob.sync(pattern);
        logger.verbose(`Files found ${auxFiles.length} using pattern ${pattern}`);

        DEFAULT_FILES.forEach((file: string) => {
          files.push(
            ...auxFiles.filter((auxFile: string) =>
              auxFile.toLowerCase().endsWith(file)
            )
          );
        });
      });

      logger.verbose("Selected Files " + files.length);
      logger.warn("Formatting...");

      var bar = new cliProgress.SingleBar(
        {
          format:
            "           [{bar}] {value}/{total} file(s) {percentage}% {file}",
        },
        cliProgress.Presets.shades_classic
      );

      bar.start(files.length, 0, { file: ""});

      const options: any = formatCommand.opts();
      files.forEach((value: string) => {
        bar.increment();
        bar.update({ file: value.length>30?"..."+value.substr(-25):value});
        const content: string = fs.readFileSync(value).toString();
        const result: string = format4GL("4GL", content, options);
      });
      bar.stop();
      logger.warn("Formatted files.");
    };
  });

appCommand.parse(process.argv);

function main(): number {
  let exitCode: number = 0;

  try {
    //
    runAction();
    //
  } catch (error) {
    logger.error(error);
    exitCode = 1;
  }

  return exitCode;
}

process.exit(main());

function format4GL(
  languageId: string,
  content: string,
  options: prettier.Options
): string {
  let result: string;

  if (options.rangeStart) {
    result = content.substring(options.rangeStart, options.rangeEnd);
    options = {
      ...options,
      parser: "4gl-token",
      requirePragma: false,
      insertPragma: false,
      rangeEnd: options.rangeEnd + 1,
    };
  } else {
    result = content;
    options = {
      ...options,
      parser: "4gl-token",
    };
  }

  result = callPrettier(languageId, result, options);

  return result as string;
}

function callPrettier(
  languageId: string,
  content: string,
  options?: prettier.Options
): any {
  let result: any = prettier.format(
    content.concat("\n"), //fim de linha é obrigatório
    {
      ...options,
      plugins: [path.resolve("./lib")],
    }
  );
  result = result.formatted || result;

  return result ? result.substring(0, result.length - 1) : "";
}
