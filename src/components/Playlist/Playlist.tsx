import React, { FunctionComponent, useEffect, useState, useRef } from "react";

import ListTable from "../shared/ListTable";
import { Song } from "./types";
import { ColumnConfig } from "../shared/ListTable/types";
import { songsApi } from "../../api/songs/songs-api";

import classes from "./playlist.module.scss";
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
  {
    field: "album",
    label: "Альбом",
    sortable: true,
    filterable: true,
  },
  {
    field: "year",
    label: "Год",
    sortable: true,
    filterable: true,
  },
];

const pageLimit = 4;

const Playlist: FunctionComponent = () => {
  const [songs, setSongs] = useState<Array<Song>>([]);
  const [page, setPage] = useState(0);
  const loader = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await songsApi.fetchSongs(page, pageLimit);
      setSongs((songs) => {
        if (result.length !== pageLimit && loader.current) {
          loader.current.style.display = "none";
        }
        return [...songs, ...result];
      });
    };
    fetchData();
  }, [page]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current !== null) {
      observer.observe(loader.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleObserver = (entities: IntersectionObserverEntry[]) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setPage((page) => page + 1);
    }
  };

  return (
    <div className={classes.playlist}>
      <ListTable datasource={songs} colConfig={colConfig} />
      <div ref={loader} className={classes.spinner}></div>
    </div>
  );
};

export default Playlist;
