import React, {Component} from 'react';
import './listStyles.css';
import Display from '../details/Display';

const Loading = (props) => (
  <div className="loading">Loading Beer Data</div>
);

function Item(props) {
  const name = props.item.type === 'brewery' ? 'Brewery' : 'Beer';
  const image = props.item.type === 'brewery' ? props.item.images.icon : props.item.labels.icon;
  return <li key={`beer-${props.index}`} >
    <div className="wrapper flow-row">
      <div className="beer-image">
        <Display image={image} />
      </div>
      <div className="beer-details">
        <h4>{name}: {props.item.name}</h4>
        <div>{props.item.description}</div>
      </div>
    </div>
  </li>;
}

function List(props) {
  let items = [];
  props.beers.forEach((item, index) => {
    if (item.type === 'brewery' && item.images && item.description) {
      items.push(<Item key={index} item={item} index={index} />);
    } else if (item.labels && item.description) {
      items.push(<Item key={index} item={item} index={index} />);
    }
  });
  return <ul key="list-of-beers">{items}</ul>;
}

export default class ListContainer extends Component {
  render() {
    let listDisplay = this.props.loadList ? <Loading /> : <List beers={this.props.brew} />;
    if (!this.props.loadList && !this.props.brew) {
      listDisplay = <div>No items found matching the search criteria</div>;
    }
    return (
      <div className="ListContainer row">
        <h1>Search Results</h1>
        {listDisplay}
      </div>
    );
  }
}
