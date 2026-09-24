import TESTCAFE_CORE from '../deps/testcafe-core';
import { BaseCreator } from './base-creator';
import { RULE_TYPE } from '../rules/rule-type';
import { SelectorDescriptor } from '../selector-descriptor';

const { domUtils } = TESTCAFE_CORE;

const TOP_LEVEL_TAGS_RE = /html|body/;
const UNIQUE_TAGS_RE    = /header|footer|main/;

export class TagNameSelectorCreator extends BaseCreator {
    constructor (useTopLevelTags = true) {
        super(RULE_TYPE.byTagName);

        this.tagName            = '';
        this.useTopLevelParents = useTopLevelTags;
    }

    _init () {
        this.tagName = domUtils.getTagName(this.element);
    }

    _shouldCreate () {
        return this.useTopLevelParents && TOP_LEVEL_TAGS_RE.test(this.tagName) || UNIQUE_TAGS_RE.test(this.tagName);
    }

    _getDescriptor () {
        return new SelectorDescriptor({
            ruleType:    this.type,
            element:     this.element,
            cssSelector: this.tagName,
        });
    }
}
