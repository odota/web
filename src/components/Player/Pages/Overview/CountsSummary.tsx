import React from "react";
import styled from "styled-components";

import GaugeChart from "./../../../Visualizations/GaugeChart";
import constants from "../../../constants";

const Styled = styled.div`
  position: relative;
  border: 1px solid rgb(0, 0, 0, 0.12);
  background-color: rgba(255, 255, 255, 0.03);
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;

  @media only screen and (min-width: ${constants.appWidth}px) {
    .gauge-chart:nth-child(even)::after {
      content: "";
      width: 2px;
      height: 300px;
      position: absolute;
      background: rgb(39, 39, 58);
      bottom: -50px;
      right: -13px;
    }
  }
`;
const Group = styled.div`
  padding-bottom: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const GroupLabel = styled.div`
  padding: 8px 0;
  font-family: ${constants.fontFamilyFuturistic};
  font-size: ${constants.fontSizeSmall};
  text-align: center;
`;
const ChartPair = styled.div`
  display: flex;
  flex-direction: row;
`;

const Summary = ({
  data,
}: {
  data: Record<string, { label: string; data: any[] }>;
}) => (
  <Styled>
    {Object.values(data).flatMap((group) => (
      <Group>
        <GroupLabel>{group.label}</GroupLabel>
        <ChartPair>
          {group.data.map((el: any) => (
            <GaugeChart
              key={`${group.label}-${el.category}`}
              number={el.matches}
              percent={el.winPercent}
              caption={el.category}
            />
          ))}
        </ChartPair>
      </Group>
    ))}
  </Styled>
);

export default Summary;
