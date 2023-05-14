"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseInputs = void 0;
var logger_1 = require("./logger");
var core_1 = require("@actions/core");
var github_1 = require("@actions/github");
var keys = {
    token: 'token',
    workflow_id: 'workflow_id',
    action: 'action',
    owner: 'owner',
    repo: 'repo',
};
function parseInputs() {
    return logger_1.logger.groupSync('Parsing inputs', function () {
        var inputs = {
            token: (0, core_1.getInput)(keys.token, { required: true }),
            workflow_id: (0, core_1.getInput)(keys.workflow_id, { required: true }),
            action: (0, core_1.getInput)(keys.action, { required: true }),
            owner: (0, core_1.getInput)(keys.owner, { required: false }) || github_1.context.repo.owner,
            repo: (0, core_1.getInput)(keys.repo, { required: false }) || github_1.context.repo.repo,
        };
        logger_1.logger.info('Inputs:');
        logger_1.logger.info(JSON.stringify(inputs, null, 2));
        return inputs;
    });
}
exports.parseInputs = parseInputs;
//# sourceMappingURL=input.js.map