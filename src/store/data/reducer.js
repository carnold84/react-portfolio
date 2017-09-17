import * as types from './actionTypes';

const initialState = {
    data: undefined,
};

const reduce = (state = initialState, action = {}) => {
    switch (action.type) {
        case types.DATA_FETCHED:
            return {
                ...state,
                data: {...action.data},
            };
        default:
            return state;
    }
};

export default reduce;

// selectors
export const getData = (state) => {
    return state.data.data;
};