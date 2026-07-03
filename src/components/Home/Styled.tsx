import styled from "styled-components";
import constants from "../constants";

export const HeadContainerDiv = styled.div`
  width: 600px;
  height: 380px;
  margin: 0 auto;
  text-align: center;
  padding-top: 120px;

  @media only screen and (max-width: 768px) {
    width: auto;
  }
`;
export const HeadlineDiv = styled.div`
  margin-top: 10%;
  text-transform: uppercase;
  font-size: 4rem;
  font-family: ${constants.fontFamilySerif};
  font-weight: ${constants.fontWeightMedium};
  line-height: 1.2;
  letter-spacing: 0.02em;
  text-shadow: #b0aeae 0 0 3px;

  & h1 {
    all: inherit;
  }

  @media only screen and (max-width: 425px) {
    font-size: 60px;
  }

  @media only screen and (max-width: 375px) {
    font-size: 42px;
  }
`;
export const DescriptionDiv = styled.div`
  font-size: 1.25rem;
  font-weight: ${constants.fontWeightLight};
  margin-bottom: 20px;
  text-shadow: #000 0 0 3px;

  & h2 {
    all: inherit;
  }

  @media only screen and (max-width: 768px) {
    font-size: 25px;
  }
`;
export const BottomTextDiv = styled.div`
  font-size: ${constants.fontSizeMedium};
  opacity: 0.6;
  font-weight: ${constants.fontWeightLight};
  text-align: right;
`;
