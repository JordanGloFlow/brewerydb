export const FETCH_BEERS_REQUEST = 'FETCH_BEERS_REQUEST';
export const FETCH_BEERS_SUCCESS = 'FETCH_BEERS_SUCCESS';
export const FETCH_BEERS_FAILURE = 'FETCH_BEERS_FAILURE';

export const fetchBeerBegin = () => ({
  type: FETCH_BEERS_REQUEST
});

export const fetchBeerSuccess = beers => ({
  type: FETCH_BEERS_SUCCESS,
  payload: {beers}
});

export const fetchBeerFailure = error => ({
  type: FETCH_BEERS_FAILURE,
  payload: {error}
});


export function fetchBeer() {
  return dispatch => {
    dispatch(fetchBeerBegin());
    return fetch('/api/beer')
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchBeerSuccess(json));
        return json;
      })
      .catch(error => dispatch(fetchBeerFailure(error)));
  };
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
