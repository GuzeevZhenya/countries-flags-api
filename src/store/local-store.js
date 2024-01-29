export const loadState = () => {
  try {
    const saveState = localStorage.getItem("state");
    if (saveState === null) {
      return undefined;
    }

    return JSON.parse(saveState);
  } catch (error) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const stateToBeSaved = JSON.stringify(state);

    localStorage.setItem("state", stateToBeSaved);
  } catch (error) {
    console.log(error);
  }
};
