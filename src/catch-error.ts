import { call, put } from 'redux-saga/effects';
import { caughtError } from './actions';
import { SagaDecorator } from './base';

export const catchError: SagaDecorator = (saga) => {
    return function* (a1?: any, a2?: any, a3?: any, a4?: any, a5?: any, a6?: any, ...args: any[]) {
        try {
            return yield call(saga, a1, a2, a3, a4, a5, a6, ...args);
        } catch (err) {
            yield put(caughtError(err));
        }
    };   
};