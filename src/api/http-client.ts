import axios, { AxiosInstance } from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5001/media-library-7d283/us-central1/app/api/",
  headers: { "Content-type": "application/json" },
});

class HttpClient {
  instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: "http://localhost:5001/media-library-7d283/us-central1/app/api/",
      headers: { "Content-type": "application/json" },
    });
  }

  async get<T>(path: string): Promise<T> {
    const { data } = await instance.get(path);
    return data;
  }
}

export default new HttpClient();
