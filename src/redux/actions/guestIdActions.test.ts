import { changeGuestId } from './guestIdActions';

describe('guest id', () => {
  test('create guest id action should return corresponding object', () => {
    expect(changeGuestId('test')).toEqual({
      type: 'CHANGE_SESSION_ID',
      payload: 'test',
    });
  });
});
