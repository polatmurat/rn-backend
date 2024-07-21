"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants = require('../constants');
const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};
const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
const toBase64 = (string) => {
    return Buffer.from(`${string}`).toString();
};
module.exports = { validateEmail, getRandomNumber, toBase64 };
//# sourceMappingURL=general.js.map