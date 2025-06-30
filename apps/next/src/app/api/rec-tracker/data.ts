export interface Application {
  id: string;
  collegeName: string;
  program: string;
  deadline: string;
  recRequired: boolean;
  status: 'Not Started' | 'In Progress' | 'Submitted';
  daysLeft: number | null;
}

export interface Student {
  id: string;
  name: string;
  colleges: number;
  earliestDeadline: string;
  status: 'Finalized' | 'Not Started' | 'In Progress';
  applications: Application[];
  daysLeft: number | null;
}

export let mockStudents: Student[] = [
  {
    id: '1',
    name: 'John Doe',
    colleges: 5,
    earliestDeadline: '2025-10-15',
    status: 'In Progress',
    applications: [
      { id: '1-1', collegeName: 'Stanford University', program: 'Computer Science', deadline: '2025-10-15', daysLeft: null, recRequired: true, status: 'In Progress' },
      { id: '1-2', collegeName: 'MIT', program: 'Engineering', deadline: '2025-11-01', daysLeft: null, recRequired: true, status: 'Not Started' },
    ],
    daysLeft: null,
  },
  {
    id: '2',
    name: 'Jane Smith',
    colleges: 2,
    earliestDeadline: '2025-09-20',
    status: 'In Progress',
    applications: [],
    daysLeft: null,
  },
  {
    id: '3',
    name: 'Mike Johnson',
    colleges: 8,
    earliestDeadline: '2025-12-01',
    status: 'Finalized',
    applications: [],
    daysLeft: null,
  },
  {
    id: '4',
    name: 'Angela Zhao',
    colleges: 4,
    earliestDeadline: '2025-07-01',
    status: 'Finalized',
    applications: [],
    daysLeft: null,
  },
  {
    id: '5',
    name: 'Peter Pan',
    colleges: 1,
    earliestDeadline: '2024-08-10',
    status: 'In Progress',
    applications: [
        { id: '5-1', collegeName: 'Neverland University', program: 'Flying', deadline: '2024-08-10', daysLeft: null, recRequired: true, status: 'Submitted' },
    ],
    daysLeft: null,
  }
];

export const calculateDaysLeft = (deadline: string | null): number | null => {
  if (!deadline) return null;
  const today = new Date();
  const deadlineDate = new Date(deadline);
  today.setHours(0, 0, 0, 0);
  deadlineDate.setHours(0, 0, 0, 0);
  const diffTime = deadlineDate.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}; 