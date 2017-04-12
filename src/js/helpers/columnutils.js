const visibleColumnCount = columns => columns.count(item => item.get('visible'));

const handleActions = (columns, action) => {
  const index = columns.findIndex(item => item.get('key') === action.columnName);

  // Unluckily the ImmutableJS list implementation will accept negative numbers and update unwanted columns
  // if this is not check
  if (index === -1) {
    throw new Error(`Wrong column name passed [${action.columnName}]`);
  }

  const updatedColumns = columns.update(index,
    (foundColumn) => {
      const count = visibleColumnCount(columns);

      if (foundColumn.get('visible') && count === 1) {
        return foundColumn;
      }

      return foundColumn.set('visible', !foundColumn.get('visible'));
    }
  );

  return updatedColumns;
};

const columnChooser = (state = {}, action) => handleActions(state, action);

export default columnChooser;
