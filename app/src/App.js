/**
 * author: liminjie
 * date: 2017/3/30
 * desc: APP注册入口
 */

import React from "react";
import MovieComingScreen from "./screen/MovieComingScreen";
import {StackNavigator, TabNavigator} from "react-navigation";
import {AppRegistry} from "react-native";
import MovieShowScreen from "./screen/MovieShowScreen";
import MovieDetailScreen from "./screen/MovieDetailScreen";

const TabScreen = TabNavigator({
        正在热映: {screen: MovieShowScreen},
        即将上映: {screen: MovieComingScreen},
    }, {
        tabBarPosition: 'top',
        tabBarOptions: {
            activeTintColor: '#ffffff',
            inactiveTintColor: '#999999',
            tabStyle: {
                height: 40,
            },
            style: {
                backgroundColor: '#1d2635',
            },
            indicatorStyle: {
                backgroundColor: "white",
            }
        },
    }
);

TabScreen.navigationOptions = {
    header: {
        visible: false
    },
}

const stack = StackNavigator({
    Home: {screen: TabScreen},
    Detail: {screen: MovieDetailScreen}
});

AppRegistry.registerComponent('app', () => stack);