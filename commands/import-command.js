const fs = require("fs");
const helpers = require("../lib/helpers");
const XliffImporter = require("../lib/xliff/Importer");
const XliffExporter = require("../lib/xliff/Exporter");
const ExcelImporter = require("../lib/excel/Importer");

module.exports = ({ dir, input}) => {

    if(!helpers.isDirectory(dir)){
        console.error('Invalid directory "' + dir +'"');
        process.exit(1);
    }

    const {domains, locales} =  helpers.detectDomainsAndLocales(dir);

    const xliffImporter = new XliffImporter();
    const excelImporter = new ExcelImporter();

    const catalogue = xliffImporter.import(dir, domains, locales);
    const data = excelImporter.import(input, domains, locales);
    locales.forEach(locale => {
        data[locale].forEach(unitData => {
            const {domain, resname, target, state} = unitData;
            const unit = catalogue.getUnitByResname(domain, locale, resname);
            if(!unit){
                return;
            }

            unit.setState(state);
            unit.setTarget(target);
            catalogue.setUnit(domain, locale, unit);
        });
    });

    const exporter = new XliffExporter();
    exporter.export(domains, locales, catalogue, dir);
};
