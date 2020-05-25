import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

const Navigator = createStackNavigator({
	Login: { screen: Login },
	Feed: { screen: Feed }
});

const AppContainer = createAppContainer(Navigator);

import Feed from './src/views/Feed/feed';
import Login from './src/views/Login/login';

const App = () => {
	return (
		<AppContainer />
	);
};

export default App;
