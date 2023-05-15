import * as core from '@actions/core';
export interface ILogger {
    debug(message: string): void;
    info(message: string): void;
    warning(message: string | Error, properties?: core.AnnotationProperties | undefined): void;
    error(message: string | Error, properties?: core.AnnotationProperties | undefined): void;
    notice(message: string | Error, properties?: core.AnnotationProperties | undefined): void;
    group<T>(name: string, fn: () => Promise<T>): Promise<T>;
    groupSync<T>(name: string, fn: () => T): T;
    startGroup(name: string): void;
    endGroup(): void;
}
export declare class Logger implements ILogger {
    private static singleton;
    static instance(): ILogger;
    private constructor();
    debug(message: string): void;
    info(message: string): void;
    warning(message: string | Error, properties?: core.AnnotationProperties | undefined): void;
    error(message: string | Error, properties?: core.AnnotationProperties | undefined): void;
    notice(message: string | Error, properties?: core.AnnotationProperties | undefined): void;
    group<T>(name: string, fn: () => Promise<T>): Promise<T>;
    groupSync<T>(name: string, fn: () => T): T;
    startGroup(name: string): void;
    endGroup(): void;
}
export declare const logger: ILogger;
//# sourceMappingURL=logger.d.ts.map