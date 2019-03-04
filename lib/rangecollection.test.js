import RangeCollection from './rangecollection';

const rc = new RangeCollection();

test('should return [1, 5) when first range is [1, 5]', () => {
  rc.add([1, 5]);
  expect(rc.print()).toBe('[1, 5)');
});

test('should return [1, 5) [10, 20) when range added is [10, 20]', () => {
  rc.add([10, 20]);
  expect(rc.print()).toBe('[1, 5) [10, 20)');
});

test('should return [1, 5) [10, 20) when range added is [20, 20]', () => {
  rc.add([20, 20]);
  expect(rc.print()).toBe('[1, 5) [10, 20)');
});

test('should return [1, 5) [10, 21) when range added is [20, 21]', () => {
  rc.add([20, 21]);
  expect(rc.print()).toBe('[1, 5) [10, 21)');
});

test('should return [1, 5) [10, 21) when range added is [2, 4]', () => {
  rc.add([2, 4]);
  expect(rc.print()).toBe('[1, 5) [10, 21)');
});

test('should return [1, 8) [10, 21) when range added is [3, 8]', () => {
  rc.add([3, 8]);
  expect(rc.print()).toBe('[1, 8) [10, 21)');
});

test('should return [1, 8) [10, 21) when range added is [10, 10]', () => {
  rc.add([10, 10]);
  expect(rc.print()).toBe('[1, 8) [10, 21)');
});

test('should return [1, 8) [11, 21) when range removed is [10, 11]', () => {
  rc.remove([10, 11]);
  expect(rc.print()).toBe('[1, 8) [11, 21)');
});

test('should return [1, 8) [11, 15) [17, 21) when range removed is [15, 17]', () => {
  rc.remove([15, 17]);
  expect(rc.print()).toBe('[1, 8) [11, 15) [17, 21)');
});

test('should return [1, 3) [19, 21) when range removed is [3, 19]', () => {
  rc.remove([3, 19]);
  expect(rc.print()).toBe('[1, 3) [19, 21)');
});
