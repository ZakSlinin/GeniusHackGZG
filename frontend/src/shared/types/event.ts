export interface Volunteer {
  UserID: number;
  Username: string;
  Email: string;
  Status: 'registered' | 'confirmed' | 'rejected';
  CheckInTime?: string;
  CheckOutTime?: string;
}

export interface VolunteerGroup {
  GroupID: number;
  Name: string;
  Needed: number;
  Registered: number;
  Requirements: string[];
  Volunteers: Volunteer[];
}

export interface Event {
  EventID: number;
  Name: string;
  Category: string;
  CreatedBy: string;
  Date: string;
  TimeStart: string;
  TimeEnd: string;
  Location: string;
  VolunteerNeedCount: number;
  VolunteerCount: number;
  ShortDescription: string;
  Description: string;
  VolunteersGroups: VolunteerGroup[];
  Coordinator: {
    UserID: number;
    Username: string;
  };
}

export interface User {
  UserID: number;
  Username: string;
  Password: string;
  Email: string;
  EventsCoordinated: number;
  CurrentCoordinate: number[];
}

export type VolunteerStatus = Volunteer['Status']; 