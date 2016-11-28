const doesMatch = (str) => (key) => (String(key)).toLowerCase().indexOf(str) !== -1;


const filterData = (items, filterString) => {
  const str = filterString && filterString.toLowerCase();
  return str !== ''
    ? items.filter((r) => getValuesFromObject(r).some(doesMatch(str)))
    : items;
};


// TODO - Add support for basic data types at least date and number
const sortData = (items, sortKey, sortDesc) => {
  const multiplier = sortDesc ? -1 : 1;
  items.sort((a, b) => {
    const aVal = a[sortKey] || '';
    const bVal = b[sortKey] || '';
    return aVal > bVal ? multiplier : (aVal < bVal ? -multiplier : 0); // eslint-disable-line no-nested-ternary
  });
  return items;
};

const getValuesFromObject = (data) => {
  const arr = [];
  Object.keys(data).forEach(key => {
    arr.push(data[key]);
  });
  return arr;
};

export { filterData, sortData };
