const getObjectFromEntries = entries => entries.reduce(toObjectFromEntries, {});

const toObjectFromEntries = (object, [key, value]) => ({
  ...object,
  [key]: value
});

export default getObjectFromEntries;
