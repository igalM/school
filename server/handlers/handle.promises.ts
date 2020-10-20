export async function handle<T, U = Error>(
    promise: Promise<T>,
    errorMsg?: string
): Promise<[U | null, T | undefined]> {
    return promise
        .then<[any | null, T | undefined]>((data: T) => {
            if (data) return [null, data];
            return [new Error(errorMsg), undefined];
        })
        .catch<[U, undefined]>((err: U) => {
            if (err) return [err, undefined];
        });
}

export default handle;