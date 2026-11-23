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
  dateOfBirth: string;
  accountStatus: string;
  role: string;
  desk: ApiDesk | null;
};

export type ApiLoginResponse = {
  token: string;
};

export type ApiMessage = {
  message: string;
};

export type ApiTicket = {
  id: string;
  title: string;
  description_Text: string;
  reportTime: string;
  employeeId: string | null;
  deskId: string;
};
