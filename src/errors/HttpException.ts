export default abstract class HttpException extends Error {
  abstract statusCode: number;

  constructor() {
    super();
    Object.setPrototypeOf(this, HttpException.prototype);
  }

  abstract serializeErrors(): { message: string; field?: string }[];
}
