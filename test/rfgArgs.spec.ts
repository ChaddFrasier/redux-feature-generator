import { rfgArgs } from "../src/lib/rfgArgs"

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