/**
 * Implements a maybe class that functions as a monad for null checking.
 */
export default class Maybe<T> {
    private value: T | undefined;

    private constructor(value: T | null | undefined) {
        this.value = value ?? undefined;
    }

    static just<T>(value: T): Maybe<T> {
        return new Maybe(value);
    }

    static nothing<T>(): Maybe<T> {
        return new Maybe<T>(undefined);
    }

    static fromNullable<T>(value: T | null | undefined): Maybe<T> {
        return value ? Maybe.just(value) : Maybe.nothing();
    }

    isJust(): boolean {
        return this.value !== undefined;
    }

    isNothing(): boolean {
        return this.value === undefined;
    }

    map<U>(fn: (value: T) => U): Maybe<U> {
        if (this.isJust()) {
            return Maybe.just(fn(this.value as T));
        } else {
            return Maybe.nothing<U>();
        }
    }

    flatMap<U>(fn: (value: T) => Maybe<U>): Maybe<U> {
        if (this.isJust()) {
            return fn(this.value as T);
        } else {
            return Maybe.nothing<U>();
        }
    }

    getOrElse(defaultValue: T): T {
        return this.isJust() ? (this.value as T) : defaultValue;
    }
}
