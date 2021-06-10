import React from 'react';
import Result from './Result';

function ResultTable(props) {
  const list = props.extractedData.map((bundle, i) => <Result bundle={bundle} id={i} />);
  return <div className="result-table">{list}</div>;
}

export default ResultTable;
