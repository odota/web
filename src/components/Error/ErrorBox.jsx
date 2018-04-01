import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';
import constants from '../constants';

const Wrapper = styled.div`
  background-color: ${constants.colorDanger};
  padding: 15px;
  color: white;
`;

const Error = props => (
  <Wrapper>
    Whoops! Something went wrong. {props.text ? props.text : ''}
  </Wrapper>
);

Error.propTypes = {
  text: string,
};

export default Error;
