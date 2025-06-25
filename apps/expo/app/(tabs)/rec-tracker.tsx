import { YStack, H1, Separator, ScrollView } from 'tamagui';
import { Stack } from 'expo-router'
import { StudentCard, StudentCardProps } from '../../components/rec-tracker/StudentCard';

const mockStudents: StudentCardProps[] = [
  {
    name: 'Angela Zhao',
    collegeCount: 4,
    earliestDeadline: 'Nov 1, 2025',
    daysLeft: 1,
    letterStatus: 'Finalized',
    colleges: [
      {
        id: '1',
        collegeName: 'Harvard University',
        appType: 'ED',
        deadline: 'Nov 1, 2025',
        daysLeft: 1,
        recRequired: true
      },
      {
        id: '2',
        collegeName: 'MIT',
        appType: 'EA',
        deadline: 'Nov 1, 2025',
        daysLeft: 1,
        recRequired: true
      },
      {
        id: '3',
        collegeName: 'Stanford University',
        appType: 'RD',
        deadline: 'Jan 5, 2026',
        daysLeft: 66,
        recRequired: true
      },
      {
        id: '4',
        collegeName: 'UC Berkeley',
        appType: 'RD',
        deadline: 'Nov 30, 2025',
        daysLeft: 30,
        recRequired: false
      }
    ]
  },
  {
    name: 'Lisa Chen',
    collegeCount: 3,
    earliestDeadline: 'Nov 1, 2025',
    daysLeft: 1,
    letterStatus: 'Not Started',
    colleges: [
      {
        id: '1',
        collegeName: 'Columbia University',
        appType: 'ED',
        deadline: 'Nov 1, 2025',
        daysLeft: 1,
        recRequired: true
      },
      {
        id: '2',
        collegeName: 'NYU',
        appType: 'RD',
        deadline: 'Jan 5, 2026',
        daysLeft: 66,
        recRequired: true
      },
      {
        id: '3',
        collegeName: 'UC Davis',
        appType: 'RD',
        deadline: 'Nov 30, 2025',
        daysLeft: 30,
        recRequired: false
      }
    ]
  },
  {
    name: 'Tom Wu',
    collegeCount: 3,
    earliestDeadline: 'Nov 15, 2025',
    daysLeft: 4,
    letterStatus: 'In Progress',
    colleges: [
      {
        id: '1',
        collegeName: 'Yale University',
        appType: 'REA',
        deadline: 'Nov 15, 2025',
        daysLeft: 4,
        recRequired: true
      },
      {
        id: '2',
        collegeName: 'Northwestern University',
        appType: 'RD',
        deadline: 'Jan 3, 2026',
        daysLeft: 64,
        recRequired: true
      },
      {
        id: '3',
        collegeName: 'UCLA',
        appType: 'RD',
        deadline: 'Nov 30, 2025',
        daysLeft: 30,
        recRequired: false
      }
    ]
  },
  {
    name: 'Noah Chen',
    collegeCount: 2,
    earliestDeadline: 'Nov 30, 2025',
    daysLeft: 30,
    letterStatus: 'Not Started',
    colleges: [
      {
        id: '1',
        collegeName: 'Princeton University',
        appType: 'RD',
        deadline: 'Jan 1, 2026',
        daysLeft: 62,
        recRequired: true
      },
      {
        id: '2',
        collegeName: 'UC San Diego',
        appType: 'RD',
        deadline: 'Nov 30, 2025',
        daysLeft: 30,
        recRequired: false
      }
    ]
  },
];


export default function RecTrackerScreen() {
  return (
    <>
      <ScrollView>
        <YStack flex={1} p="$4" gap="$4" mt="$4">
          {mockStudents
            .filter((student) => !!student)
            .map((student) => (
              <StudentCard key={student.name} {...student} />
            ))}
        </YStack>
      </ScrollView>
    </>
  );
} 