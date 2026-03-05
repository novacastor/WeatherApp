export const shouldFetchFreshData = (key) => {
  const lastFetch = localStorage.getItem(key);
  const oneHourMs = 60 * 60 * 1000;

  if (!lastFetch) return true;
  const date = Date.now();

  return date - parseInt(lastFetch) >= oneHourMs;
};

export const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    console.log("Data saved to storage for: " + key);
  } catch (error) {
    console.error("Storage error: ", error);
  }
};

export const getFromStorage = (key) => {
  try {
    console.log("Getting data from Storage for: " + key);
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Retrieval error: ", error);
    return null;
  }
};
