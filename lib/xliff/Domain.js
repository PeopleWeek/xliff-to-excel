class Domain{
    constructor(domain, locales){
        this.domain = domain;
        this.locales = {};

        locales.forEach(locale => {this.locales[locale.getTargetLanguage()] = locale});
    }

    getLocale(locale){
        return this.locales[locale];
    }

    getDomain(){
        return this.domain;
    }

    getUnitById(locale, id){
        return this.getLocale(locale).getUnitById(id);
    }

    getUnitByResname(locale, resname){
        return this.getLocale(locale).getUnitByResname(resname);
    }

    setUnit(locale, unit){
        this.getLocale(locale).setUnit(unit);
    }
}

module.exports = Domain;