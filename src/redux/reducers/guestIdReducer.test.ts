import guestIdReducer from './guestIdReducer';

describe('guestId reducer', () => {
  test('should change value if type = CHANGE_SESSION_ID', () => {
    const state = guestIdReducer('', {
      type: 'CHANGE_SESSION_ID',
      payload: 'test',
    });
    expect(state).toBe('test');
  });

  test('should not change value if type != CHANGE_SESSION_ID', () => {
    const state = guestIdReducer('', {
      type: 'UNKNOWN_TYPE',
      payload: 'test',
    });
    expect(state).toBe('');
  });
});
