/*
import { getUserOrganizations, getOrganizationById, addOrganization } from '../services/organizations.js';
import { db } from '../services/firebase.js';

jest.mock('../services/firebase.js', () => ({
    db: {}
}));

jest.mock('https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js', () => {
    const orgs = [
        { id: 'org1', data: () => ({ uid: 'user1', name: 'Org 1' }) },
        { id: 'org2', data: () => ({ uid: 'user2', name: 'Org 2' }) }
    ];

    return {
        collection: jest.fn(),
        getDocs: jest.fn(() => Promise.resolve({ forEach: cb => orgs.forEach(cb) })),
        getDoc: jest.fn((docRef) => Promise.resolve({
            exists: () => true,
            id: 'org1',
            data: () => ({ name: 'Org 1', contact: { firstName: 'Jane' } })
        })),
        addDoc: jest.fn(() => Promise.resolve({ id: 'newOrgId' })),
        doc: jest.fn()
    };
});

describe('Organizations Service', () => {
    test('getUserOrganizations returns user-specific organizations', async () => {
        const orgs = await getUserOrganizations('user1');
        expect(orgs).toEqual([{ id: 'org1', uid: 'user1', name: 'Org 1' }]);
    });

    test('getOrganizationById returns a single organization', async () => {
        const org = await getOrganizationById('org1');
        expect(org.name).toBe('Org 1');
        expect(org.contact.firstName).toBe('Jane');
    });

    test('addOrganization returns new org ID', async () => {
        const id = await addOrganization('user1', { name: 'Test Org' });
        expect(id).toBe('newOrgId');
    });
});
/!**!/*/
