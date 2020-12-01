import avatarPlaceholder from '../../assets/images/avatarPlaceholder.png';
import generateAvatarURL from './generateAvatarURL';

describe('generateAvatarURL utilite', () => {
  test("should use placeholder if avatar url wasn't provided", () => {
    const url = generateAvatarURL();
    expect(url).toBe(avatarPlaceholder);
  });

  test('should use format url if avatar path was provided', () => {
    const url = generateAvatarURL('avatarPath');
    expect(url).toBe('https://image.tmdb.org/t/p/original/avatarPath');
  });

  test('should use format url if avatar link was provided', () => {
    const url = generateAvatarURL('?http://localhost/avatarPath.png');
    expect(url).toBe('http://localhost/avatarPath.png');
  });
});
