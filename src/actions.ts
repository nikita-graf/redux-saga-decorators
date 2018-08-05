export const RETRY_REQUEST = '@redux-saga-decorators/retry-request'
export const RETRY_CANCEL = '@redux-saga-decorators/retry-cancel'
export const RETRY_CONFIRM = '@redux-saga-decorators/retry-confirm'
export const CAUGHT_ERROR = '@redux-saga-decorators/caught-error';

export interface CaughtErrorPayload {
    type: string;
    error: Error;
}

export const caughtError = (error: Error): CaughtErrorPayload => ({ type: CAUGHT_ERROR, error });