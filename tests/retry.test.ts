// import { createStore, applyMiddleware } from 'redux';
import configureStore, { MockStore } from 'redux-mock-store';
import sagaMiddleware from 'redux-saga';
import { retry } from '../src/retry';
import { RETRY_REQUEST, RETRY_CONFIRM } from '../src/actions';

describe('retry', () => {
    const middleware = sagaMiddleware();
    const mockStore = configureStore([middleware]);
    let store: MockStore;

    function* failSaga() {
        throw new Error('1');
    }

    beforeEach(() => {
        store = mockStore();
        middleware.run(retry()(failSaga));
    });

    it('should dispatch action on fail', () => {
        expect(store.getActions()).toEqual([ 
            { type: RETRY_REQUEST } 
        ]);
    });

    it('should retry call saga', () => {
        store.dispatch({ type: RETRY_CONFIRM });
        expect(store.getActions()).toEqual([ 
            { type: RETRY_REQUEST },
            { type: RETRY_CONFIRM },
            { type: RETRY_REQUEST }
        ]);
    });
});
