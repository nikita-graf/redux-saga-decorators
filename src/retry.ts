import { call, put, race, take, cancel } from 'redux-saga/effects';
import { RETRY_REQUEST, RETRY_CANCEL, RETRY_CONFIRM } from './actions';
import { SagaDecorator } from './base';

export function retry (maxAttempts = 5): SagaDecorator {
    return function (saga: any) {
        return function* (...args: any[]) {
            for (let i = 0; i < maxAttempts; i++) {
                try {
                    return yield call(saga, ...args);
                } catch (err) {
                    yield put(RETRY_REQUEST);
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