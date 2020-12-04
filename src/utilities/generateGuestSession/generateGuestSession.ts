const generateGuestSession = (): Promise<boolean> => {
  return fetch(
    `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=09ecd60e9326551324881d2239a8f12a`,
  )
    .then((response) => response.json())
    .then((json) => {
      localStorage.setItem('sessionId', json.guest_session_id);
      return true;
    })
    .catch(() => false);
};

export default generateGuestSession;
