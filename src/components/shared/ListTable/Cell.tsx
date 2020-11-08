import React, { FunctionComponent } from "react";

type CellProps = {
  cellData: any;
};

const Cell: FunctionComponent<CellProps> = (props) => {
  const { cellData } = props;
  return <td>{cellData}</td>;
};

export default Cell;
