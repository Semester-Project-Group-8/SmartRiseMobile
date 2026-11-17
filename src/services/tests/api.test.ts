import {
  approveUser,
  assignDesk,
  getDeskById,
  getPendingUsers,
  getUserById,
  rejectUser,
  setAllDeskHeights,
  setDeskHeight,
  unassignDesk,
} from '../fakeapi';
import { mockDesks, mockUsers } from '../mockData';

describe('fake API', () => {
  beforeEach(() => {
    mockDesks[0].currentHeight = 80;
    mockDesks[1].currentHeight = 70;
    mockDesks[0].assignedUserID = null;
    mockDesks[1].assignedUserID = 'user-001';

    mockUsers[0].assignedDeskID = 'desk-002';
    mockUsers[1].assignedDeskID = null;
    mockUsers[1].approval = 'pending';
  });

  it('gets a desk and its connection status', () => {
    expect(getDeskById('desk-002')?.deskNum).toBe(2);
    expect(getDeskById('desk-002')?.isConnected).toBe(true);
  });

  it('updates one desk height', () => {
    setDeskHeight(90, 'desk-002');

    expect(getDeskById('desk-002')?.currentHeight).toBe(90);
  });

  it('updates every desk height', () => {
    setAllDeskHeights(100);

    expect(mockDesks.map((desk) => desk.currentHeight)).toEqual([100, 100]);
  });

  it('rejects invalid desk heights', () => {
    expect(() => setDeskHeight(170, 'desk-002')).toThrow(
      'Desk height must be between 30 and 150 cm.',
    );
  });

  it('returns pending users', () => {
    expect(getPendingUsers().map((user) => user.id)).toEqual(['user-002']);
  });

  it('approves and rejects users', () => {
    approveUser('user-002');
    expect(getUserById('user-002')?.approval).toBe('approved');

    rejectUser('user-002');
    expect(getUserById('user-002')?.approval).toBe('rejected');
  });

  it('assigns and unassigns a desk', () => {
    assignDesk('user-002', 'desk-001');

    expect(getUserById('user-002')?.assignedDeskID).toBe('desk-001');
    expect(getDeskById('desk-001')?.assignedUserID).toBe('user-002');

    unassignDesk('desk-001', 'user-002');

    expect(getUserById('user-002')?.assignedDeskID).toBeNull();
    expect(getDeskById('desk-001')?.assignedUserID).toBeNull();
  });

  it('throws when assigning an already assigned desk', () => {
    expect(() => assignDesk('user-002', 'desk-002')).toThrow(
      'Desk is already assigned.',
    );
  });
});
