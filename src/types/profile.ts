export interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  profileUrl: string;
}

export interface ProfileResponse {
  profile: {
    first_name: string;
    last_name: string;
    email: string;
    profile_url: string;
  };
}
