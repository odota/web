import styled from 'styled-components';

export const StyledCombos = styled.div`
  margin-top: 55px;
  margin-bottom: 150px;

  .submit-section {
    display: inline-block;
    margin-bottom: 23px;
    margin-top: 15px;
  }

  .main-section {
    border-bottom: 1px solid rgba(255, 255, 255, 0.28);
    margin-bottom: 10px;
  }
`;

export const StyledHeroSelector = styled.div`
  display: inline-block;
  position: relative;
  line-height: 0px;
  img {
    height: 72px;
  }

  .ts-container {
    opacity: 0;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    white-space: normal;
    transition: all 0.1s ease-out;

    &:hover {
      opacity: 1;
    }
  }

  .name-overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: linear-gradient(to bottom, transparent 60%, rgba(0, 0, 0, 0.7));

    & .name {
    position: absolute;
    bottom: 10px;
    text-align: center;
    width: 100%;
    font-size: 14px;
    }


    & .team-indicator {
      position: absolute;
      top: 10px;
      opacity: 0.8;
      text-shadow: 1px 1px 2px black;
      font-size: 15px;

      &.team-a {
        left: 10px;
      }
      &.team-b {
        right: 10px;
      }
    }
  }

  &:hover .name {
    display: none;
  }
  &:hover .team-indicator {
    display: none;
  }

  .ts-container.selected {
    opacity: 1;
    background-color: rgba(32, 36, 45, 0.76);
    transition: none;
    & > div {
      display: none;
    }
  }

  .ts {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    height: 100%;
    line-height: 16px;
    color: rgb(158, 152, 152);
    font-size: 13px;
    word-break: break-word;
    white-space: normal;
    text-align: center;
    background: rgba(0, 0, 0, 0.8);
    cursor: pointer;
    transition: all 0.1s ease-out;
    vertical-align: top;

    &:hover {
      color: white;
      background: rgba(23, 59, 90, 0.8);
      text-shadow: 1px 1px 1px black;
    }
  }

  .ts.no-event {
    pointer-events: none;
  }
`;


export const StyledSelectedHeroes = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 30px;

  .hero-placeholder {
    display: inline-block;
    height: 60px;
    width: 106px;
    background: rgba(18, 24, 37, 0.98);
    box-shadow: inset 0px 0px 5px rgba(21, 21, 21, 0.61);
  }

  .hero-img {
    margin-top: 3px;
    margin-right: 5px;
    position: relative;
  }

  img {
    height: 60px;
    width: 106px;
    cursor: pointer;
    transition: all 0.1s ease-out;
    backface-visibility: hidden;

    &:hover {
      opacity: 0.3;
    }
  }

  .seperator {
    font-size: 20px;
    letter-spacing: 1px;
    font-weight: bold;
    display: flex;
    align-items: center;
    padding-top: 10px;
    flex-basis: 60px;
    justify-content: center;
    flex-shrink: 0;
  }

  .team-container {
    margin-top: -3px;
    margin-right: -5px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    & div {
      text-align: center;
    }

    & .team-title {
      flex-basis: 100%;
      font-size: 20px;
      opacity: 0.6;
    }
  }
`;
