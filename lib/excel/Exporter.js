const XLSX = require("xlsx");

class ExcelExporter {
    getHeader(locales) {
        return ["domain", "resname", "state", "source", "target"];
    }

    toArray(locale, domains, catalogue, states) {
        const result = [this.getHeader()];

        domains.forEach((domain) => {
            catalogue
                .getDomain(domain)
                .getLocale(locale)
                .getUnits()
                .forEach((unit) => {
                    if (states && !states.includes(unit.getState())) {
                        return;
                    }

                    result.push([
                        domain,
                        unit.getResname(),
                        unit.getState(),
                        unit.getSource(),
                        unit.getTarget(),
                    ]);
                });
        });

        return result;
    }

    toSheet(locale, domains, catalogue, states) {
        const aoa = this.toArray(locale, domains, catalogue, states);
        const objectMaxLength = [];

        aoa.map((arr) => {
            Object.keys(arr).map((key) => {
                let value = arr[key] === undefined || arr[key] === null ? "" : arr[key];

                if (typeof value === "number") {
                    return (objectMaxLength[key] = 10);
                }

                objectMaxLength[key] =
                    objectMaxLength[key] >= value.length
                        ? objectMaxLength[key]
                        : value.length;
            });
        });

        const worksheetCols = objectMaxLength.map((width) => {
            return {
                width,
            };
        });

        const worksheet = XLSX.utils.aoa_to_sheet(aoa);
        worksheet["!cols"] = worksheetCols;

        return worksheet;
    }

    export(domains, locales, catalogue, states, filePath) {
        const workbook = XLSX.utils.book_new();
        locales.forEach((locale) => {
            XLSX.utils.book_append_sheet(
                workbook,
                this.toSheet(locale, domains, catalogue, states),
                locale
            );
        });
        XLSX.writeFile(workbook, filePath);
    }
}

module.exports = ExcelExporter;
