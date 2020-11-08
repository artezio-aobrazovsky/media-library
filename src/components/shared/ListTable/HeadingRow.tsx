import React from "react";

import Cell from "./Cell";
import Input from "../form/Input";
import { ColumnConfig, SortingInfo } from "./types";

import classes from "./list-table.module.scss";

interface HeadingRowProps<T> {
  colConfig: Array<ColumnConfig<T>>;
  onFilter?: (value: string, field: keyof T) => void;
  onSort?: (field: keyof T) => void;
  sortingInfo?: SortingInfo;
}

const HeadingRow = <T extends object>(props: HeadingRowProps<T>) => {
  const { colConfig, onFilter, onSort, sortingInfo } = props;

  const handleFilterChange = (value: string, field: keyof T) => {
    if (onFilter) {
      onFilter(value, field);
    }
  };

  const handleSort = (field: keyof T) => {
    if (onSort) {
      onSort(field);
    }
  };

  const renderCellContent = (colConfig: ColumnConfig<T>) => {
    let content = <span>{colConfig.label}</span>;

    if (colConfig.filterable) {
      content = (
        <Input
          label={colConfig.label}
          onChange={(value: string) =>
            handleFilterChange(value, colConfig.field)
          }
        />
      );
    }
    return (
      <span className={classes.headingRow}>
        {content}
        {colConfig.sortable && (
          <span
            className={[classes.sortIcon].join(" ")}
            onClick={() => handleSort(colConfig.field)}
          ></span>
        )}
      </span>
    );
  };

  const cells = colConfig.map((cell) => (
    <Cell key={`${cell.field}`} cellData={renderCellContent(cell)} />
  ));

  return <tr>{cells}</tr>;
};

export default HeadingRow;
