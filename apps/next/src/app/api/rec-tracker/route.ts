import { NextResponse } from "next/server";
import { mockStudents, calculateDaysLeft, type Student } from './data';

export type { Student, Application } from './data';

export async function GET(request: Request) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  const studentsWithDaysLeft = mockStudents.map(student => {
    const earliestDeadline = student.applications.length > 0
      ? student.applications.reduce((earliest, current) => 
          new Date(current.deadline) < new Date(earliest.deadline) ? current : earliest
        ).deadline
      : student.earliestDeadline;

    const daysLeft = calculateDaysLeft(earliestDeadline);

    const applicationsWithDaysLeft = student.applications.map(app => ({
      ...app,
      daysLeft: calculateDaysLeft(app.deadline),
    }));
    
    return {
      ...student,
      earliestDeadline,
      daysLeft,
      colleges: student.applications.length,
      applications: applicationsWithDaysLeft,
    };
  });

  return NextResponse.json(studentsWithDaysLeft);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, earliestDeadline } = body;

    if (!name || !earliestDeadline) {
      return new NextResponse(JSON.stringify({ message: "Missing name or earliestDeadline" }), { status: 400 });
    }

    const newStudent: Student = {
      id: (mockStudents.length + 1).toString(),
      name,
      earliestDeadline,
      colleges: 0,
      status: 'In Progress',
      applications: [],
      daysLeft: calculateDaysLeft(earliestDeadline),
    };

    mockStudents.push(newStudent);

    return NextResponse.json(newStudent, { status: 201 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: "Error processing request", error }), { status: 500 });
  }
} 