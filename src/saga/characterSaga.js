import { call, put, takeEvery } from 'redux-saga/effects';
import * as types from '../actionTypes';
import { getCallWithParams } from './apiSignature';

function* getCharacters({ param }) {
  console.log(param);
  const { response, error } = yield call(
    getCallWithParams,
    'https://rickandmortyapi.com/api/character/',
    param,
  );
  if (response) {
    yield put({
      type: types.CHARACTERS_RECEIVED,
      payload: response.data,
    });
  } else if (error) {
    console.log(error);
  }
}
export default function* getCharactersWatcher() {
  yield takeEvery(types.GET_ALL_CHARACTERS, getCharacters);
}
