import React, {Component} from 'react';

export default class Description extends Component {

  render() {
    return (
      <div>
        {this.props.description}
      </div>
    );
  }
}
