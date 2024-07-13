import { Coursework } from './CourseworkSetup';
import { ModuleSetupFormData } from './ModuleSetup';
import { TeachingScheduleSaveData } from './TeachingSchedule';

export interface Step {
  title: string;
  description: string;
}
export const steps: Step[] = [
  { title: 'Module Setup', description: 'Set up module' },
  {
    title: 'Teaching Schedule',
    description: 'Modify teaching schedule',
  },
  { title: 'Coursework Setup', description: 'Add courseworks' },
  {
    title: 'Coursework Schedule',
    description: 'Modify coursework properties',
  },
  { title: 'Review', description: 'Review module details' },
  { title: 'Workload Graph', description: 'View workload graph' },
];

export interface ModuleDocument {
  moduleSetup: ModuleSetupFormData;
  teachingSchedule: TeachingScheduleSaveData;
  courseworkList: Coursework[];
}
