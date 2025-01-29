export interface Profile {
  firstName: string;
  lastName?: string;
  address: string;
  profileUrl?: string;
  profileID?: string;
}

export interface ProfileResponse {
  profile: {
    FirstName: string;
    LastName?: string;
    Address: string;
    ProfileUrl: string;
    ProfileID: string;
  };
}
