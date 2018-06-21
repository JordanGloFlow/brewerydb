import React, {Component} from 'react';
import {connect} from 'react-redux';
import DetailsContainer from './details/DetailContainer';

import SearchContainer from './search/SearchContainer';
import ListContainer from './list/ListContainer';
import {fetchBeer} from './actions';
import {pickRandomBeer} from './utils';

import './App.css';

const Loading = (props) => (
  <div className="loading">Loading Beer Data</div>
);

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.props.fetchBeer();
    this.onSearchClick = this.onSearchClick.bind(this);
    this.moreFromBrewery = this.moreFromBrewery.bind(this);
    this.brewerList = null;
    this.state = {brewery: null, showList: false, loadingList: false};
  }

  moreFromBrewery(val) {
    return fetch(`/api/brewery/${val[0].id}/beers`)
      .then(resp => {
        this.setState({loadingList: true, showList: true});
        return resp.json();
      })
      .then((json) => {
        this.setState({brewery: json.data, showList: true, loadingList: false});
      });
  }

  onSearchClick(type, search) {
    const url = `/api/${type}/search?name=${search}`;
    return fetch(url)
      .then(resp => {
        this.setState({loadingList: true, showList: true});
        return resp.json();
      })
      .then((json) => {
        this.setState({brewery: json, showList: true, loadingList: false});
      });
  }

  render() {
    const {fetching, items} = this.props.beers;
    if (fetching || items === null) return Loading();

    const randomBeerForLoad = pickRandomBeer(items);
    const brewery = this.state.brewery;
    const loadList = this.state.loadingList;
    return (
      <div className="AppContainer container">
        <DetailsContainer
          list={this.props.beers.items}
          moreFromBrewery={this.moreFromBrewery}
          item={randomBeerForLoad} />
        <SearchContainer
          searchCallBack={this.onSearchClick} />
        {this.state.showList &&
          <ListContainer
            loadList={loadList}
            brew={brewery} />
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  beers: state.beers,
  fetching: state.fetching,
});

const mapDispatchToProps = dispatch => ({
  fetchBeer: id => dispatch(fetchBeer(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer);
