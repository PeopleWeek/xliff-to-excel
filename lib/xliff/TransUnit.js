const helpers = require("../helpers");
const { needsCDATA } = require("../helpers");

class TransUnit {
    constructor(index, data) {
        this.index = index;
        this.data = data;
    }

    getIndex() {
        return this.index;
    }

    getData() {
        return this.data;
    }

    getId() {
        return this.data._attributes.id;
    }

    getResname() {
        return this.data._attributes.resname;
    }

    getState() {
        return this.data.target._attributes
            ? this.data.target._attributes.state
            : null;
    }

    setState(state) {
        const attributes = this.data.target._attributes
            ? this.data.target._attributes
            : {};
        attributes.state = state;
        if (!state) {
            delete attributes.state;
        }
        this.data.target._attributes = attributes;
    }

    getSource() {
        if (this.data.source._cdata) {
            return this.data.source._cdata;
        }

        return this.data.source._text;
    }

    getTarget() {
        if (this.data.target._cdata) {
            return this.data.target._cdata;
        }

        return this.data.target._text;
    }

    setTarget(text) {
        if (this.data.target._cdata) {
            delete this.data.target._cdata;
        }

        if (this.data.target._text) {
            delete this.data.target._text;
        }

        const sanitizedText = text ? text : "";

        if (needsCDATA(sanitizedText)) {
            this.data.target._cdata = text;
        } else {
            this.data.target._text = sanitizedText;
        }
    }
}

module.exports = TransUnit;
