export interface GenericResponse<T> {
  ok: boolean;
  data: T;
  message: string;
}
