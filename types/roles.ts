export type UserRole = "admin" | "employer" | "student";

export interface OnboardingState {
  currentStep: number;
  selectedRole?: UserRole;
}
