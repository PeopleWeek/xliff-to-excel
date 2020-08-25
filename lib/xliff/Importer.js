const fs = require("fs");
const convert = require("xml-js");
const helpers = require('../helpers');
const Catalgue = require('./Catalogue');
const Domain = require("./Domain");
const Locale = require('./Locale');

class Importer {

    import(directory, domains, locales){
        const catalogue = new Catalgue(locales);

        domains.forEach(domain => {
            const domainLocales = [];
            locales.forEach(locale => {
                const filePath = helpers.filePath(directory, domain, locale);

                const contents = fs.readFileSync(filePath, 'utf8');
                const data = convert.xml2js(contents, { compact: true});
                domainLocales.push(new Locale(data));
            })
            catalogue.addDomain(new Domain(domain, domainLocales));
        });

        return catalogue;
    }
}

module.exports = Importer;