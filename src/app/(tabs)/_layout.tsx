import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function TabsLayout() {
	const insets = useSafeAreaInsets()

	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: '#2563eb',
				tabBarInactiveTintColor: '#94a3b8',
				tabBarStyle: {
					backgroundColor: '#fff',
					borderTopColor: '#e5e7eb',
					height: 40 + insets.bottom,
					paddingBottom: insets.bottom + 6,
					paddingTop: 6,
				},
			}}
		>
			<Tabs.Screen
				name='index'
				options={{
					title: 'Asosiy',
					tabBarIcon: ({ color, size, focused }) => (
						<Ionicons
							name={focused ? 'home' : 'home-outline'}
							size={size}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name='add'
				options={{
					title: "Qo'shish",
					tabBarIcon: ({ color, size, focused }) => (
						<Ionicons
							name={focused ? 'add-circle' : 'add-circle-outline'}
							size={size}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name='manage'
				options={{
					title: 'Boshqarish',
					tabBarIcon: ({ color, size, focused }) => (
						<Ionicons
							name={focused ? 'settings' : 'settings-outline'}
							size={size}
							color={color}
						/>
					),
				}}
			/>
		</Tabs>
	)
}
