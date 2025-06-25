import { Card, H4, Paragraph, XStack, YStack, Text, Button, View } from 'tamagui';
import { ChevronRight, ChevronDown, Eye, Edit3, Check } from '@tamagui/lucide-icons';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';

export interface CollegeApplication {
  id: string;
  collegeName: string;
  appType: 'ED' | 'RD' | 'EA' | 'REA';
  deadline: string;
  daysLeft?: number;
  recRequired: boolean;
}

export interface StudentCardProps {
  name: string;
  collegeCount: number;
  earliestDeadline: string;
  daysLeft?: number;
  letterStatus: 'Finalized' | 'In Progress' | 'Not Started';
  colleges?: CollegeApplication[];
  onView?: () => void;
  onEdit?: () => void;
}

const getStatusConfig = (status: StudentCardProps['letterStatus']) => {
  switch (status) {
    case 'Finalized':
      return { color: '#6b7280', bgColor: '#f3f4f6' };
    case 'In Progress':
      return { color: '#2563eb', bgColor: '#dbeafe' };
    case 'Not Started':
      return { color: '#dc2626', bgColor: '#fee2e2' };
    default:
      return { color: '#6b7280', bgColor: '#f3f4f6' };
  }
};

const getDaysLeftConfig = (days?: number) => {
  if (days === undefined) return { color: '#6b7280', bgColor: '#f3f4f6' };
  if (days <= 1) return { color: '#dc2626', bgColor: '#fee2e2' };
  if (days <= 7) return { color: '#ea580c', bgColor: '#fed7aa' };
  if (days <= 30) return { color: '#d97706', bgColor: '#fef3c7' };
  return { color: '#059669', bgColor: '#d1fae5' };
};

export const StudentCard = (props: StudentCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!props || !props.name || !props.letterStatus) {
    return null;
  }

  const { name, collegeCount, earliestDeadline, daysLeft, letterStatus, colleges, onView, onEdit } = props;
  const statusConfig = getStatusConfig(letterStatus);
  const daysConfig = getDaysLeftConfig(daysLeft);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Card 
      backgroundColor="white" 
      borderWidth={1} 
      borderColor="#e5e7eb" 
      borderRadius="$3" 
      padding="$0"
      marginVertical="$1"
      shadowColor="rgba(0,0,0,0.05)"
      shadowOffset={{ width: 0, height: 1 }}
      shadowOpacity={1}
      shadowRadius={3}
      pressTheme
    >
      {/* Main Student Row */}
      <TouchableOpacity onPress={toggleExpanded} activeOpacity={0.7}>
        <View style={{ padding: 16 }}>
        <XStack justify="space-between" items="flex-start">
          <YStack flex={1} gap="$3">
            {/* Header Row */}
            <XStack justify="space-between" items="center">
              <H4 fontSize="$5" fontWeight="600">
                {name}
              </H4>
              <XStack gap="$2">
                {onView && (
                  <Button 
                    size="$2" 
                    circular 
                    chromeless
                    onPress={onView}
                    icon={<Eye size={16} />}
                  />
                )}
                {onEdit && (
                  <Button 
                    size="$2" 
                    circular 
                    chromeless
                    onPress={onEdit}
                    icon={<Edit3 size={16} />}
                  />
                )}
              </XStack>
            </XStack>

            {/* Info Grid */}
            <XStack justify="space-between" flexWrap="wrap" gap="$3">
              {/* Colleges Count */}
              <YStack width="30%">
                <Text fontSize="$2" fontWeight="500" opacity={0.7}>
                  COLLEGES
                </Text>
                <Text fontSize="$4" fontWeight="600">
                  {collegeCount}
                </Text>
              </YStack>

              {/* Deadline */}
              <YStack width="30%">
                <Text fontSize="$2" fontWeight="500" opacity={0.7}>
                  DEADLINE
                </Text>
                <Text fontSize="$4" fontWeight="600">
                  {earliestDeadline}
                </Text>
              </YStack>

              {/* Days Left */}
              {daysLeft !== undefined && (
                <YStack width="25%">
                  <Text fontSize="$2" fontWeight="500" opacity={0.7}>
                    DAYS LEFT
                  </Text>
                  <View
                    style={{
                      backgroundColor: daysConfig.bgColor,
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      borderRadius: 6,
                      alignSelf: 'flex-start'
                    }}
                  >
                    <Text 
                      fontSize="$3" 
                      fontWeight="700" 
                      style={{ color: daysConfig.color }}
                    >
                      {daysLeft}
                    </Text>
                  </View>
                </YStack>
              )}
            </XStack>

            {/* Status Row */}
            <XStack justify="space-between" items="center">
              <XStack items="center" gap="$2">
                <Text fontSize="$2" fontWeight="500" opacity={0.7}>
                  STATUS:
                </Text>
                <View
                  style={{
                    backgroundColor: statusConfig.bgColor,
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 6
                  }}
                >
                  <Text 
                    fontSize="$3" 
                    fontWeight="600" 
                    style={{ color: statusConfig.color }}
                  >
                    {letterStatus}
                  </Text>
                </View>
              </XStack>
              
              {isExpanded ? <ChevronDown size={20} opacity={0.7} /> : <ChevronRight size={20} opacity={0.7} />}
            </XStack>
          </YStack>
        </XStack>
        </View>
      </TouchableOpacity>

      {/* Expanded College Details */}
      {isExpanded && (
        <View style={{ borderTopWidth: 1, borderTopColor: '#f3f4f6' }}>
          {colleges && colleges.length > 0 ? colleges.map((college, index) => {
            const collegeDaysConfig = getDaysLeftConfig(college.daysLeft);
            return (
              <View key={college.id} style={{ 
                padding: 16, 
                borderBottomWidth: index < colleges.length - 1 ? 1 : 0, 
                borderBottomColor: '#f3f4f6',
                backgroundColor: 'white'
              }}>
                <YStack gap="$2">
                  {/* College Name and Type */}
                  <XStack justify="space-between" items="center">
                    <Text fontSize="$4" fontWeight="600">
                      {college.collegeName}
                    </Text>
                    <View style={{
                      backgroundColor: '#f3f4f6',
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      borderRadius: 4
                    }}>
                      <Text fontSize="$2" fontWeight="600">
                        {college.appType}
                      </Text>
                    </View>
                  </XStack>

                  {/* Deadline and Days Left */}
                  <XStack justify="space-between" items="center">
                    <YStack>
                      <Text fontSize="$2" opacity={0.7}>Deadline</Text>
                      <Text fontSize="$3" fontWeight="500">
                        {college.deadline}
                      </Text>
                    </YStack>
                    
                    <XStack items="center" gap="$3">
                      {college.daysLeft !== undefined && (
                        <YStack items="center">
                          <Text fontSize="$2" opacity={0.7}>Days Left</Text>
                          <View
                            style={{
                              backgroundColor: collegeDaysConfig.bgColor,
                              paddingHorizontal: 8,
                              paddingVertical: 4,
                              borderRadius: 6,
                              minWidth: 30,
                              alignItems: 'center'
                            }}
                          >
                            <Text 
                              fontSize="$3" 
                              fontWeight="700" 
                              style={{ color: collegeDaysConfig.color }}
                            >
                              {college.daysLeft}
                            </Text>
                          </View>
                        </YStack>
                      )}
                      
                      {college.recRequired && (
                        <YStack items="center">
                          <Text fontSize="$2" opacity={0.7}>Rec Required</Text>
                          <View style={{
                            backgroundColor: '#dcfce7',
                            borderRadius: 12,
                            width: 24,
                            height: 24,
                            justifyContent: 'center',
                            alignItems: 'center'
                          }}>
                            <Check size={14} color="#16a34a" />
                          </View>
                        </YStack>
                      )}
                    </XStack>
                  </XStack>
                </YStack>
              </View>
            );
          }) : (
            <View style={{ padding: 20, alignItems: 'center' }}>
              <Text fontSize="$3" opacity={0.6}>
                No college applications yet
              </Text>
            </View>
          )}
        </View>
      )}
    </Card>
  );
};

/* 
Example usage with sample data:

const sampleColleges: CollegeApplication[] = [
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
    daysLeft: 5,
    recRequired: true
  },
  {
    id: '3',
    collegeName: 'UC Davis', 
    appType: 'RD',
    deadline: 'Nov 1, 2025',
    daysLeft: undefined,
    recRequired: false
  }
];

<StudentCard
  name="Lisa Chen"
  collegeCount={3}
  earliestDeadline="Nov 1, 2025"
  daysLeft={1}
  letterStatus="Not Started"
  colleges={sampleColleges}
  onView={() => console.log('View clicked')}
  onEdit={() => console.log('Edit clicked')}
/>
*/ 