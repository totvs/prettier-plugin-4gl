import * as Command from "commander";
import * as packageJSON from "../package.json";
import logger, { IAppInfo } from "./logger";

const program = new Command.Command(packageJSON.name)
  .version(packageJSON.version)
  .arguments("[command] [options]")
  .usage("[command] [options]")
  .option("-o, --overwrite", "sobrescreve se o destino existir", false)
  .option("-v, --verbose", "detalha a execução", true)
  .option("--no-banner", "omite a abertura", true)
  .allowUnknownOption(true);

program.parse(process.argv);

function main() {
  logger.config.verboseEnable = program.verbose;
  logger.config.showSplash = program.banner;

  try {
    if (program.banner) {
      logger.showBanner({
        name: packageJSON.displayName,
        description: packageJSON.description,
        version: packageJSON.version,
        url: packageJSON.repository.url,
      });
    }

    logger.verbose("Linha de comando", process.argv);
    logger.verbose(`Opções de execução`, program.opts());
  } catch (error) {
    console.log(error);
    return -1;
  }

  return 0;
}

process.exit(main());

// var filename = process.argv[2];

// if (!filename) {
//   console.error("no filename specified");
//   exit(1);
// }

// console.error("processing " + filename);
// var file = fs.readFileSync(filename, "utf8");

// let rangeStart = 0;
// let rangeEnd = Infinity;
// let cursorOffset = 0;

// const source = read(filepath);

// const mergedOptions = Object.assign(mergeDefaultOptions(options || {}), {
//   filepath,
//   rangeStart,
//   rangeEnd,
//   cursorOffset,
// });

// const output = prettyprint(input, {
//   ...mergedOptions,
//   astFormat: "4gl-source",
// });

// console.log(output);

// function prettyprint(src, options) {
//   let result = prettier.format(src, options);

//   return result.formatted || result;
// }

// function mergeDefaultOptions(parserConfig) {
//   return Object.assign(
//     {
//       plugins: [path.dirname(__dirname)],
//       printWidth: 80,
//     },
//     parserConfig
//   );
// }
