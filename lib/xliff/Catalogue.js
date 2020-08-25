class Catalogue {
    constructor(locales){
        this.locales = locales;
        this.domains = {};
    }

    addDomain(domain){
        this.domains[domain.getDomain()] = domain;
    }

    getDomains(){
        return this.domains;
    }

    getDomain(domain){
        return this.domains[domain];
    }

    getUnitById(domain, locale, id){
        return this.getDomain(domain).getUnitById(locale, id);
    }

    getUnitByResname(domain, locale, resname){
        return this.getDomain(domain).getUnitByResname(locale, resname);
    }

    setUnit(domain, locale, unit){
        this.getDomain(domain).setUnit(locale, unit);
    }
}

module.exports = Catalogue;