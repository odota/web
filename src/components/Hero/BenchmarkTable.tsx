import React from "react";
import Table from "../Table/Table";
import useStrings from "../../hooks/useStrings.hook";

const BenchmarkTable = ({ data }: { data: any[] }) => {
  const strings = useStrings();
  const columns = (d: any[]) =>
    Object.keys(d[0] || {}).map((stat) => ({
      displayName: strings[`th_${stat}` as keyof Strings],
      tooltip: strings[`tooltip_${stat}` as keyof Strings],
      field: stat,
      displayFn: (row: any, col: any, field: any) =>
        stat === "percentile"
          ? `${field * 100}%`
          : typeof field === "number" && Number(field.toFixed(2)),
    }));
  return <Table data={data} columns={columns(data)} />;
};

export default BenchmarkTable;
