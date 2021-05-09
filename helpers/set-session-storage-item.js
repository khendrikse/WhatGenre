const setSessionStorageItem = (key, value) => {
  window.sessionStorage.setItem(key, JSON.stringify(value));
};

export default setSessionStorageItem;
