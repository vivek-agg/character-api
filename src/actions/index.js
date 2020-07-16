import {
  CHARACTERS_RECEIVED,
  GET_ALL_CHARACTERS,
} from '../actionTypes';

export function getCharacters(param) {
  return {
    type: GET_ALL_CHARACTERS,
    param,
  };
}
export function charactersReceive(payload) {
  return {
    type: CHARACTERS_RECEIVED,
    payload,
  };
}
