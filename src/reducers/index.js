import { CHARACTERS_RECEIVED } from '../actionTypes';

const initialState = {
  data: {},
};

export default function getCharReducer(state = initialState, action) {
  switch (action.type) {
    case CHARACTERS_RECEIVED:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
