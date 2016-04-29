'use strict';
/**
 *  # snowflake
 *  Snowflake ![snowflake](https://cloud.githubusercontent.com/assets/1282364/11599365/1a1c39d2-9a8c-11e5-8819-bc1e48b30525.png)
 */

/**
 * ## imports
 *
 */
/**
 * ### React
 *
 * Necessary containers from ReactNative
 */
import React, {AppRegistry, Navigator, StyleSheet, Text, View} from 'react-native';
import ZoomEyeSearchView from './containers/ZoomEyeSearchView';
import ZoomEyeSearchResult from './containers/ZoomEyeSearchResult';
import ZoomEyeProperty from './containers/ZoomEyeProperty';
import Login from './containers/Login';
import App from './containers/App';

import {
    Provider,
    connect } from 'react-redux';

import RNRF, {
    Route,
    Scene,
    TabBar} from 'react-native-router-flux';
/**
 * ### icons
 *
 * Add icon support for use in Tabbar
 *
 */
import Icon from 'react-native-vector-icons/FontAwesome';
/**
 * ## Actions
 *  The necessary actions for dispatching our bootstrap values
 */
import {setPlatform, setVersion} from './reducers/device/deviceActions';
import {setStore} from './reducers/global/globalActions';

/**
 * ## States
 * Snowflake explicitly defines initial state
 *
 */
import authInitialState from './reducers/auth/authInitialState';
import deviceInitialState from './reducers/device/deviceInitialState';
import globalInitialState from './reducers/global/globalInitialState';
import zoomeyeInitialState from './reducers/zoomeye/zoomeyeInitialState';
var VERSION='0.0.13';
/**
 *
 * ## Initial state
 * Create instances for the keys of each structure in snowflake
 * @returns {Object} object with 4 keys
 */
function getInitialState() {
    const _initState = {
        auth: (new authInitialState),
        device: (new deviceInitialState),
        global: (new globalInitialState),
        zoomeye: (new zoomeyeInitialState)
    };
    return _initState;
}
import configureStore from './lib/configureStore';

/**
 * ## TabIcon
 *
 * Displays the icon for the tab w/ color dependent upon selection
 */

class TabIcon extends React.Component {
    render(){
        var color1 = this.props.selected ?  '#FF3366' : '#B0E0E6';
        return (
            <View style={{flex:1, flexDirection:'column', alignItems:'center', alignSelf:'center'}}>
                <Icon style={{color: color1}} name={this.props.iconName} size={30} />
                <Text style={{color: color1}}>{this.props.title}</Text>
            </View>
        );
    }
}


/**
 * ## Native
 *
 * ```configureStore``` with the ```initialState``` and set the
 * ```platform``` and ```version``` into the store by ```dispatch```.
 * *Note* the ```store``` itself is set into the ```store```.  This
 * will be used when doing hot loading
 */

export default function native(platform) {

    let MyProject = React.createClass( {
        render() {
            const store = configureStore(getInitialState());

            //Connect w/ the Router
            const Router = connect()(RNRF.Router);
            // configureStore will combine reducers from snowflake and main application
            // it will then create the store based on aggregate state from all reducers
            store.dispatch(setPlatform(platform));
            store.dispatch(setVersion(VERSION));
            store.dispatch(setStore(store));

            return (

                <Provider store={store}>
                    <Router hideNavBar={false} sceneStyle={{backgroundColor:'#131313'}}>
                        <Scene key="root" hideNavBar={true} sceneStyle={{backgroundColor:'#131313'}}>


                            <Scene  key="Tabbar" tabs={true} default="home" sceneStyle={{backgroundColor:'#131313'}}>
                                <Scene key="home" iconName={"home"} title="首页" icon={TabIcon} sceneStyle={{backgroundColor:'#131313'}}>
                                    <Scene key="search" component={ZoomEyeSearchView} title="Tab #1_1" hideNavBar={true}  hideTabBar={true} sceneStyle={{backgroundColor:'#131313'}}/>
                                    <Scene key="searchResult" component={ZoomEyeSearchResult} title="Result"  hideNavBar={false} hideTabBar={true} onRight={()=>alert("Right button")} rightTitle="Right"/>
                                    <Scene key="property" component={ZoomEyeProperty} title="Property" hideNavBar={false} hideTabBar={true}/>
                                </Scene>

                            </Scene>


                            <Scene key="Login"
                                   component={Login}
                                   title="Login"
                                   type="replace"/>


                        </Scene>
                    </Router>
                </Provider>
            );
        }

    });
    /**
     * registerComponent to the AppRegistery and off we go....
     */

    AppRegistry.registerComponent('MyProject', () => MyProject);
}
