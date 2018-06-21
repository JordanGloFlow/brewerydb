import React, {Component} from 'react';

export default class Display extends Component {

  render() {
    return (
      <img
        className="display-image"
        alt="beer-icon"
        src={this.props.image} />
    );
  }
}
