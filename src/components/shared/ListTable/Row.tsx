import React from "react";

import Cell from "./Cell";
import { ColumnConfig } from "./types";

import classes from "./list-table.module.scss";

type RowProps<T> = {
  rowData: T;
  colConfig: Array<ColumnConfig<T>>;
};

const Row = <T extends object>(props: RowProps<T>) => {
  const { rowData, colConfig } = props;

  const columns = colConfig.map((col) => (
    <Cell cellData={rowData[col.field]} key={`${col.field}`} />
  ));

  return <tr className={classes.row}>{columns}</tr>;
};

export default Row;
