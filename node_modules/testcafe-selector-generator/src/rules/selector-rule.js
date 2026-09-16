export class SelectorRule {
    constructor (type, editable = false) {
        this.type     = type;
        this.editable = editable;

        this.disabled = void 0;
    }
}
