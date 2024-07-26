import { ModuleSetupFormData } from '../ModuleSetup';

export interface Distribution {
  week: number;
  hours: number;
}

export interface StudyStyleDistribution {
  type: string;
  distribution: Distribution[];
}

export interface Coursework {
  shortTitle: string;
  longTitle: string;
  weight: number;
  type: string;
  deadlineWeek: number;
  deadlineDate?: Date;
  releasedWeekPrior?: number;
  deadlineDay?: string;
  deadlineTime?: string;
  contactTimeLectures?: number;
  contactTimeTutorials?: number;
  contactTimeLabs?: number;
  contactTimeSeminars?: number;
  contactTimeFieldworkPlacement?: number;
  contactTimeOthers?: number;
  formativeAssessmentTime?: number;
  privateStudyTime?: number;
  preparationTime?: number;
  keyboardTime?: number;
  feedbackTime?: number;
  preparationTimeDistributions?: StudyStyleDistribution[];
  [key: string]: number | string | Date | StudyStyleDistribution[] | undefined;
}

export interface CourseworkSetupProps {
  courseworkList: Coursework[];
  onCourseworkListChange: (updatedCourseworkList: Coursework[]) => void;
  semester: string;
  examPercentage: number;
  formFactor: number;
  onFormFactorChange: (formFactor: number) => void;
  formData: ModuleSetupFormData;
}

export interface CourseworkSetupFunctionsProps {
  courseworkList: Coursework[];
  onCourseworkListChange: (updatedCourseworkList: Coursework[]) => void;
}
