import { wait } from '@testing-library/react';
import avatarPlaceholder from '../../assets/images/avatarPlaceholder.png';
import {
  generateAvatarURL,
  generateGuestSession,
  getImage,
  getUrl,
  loadData,
} from './movieDB';

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

describe('loadData function', () => {
  test('should work with single link', async () => {
    (global.fetch as jest.Mock) = jest.fn(
      () => new Response(JSON.stringify({ data: 'link' })),
    );

    const store: Record<string, any> = {};
    const setData = (data: unknown): void => {
      store.result = data;
    };

    await wait(() => loadData('link', setData as (data: unknown) => void));
    expect(store.result.data).toBe('link');
  });

  test('should work with multiple links', async () => {
    let linkCount = 0;

    (global.fetch as jest.Mock) = jest.fn(() => {
      linkCount += 1;
      return new Response(JSON.stringify({ data: `link${linkCount}` }));
    });

    const store: Record<string, any> = {};
    const setData = (data: unknown): void => {
      store.result = data;
    };

    await wait(() =>
      loadData(['link1', 'link2', 'link3'], setData as (data: unknown) => void),
    );

    expect(store.result[0].data).toBe('link1');
    expect(store.result[1].data).toBe('link2');
    expect(store.result[2].data).toBe('link3');
  });
});

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

describe('getUrl function', () => {
  test('should work for get title information requests', () => {
    expect(getUrl(['movie', 'top_rated'])).toBe(
      'https://api.themoviedb.org/3/movie/top_rated?api_key=09ecd60e9326551324881d2239a8f12a&&page=1',
    );
  });

  test('should work for get category data requests', () => {
    expect(getUrl(['trending', 'all', 'day'])).toBe(
      'https://api.themoviedb.org/3/trending/all/day?api_key=09ecd60e9326551324881d2239a8f12a&&page=1',
    );
  });

  test('should work for search requests', () => {
    const query = 'searchRequest';
    expect(getUrl(['search', 'multi'], 5, query)).toBe(
      `https://api.themoviedb.org/3/search/multi?api_key=09ecd60e9326551324881d2239a8f12a&&page=5&query=${query}`,
    );
  });
});

describe('getImage function', () => {
  const path = '/img_path.png';

  test('should create link fow low res pictures', () => {
    expect(getImage(true, path)).toBe(
      'https://image.tmdb.org/t/p/w500/img_path.png',
    );
  });

  test('should create link fow high res pictures', () => {
    expect(getImage(false, path)).toBe(
      'https://image.tmdb.org/t/p/original/img_path.png',
    );
  });
});
