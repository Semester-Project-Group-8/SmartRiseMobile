export type ApiDesk = {
  id: string;
  minor: number;
  preferredHeight: number;
  companyHeight: number;
  employeeId: string | null;
  departmentId: string | null;
};

export type ApiEmployee = {
  id: string;
  name: string;
  email: string;
  height: number;
  dateOfBirth: string;
  accountStatus: string;
  role: string;
  desk: ApiDesk | null;
};

export type ApiCreateEmployeeRequest = {
  name: string;
  email: string;
  passwordHash: string; 
  dateOfBirth: string; 
  phone: string;
  height: number; 
};

export type ApiLoginResponse = {
  token: string;
};

export type ApiMessage = {
  message: string;
};

export type ApiBeaconAssignment = {
  major: number;
  minor: number;
  
export type ApiTicket = {
  id: string;
  title: string;
  description_Text: string;
  reportTime: string;
  employeeId: string | null;
  deskId: string;
};
