import { CommandOptions } from "./types/generator"
import { Arguments, CommandBuilder } from 'yargs';

export const command: string = 'generate-feature <name>';
export const desc: string = 'THIS DESCRIPTION IS USED IN HELP';

export const builder: CommandBuilder<CommandOptions, CommandOptions> = (yargs) =>
  yargs
    .positional('name', { type: 'string', demandOption: true })
    .options({
      template: { type: "string" },
    });

export const handler = (argv: Arguments<CommandOptions>): void => {
  const { name, template } = argv;
  console.log(`Hello World! ${name}`);
  console.log(`Recieved! ${template}`);
  process.stdout.write(`Hello World! ${name}`);
  process.stdout.write(`Recieved! ${template}`);
  process.exit(0);
};