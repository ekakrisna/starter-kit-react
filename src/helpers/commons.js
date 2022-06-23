import qs from 'query-string';

export const getValueFromQueryString = (keys, search) => {
  const parsedSearch = qs.parse(search);

  const selectedSearch = {};

  keys.forEach((key) => {
    if (parsedSearch[key]) {
      selectedSearch[key] = parsedSearch[key];
    }
  });

  return selectedSearch;
};

export const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
