import { call, put, race, take, cancel } from 'redux-saga/effects';
import { RETRY_REQUEST, RETRY_CANCEL, RETRY_CONFIRM } from './actions';
import { SagaDecorator } from './base';

export function retry (maxAttempts = 5): SagaDecorator {
    return function (saga) {
        return function* (a1?: any, a2?: any, a3?: any, a4?: any, a5?: any, a6?: any, ...args: any[]) {
            for (let i = 0; i < maxAttempts; i++) {
                try {
                    return yield call(saga, a1, a2, a3, a4, a5, a6, ...args);
                } catch (err) {
                    yield put({ type: RETRY_REQUEST });
                    const { cancelRequest } = yield race({
                        cancelRequest: take(RETRY_CANCEL),
                        retryRequest: take(RETRY_CONFIRM)
                    });
                    if (cancelRequest) {
                        yield cancel();
                    }
                }
            }
        };   
    }
};