import { NextResponse } from "next/server";

// This data would typically come from a database.
const studentsData = [
  {
    id: "1",
    name: "Angela Zhao",
    colleges: 4,
    earliestDeadline: "2025-07-01",
    status: "Finalized",
    applications: [],
  },
  {
    id: "2",
    name: "Lisa Chen",
    colleges: 3,
    earliestDeadline: "2025-11-01",
    status: "Not Started",
    applications: [
      {
        id: "2-1",
        collegeName: "Columbia University",
        program: "ED",
        deadline: "2025-11-01",
        recRequired: true,
        status: "Not Started",
      },
      {
        id: "2-2",
        collegeName: "NYU",
        program: "RD",
        deadline: "2026-01-05",
        recRequired: true,
        status: "Not Started",
      },
      {
        id: "2-3",
        collegeName: "UC Davis",
        program: "RD",
        deadline: "2025-11-30",
        recRequired: false,
        status: "Not Started",
      },
    ],
  },
  {
    id: "3",
    name: "Tom Wu",
    colleges: 3,
    earliestDeadline: "2025-11-15",
    status: "In Progress",
    applications: [],
  },
  {
    id: "4",
    name: "Noah Chen",
    colleges: 2,
    earliestDeadline: "2025-11-10",
    status: "Not Started",
    applications: [],
  },
];

export async function GET() {
  // Simulate a network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  const dataWithDaysLeft = studentsData.map(student => {
    const today = new Date();
    const deadline = new Date(student.earliestDeadline);
    const daysLeft = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    const applicationsWithDaysLeft = student.applications.map(app => {
        const appDeadline = new Date(app.deadline);
        const appDaysLeft = Math.ceil((appDeadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        return {...app, daysLeft: appDaysLeft > 0 ? appDaysLeft : 0 };
    });

    return { 
        ...student, 
        daysLeft: daysLeft > 0 ? daysLeft : 0,
        applications: applicationsWithDaysLeft
    };
  });

  return NextResponse.json(dataWithDaysLeft);
}

export type Student = (typeof studentsData)[number] & { daysLeft: number, applications: Application[] };
export type Application = typeof studentsData[1]['applications'][0] & { daysLeft: number }; 