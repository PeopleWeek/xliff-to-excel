#!/usr/bin/env node
const exportCommand = require("./commands/export-command");
const importCommand = require("./commands/import-command");

const argv = require("yargs")
    .command(
        "export [dir] [ouput]",
        "export to an excel file",
        (yargs) => {
            yargs
                .positional("dir", {
                    describe: "the translations directory",
                    type: "string",
                    default: "app/Resources/translations",
                })
                .positional("output", {
                    describe: "the output .xlsx filepath",
                    type: "string",
                    default: "translations.xlsx",
                });
        },
        exportCommand
    )
    .command(
        "import [dir] [input]",
        "import from an excel file",
        (yargs) => {
            yargs
                .positional("dir", {
                    describe: "the translations directory",
                    type: "string",
                    default: "app/Resources/translations",
                })
                .positional("input", {
                    describe: "the input .xlsx filepath",
                    type: "string",
                    default: "translations.xlsx",
                });
        },
        importCommand
    )
    .demandCommand()
    .help()
    .wrap(72).argv;
