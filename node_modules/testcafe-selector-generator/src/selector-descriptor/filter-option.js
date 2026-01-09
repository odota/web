export class FilterOption {
    constructor (type, value) {
        this.type   = type;
        this.filter = value;
    }

    concat (option) {
        if (option.type === this.type)
            return new FilterOption(this.type, this.filter.concat(' ', option.filter));
        return null;
    }
}
