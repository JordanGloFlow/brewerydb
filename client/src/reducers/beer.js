import {FETCH_BEERS_REQUEST, FETCH_BEERS_SUCCESS, FETCH_BEERS_FAILURE} from '../actions';
const initialState = {
  items: null,
  fetching: false,
  error: null
};

function fix(beers) {
  const filtered = beers.filter(item => item.description && item.labels);
  return filtered;
}

export default function beerReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_BEERS_REQUEST:
      return {
        ...state,
        fetching: true,
        error: null
      };

    case FETCH_BEERS_SUCCESS:
      action.payload.beers = fix(action.payload.beers);
      return {
        ...state,
        fetching: false,
        items: action.payload.beers
      };

    case FETCH_BEERS_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.payload.error,
        items: []
      };

    default:
      return state;
  }
}
