import "./parser";

export interface SPromise<T> extends Promise<T> {
    isPending: () => boolean;
    isRejected: () => boolean;
    isResolved: () => boolean;
}

export const SuperPromise = <T>(promise: Promise<T>): SPromise<T> => {
    // Don't modify any promise that has been already modified.
    if ((promise as SPromise<T>).isResolved !== undefined) {
        return promise as SPromise<T>;
    }

    // Set initial state
    let isPending = true;
    let isRejected = false;
    let isResolved = false;

    // Observe the promise, saving the fulfillment in a closure scope.
    const result = promise.then(
        (v) => {
            isResolved = true;
            isPending = false;
            return v;
        },
        (e) => {
            isRejected = true;
            isPending = false;
            throw e;
        }
    );

    (result as any).isPending = () => isPending;
    (result as any).isRejected = () => isRejected;
    (result as any).isResolved = () => isResolved;
    return result as any;
}