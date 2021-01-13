import { IAppConfig, IAppOptions, ILogger } from "./interfaces";
import { AppCommand } from "./appCommand";
import logger from "./logger";

export class AppCommander {
	_command: AppCommand;
	
	constructor(options: IAppOptions) {
		this._command = newAppCommand({
			...options,
			appInfo: options.appInfo,
		});
		
    this._command
      .on("option:verbose", () => {
        logger.setConfig({ verbose: this._command.verbose });
      })
      .on("option:no-banner", () => {
        logger.setConfig({ showBanner: false });
      })
      .on("command:*", (operands) => {
		this._command.outputHelp();  
		
		logger.error("Comando desconhecido %s", operands[0]);

        process.exitCode = 1;
      });
  }

  collect(value: string, previous: string[]) {
    return previous.concat([value]);
  }

  commaSeparatedList(value: string, separator: string = ","): string[] {
    return value.split(separator);
  }

  appCommand() {
    return this._command;
  }
}

function newAppCommand(options: IAppOptions): AppCommand {

  const program: AppCommand = new AppCommand(options.appInfo.getShortName())
    .version(`Version ${options.appInfo.version}`, "-v, --version")
    .helpOption("-h, --help", "apresenta ajuda sobre o comando")
    .option(
      "--verbose",
      "detalhamento da execução",
      false
    ) //
    .option("--no-banner", "omite a abertura", true);

  return program;
}
