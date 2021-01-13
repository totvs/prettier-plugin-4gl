export interface IAppInfo {
	name: string;
	version: string;
	description: string;
	url: string;
	displayName: string;
	getShortName: () => string;
}

export interface ILoggerConfig {
	appInfo?: IAppInfo;
	verbose?: string;
	showBanner?: boolean;
	logToFile?: boolean;
	logFormat?: string;
}

export type LogLevel =
	| 'error'
	| 'warn'
	| 'help'
	| 'data'
	| 'info'
	| 'debug'
	| 'prompt'
	| 'verbose'
	| 'input';

export interface ILogger {
	error: (...args: any) => void;
	warn: (...args: any) => void;
	help: (...args: any) => void;
	data: (...args: any) => void;
	info: (...args: any) => void;
	debug: (...args: any) => void;
	prompt: (question: string, anwser: any) => void;
	verbose: (...args: any) => void;
	input: (...args: any) => void;
	nested: (level: LogLevel, message: string, ...args: any) => void;
	profile: (id: string) => void;
	getConfig: () => ILoggerConfig;
	setConfig: (newConfig: ILoggerConfig) => void;
}

// opts(): { [key: string]: any };
export interface IAppConfig {
	keys: () => string[];
	get: (key: string, defaultValue?: string) => string;
	set: (key: string, value: string) => void;
	delete: (key: string) => void;
}

export interface IAppOptions {
	appInfo: IAppInfo;
}

