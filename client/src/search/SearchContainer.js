import React, {Component} from 'react';
import ActionButton from '../ActionButton';
import './search.css';

export default class SearchContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "beer",
      search: "",
      error: false
    };
    this.reg = new RegExp(/^[a-zA-Z0-9-\s]*$/);
    this.onSearchClick = this.onSearchClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onRadioChange = this.onRadioChange.bind(this);
  }

  onSearchClick() {
    this.props.searchCallBack(this.state.type, this.state.search);
  }

  onChange({target}) {
    const val = target.value;
    if (this.reg.test(val)) {
      this.setState({[target.name]: val, error: false});
    } else {
      this.setState({error: true});
    }
  }

  onRadioChange({target}) {
    this.setState({type: target.value});
  }

  render() {
    return (
      <div className="SearchContainer row">
        <div className="search-box col-md-3">
          <span>Search</span>
          {this.state.error &&
            <div className="alert alert-primary" role="alert">
            Search can only contain letters,
            numbers, hyphens and spaces</div>
          }
          <input type="text"
            name="search"
            value={this.state.search}
            onChange={this.onChange} />
        </div>
        <div className="radio-container col-md-3">
          <input type="radio" name="beer" id="beer-rdb" value="beer"
            onChange={this.onRadioChange}
            checked={this.state.type === "beer"} />
          <label htmlFor="beer-rdb">Beer</label>
          <input type="radio" name="brewery" id="brewery-rdb" value="brewery"
            onChange={this.onRadioChange}
            checked={this.state.type === "brewery"} />
          <label htmlFor="brewery-rdb">Brewery</label>
        </div>
        <div className="action-group">
          <ActionButton
            title="Search"
            onClick={this.onSearchClick} />
        </div>
      </div>
    );
  }
}
