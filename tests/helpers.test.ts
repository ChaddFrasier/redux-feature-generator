import * as helpers from "../src/lib/helpers"

describe("Helper.ts Tests", () => {
    test("Test that the functions are exported", () => {
        expect(helpers).toBeDefined()
        expect(helpers.capitalize).toBeDefined()
        expect(helpers.lowercase).toBeDefined()
        expect(helpers.replaceAll).toBeDefined()
        expect(helpers.validName).toBeDefined()
    });

    test("Test the capitalize function", () => {
        expect(helpers.capitalize("dElloWorld")).toBe("DElloWorld");
        expect(helpers.capitalize("codingStick342")).toBe("CodingStick342");
        expect(helpers.capitalize("")).toBe("");
    });

    test("Test the capitalize function", () => {
        expect(helpers.lowercase("DElloWorld")).toBe("dElloWorld");
        expect(helpers.lowercase("CodingStick342")).toBe("codingStick342");
        expect(helpers.lowercase("")).toBe("");
    });

    test("Test the capitalize function", () => {
        expect(helpers.replaceAll("DElloWorld", "World", "Test")).toBe("DElloTest");
        expect(helpers.replaceAll("FindAllOfTheFinds", "Find", "Test")).toBe("TestAllOfTheTests");
        expect(helpers.replaceAll("", "Find", "Test")).toBe("");
    });

    test("Test the capitalize function", () => {
        expect(helpers.validName("NewFeature3")).toBeTruthy()
        expect(helpers.validName("validnameHere")).toBeTruthy()
        expect(helpers.validName("validname^Here")).toBeFalsy()
        expect(helpers.validName("validname.Here")).toBeFalsy()
        expect(helpers.validName("validname(Here")).toBeFalsy()
    });
})