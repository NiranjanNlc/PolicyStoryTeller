export type Persona = {
  name: string;
  age: number;
  occupation: string;
  location: string;
  bio: string;
};

export type RiskAnalysis = {
  riskier: string[];
  safer: string[];
};

export type NepalPolicyItem = {
  title: string;
  area: string;
  year_or_status: string;
  summary: string;
  who_it_affects: string;
  confidence: string;
};

export type NepalPoliciesBrief = {
  items: NepalPolicyItem[];
  disclaimer: string;
};

export type PersonaResponse = { persona: Persona };
export type ScenarioResponse = { scenario: string };
export type RisksResponse = { story_key: string; risks: RiskAnalysis };

export type PolicyBrief = {
  summary: string;
  who_is_affected: string;
  key_points: string[];
};

export type PersonaStory = {
  persona: Persona;
  scenario: string;
  risks: RiskAnalysis;
};

export type FullStoryResponse = {
  story_key: string;
  policy_brief: PolicyBrief;
  stories: PersonaStory[];
};
export type NepalPoliciesResponse = { brief: NepalPoliciesBrief };

export type VoteStats = { for: number; against: number; neutral: number };

export type VoteStance = "for" | "against" | "neutral";
