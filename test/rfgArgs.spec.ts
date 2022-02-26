import { rfgArgs, RFG_STATUS } from "../src/lib/rfgArgs"
import { helpers } from "./testhelpers"

describe("Arguments Object Doesn't Blowup", () => {
    it("Should not be undefined", ()=>{
        expect(rfgArgs).toBeDefined()
    });
})

describe("Testing Argument Types", () => { 
    it("Should have a read function", ()=>{
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
        expect(rfgArgs.read(helpers.injectCommand("generate-feature namehere -t template extra stuff that should fail")).status).toBe(RFG_STATUS.ERROR);
        expect(rfgArgs.read([]).status).toBe(RFG_STATUS.ERROR);
    });

    it("Should pass when argv has ideal input", ()=>{
        expect(rfgArgs.read(helpers.injectCommand("generate-feature customName")).status).toBe(RFG_STATUS.GO);
        expect(rfgArgs.read(helpers.injectCommand("generate-feature customName -t redux-typescript")).status).toBe(RFG_STATUS.GO);
        expect(rfgArgs.read(helpers.injectCommand("generate-feature customName -t redux-javascript")).status).toBe(RFG_STATUS.GO);
    });

    it("Should fail when argv has wrong flag in input", ()=>{
        expect(rfgArgs.read(helpers.injectCommand("generate-feature customName -z should-fail")).status).toBe(RFG_STATUS.ERROR);
        expect(rfgArgs.read(helpers.injectCommand("generate-feature customName -t should-fail")).status).toBe(RFG_STATUS.ERROR);
    });

    it("Should fail when argv has wrong flag in input", ()=>{
        expect(rfgArgs.read(helpers.injectCommand("generate-feature customName should-fail")).status).toBe(RFG_STATUS.ERROR);
    });
});

describe("Testing command output", ()=>{
    it("Should return the current version", ()=>{
        const cfg = require('../package.json')
        expect(typeof rfgArgs.version(helpers.injectCommand("generate-feature -v"))).toBe("string")
        expect(
             /^(v)(?:(\d+)\.)?(?:(\d+)\.)?(\*|\d+)$/.test(rfgArgs.version(cfg))
             ).toBeTruthy();
    });
});