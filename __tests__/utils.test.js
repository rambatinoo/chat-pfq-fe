import { filterMessagesByUsername } from "../src/utils/filterMessagesByUsername.js";
import { timeSince } from "../src/utils/TimeAgo.js";

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

describe("timeSince", () => {
  it("returns the correct string when the time is 1 second ago", () => {
    const now = new Date();
    const oneSecond = new Date(now - 1 * 1000);
    expect(timeSince(oneSecond)).toBe("1 second ago");
  });

  it("returns the correct string when the time is 10 seconds ago", () => {
    const now = new Date();
    const tenSeconds = new Date(now - 10 * 1000);
    expect(timeSince(tenSeconds)).toBe("10 seconds ago");
  });

  it("returns the correct string when the time is 28 nimutes ago", () => {
    const now = new Date();
    const minsAgo = new Date(now - 28 * 60 * 1000);
    expect(timeSince(minsAgo)).toBe("28 minutes ago");
  });

  it("returns the correct string when the time is 18 hours ago", () => {
    const now = new Date();
    const hoursAgo = new Date(now - 18 * 60 * 60 * 1000);
    expect(timeSince(hoursAgo)).toBe("18 hours ago");
  });

  it("returns the correct string when the time is 1 day ago", () => {
    const now = new Date();
    const dayAgo = new Date(now - 1 * 24 * 60 * 60 * 1000);
    expect(timeSince(dayAgo)).toBe("1 day ago");
  });

  it("returns the correct string when the time is 6 months ago", () => {
    const now = new Date();
    const monthsAgo = new Date(now - 6 * 30 * 24 * 60 * 60 * 1000);
    expect(timeSince(monthsAgo)).toBe("6 months ago");
  });

  it("returns the correct string when the time is 5 years ago", () => {
    const now = new Date();
    const yearsAgo = new Date(now - 5 * 12 * 30 * 24 * 60 * 60 * 1000);
    expect(timeSince(yearsAgo)).toBe("5 years ago");
  });

  it("works for non-exact times", () => {
    const now = new Date();
    // 13 min & 12 seconds ago is 792000ms
    const complexAgo = new Date(now - 792000);
    expect(timeSince(complexAgo)).toBe("13 minutes ago");
  });
});
