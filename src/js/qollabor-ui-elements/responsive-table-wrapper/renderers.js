class Renderers {
  renderSortArrow (sortKey, sortDesc, sortId) {
    const sortDescVal = sortDesc ? '↓' : '↑';
    return sortKey === sortId ? sortDescVal : '';
  }
}

export default new Renderers();

