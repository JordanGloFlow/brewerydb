import React, {Component} from 'react';

export default class ActionButton extends Component {
  render() {
    return (
      <div className="ActionButton"
        onClick={this.props.onClick}>{this.props.title}</div>
    );
  }
}
