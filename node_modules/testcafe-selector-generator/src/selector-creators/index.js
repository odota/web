import { RULE_TYPE } from '../rules/rule-type';
import { TagNameSelectorCreator } from './tag-name-creator';
import { IdSelectorCreator } from './id-creator';
import { TextSelectorCreator } from './text-creator';
import { AttrSelectorCreator } from './attr-creator';
import { ClassSelectorCreator } from './class-creator';
import { TagTreeSelectorCreator } from './tag-tree-creator';

export const SELECTOR_CREATORS = {
    [RULE_TYPE.byTagName]:   new TagNameSelectorCreator(),
    [RULE_TYPE.byId]:        new IdSelectorCreator(),
    [RULE_TYPE.byText]:      new TextSelectorCreator(),
    [RULE_TYPE.byClassAttr]: new ClassSelectorCreator(),
    [RULE_TYPE.byAttr]:      new AttrSelectorCreator(),
    [RULE_TYPE.byTagTree]:   new TagTreeSelectorCreator(),
};

