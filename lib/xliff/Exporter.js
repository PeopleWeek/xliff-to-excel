const fs = require("fs");
const newline = require("newline");
const convert = require("xml-js");
const helpers = require("../helpers");

class Exporter {
    export(domains, locales, catalog, directory) {
        const encodeHTML = function (attributeValue) {
            return attributeValue
                .replace(/&quot;/g, '"') // convert quote back before converting amp
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;");
        };

        // Avoid git diffs
        const sanitizeNewLines = function(text) {
            return newline.set(text, "LF");
        }

        domains.forEach((domain) => {
            locales.forEach((locale) => {
                const filePath = helpers.filePath(directory, domain, locale);
                const data = catalog
                    .getDomain(domain)
                    .getLocale(locale)
                    .getData();

                // Add new line to avoid git diffs
                const contents = convert.js2xml(data, {
                    compact: true,
                    spaces: 2,
                    attributeValueFn: encodeHTML,
                    textFn: sanitizeNewLines
                }) + '\n';
                fs.writeFileSync(filePath, contents, "utf8");
            });
        });
    }
}

module.exports = Exporter;
