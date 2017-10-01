import styled from 'styled-components';
import Heading from 'components/Heading';

const StyledHeading = styled(Heading)`
  text-align: center;
  padding: 10px 0 15px;

  & span:last-child {
    display: block;
    text-transform: lowercase;
  }
`;

export default StyledHeading;
