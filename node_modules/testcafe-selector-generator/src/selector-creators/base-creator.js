/* eslint-disable no-empty-function, class-methods-use-this */
export class BaseCreator {
    constructor (type) {
        this.type = type;

        this.element = null;
    }

    _init () {
    }

    _shouldCreate () {
        throw new Error('Not implemented');
    }

    _getDescriptor (/*ancestorSelectorDescriptor*/) {
        throw new Error('Not implemented');
    }

    create (el, ancestorSelectorDescriptor) {
        this.element = el;

        this._init();

        if (this._shouldCreate(ancestorSelectorDescriptor))
            return this._getDescriptor(ancestorSelectorDescriptor);

        return null;
    }
}
