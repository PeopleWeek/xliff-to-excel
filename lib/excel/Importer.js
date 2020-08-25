const XLSX = require("xlsx");
const helpers = require('../helpers');

class Importer {
    import(inputPath, domains, locales) {
        const workbook = XLSX.readFile(inputPath);        
        const sheet = XLSX.utils.shee
        const data = {};
        locales.forEach((locale) => {
            const sheet = workbook.Sheets[locale];
            const localeData = XLSX.utils.sheet_to_json(sheet, {raw: true})
            data[locale] = localeData;
        });

        return data;
    }
}

module.exports = Importer;