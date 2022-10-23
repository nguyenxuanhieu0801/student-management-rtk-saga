import { PayloadAction } from '@reduxjs/toolkit';
import { call, fork, put, take } from 'redux-saga/effects';
import { authActions, LoginPayload } from './authSlice';

function* handleLogin(payload: LoginPayload) {
  try {
    localStorage.setItem('access_token', 'fake_token');

    yield put(
      authActions.loginSuccess({
        id: 1,
        name: 'demo',
      })
    );
  } catch (error) {
    yield put(authActions.loginFailed('Login failed'));
  }
}
function* handleLogout() {
  localStorage.removeItem('access_token');
}

function* watchLoginFlow() {
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem('access_token'));

    if (!isLoggedIn) {
      const action: PayloadAction<LoginPayload> = yield take(authActions.login.type);
      yield fork(handleLogin, action.payload);
    }

    yield take(authActions.logout.type);
    yield call(handleLogout);
  }
}

export default function* authSaga() {
  yield fork(watchLoginFlow);
}
