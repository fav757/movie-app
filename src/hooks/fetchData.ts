import { type } from 'os';
import { useEffect } from 'react';

const useFetchData = (
  requestLink: string | null,
  setState: React.Dispatch<React.SetStateAction<any>>,
): void => {
  useEffect(() => {
    if (requestLink === null) return;

    fetch(requestLink)
      .then((request) => request.json())
      .then((response) => setState(response))
      .catch((e) => setState(e));
  }, [setState, requestLink]);
};

export default useFetchData;
