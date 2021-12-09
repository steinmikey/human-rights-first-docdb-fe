// import all of your actions into this file, and export them back out.
// This allows for the simplification of flow when importing actions into your components throughout your app.
// Actions should be focused to a single purpose.
// You can have multiple action creators per file if it makes sense to the purpose those action creators are serving.
// Declare action TYPES at the top of the file

import { getDSData, axiosWithAuth } from '../../api';

export const BOOKMARKS = 'BOOKMARKS';

export const SET_BOOKMARKS = 'SET_BOOKMARKS';

export const SEARCH = 'SEARCH';

export const SET_DOCS = 'SET_DOCS';

export const START_FETCH = 'START_FETCH';

export const FINISH_FETCH = 'FINISH_FETCH';

const apiURI = process.env.REACT_APP_API_URI;

export const getDocs = authState => async dispatch => {
  try {
    dispatch({ type: START_FETCH });
    const { data } = await axiosWithAuth(authState).get(`${apiURI}/bookmarks`);
    if (data.length > 0) {
      dispatch({ type: SET_BOOKMARKS, payload: data });
      const ids = data.map(b => b.fileId).join(' ');
      const { Response } = await getDSData(`/search/${ids}`, authState);
      dispatch({ type: SET_DOCS, payload: Response });
    } else {
      dispatch({ type: FINISH_FETCH });
    }
  } catch (err) {
    console.log(err);
  }
};

export const searchDocs = (search, authState) => dispatch => {
  dispatch({ type: START_FETCH });
  getDSData(`/search/${search}`, authState)
    .then(data => {
      dispatch({ type: SET_DOCS, payload: data.Response });
    })
    .catch(console.error);
};

export const bookmarks = () => ({ type: BOOKMARKS });
