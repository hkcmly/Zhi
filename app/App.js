/**
 * Created by hkc on 2016/7/23.
 */
import React, {Component} from "react";
import {
    Dimensions,
    Navigator,
    BackAndroid,
    Platform,
    AsyncStorage,
    StatusBar,
    View,
    StyleSheet,
    Alert,
    Text
} from "react-native";
import {connect} from "react-redux";
import cssload from "css/cssload";
import {YIcon} from "component"
import Main from 'module/Main'
let Toast = require('@remobile/react-native-toast');
let App = class extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            selectedTab : 'Home'
        };
    }

    _renderScene(route,navigator) {
        switch (route.id) {
            case 'Main':
                return (<Main navigator={navigator} route={route}/>);
                break;
        }
    }

    componentWillMount() {
        if (Platform.OS === 'android') {
            BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }

    componentWillUnMount() {
        if (Platform.OS === 'android') {
            BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }

    onBackAndroid = () => {
        const {navigator} = this.refs;
        const routers = navigator.getCurrentRoutes();
        if (routers.length > 1) {
            navigator.pop();
            return true;
        }
        if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
            return false;//真的退出应用
        }
        this.lastBackPressed = Date.now();
        Toast.showShortCenter('再按一次退出应用');
        return true;
    };

    render() {
        return (
            <View style={[styles.f1,styles.container]}>
                <StatusBar hidden={true} />
                <Navigator
                    ref="navigator"
                    initialRoute={{id:"Main"}}
                    renderScene={this._renderScene}
                />
            </View>
        )
    }
}

export default connect()(App)

const styles = cssload({
    container:{
        backgroundColor:'#f7f7f7'
    }

})