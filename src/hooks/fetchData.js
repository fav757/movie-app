import { useEffect } from 'react';

function useFetchData(requestLink, setState) {
  useEffect(() => {
    (async function () {
      try {
        const request = await fetch(requestLink);
        const response = await request.json();
        setState(response);
      } catch (e) {
        console.log(e, "Can't fetch data from server");
        setState(e);
      }
    })();
  }, [setState, requestLink]);
}

export default useFetchData;
