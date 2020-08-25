const fs = require("fs");
const helpers = require("../lib/helpers");
const XliffImporter = require("../lib/xliff/Importer");
const ExcelExporter = require("../lib/excel/Exporter");

module.exports = ({ dir, output }) => {

    if(!helpers.isDirectory(dir)){
        console.error('Invalid directory "' + dir +'"');
        process.exit(1);
    }

    const {domains, locales} =  helpers.detectDomainsAndLocales(dir);

    const importer = new XliffImporter();

    const catalogue = importer.import(dir, domains, locales);

    const exporter = new ExcelExporter();
    exporter.export(domains, locales, catalogue, output);
};
