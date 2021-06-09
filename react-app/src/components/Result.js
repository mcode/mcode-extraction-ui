import React from 'react';

import '../stylesheets/Home.css';

class Result extends React.Component {
  render() {
    this.whatever = 10;
    return (
      <div>
        <p>This is a result item listed in the table on the ResultPage</p>
      </div>
    );
  }
}

export default Result;
