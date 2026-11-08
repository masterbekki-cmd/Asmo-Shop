import { Tabs } from 'expo-router'

export default function TabsLayout() {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: '#2563eb',
				tabBarInactiveTintColor: '#94a3b8',
				tabBarStyle: {
					backgroundColor: '#fff',
					borderTopColor: '#000',
					height: 65,
					paddingBottom: 8,
					paddingTop: 8,
				},
			}}
		>
			<Tabs.Screen
				name='index'
				options={{
					tabBarLabel: 'Home',
				}}
			/>
			<Tabs.Screen name='add' options={{ title: "Qo'shish" }} />
			<Tabs.Screen name='manage' options={{ title: 'Boshqarish' }} />
		</Tabs>
	)
}
