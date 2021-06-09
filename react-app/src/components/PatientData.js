import React from 'react';

import '../stylesheets/Home.css';

class PatientData extends React.Component {
  render() {
    return (
      <div>
        <p>This where the JSON schema for patient {this.props.id} will be displayed</p>
      </div>
    );
  }
}

export default PatientData;
