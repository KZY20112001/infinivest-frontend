export interface Profile {
  firstName: string;
  lastName?: string;
  profileUrl?: string;
  profileID?: string;
  riskTolerance?: string;
  investmentStyle?: string;
  investmentHorizon?: string;
  annualIncome?: number;
  experienceLevel?: string;
}

export interface ProfileResponse {
  profile: Profile;
}
