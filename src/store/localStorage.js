export const getDataFromLS = (dataName) =>
  JSON.parse(localStorage.getItem(dataName));

export const setDataToLS = (dataName, data) => {
  localStorage.setItem(dataName, JSON.stringify(data));
};

export const deleteDataFromLS = (dataName) => {
  localStorage.removeItem(dataName);
};

export const clearLS = () => {
  localStorage.clear();
};
