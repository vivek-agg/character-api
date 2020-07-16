import { all } from 'redux-saga/effects';
import getCharactersWatcher from './characterSaga';

export default function* rootSaga() {
  yield all([getCharactersWatcher()]);
}
