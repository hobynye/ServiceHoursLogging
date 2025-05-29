import { logServiceHours } from '../services/serviceHours.js';

jest.mock('../services/firebase.js', () => ({
    db: {}
}));

jest.mock('https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js', () => ({
    collection: jest.fn(),
    addDoc: jest.fn(() => Promise.resolve({ id: 'log1' }))
}));

describe('ServiceHours Service', () => {
    test('logServiceHours stores hours with timestamp', async () => {
        const uid = 'testUser';
        const data = {
            date: '2024-05-29',
            hours: 3,
            organizationId: 'org123'
        };

        await expect(logServiceHours(uid, data)).resolves.toBeUndefined();
    });
});
