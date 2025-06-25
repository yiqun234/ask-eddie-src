import { Tabs } from 'expo-router';
import { Home } from '@tamagui/lucide-icons';
import { useTheme } from 'tamagui';

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerTitleAlign: 'center',
        tabBarActiveTintColor: theme.blue10.val,
      }}
    >
      <Tabs.Screen
        name="rec-tracker"
        options={{
          title: 'RecTracker',
          tabBarIcon: ({ color }) => <Home color={color} />,
        }}
      />
    </Tabs>
  );
} 