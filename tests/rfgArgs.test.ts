import { rfgArgs, RFG_STATUS } from "../src/lib/rfgArgs"
import { helpers } from "./testhelpers"

describe("Arguments Object Doesn't Blowup", () => {
    test("Should not be undefined", ()=>{
        expect(rfgArgs).toBeDefined()
    });
});

describe("Testing Argument Types", () => { 
    test("Should have a read function", () => {
        expect(typeof rfgArgs.read).toBe('function')
    });

    test("Should have a read function", ()=>{
        expect(typeof rfgArgs.version).toBe('function')
    });

    test("Should have a read function", ()=>{
        expect(typeof rfgArgs.help).toBe('function')
    });

    test("Should have a read function", ()=>{
        expect(typeof rfgArgs.help()).toBe('string')
    });
});

describe("Testing Command Handler", () => { 
    test("Should fail when argv is an incorrect length", ()=>{
        expect(rfgArgs.read(helpers.injectCommand("generate-feature namehere -t template extra stuff that should fail regularly")).status).toBe(RFG_STATUS.ERROR);
        expect(rfgArgs.read([]).status).toBe(RFG_STATUS.ERROR);
    });

    test("Should pass when argv has ideal input", ()=>{
        expect(rfgArgs.read(helpers.injectCommand("generate-feature customName")).status).toBe(RFG_STATUS.OK);
        expect(rfgArgs.read(helpers.injectCommand("generate-feature customName -t redux-typescript")).status).toBe(RFG_STATUS.OK);
        expect(rfgArgs.read(helpers.injectCommand("generate-feature customName -t redux-javascript")).status).toBe(RFG_STATUS.OK);
        expect(rfgArgs.read(helpers.injectCommand("generate-feature customName ./src/features -t redux-javascript")).status).toBe(RFG_STATUS.OK);
    });

    test("Should fail when argv has wrong flag in input", ()=>{
        expect(rfgArgs.read(helpers.injectCommand("generate-feature customName -z should-fail")).status).toBe(RFG_STATUS.UNKNOWN_FLAG_ERROR);
        expect(rfgArgs.read(helpers.injectCommand("generate-feature customName -t should-fail")).status).toBe(RFG_STATUS.ERROR);
    });

    test("Should fail when argv has incorrect path for postestion 2", ()=>{
        expect(rfgArgs.read(helpers.injectCommand("generate-feature customName should-fail")).status).toBe(RFG_STATUS.FOLDER_NOT_FOUND_ERROR);
        expect(rfgArgs.read(helpers.injectCommand("generate-feature customName ./americanAirlines")).status).toBe(RFG_STATUS.FOLDER_NOT_FOUND_ERROR);
    });

    test("Should fail when name provided does not follow naming of variables", ()=>{
        expect(rfgArgs.read(helpers.injectCommand("generate-feature custom-Name -t redux-javascript")).status).toBe(RFG_STATUS.FEATURE_NAMING_ERROR);
        expect(rfgArgs.read(helpers.injectCommand("generate-feature custom,Name -t redux-javascript")).status).toBe(RFG_STATUS.FEATURE_NAMING_ERROR);
        expect(rfgArgs.read(helpers.injectCommand("generate-feature custom.Name -t redux-javascript")).status).toBe(RFG_STATUS.FEATURE_NAMING_ERROR);
        expect(rfgArgs.read(helpers.injectCommand("generate-feature custom%Name -t redux-javascript")).status).toBe(RFG_STATUS.FEATURE_NAMING_ERROR);
        expect(rfgArgs.read(helpers.injectCommand("generate-feature customName/ -t redux-javascript")).status).toBe(RFG_STATUS.FEATURE_NAMING_ERROR);
    });
});