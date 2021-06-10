import React from 'react';

import '../stylesheets/Home.css';

function Result(props) {
  return (
    <div>
      <p>This is result item {props.id} listed in the table on the ResultPage</p>
    </div>
  );
}

export default Result;
