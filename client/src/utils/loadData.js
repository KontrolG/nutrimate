const loadData = async (
  dispatch,
  setLoadingActionCreator,
  dataFetchingFunction
) => {
  dispatch(setLoadingActionCreator(true));
  const result = await dataFetchingFunction();
  dispatch(setLoadingActionCreator(false));
  return result;
};

export default loadData;
