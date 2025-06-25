import { Card, H4, Paragraph, XStack, YStack, Text } from 'tamagui';
import { ChevronRight } from '@tamagui/lucide-icons';

export interface StudentCardProps {
  name: string;
  collegeCount: number;
  earliestDeadline: string;
  daysLeft?: number;
  letterStatus: 'Finalized' | 'In Progress' | 'Not Started';
}

const getStatusColor = (status: StudentCardProps['letterStatus']) => {
  switch (status) {
    case 'Finalized':
      return '$gray10';
    case 'In Progress':
      return '$blue10';
    case 'Not Started':
      return '$red10';
    default:
      return '$gray10';
  }
};

const getDaysLeftColor = (days?: number) => {
    if (days === undefined) return '$gray10';
    if (days < 7) return '$red10';
    if (days < 30) return '$yellow10';
    return '$green10';
}

export const StudentCard = ({ name, collegeCount, earliestDeadline, daysLeft, letterStatus }: StudentCardProps) => {
  return (
    <Card elevate size="$4" bordered p="$4" br="$6" pressTheme>
      <XStack jc="space-between" ai="center">
        <YStack f={1} gap="$2">
          <H4>{name}</H4>
          <XStack space="$4" ai="center" fw="wrap">
            <Paragraph theme="alt2">
              {collegeCount} {collegeCount > 1 ? 'Colleges' : 'College'}
            </Paragraph>
            <Paragraph theme="alt2">Deadline: {earliestDeadline}</Paragraph>
          </XStack>
          <XStack space="$4" ai="center">
            <Text col={getStatusColor(letterStatus)} fontWeight="bold">
                Status: {letterStatus}
            </Text>
            {daysLeft !== undefined && (
                <Text col={getDaysLeftColor(daysLeft)} fontWeight="bold">
                    {daysLeft} days left
                </Text>
            )}
          </XStack>
        </YStack>
        <ChevronRight col="$gray8" />
      </XStack>
    </Card>
  );
}; 