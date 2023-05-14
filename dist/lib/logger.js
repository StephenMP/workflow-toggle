"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.Logger = void 0;
var core = __importStar(require("@actions/core"));
var fail_whale_1 = require("fail-whale");
var Logger = (function () {
    function Logger() {
    }
    Logger.instance = function () {
        if (!Logger.singleton) {
            Logger.singleton = new Logger();
        }
        return Logger.singleton;
    };
    Logger.prototype.debug = function (message) {
        core.debug(message);
    };
    Logger.prototype.info = function (message) {
        core.info(message);
    };
    Logger.prototype.warn = function (message, properties) {
        core.warning(message, properties);
    };
    Logger.prototype.error = function (message, properties) {
        (0, fail_whale_1.failWhale)(message instanceof Error ? message.message : message, core);
    };
    Logger.prototype.notice = function (message, properties) {
        core.notice(message, properties);
    };
    Logger.prototype.group = function (name, fn) {
        return core.group(name, fn);
    };
    Logger.prototype.groupSync = function (name, fn) {
        core.startGroup(name);
        var result = fn();
        core.endGroup();
        return result;
    };
    Logger.prototype.startGroup = function (name) {
        core.startGroup(name);
    };
    Logger.prototype.endGroup = function () {
        core.endGroup();
    };
    return Logger;
}());
exports.Logger = Logger;
exports.logger = Logger.instance();
//# sourceMappingURL=logger.js.map