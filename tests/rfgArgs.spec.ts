import { rfgArgs, RFG_STATUS } from "../src/lib/rfgArgs"
import { helpers } from "./testhelpers"
import { validName } from '../src/lib/helpers';

describe("Arguments Object Doesn't Blowup", () => {
    it("Should not be undefined", ()=>{
        expect(rfgArgs).toBeDefined()
    });
});


describe("Testing that the feature name validator is working", ()=>{
    it("Should succeed with normal names", () =>{
        expect(validName("NewFeature3")).toBeTruthy()
        expect(validName("validnameHere")).toBeTruthy()
        expect(validName("validname^Here")).toBeFalsy()
        expect(validName("validname.Here")).toBeFalsy()
        expect(validName("validname.Here")).toBeFalsy()
    });
});

describe("Testing Argument Types", () => { 
    it("Should have a read function", () => {
        expect(typeof rfgArgs.read).toBe('function')
    });

    it("Should have a read function", ()=>{
        expect(typeof rfgArgs.version).toBe('function')
    });

    it("Should have a read function", ()=>{
        expect(typeof rfgArgs.help).toBe('function')
    });

    it("Should have a read function", ()=>{
        expect(typeof rfgArgs.help()).toBe('string')
    });
});

describe("Testing Command Handler", () => { 
    it("Should fail when argv is an incorrect length", ()=>{
        expect(rfgArgs.read(helpers.injectCommand("generate-feature namehere -t template extra stuff that should fail regularly")).status).toBe(RFG_STATUS.ERROR);
        expect(rfgArgs.read([]).status).toBe(RFG_STATUS.ERROR);
    });

    it("Should pass when argv has ideal input", ()=>{
        expect(rfgArgs.read(helpers.injectCommand("generate-feature customName")).status).toBe(RFG_STATUS.OK);
        expect(rfgArgs.read(helpers.injectCommand("generate-feature customName -t redux-typescript")).status).toBe(RFG_STATUS.OK);
        expect(rfgArgs.read(helpers.injectCommand("generate-feature customName -t redux-javascript")).status).toBe(RFG_STATUS.OK);
        expect(rfgArgs.read(helpers.injectCommand("generate-feature customName ./tests/src/features -t redux-javascript")).status).toBe(RFG_STATUS.OK);
    });

    it("Should fail when argv has wrong flag in input", ()=>{
        expect(rfgArgs.read(helpers.injectCommand("generate-feature customName -z should-fail")).status).toBe(RFG_STATUS.UNKNOWN_FLAG_ERROR);
        expect(rfgArgs.read(helpers.injectCommand("generate-feature customName -t should-fail")).status).toBe(RFG_STATUS.ERROR);
    });

    it("Should fail when argv has incorrect path for position 2", ()=>{
        expect(rfgArgs.read(helpers.injectCommand("generate-feature customName should-fail")).status).toBe(RFG_STATUS.FOLDER_NOT_FOUND_ERROR);
        expect(rfgArgs.read(helpers.injectCommand("generate-feature customName ./americanAirlines")).status).toBe(RFG_STATUS.FOLDER_NOT_FOUND_ERROR);
    });

    it("Should fail when name provided does not follow naming of variables", ()=>{
        expect(rfgArgs.read(helpers.injectCommand("generate-feature custom-Name -t redux-javascript")).status).toBe(RFG_STATUS.FEATURE_NAMING_ERROR);
        expect(rfgArgs.read(helpers.injectCommand("generate-feature custom,Name -t redux-javascript")).status).toBe(RFG_STATUS.FEATURE_NAMING_ERROR);
        expect(rfgArgs.read(helpers.injectCommand("generate-feature custom.Name -t redux-javascript")).status).toBe(RFG_STATUS.FEATURE_NAMING_ERROR);
        expect(rfgArgs.read(helpers.injectCommand("generate-feature custom%Name -t redux-javascript")).status).toBe(RFG_STATUS.FEATURE_NAMING_ERROR);
        expect(rfgArgs.read(helpers.injectCommand("generate-feature customName/ -t redux-javascript")).status).toBe(RFG_STATUS.FEATURE_NAMING_ERROR);
    });
});

describe("Testing command output", ()=>{
    it("Should return the current version", ()=>{
        const cfg = require('../package.json')

        expect(typeof rfgArgs.version(helpers.injectCommand("generate-feature -v"))).toBe("string")
        expect(
             /^(v)(?:(\d+)\.)?(?:(\d+)\.)?(\*|\d+)$/.test(rfgArgs.version(cfg))
             ).toBeTruthy();

        expect(rfgArgs.version(cfg)).toEqual(`v${cfg.version}`)
    });
});