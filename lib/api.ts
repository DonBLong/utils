export interface APIConfig {
  baseURL: string;
  endpoints: {
    [x: string]: ((p: string) => string) | ((p: number) => string);
  };
}
