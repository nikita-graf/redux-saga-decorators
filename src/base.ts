export interface SagaDecorator {
    <R>(saga: () => R): () => R;
    <T1, R>(saga: (t1: T1) => R): (t1: T1) => R;
    <T1, T2, R>(saga: (t1: T1, t2: T2) => R): (t1: T1, t2: T2) => R;
    <T1, T2, T3, R>(saga: (t1: T1, t2: T2, t3: T3) => R): (
        t1: T1,
        t2: T2,
        t3: T3
    ) => R;
    <T1, T2, T3, T4, R>(saga: (t1: T1, t2: T2, t3: T3, t4: T4) => R): (
        t1: T1,
        t2: T2,
        t3: T3,
        t4: T4
    ) => R;
    <T1, T2, T3, T4, T5, R>(
        saga: (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5) => R
    ): (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5) => R;
    <T1, T2, T3, T4, T5, T6, R>(
        saga: (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6) => R
    ): (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6) => R;
    <T1, T2, T3, T4, T5, T6, R>(
        saga: (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6, ...args: any[]) => R
    ): (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6, ...args: any[]) => R;
}
