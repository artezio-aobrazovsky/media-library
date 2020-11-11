import React, { FunctionComponent } from "react";

import classes from "./list-table.module.scss";

type CellProps = {
  cellData: any;
};

const Cell: FunctionComponent<CellProps> = (props) => {
  const { cellData } = props;
  return <td className={classes.cell}>{cellData}</td>;
};

export default Cell;
