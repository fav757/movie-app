import avatarPlaceholder from '../../assets/images/avatarPlaceholder.png';

export const key = '09ecd60e9326551324881d2239a8f12a';
export const baseLink = 'https://api.themoviedb.org/3';

// generate url for other methods requests
type GetUrl = (
  path: string[],
  page?: string | number,
  query?: string,
) => string;

export const getUrl: GetUrl = (path, page = 1, query) => {
  const url = path.join('/');
  return `${baseLink}/${url}?api_key=${key}&&page=${page}${
    query ? `&query=${query}` : ''
  }`;
};

// Create url to get img from TMBD
type GetImage = (isSmall: boolean, path: string) => string;
export const getImage: GetImage = (isSmall, path) => {
  return `https://image.tmdb.org/t/p/${isSmall ? 'w500' : 'original'}${path}`;
};

// Sends request with cliet rating and saves response status as sting
type RateTitle = (
  title: string,
  showId: string | number,
  showType: string,
  sessionId: string | number,
  saveData: (data: string) => void,
) => Promise<void>;

export const rateTitle: RateTitle = (
  title,
  showId,
  showType,
  sessionId,
  saveData,
) => {
  return fetch(
    `${baseLink}/${showType}/${showId}/rating?api_key=${key}&guest_session_id=${sessionId}`,
    {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      method: 'POST',
      body: JSON.stringify({
        value: title,
      }),
    },
  )
    .then((response) => response.json())
    .then((json) => saveData(json.status_message || json.message))
    .catch(() => saveData("Can't sent data"));
};

// Generates string for loading picture with user avatar
type GenerateAvatarURLType = (avatarPath?: string | undefined) => string;

export const generateAvatarURL: GenerateAvatarURLType = (avatarPath) => {
  let avatar = avatarPlaceholder;

  if (avatarPath) {
    avatar = avatarPath.includes('http')
      ? avatarPath.slice(1)
      : `https://image.tmdb.org/t/p/original/${avatarPath}`;
  }

  return avatar;
};

// Loads the token for guest session and sets it in the local storage
export const generateGuestSession = (): Promise<boolean> => {
  return fetch(`${baseLink}/authentication/guest_session/new?api_key=${key}`)
    .then((response) => response.json())
    .then((json) => {
      localStorage.setItem('sessionId', json.guest_session_id);
      return true;
    })
    .catch(() => false);
};

// Loads information from single url of array of urls
type LoadData = (
  requestLinks: string | string[],
  setState: <T>(data: T) => void,
) => void;

export const loadData: LoadData = async (requestLinks, setState) => {
  const linksArr = Array.isArray(requestLinks) ? requestLinks : [requestLinks];

  try {
    const requests = linksArr.map((link) => fetch(link));
    const responses = await Promise.all(requests);
    const jsons = responses.map((element) => element.json());
    const data = await Promise.all(jsons);
    setState(typeof requestLinks === 'string' ? data[0] : data);
  } catch (e) {
    setState(e);
  }
};
