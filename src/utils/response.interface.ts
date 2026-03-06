export interface ErrorResponseInterface<T> {
  error: string;
  details: T;
}
