import {pickRandomBeer} from './utils';
const testList = [1,2,3,4,5];
describe('Common Util Methods', () => {
  it('should return a value from the array', () => {
    const randomBeer = pickRandomBeer(testList);
    expect(testList).toContain(randomBeer);
  });
});
