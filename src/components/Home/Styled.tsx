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
    font-size: 50px;
    margin-left: -2%;
  }

  @media only screen and (max-width: 375px) {
    font-size: 42px;
  }
`;
export const DescriptionDiv = styled.div`
  font-family: ${constants.fontFamilyFuturistic};
  font-weight: ${constants.fontWeightLight};
  margin-bottom: 20px;
  text-shadow: #000 0 0 3px;

  & h2 {
    all: inherit;
    font-size: 1.125rem;
    line-height: 1.6;
  }

  @media only screen and (max-width: 768px) {
    & h2 {
      margin-top: 8px;
      font-size: 1rem;
    }
  }
`;
export const ButtonContainer = styled.div`
  margin-top: 28px;

  @media only screen and (max-width: 768px) {
    margin-top: 24px;
  }
`;
export const BottomTextDiv = styled.div`
  font-size: ${constants.fontSizeMedium};
  opacity: 0.6;
  font-weight: ${constants.fontWeightLight};
  text-align: right;

  @media only screen and (max-width: 425px) {
    text-align: center;
  }
`;
