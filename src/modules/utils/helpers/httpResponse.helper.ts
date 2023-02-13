export class HttpResponseHelper {
  static isResponseSuccessful(status: number): boolean {
    return status >= 200 && status < 300;
  }
}
