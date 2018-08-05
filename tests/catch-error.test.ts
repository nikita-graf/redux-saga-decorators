import configureStore, { MockStore } from 'redux-mock-store';
import sagaMiddleware from 'redux-saga';
import { catchError } from '../src/catch-error';
import { caughtError as caughtErrorAction } from '../src/actions';
import { put } from 'redux-saga/effects';

describe('catchError decorator', () => {
    let store: MockStore;
    const middleware = sagaMiddleware();

    beforeEach(() => {
        store = configureStore([middleware])();
    });

    describe('wrapping successful saga', () => {
        beforeEach(() => {
            middleware.run(catchError(function* failSaga() {
                yield put({ type: 'SUCCESS' });
            }));
        });

        it('should execute decorated saga', () => {
            expect(store.getActions()).toEqual([ 
                { type: 'SUCCESS' } 
            ]);
        });
    });

    describe('wrapping failing saga', () => {
        let error = new Error('1');

        beforeEach(() => {
            middleware.run(catchError(function* failSaga() {
                throw error;
            }));
        });
    
        it('should dispatch error action', () => {
            expect(store.getActions()).toEqual([ 
                caughtErrorAction(error)
            ]);
        });
    });
});
