const fs = require("fs");
const util = require("util");

const filePath = (directory, domain, locale) => {
    return directory + "/" + domain + "." + locale + ".xliff";
};

const log = (obj) => {
    console.log(util.inspect(obj, false, null, true /* enable colors */));
};

const needsCDATA = (text) => {
    return /[<>&]/.test(text);
};

const isDirectory = (path) => {
    return fs.existsSync(path) && fs.lstatSync(path).isDirectory();
};

const isFile = (path) => {
    return fs.existsSync(path) && fs.lstatSync(path).isFile();
};

const detectDomainsAndLocales = (dir) => {
    const pattern = /^(?<domain>[a-zA-Z]*)\.(?<locale>[a-zA-z][a-zA-Z])\.xliff$/;
    const domains = [];
    const locales = [];

    const files = fs.readdirSync(dir).filter((fileOrDirectory) => {
        return isFile(dir + "/" + fileOrDirectory);
    });

    files.forEach(file => {
        if(!pattern.test(file)){
            return;
        }

        const {domain, locale} = file.match(pattern).groups;

        if(!domains.includes(domain)){
            domains.push(domain);
        }

        if(!locales.includes(locale)){
            locales.push(locale);
        }
    });

    return {domains, locales};
};

module.exports = {
    isDirectory,
    isFile,
    filePath,
    log,
    needsCDATA,
    detectDomainsAndLocales,
};
