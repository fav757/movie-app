import { Dispatch, SetStateAction, useEffect } from 'react';

export type UseFetchDataType = (
  requestLinks: string | string[],
  setState: Dispatch<SetStateAction<any>>,
) => void;

const useFetchData: UseFetchDataType = (requestLinks, setState) => {
  useEffect(() => {
    const linksArr =
      typeof requestLinks === 'string' ? [requestLinks] : requestLinks;
    (async () => {
      try {
        const requests = linksArr.map((link) => fetch(link));
        const responses = await Promise.all(requests);
        const jsons = responses.map((element) => element.json());
        const data = await Promise.all(jsons);
        setState(typeof requestLinks === 'string' ? data[0] : data);
      } catch (e) {
        setState(e);
      }
    })();
  }, [requestLinks, setState]);
};

export default useFetchData;
