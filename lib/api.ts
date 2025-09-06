/**
 * Represents a configuration object for API endpoints.
 */
export interface APIConfig {
  /**
   * The base URL for the API.
   */
  baseURL: string;
  /**
   * Represents an object mapping endpoint names to functions that generate endpoint URLs.
   * Each function takes either a `string` or a `number` as a parameter and returns a `string` URL.
   */
  endpoints: {
    [x: string]: ((p: string) => string) | ((p: number) => string);
  };
}
