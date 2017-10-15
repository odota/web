import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';
import styled from 'styled-components';
import Spinner from '../Spinner';
import Error from '../Error';
import { IconCheese } from '../Icons';

const ProgressDiv = styled.div`
  position: relative;
  width: 90px;
  height: 90px;

  & > div[mode="determinate"],
  & div.cheeseDiv {
    position: absolute !important;
  }

  & svg > circle {
    stroke-width: 3;
  }

  &[data-hint] {
    &::after {
      left: 10px;
      right: 10px;
      text-align: center;
    }
  }
`;
const FrontProgress = styled(CircularProgress)`
  z-index: 1;
`;
const BackProgress = styled(CircularProgress)`
  circle {
    stroke: rgba(255, 255, 255, 0.06) !important;
  }
`;
const CheeseDiv = styled.div`
  top: 17px;
  left: 28px;
  width: 35px;
  height: 35px;

  & svg {
    filter: drop-shadow(0 0 10px #ff0);
  }
`;
const PercentP = styled.p`
  text-align: center;
  padding: 0 !important;
  margin-top: -5px !important;

  & > div {
    position: relative;
    width: 100%;
  }
`;

const Cheese = ({ donations = {}, error, loading }) => {
  const { goal, cheese } = donations;
  const percent = ((cheese / goal) * 100) || 0;

  return (
    <div>
      {error && <Error />}
      {loading && <Spinner />}
      {!error && !loading &&
      <ProgressDiv data-hint={`${cheese} / ${goal}`}>
        <FrontProgress mode="determinate" value={Math.min(percent, 100)} size={90} />
        <BackProgress mode="determinate" value={100} size={90} />
        <CheeseDiv className="cheeseDiv">
          <IconCheese />
          <PercentP>
            {`${percent.toFixed(0)}%`}
          </PercentP>
        </CheeseDiv>
      </ProgressDiv>
      }
    </div>
  );
};

Cheese.propTypes = {
  donations: PropTypes.shape({}),
  error: PropTypes.string,
  loading: PropTypes.bool,
};

const mapStateToProps = (state) => {
  const { loading, error } = state.app.metadata;
  return {
    loading,
    error,
    donations: state.app.metadata.data.cheese,
  };
};

export default connect(mapStateToProps)(Cheese);
