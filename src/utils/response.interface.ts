export interface ErrorResponseInterface<T> {
  error: string;
  details: T;
}

export interface SuccessResponseInterface<T, M = Record<string, unknown>> {
  data: T;
  meta?: M;
}
