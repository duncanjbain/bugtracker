import React from 'react';

const SortButton = ({ sortOrder }) => {
  if (sortOrder === 'ascending') {
    return <p>Ascending</p>;
  }
  if (sortOrder === 'descending') {
    return <p>Descending</p>;
  }
  return <p>Not sorted</p>;
};

export default SortButton;
