export const checkNull = (value) => {
    return (value == null || value === ''  || value === undefined || value === [] || value === {}) ? true : false;
};

export const checkEmail = (email) => {
    return email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
};