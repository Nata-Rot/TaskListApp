import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { HomeScreen } from './src/screens/HomeScreen/HomeScreen';
import { TasksScreen } from './src/screens/TasksScreen/TasksScreen';
import { ListScreen } from './src/screens/ListScreen/ListScreen';
import { View, Text, TextStyle } from 'react-native';

const Stack = createNativeStackNavigator();

const HeaderTitle = ({ title }: { title: string }) => (
  <View style={headerStyles.container}>
    <Text style={headerStyles.title}>{title}</Text>
  </View>
);

const screenOptions: NativeStackNavigationOptions = {
  headerStyle: {
    backgroundColor: '#4A6DA7',
  },
  headerTintColor: '#fff',
  headerTitleAlign: 'left' as const, 
  headerTitleStyle: {
    fontWeight: '600' as TextStyle['fontWeight'],
  },
  contentStyle: {
    backgroundColor: '#f9fbfd',
  }
};

const homeScreenOptions = {
  headerTitle: () => <HeaderTitle title="Home" />,
};

const tasksScreenOptions = {
  headerTitle: () => <HeaderTitle title="Tasks" />,
};

const listScreenOptions = {
  headerTitle: () => <HeaderTitle title="List" />,
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Home"
          screenOptions={screenOptions}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={homeScreenOptions}
          />
          <Stack.Screen
            name="Tasks"
            component={TasksScreen}
            options={tasksScreenOptions}
          />
          <Stack.Screen
            name="List"
            component={ListScreen}
            options={listScreenOptions}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const headerStyles = {
  container: {
    alignItems: 'flex-start' as const,
    justifyContent: 'center' as const,
  },
  title: {
    fontSize: 20,
    fontWeight: '700' as TextStyle['fontWeight'],
    color: '#fff',
  },
};

export default App;