import React from 'react';
import PropTypes from 'prop-types';

import {
  YAxis,
  BarChart,
  Bar,
  Cell,
  ReferenceLine,
  Tooltip,
} from 'recharts';
import { StyledContainer, SparklineContainer } from './Styled';
import { StyledCustomizedTooltip } from '../../Visualizations/Graph/Styled';
import constants from '../../constants';

const CustomizedTooltip = ({ label, external }) => (
  <StyledCustomizedTooltip>
    <div className="label">{label} - {label + 1}</div>
    {external && external[label] && (
      <div>
        <div>
          CS This Minute: {external[label].delta}
        </div>
        <div>
          Cumluative CS: {external[label].cumulative}
        </div>
      </div>)
    }

  </StyledCustomizedTooltip>
);
CustomizedTooltip.propTypes = {
  label: PropTypes.number,
  external: PropTypes.arrayOf(PropTypes.shape({})),
};

const Sparkline = ({
  values, altValues,
}) => {
  let lastValue = 0;
  const data = (values || altValues).map((v) => {
    const delta = v - lastValue;
    lastValue = v;
    return { delta, cumulative: v };
  }).slice(1, 11);

  return (
    <StyledContainer>
      <SparklineContainer>
        <BarChart data={data} width={200} height={40} barCategoryGap={1}>
          <YAxis hide domain={[0, 12]} />
          <Tooltip content={<CustomizedTooltip external={data} />} />
          <ReferenceLine y={6} stroke={constants.colorRed} strokeDasharray="3 3" />
          <Bar dataKey="delta" barGap={0}>
            {
              data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.delta >= 6 ? constants.colorGreen : constants.colorRed} />
              ))
            }
          </Bar>
        </BarChart>
      </SparklineContainer>
    </StyledContainer>
  );
};

const {
  instanceOf,
} = PropTypes;


Sparkline.propTypes = {
  values: instanceOf(Array),
  altValues: instanceOf(Array),
};

Sparkline.tdStyle = {
  paddingTop: 12,
  paddingBottom: 12,
};

export default Sparkline;
