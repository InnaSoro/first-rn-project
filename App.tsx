import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { EvilIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Search } from './components/Search';
import { FavoriteList } from './components/FavoriteList';

export type TabNavigationParamList = {
  Search: undefined,
  Favorite: undefined;
};

const Tab = createBottomTabNavigator<TabNavigationParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => {
            let iconName;

            if (route.name === 'Search') {
              iconName = 'search';
              return <EvilIcons name='search' size={24} color={color} />;
            } else if (route.name === 'Favorite') {
              return <Fontisto name='favorite' size={24} color={color} />;
            }
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="Favorite" component={FavoriteList} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  nav: {
    backgroundColor: 'rgb(44, 114, 218)',
  }
});
