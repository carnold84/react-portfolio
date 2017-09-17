import * as types from './actionTypes';
import { getData } from '../../services/data';

export function fetchData() {
  return async(dispatch, getState) => {
    try {
      const data = await getData();
      dispatch({ type: types.DATA_FETCHED, data });
    } catch (error) {
      console.error(error);
    }
  };
}