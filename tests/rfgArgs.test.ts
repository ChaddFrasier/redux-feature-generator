import { rfgApi, RFG_STATUS } from "../src/lib/rfgArgs"
import { helpers } from "./testhelpers"

const CURRENT_BUILD_VERSION = "1.4.0";
const generationTestPath = "./tests/src/features";

describe("Arguments Object Doesn't Blowup", () => {
    test("Should not be undefined", ()=>{
        expect(rfgApi).toBeDefined()
    });
});

describe("Testing Argument Types", () => { 
    test("Should have a read function", () => {
        expect(typeof rfgApi.processCommand).toBe('function')
    });

    test("Should have a read function", ()=>{
        expect(typeof rfgApi.getVersion).toBe('function')
    });

    test("Should have a read function", ()=>{
        expect(typeof rfgApi.getHelp).toBe('function')
    });

    test("Should have a read function", ()=>{
        expect(typeof rfgApi.getHelp()).toBe('string')
    });
});

describe("Testing Command Handler", () => { 
    test("Should fail when argv is an incorrect length", ()=>{
        expect(rfgApi.processCommand(helpers.injectCommand("generate-feature namehere -t template extra stuff that should fail regularly")).status).toBe(RFG_STATUS.ERROR);
        expect(rfgApi.processCommand([]).status).toBe(RFG_STATUS.ERROR);
    });

    test("Should pass when argv has ideal input", ()=>{
        expect(rfgApi.processCommand(helpers.injectCommand("generate-feature customName")).status).toBe(RFG_STATUS.OK);
        expect(rfgApi.processCommand(helpers.injectCommand("generate-feature customName -t redux-typescript")).status).toBe(RFG_STATUS.OK);
        expect(rfgApi.processCommand(helpers.injectCommand("generate-feature customName -t redux-javascript")).status).toBe(RFG_STATUS.OK);
        expect(rfgApi.processCommand(helpers.injectCommand(`generate-feature customName ${generationTestPath} -t redux-javascript`)).status).toBe(RFG_STATUS.OK);
    });

    test("Should fail when argv has wrong flag in input", ()=>{
        expect(rfgApi.processCommand(helpers.injectCommand("generate-feature customName -z should-fail")).status).toBe(RFG_STATUS.UNKNOWN_FLAG_ERROR);
        expect(rfgApi.processCommand(helpers.injectCommand("generate-feature customName -t should-fail")).status).toBe(RFG_STATUS.ERROR);
    });

    test("Should fail when argv has incorrect path for postestion 2", ()=>{
        expect(rfgApi.processCommand(helpers.injectCommand("generate-feature customName should-fail")).status).toBe(RFG_STATUS.FOLDER_NOT_FOUND_ERROR);
        expect(rfgApi.processCommand(helpers.injectCommand("generate-feature customName ./americanAirlines")).status).toBe(RFG_STATUS.FOLDER_NOT_FOUND_ERROR);
    });

    test("Should fail when name provided does not follow naming of variables", ()=>{
        expect(rfgApi.processCommand(helpers.injectCommand("generate-feature custom-Name -t redux-javascript")).status).toBe(RFG_STATUS.FEATURE_NAMING_ERROR);
        expect(rfgApi.processCommand(helpers.injectCommand("generate-feature custom,Name -t redux-javascript")).status).toBe(RFG_STATUS.FEATURE_NAMING_ERROR);
        expect(rfgApi.processCommand(helpers.injectCommand("generate-feature custom.Name -t redux-javascript")).status).toBe(RFG_STATUS.FEATURE_NAMING_ERROR);
        expect(rfgApi.processCommand(helpers.injectCommand("generate-feature custom%Name -t redux-javascript")).status).toBe(RFG_STATUS.FEATURE_NAMING_ERROR);
        expect(rfgApi.processCommand(helpers.injectCommand("generate-feature customName/ -t redux-javascript")).status).toBe(RFG_STATUS.FEATURE_NAMING_ERROR);
        expect(rfgApi.processCommand(helpers.injectCommand(`generate-feature customName ${generationTestPath} hehujhesdufi`)).status).toBe(RFG_STATUS.UNKNOWN_ERROR);
    });

    test("Should return a valid run when searching for help and version", ()=>{
        expect(rfgApi.processCommand(helpers.injectCommand("generate-feature -v")).status).toBe(RFG_STATUS.VERSION);
        expect(rfgApi.processCommand(helpers.injectCommand("generate-feature --version")).status).toBe(RFG_STATUS.VERSION);
        expect(rfgApi.getVersion(require("../package.json"))).toBe(`v${CURRENT_BUILD_VERSION}`);
        expect(rfgApi.getVersion(undefined)).toBeUndefined();
        expect(rfgApi.getVersion({})).toBeUndefined();
        expect(rfgApi.processCommand(helpers.injectCommand("generate-feature -h")).status).toBe(RFG_STATUS.HELP);
        expect(rfgApi.processCommand(helpers.injectCommand("generate-feature --help")).status).toBe(RFG_STATUS.HELP);
    });
});