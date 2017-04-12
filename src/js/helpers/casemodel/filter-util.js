const doesMatch = str => key => String(key).toLowerCase().indexOf(str) !== -1;

const filterData = (items, filterString) => {
  const str = filterString && filterString.toLowerCase();
  return str !== '' ?
    items.filter(r => getValuesFromObject(r).some(doesMatch(str))) :
    items;
};

const getValuesFromObject = (obj) => {
  const values = [];

  Object.keys(obj).forEach((key) => {
    if (obj.hasOwnProperty(key)) {
      values.push(obj[key]);
    }
  });
  return values;
};

export { filterData };
