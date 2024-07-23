export const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const getRandomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const toBase64 = (string: string): string => {
    return Buffer.from(`${string}`).toString();
};

export const fromBase64 = (base64: WithImplicitCoercion<string> | { [Symbol.toPrimitive](hint: "string"): string; }): string => {
    return Buffer.from(base64, 'base64').toString();
};