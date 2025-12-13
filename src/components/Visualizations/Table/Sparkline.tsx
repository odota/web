import React from "react";

import { YAxis, BarChart, Bar, Cell, ReferenceLine, Tooltip } from "recharts";
import { StyledContainer, SparklineContainer } from "./Styled";
import { StyledCustomizedTooltip } from "../../Visualizations/Graph/Styled";
import constants from "../../constants";
import useStrings from "../../../hooks/useStrings.hook";

const CustomizedTooltip = ({
  label,
  external,
}: {
  label?: any;
  external: any;
}) => {
  const strings = useStrings();
  return (
    <StyledCustomizedTooltip>
      <div className="label">
        {label} - {label + 1}
      </div>
      {external && external[label] && (
        <div>
          <div>
            {strings.cs_this_minute}: {external[label].delta}
          </div>
          <div>
            {strings.cumulative_cs}: {external[label].cumulative}
          </div>
        </div>
      )}
    </StyledCustomizedTooltip>
  );
};

const Sparkline = ({
  values,
  altValues,
}: {
  values: number[];
  altValues: number[];
}) => {
  let lastValue = 0;
  const data = (values || altValues)
    .map((v) => {
      const delta = v - lastValue;
      lastValue = v;
      return { delta, cumulative: v };
    })
    .slice(1, 11);

  return (
    <StyledContainer>
      <SparklineContainer>
        <BarChart data={data} width={200} height={40} barCategoryGap={1}>
          <YAxis hide domain={[0, 12]} />
          <Tooltip content={<CustomizedTooltip external={data} />} />
          <ReferenceLine
            y={6}
            stroke={constants.colorRed}
            strokeDasharray="3 3"
          />
          {/*@ts-expect-error*/}
          <Bar dataKey="delta" barGap={0}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  entry.delta >= 6 ? constants.colorGreen : constants.colorRed
                }
              />
            ))}
          </Bar>
        </BarChart>
      </SparklineContainer>
    </StyledContainer>
  );
};

export default Sparkline;
