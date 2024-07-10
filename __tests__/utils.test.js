import { filterMessagesByUsername } from "../src/utils/filterMessagesByUsername.js";

describe("filterMessagesByUsername", () => {
  it("should return an array", () => {
    const input1 = [{ from: "barry", to: "admin" }];
    const input2 = "barry";
    const result = filterMessagesByUsername(input1, input2);
    expect(Array.isArray(result)).toBe(true);
  });

  it("returns a new array", () => {
    const input1 = [{ from: "barry", to: "admin" }];
    const input2 = "barry";
    const result = filterMessagesByUsername(input1, input2);
    expect(result).not.toBe(input1);
  });

  it("should return an empty array when passed an array with no matching usernames", () => {
    const input1 = [{ from: "barry", to: "admin" }];
    const input2 = "bubbles";
    const result = filterMessagesByUsername(input1, input2);
    expect(result).toEqual([]);
  });

  it("return an array with the correct usernames filtered out", () => {
    const input1 = [
      { from: "barry", to: "admin" },
      { from: "admin", to: "barry" },
      { from: "lewis", to: "admin" },
    ];
    const input2 = "barry";
    const result = filterMessagesByUsername(input1, input2);
    expect(result).toEqual([
      { from: "barry", to: "admin" },
      { from: "admin", to: "barry" },
    ]);
  });

  it("does not mutate input array", () => {
    const input1 = [
      { from: "barry", to: "admin" },
      { from: "admin", to: "barry" },
      { from: "lewis", to: "admin" },
    ];
    const input1Copy = [
      { from: "barry", to: "admin" },
      { from: "admin", to: "barry" },
      { from: "lewis", to: "admin" },
    ];
    const input2 = "barry";
    const result = filterMessagesByUsername(input1, input2);
    expect(input1).toEqual(input1Copy);
  });
});
