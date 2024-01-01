import { Request } from "express";
import _ from "lodash";
import { v4 as uuid } from "uuid";

export class RequestHeadersExtractor {
  public constructor(private readonly req: Request) {}

  public getCorrelationId(): string {
    return _.get(this.req, "headers.x-correlation-id", this.getRequestId()) as string;
  }

  public getRequestId(): string {
    return _.get(this.req, "headers.internal-request-id", uuid()) as string;
  }

  public getClientDeviceModel(): string {
    // eslint-disable-next-line max-len
    return _.get(
      this.req,
      "headers.x-app-device-model",
      _.get(this.req, "headers.x-financeAlugamaisApi-device-model", ""),
    ) as string;
  }

  public getClientVersion(): string {
    return _.get(
      this.req,
      "headers.x-app-version",
      _.get(this.req, "headers.x-financeAlugamaisApi-version", ""),
    ) as string;
  }

  public getClientPlatform(): string {
    return _.get(
      this.req,
      "headers.x-app-platform",
      _.get(this.req, "headers.x-financeAlugamaisApi-app-platform", ""),
    ) as string;
  }

  public getClientBuildNumber(): string {
    // eslint-disable-next-line max-len
    return _.get(
      this.req,
      "headers.x-app-build-number",
      _.get(this.req, "headers.x-financeAlugamaisApi-build-number", ""),
    ) as string;
  }

  public getIP(): string {
    return _.get(this.req, "ip", "");
  }

  public getDeviceKeyUserId(): string {
    return _.get(this.req, "headers.x-device-key-user-id", "") as string;
  }

  public getPinningToken(headerName: string): string {
    return _.get(this.req, `headers.${headerName}`, "") as string;
  }
}
