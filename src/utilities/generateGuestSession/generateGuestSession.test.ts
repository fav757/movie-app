import generateGuestSession from './generateGuestSession';

describe('generateGuestSession function', () => {
  test('should handle failiar responses and do not set value to localStorage', async () => {
    (global.fetch as jest.Mock) = jest.fn(() =>
      Promise.resolve(Response.error()),
    );

    const response = await generateGuestSession();
    expect(response).toBe(false);
    expect(localStorage.getItem('sessionId')).toBeNull();
  });

  test('should handle success responses and set value to localStorage', async () => {
    (global.fetch as jest.Mock) = jest.fn(() =>
      Promise.resolve(
        new Response(
          JSON.stringify({
            success: true,
            guest_session_id: '1ce82ec1223641636ad4a60b07de3581',
          }),
        ),
      ),
    );

    const response = await generateGuestSession();
    expect(response).toBe(true);
    expect(localStorage.getItem('sessionId')).toBe(
      '1ce82ec1223641636ad4a60b07de3581',
    );
  });
});
