import staticFormsRequest from './staticFormsRequest';

describe('staticFormsRequest utilite', () => {
  test('should return true promise if api provides a response', async () => {
    (global.fetch as jest.Mock) = jest.fn(() => Promise.resolve());
    const result = await staticFormsRequest('');
    expect(global.fetch as jest.Mock).toBeCalledTimes(1);
    expect(result).toBe(true);
  });

  test('should return false promise if api does not provides a response', async () => {
    (global.fetch as jest.Mock) = jest.fn(() => Promise.reject());
    const result = await staticFormsRequest('');
    expect(global.fetch as jest.Mock).toBeCalledTimes(1);
    expect(result).toBe(false);
  });
});
