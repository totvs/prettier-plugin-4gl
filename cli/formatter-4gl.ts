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
  .option("--token", "saida em somente de tokens básicos", false)
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
