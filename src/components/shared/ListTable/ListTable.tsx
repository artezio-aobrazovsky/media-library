import React, { useEffect, useState } from "react";

import Row from "./Row";
import HeadingRow from "./HeadingRow";
import { ColumnConfig, SortDirection } from "./types";
import { sort } from "./utils";

import classes from "./list-table.module.scss";

const INITIAL_SORTING_DIRECTION = SortDirection.ASC;

type Props<T> = {
  datasource: T[];
  colConfig: Array<ColumnConfig<T>>;
};

type SortingInfo = {
  direction: SortDirection;
  field: string;
};

type Filters<T> = {
  [key in keyof T]: string;
};

const ListTable = <T extends object>(props: Props<T>) => {
  const { datasource, colConfig } = props;

  // const [filters, setFilters] = useState(colConfig.reduce((config: ColumnConfig<T>, accum: Filters<T> ) => {
  //   accum[config.field] = '';
  //   return accum;
  // }, {}))
  const [filteredDatasource, setFilteredDatasource] = useState(datasource);
  const [filters, setFilters] = useState({});
  const [sortingInfo, setSortingInfo] = useState<SortingInfo>({
    direction: INITIAL_SORTING_DIRECTION,
    field: "",
  });

  const handleFilter = (value: string, field: keyof T) => {
    setFilters({ ...filters, [field]: value });
  };

  const handleSortFieldChange = (field: keyof T) => {
    const newSortingInfo: SortingInfo = {
      direction:
        sortingInfo.direction === SortDirection.ASC
          ? SortDirection.DESC
          : SortDirection.ASC,
      field: field as string,
    };

    if (field !== sortingInfo.field) {
      newSortingInfo.direction = INITIAL_SORTING_DIRECTION;
    }

    setSortingInfo(newSortingInfo);

    setFilteredDatasource(
      filteredDatasource
        .slice()
        .sort((a: T, b: T) =>
          sort(a[field], b[field], newSortingInfo.direction)
        )
    );
  };

  useEffect(() => {
    setFilteredDatasource(
      datasource.filter((data: any) => {
        const entries = Object.entries(filters);
        if (entries.length === 0) {
          return true;
        }

        return !!entries.find(([key, value]) => data[key].includes(value));
      })
    );
  }, [filters, datasource]);

  const rows = filteredDatasource.map((row) => (
    <Row rowData={row} colConfig={colConfig} />
  ));

  return (
    <table>
      <thead>
        <HeadingRow
          colConfig={colConfig}
          onFilter={handleFilter}
          onSort={handleSortFieldChange}
        />
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

export default ListTable;
