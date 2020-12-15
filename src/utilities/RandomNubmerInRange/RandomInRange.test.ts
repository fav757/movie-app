import randomInRange from './RandomNumberInRange';

describe('randomInRange component', () => {
  test('should return random int not bigger than range gap', () => {
    expect(randomInRange(0, 20)).toBeLessThanOrEqual(20);
  });

  test('should return random int not less than range gap', () => {
    expect(randomInRange(0, 20)).toBeGreaterThanOrEqual(0);
  });
});
