import * as Command from 'commander';
import * as path from 'path';
import * as os from 'os';
import { IAppConfig, ILogger } from './interfaces';
import logger from './logger';

const homedir: string = path.join(os.homedir(), '.act-nodejs');

export class AppCommand extends Command.Command {
	private _logger?: ILogger;

	constructor(name: string) {
		super(name);
	}

	outputHelp(cb?: (str: string) => string): void {
		if (logger) {
			logger.gray(this.helpInformation());
			this.emit(this._helpLongFlag);
		} else {
			super.outputHelp(cb);
		}
	}

	createCommand(name: string): AppCommand {
		return new AppCommand(name);
	}

	parse(argv?: string[], options?: Command.ParseOptions): this {
		const result: this = super.parse(argv, options);

		logger.verbose("Command line", argv);
		logger.verbose('Options', result.opts());

		return result;
	}
}
