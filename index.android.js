/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    Text,
    View,
    Navigator,
    TouchableHighlight,
    StyleSheet,
    NavigationBar,
    TouchableOpacity
} from 'react-native';
import DetailView from './Detail/DetailView';
import HomeView from './HomePage/HomeView';
let Dimensions = require("Dimensions");
let screenWidth =Dimensions.get("window").width;
let screenHeight=Dimensions.get("window").height;

class RNNode extends Component {
    render() {
        return (
            <Navigator
                initialRoute={{ component:HomeView }}
                renderScene={this.renderScene}
                style={{flex:1}}
                navigationBar={
                    <Navigator.NavigationBar
                        routeMapper={{
                            LeftButton(route, navigator, index, navState) {
                                if (index > 0) {
                                    return (
                                        <View >
                                            <TouchableOpacity
                                                style={{justifyContent:"center",height:80}}
                                                underlayColor='transparent'
                                                onPress={() => {if (index > 0) {navigator.pop()}}}>
                                                <Text style={{textAlign:"center"}}>
                                                    back
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    );
                                } else {
                                    return null;
                                }
                            },
                            RightButton: (route, navigator, index, navState) =>
                            { return (<View></View>); },
                            Title: (route, navigator, index, navState) =>
                            { return (<Text style={{alignSelf: 'center',fontSize: 25,}}>RNNode</Text>); },
                        }}
                        style={styles.title}
                    />
                }
            />
        );
    }

    renderScene (route, navigator){
        return <route.component {...route.passProps}navigator={navigator}/>
    }
}
const styles =StyleSheet.create({
   title:{
       width:screenWidth,
       height:80,
       backgroundColor:'dodgerblue',
       justifyContent:'center',
   }
});


AppRegistry.registerComponent('RNNode', () => RNNode);
