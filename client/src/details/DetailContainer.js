import React, {Component} from 'react';
import Display from './Display';
import Description from './Description';

import './detailStyle.css';
import ActionButton from '../ActionButton';
import {pickRandomBeer} from '../utils';

class DetailsContainer extends Component {
  constructor(props) {
    super(props);
    this.onAnotherClick = this.onAnotherClick.bind(this);
    this.onMoreFromBrewery = this.onMoreFromBrewery.bind(this);
    this.state = {beer: this.props.item};
  }

  onAnotherClick() {
    const randBeer = pickRandomBeer(this.props.list);
    this.setState({beer: randBeer});
  }

  onMoreFromBrewery() {
    this.props.moreFromBrewery(this.props.item.breweries);
  }

  render() {
    const {description, labels, name} = this.state.beer;
    return (
      <div className="DetailsContainer row">
        <div className="description-image-container col-md-3">
          <span>{name}</span>
          <Display image={labels.medium} />
        </div>
        <div className="description-container col-lg-6">
          <Description description={description} />
        </div>
        <div className="description-actions col-md-2">
          <ActionButton
            title="Another Beer"
            onClick={this.onAnotherClick} />
          <br />
          <ActionButton
            title="More From This Brewery"
            onClick={this.onMoreFromBrewery} />
        </div>
      </div>
    );
  }
}

export default DetailsContainer;
