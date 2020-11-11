import httpClient from "../http-client";
import { SongDto } from "./types";

export const songsApi = {
  fetchSongs(page: number, limit: number = 3): Promise<Array<SongDto>> {
    return httpClient.get(`songs?page=${page}&limit=${limit}`);
  },
};
