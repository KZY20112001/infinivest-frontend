export interface Profile {
  firstName: string;
  lastName?: string;
  address: string;
  profileUrl?: string;
  profileID?: string;
}

export interface ProfileResponse {
  profile: Profile;
}
