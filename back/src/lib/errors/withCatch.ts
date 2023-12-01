const withCatch = async (
    intent: (values: any) => Promise<any>,
    params: any,
    errorHandling: (error: unknown, params: any) => Promise<any>,
) => {
    try {
        return await intent(params);
    } catch (error) {
        return await errorHandling(error, params);
    }
};

export default withCatch;
