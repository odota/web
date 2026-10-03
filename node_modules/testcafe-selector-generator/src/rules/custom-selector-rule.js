import { SelectorRule } from './selector-rule';

export class CustomSelectorRule extends SelectorRule {
    constructor (type) {
        super(type.toLowerCase(), true);
    }
}
