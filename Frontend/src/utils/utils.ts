export const validateEmail = (email: string): boolean => {
    const regex = /^[a-zA-Z0-9._-]+@/;
    return regex.test(email);
};

export const validatePassword = (password: string): boolean => {
    return password.length >= 8;
};
