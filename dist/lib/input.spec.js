"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var input_1 = require("./input");
var faker_1 = require("@faker-js/faker");
var randomString = function () { return faker_1.faker.word.noun(); };
var getKeyValue = function (key) {
    return function (obj) {
        return obj[key];
    };
};
function setEnv(inputs) {
    for (var key in inputs) {
        process.env[key] = getKeyValue(key)(inputs);
    }
}
describe('parseInputs', function () {
    var missingCases = [
        { INPUT_ACTION: 'disable', INPUT_OWNER: randomString(), INPUT_REPO: randomString(), INPUT_TOKEN: randomString(), INPUT_WORKFLOW_ID: '' },
        { INPUT_ACTION: 'disable', INPUT_OWNER: randomString(), INPUT_REPO: randomString(), INPUT_TOKEN: '', INPUT_WORKFLOW_ID: randomString() },
        { INPUT_ACTION: '', INPUT_OWNER: randomString(), INPUT_REPO: randomString(), INPUT_TOKEN: randomString(), INPUT_WORKFLOW_ID: randomString() },
    ];
    it.each(missingCases)('fails if required input is missing: ($INPUT_ACTION, $INPUT_TOKEN, $INPUT_WORKFLOW_ID)', function (inputs) {
        setEnv(inputs);
        expect(input_1.parseInputs).toThrow();
    });
    var happyCases = [
        { INPUT_ACTION: 'disable', INPUT_OWNER: randomString(), INPUT_REPO: randomString(), INPUT_TOKEN: randomString(), INPUT_WORKFLOW_ID: randomString() },
        { INPUT_ACTION: 'enable', INPUT_OWNER: randomString(), INPUT_REPO: randomString(), INPUT_TOKEN: randomString(), INPUT_WORKFLOW_ID: randomString() },
    ];
    it.each(happyCases)('successfully parses inputs: ($INPUT_ACTION, $INPUT_OWNER, $INPUT_REPO, $INPUT_TOKEN, $INPUT_WORKFLOW_ID)', function (inputs) {
        setEnv(inputs);
        var parsedInputs = (0, input_1.parseInputs)();
        expect(parsedInputs.action).toBe(inputs.INPUT_ACTION);
        expect(parsedInputs.owner).toBe(inputs.INPUT_OWNER);
        expect(parsedInputs.repo).toBe(inputs.INPUT_REPO);
        expect(parsedInputs.token).toBe(inputs.INPUT_TOKEN);
        expect(parsedInputs.workflow_id).toBe(inputs.INPUT_WORKFLOW_ID);
    });
});
//# sourceMappingURL=input.spec.js.map