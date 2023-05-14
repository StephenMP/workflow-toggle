import * as core from '@actions/core';
import { failWhale } from 'fail-whale';

export interface ILogger {
  debug(message: string): void;
  info(message: string): void;
  warn(message: string | Error, properties?: core.AnnotationProperties | undefined): void;
  error(message: string | Error, properties?: core.AnnotationProperties | undefined): void;
  notice(message: string | Error, properties?: core.AnnotationProperties | undefined): void;
  group<T>(name: string, fn: () => Promise<T>): Promise<T>;
  groupSync<T>(name: string, fn: () => T): T;
  startGroup(name: string): void;
  endGroup(): void;
}

export class Logger implements ILogger {
  private static singleton: ILogger;
  public static instance(): ILogger {
    if (!Logger.singleton) {
      Logger.singleton = new Logger();
    }

    return Logger.singleton;
  }

  private constructor() {}

  public debug(message: string) {
    core.debug(message);
  }

  public info(message: string) {
    core.info(message);
  }

  public warn(message: string | Error, properties?: core.AnnotationProperties | undefined) {
    core.warning(message, properties);
  }

  public error(message: string | Error, properties?: core.AnnotationProperties | undefined) {
    failWhale(message instanceof Error ? message.message : (message as string), core);
  }

  public notice(message: string | Error, properties?: core.AnnotationProperties | undefined) {
    core.notice(message, properties);
  }

  public group<T>(name: string, fn: () => Promise<T>): Promise<T> {
    return core.group<T>(name, fn);
  }

  public groupSync<T>(name: string, fn: () => T): T {
    core.startGroup(name);
    const result: T = fn();
    core.endGroup();
    return result;
  }

  public startGroup(name: string): void {
    core.startGroup(name);
  }

  public endGroup(): void {
    core.endGroup();
  }
}

export const logger = Logger.instance();
