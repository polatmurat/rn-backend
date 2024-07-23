import express from 'express';
const router = express.Router();
import { login, register } from '../../services/auth';
import { loginControl, registerControl } from '../../controllers/auth';

/**
 * Users Register
 * @typedef {object} UsersRegister
 * @property {string} username.required
 * @property {string} email.required
 * @property {string} password.required
 * @property {string} name.required
 */

/**
 * POST /auth/register
 * @summary users register
 * @description users register
 * @tags AUTH
 * @param {UsersRegister} request.body.required - users login body
 * @return {object} 200 - success response - application/json
 * @return {object} 403 - forbiden response - application/json
 * @return {object} 422 - wrong parameter(s) - application/json
 * @return {object} 500 - server error - application/json
 */
router.post('/register', [
    registerControl
], register);

/**
 * Users login
 * @typedef {object} UsersLogin
 * @property {string} email.required
 * @property {string} password.required
 */

/**
 * POST /auth/login
 * @summary users login
 * @description users login
 * @tags AUTH
 * @param {UsersLogin} request.body.required - users login body
 * @return {object} 200 - success response - application/json
 * @return {object} 403 - forbiden response - application/json
 * @return {object} 422 - wrong parameter(s) - application/json
 * @return {object} 500 - server error - application/json
 */
router.post('/login', [
    loginControl
], login);

export default router;