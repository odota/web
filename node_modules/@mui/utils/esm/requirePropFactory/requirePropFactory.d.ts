import * as React from 'react';
import PropTypes from 'prop-types';
export default function requirePropFactory(componentNameInError: string, Component?: React.ComponentType<unknown>): (requiredProp: string) => PropTypes.Validator<any>;