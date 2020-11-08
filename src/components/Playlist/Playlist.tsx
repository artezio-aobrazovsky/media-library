import React, { FunctionComponent, useEffect } from "react";

import ListTable from "../shared/ListTable";
import { Song } from "./types";
import { ColumnConfig } from "../shared/ListTable/types";

import classes from "./playlist.module.scss";

const mockSongs: Song[] = [
  {
    name: "test3",
    singer: "LP",
    year: 2010,
    album: "TBD",
  },
  {
    name: "test1",
    singer: "Skillet",
    year: 2010,
    album: "TBD",
  },
];

const colConfig: ColumnConfig<Song>[] = [
  {
    field: "name",
    label: "Название",
    sortable: true,
    filterable: true,
  },
  {
    field: "singer",
    label: "Исполнитель",
    sortable: true,
    filterable: true,
  },
];
const Playlist: FunctionComponent = () => {
  return (
    <div className={classes.playlist}>
      <ListTable datasource={mockSongs} colConfig={colConfig} />
    </div>
  );
};

export default Playlist;
