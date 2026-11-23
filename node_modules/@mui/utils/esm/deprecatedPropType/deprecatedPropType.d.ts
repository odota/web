import { Validator } from 'prop-types';
export default function deprecatedPropType<T>(validator: Validator<T>, reason: string): Validator<T>;