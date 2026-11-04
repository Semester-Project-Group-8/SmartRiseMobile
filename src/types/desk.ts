export type Desk = {
  id: string;
  deskNum: number;
  currentHeight: number;
  isConnected: boolean;
  assignedUserID: string | null;
  picoID: string;
};