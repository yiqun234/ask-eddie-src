import { NextResponse } from 'next/server';
import { mockStudents, calculateDaysLeft } from '../data';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const student = mockStudents.find(s => s.id === params.id);
  if (!student) {
    return new NextResponse(JSON.stringify({ message: 'Student not found' }), { status: 404 });
  }
  return NextResponse.json(student);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const studentIndex = mockStudents.findIndex(s => s.id === params.id);
  if (studentIndex === -1) {
    return new NextResponse(JSON.stringify({ message: 'Student not found' }), { status: 404 });
  }

  try {
    const body = await request.json();
    const { name, earliestDeadline } = body;

    if (!name || !earliestDeadline) {
      return new NextResponse(JSON.stringify({ message: "Missing name or earliestDeadline" }), { status: 400 });
    }

    const updatedStudent = {
      ...mockStudents[studentIndex],
      name,
      earliestDeadline,
      daysLeft: calculateDaysLeft(earliestDeadline),
    };

    mockStudents[studentIndex] = updatedStudent;

    return NextResponse.json(updatedStudent);
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: "Error processing request", error }), { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const studentIndex = mockStudents.findIndex(s => s.id === params.id);
    if (studentIndex === -1) {
        return new NextResponse(JSON.stringify({ message: 'Student not found' }), { status: 404 });
    }

    mockStudents.splice(studentIndex, 1);

    return new NextResponse(null, { status: 204 });
} 