import avatarPlaceholder from '../assets/images/avatarPlaceholder.png';

type GenerateAvatarURLType = (avatarPath: string | undefined) => string;

const generateAvatarURL: GenerateAvatarURLType = (avatarPath) => {
  let avatar = avatarPlaceholder;

  if (avatarPath) {
    avatar = avatarPath.includes('http')
      ? avatarPath.slice(1)
      : `https://image.tmdb.org/t/p/original/${avatarPath}`;
  }

  return avatar;
};

export default generateAvatarURL;
