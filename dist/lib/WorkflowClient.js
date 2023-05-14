"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkflowClient = void 0;
var tsyringe_1 = require("tsyringe");
var types_1 = require("./types");
var WorkflowClient = exports.WorkflowClient = (function () {
    function WorkflowClient(octokit) {
        this.octokit = octokit;
    }
    WorkflowClient.prototype._toggleWorkflow = function (params, action) {
        return __awaiter(this, void 0, void 0, function () {
            var response, e_1, error;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4, this.octokit.rest.actions.getWorkflow(params)];
                    case 1:
                        _a.sent();
                        return [4, action(params)];
                    case 2:
                        response = _a.sent();
                        return [2, { success: response.status === 204 }];
                    case 3:
                        e_1 = _a.sent();
                        error = e_1;
                        if (error.message.includes('NotFound')) {
                            return [2, {
                                    success: false,
                                    message: "A workflow with ID ".concat(params.workflow_id, " does not exist in ").concat(params.owner, "/").concat(params.repo),
                                }];
                        }
                        return [2, { success: false, message: error.message }];
                    case 4: return [2];
                }
            });
        });
    };
    WorkflowClient.prototype.toggleWorkflow = function (owner, repo, workflow_id, action) {
        return __awaiter(this, void 0, void 0, function () {
            var params, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        params = { owner: owner, repo: repo, workflow_id: workflow_id };
                        _a = action;
                        switch (_a) {
                            case 'disable': return [3, 1];
                            case 'enable': return [3, 3];
                        }
                        return [3, 5];
                    case 1: return [4, this._toggleWorkflow(params, this.octokit.rest.actions.disableWorkflow)];
                    case 2: return [2, _b.sent()];
                    case 3: return [4, this._toggleWorkflow(params, this.octokit.rest.actions.enableWorkflow)];
                    case 4: return [2, _b.sent()];
                    case 5: throw new Error("The provided action ".concat(action, " is not supported!"));
                }
            });
        });
    };
    WorkflowClient = __decorate([
        (0, tsyringe_1.injectable)(),
        __metadata("design:paramtypes", [types_1.Octokit])
    ], WorkflowClient);
    return WorkflowClient;
}());
//# sourceMappingURL=WorkflowClient.js.map