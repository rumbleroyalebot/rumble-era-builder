import { RandomElementPipe } from "./random-element.pipe";

describe("RandomElementPipe", () => {
  let pipe: RandomElementPipe;

  beforeEach(() => {
    pipe = new RandomElementPipe();
  });

  it("create an instance", () => {
    expect(pipe).toBeTruthy();
  });

  it("should return an element from the array", () => {
    const testArray = [1, 2, 3, 4, 5];
    const result = pipe.transform(testArray) as number;
    expect(testArray.includes(result)).toBeTruthy();
  });

  it("should return undefined for an empty array", () => {
    const result = pipe.transform([]);
    expect(result).toBeUndefined();
  });
});
