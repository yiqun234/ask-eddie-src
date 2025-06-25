import { YStack, H1, Separator, ScrollView } from 'tamagui';
import { StudentCard, StudentCardProps } from '../../components/rec-tracker/StudentCard';

const mockStudents: StudentCardProps[] = [
  {
    name: 'Angela Zhao',
    collegeCount: 4,
    earliestDeadline: 'Nov 1, 2025',
    letterStatus: 'Finalized',
  },
  {
    name: 'Lisa Chen',
    collegeCount: 3,
    earliestDeadline: 'Nov 1, 2025',
    daysLeft: 1,
    letterStatus: 'Not Started',
  },
  {
    name: 'Tom Wu',
    collegeCount: 3,
    earliestDeadline: 'Nov 15, 2025',
    daysLeft: 4,
    letterStatus: 'In Progress',
  },
  {
    name: 'Noah Chen',
    collegeCount: 2,
    earliestDeadline: 'Nov 10, 2025',
    daysLeft: 52,
    letterStatus: 'Not Started',
  },
];


export default function RecTrackerScreen() {
  return (
    <ScrollView>
      <YStack f={1} p="$4" space="$4" mt="$4">
        <H1>RecTracker</H1>
        <Separator />
        {mockStudents
            .filter(student => !!student)
            .map((student) => (
                <StudentCard key={student.name} {...student} />
        ))}
      </YStack>
    </ScrollView>
  );
} 