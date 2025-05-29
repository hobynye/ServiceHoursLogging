/*
/!**
 * @jest-environment jsdom
 *!/

import { handleLoginUI, handleLogoutUI } from '../main.js';
import '@testing-library/jest-dom';

describe('Main UI Interaction Tests', () => {
    beforeEach(() => {
        document.body.innerHTML = `
      <button id="login-btn">Login</button>
      <button id="logout-btn" style="display: none;">Logout</button>
      <div id="user-info"></div>
      <div id="log-container" style="display: none;"></div>
    `;
    });

    test('Login UI should show log-container and logout button', () => {
        const user = { displayName: 'Test User' };
        handleLoginUI(user);

        expect(document.getElementById('user-info')).toHaveTextContent('Welcome, Test User');
        expect(document.getElementById('log-container').style.display).toBe('block');
        expect(document.getElementById('login-btn').style.display).toBe('none');
        expect(document.getElementById('logout-btn').style.display).toBe('inline');
    });

    test('Logout UI should hide log-container and show login button', () => {
        handleLogoutUI();

        expect(document.getElementById('user-info')).toHaveTextContent('');
        expect(document.getElementById('log-container').style.display).toBe('none');
        expect(document.getElementById('login-btn').style.display).toBe('inline');
        expect(document.getElementById('logout-btn').style.display).toBe('none');
    });
});
*/
