export type UserRole = 'user' | 'cleaner' | 'admin';
export type Status = 'pending' | 'rejected' | 'approved';

export type User = {
  id: string;
  name: string;
  surname: string;
  email?: string;
  dateOfBirth?: string;
  height: number;
  sitPreset: number | null;
  standPreset: number | null;
  role: UserRole;
  approval: Status;
  assignedDeskID: string | null;
};
