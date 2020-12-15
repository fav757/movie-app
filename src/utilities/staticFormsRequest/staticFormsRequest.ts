const staticFormsRequest = (formData: string): Promise<boolean> => {
  return fetch(
    `https://script.google.com/macros/s/AKfycbytoK3WK7JtcDD9cFJDJBshLRshg5g-Q9k5zo7vH3qT0nZI1NA/exec${formData}`,
    {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
    },
  ).then(
    () => true,
    () => false,
  );
};

export default staticFormsRequest;
