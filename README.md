This library is a set of helpers for decorating sagas when using redux-saga. Inspired by recompose and ramda.

# API

Saga decorator is a function that accepts a saga and returns a new saga.

```ts
const decoratedSaga = decorator(function* () {
    // your saga code
})
```

## `retry`

```ts
retry(attempts: number): SagaDecorator
```

Accepts a number of attempts to retry a passed saga. If saga fails decorator 
puts an action `RETRY_REQUEST` and starts waiting for either `RETRY_CANCEL` or `RETRY_CONFIRM` actions.

The common use case would be showing a modal popup on a `RETRY_REQUEST` with 2 choices:

```ts
const { retry, RETRY_REQUEST, RETRY_CANCEL, RETRY_CONFIRM } = require('redux-saga-decorators');

const retriableSaga = retry(5)(function* () {
    // saga code that could fail
});

function retryModalReducer (state = {}, action) {
    switch (action.type) {
        case RETRY_REQUEST:
            return { visible: true };

        case RETRY_CANCEL:
        case RETRY_CONFIRM:
            return { visible: false };
        
        default:
            return state;
    }
}

// These actions should be called inside modal
const retryConfirm = () => ({ type: RETRY_REQUEST });
const retryCancel = () => ({ type: RETRY_CANCEL });
```