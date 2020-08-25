const TransUnit = require('./TransUnit');

class Locale {

    constructor(data){
        this.data = data;
    }

    getData(){
        return this.data;
    }

    getSourceLanguage(){
        return this.data.xliff.file._attributes['source-language'];
    }

    getTargetLanguage(){
        return this.data.xliff.file._attributes['target-language'];
    }

    getUnits(){
        return this.data.xliff.file.body['trans-unit'].map((data, index) => new TransUnit(index, data));
    }

    getUnitById(id){
        return this.getUnits().find(unit => unit.getId() === id);
    }

    getUnitByResname(resname){
        return this.getUnits().find(unit => unit.getResname() === resname);
    }

    setUnit(transUnit){
        this.data.xliff.file.body['trans-unit'][transUnit.getIndex()] = transUnit.getData();
    }
}

module.exports = Locale;
