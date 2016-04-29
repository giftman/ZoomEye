'use strict'

/**
 * ## Imports
 *
 * Redux
 */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/**
 * The actions we need
 */
import * as zoomeyeActions from '../reducers/zoomeye/zoomeyeActions';
/**
 * Immutable
 */
import {Map} from 'immutable';

import Icon from 'react-native-vector-icons/FontAwesome';

const  AppAuthToken = require('../lib/AppAuthToken').default;
/**
 * ## Redux boilerplate
 */
const actions = [
    zoomeyeActions
];

function mapStateToProps(state) {
    return {
        ...state
    };
}

function mapDispatchToProps(dispatch) {
    const creators = Map()
        .merge(...actions)
        .filter(value => typeof value === 'function')
        .toObject();

    return {
        actions: bindActionCreators(creators, dispatch),
        dispatch
    };
}
var TimeAgo = require('react-native-timeago');
var React = require('react-native');
import {Actions} from 'react-native-router-flux';
const ZoomEyeApi = require('../lib/ZoomEyeApi').default;
var RefreshInfiniteListView = require('react-native-refresh-infinite-listview');
var {
    StyleSheet,
    Image,
    View,
    TouchableHighlight,
    Text,
    Component
} = React;

class ZoomEyeSearchResult extends Component{

    renderRow(rowData,sectionID,rowID) {
        var tags = [];
        var textData = rowData.portinfo;
        if(textData) {
            for (var key of Object.keys(textData)) {
                // console.log(key + ": " + textData[key]);
                if(textData[key] && key != 'banner'){
                    tags.push(textData[key]);
                }
            }
        }
        var location = rowData.geoinfo.country.names.en + " " ;
        return (
            <TouchableHighlight onPress={()=> onRowPressed(rowData) } underlayColor='#ddd'>
                <View>
                    <View style={styles.rowContainer}>
                        <View style={styles.leftContainer}>
                            <Image style={styles.thumb} resizeMode="contain" source={require("../img/zoomeye.png") } />
                            <View style={styles.baseCenter}>
                                <Icon style={{color: "#bcbcbc",paddingRight:5}} name={"map-marker"} size={14} />
                                <Text style={styles.title}>{location}</Text>
                            </View>
                        </View>

                        <View style={styles.textContainer}>
                            <Text style={styles.price}>{rowData.ip}</Text>
                             <View style={styles.grid}>
                                 {tags.map((source, i) => (<Text key={i} style={styles.gridChild} >{source}</Text>))}
                             </View>
                        </View>


                        <View style={styles.rightContainer}>
                            <TimeAgo style={styles.title} time={rowData.timestamp} />
                        </View>


                    </View>
                    <View style={styles.separator}/>
                </View>
            </TouchableHighlight>
        );
    }

    render() {
        // let onInfinitePress = this.onInfinite.bind(this,
        //     this.props.zoomeye.search.keyword
        // );
        let onInfinite = () => {
            console.log("onInfinite");
            this.props.actions.nextPage();
            this.props.actions.query(
                this.props.zoomeye.search.keyword,
                this.props.zoomeye.search.page,
                "");
            // this.setTimeout(()=>{
                // this.setState({
                //     dataSource:ds.cloneWithRows(this.props.zoomeye.search.searchResult),
                // });
                this.list.hideFooter();
            // }, 500);

        };
        let onRefresh = () => {
            console.log("onRefresh");
            this.props.actions.prePage();
            this.props.actions.query(
                this.props.zoomeye.search.keyword,
                this.props.zoomeye.search.page,
                "");
            // this.setTimeout(()=>{
                this.list.hideHeader();
            // }, 500);

        };
        return (
            <View style={{marginTop:70,flex:1}}>
                <RefreshInfiniteListView
                    ref = {(list) => {this.list= list}}
                    dataSource={this.props.zoomeye.search.searchResult}
                    renderRow={this.renderRow}
                    // loadedAllData={this.loadedAllData}
                    initialListSize={10}
                    scrollEventThrottle={10}
                    onRefresh = {onRefresh.bind(this)}
                    onInfinite = {onInfinite.bind(this)}
                >
                </RefreshInfiniteListView>
            </View>

        //     <ListView
        //         style={{marginTop:70}}
        //         dataSource={this.state.dataSource}
        //         renderRow={this.renderRow.bind(this)}
        //         onEndReached={this.onEndReached}/>
        )
    }
}

export function onRowPressed(rowData){
    Actions.property({data:rowData, title:'Property' });
}

var styles = StyleSheet.create({
    baseCenter:{
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center',
    },
    thumb: {
        width: 60,
        height: 40,
        marginRight: 10,
        marginBottom:5,
    },
    textContainer: {
        flex: 1
    },
    separator: {
        height: 1,
        backgroundColor: '#dddddd'
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#48BBEC',
        paddingLeft:3
    },
    title: {
        fontSize: 10,
        color: '#656565'
    },
    rowContainer: {
        flexDirection: 'row',
        padding: 5,
        justifyContent:'center',
        alignItems:'center',
    },
    leftContainer:{
        flexDirection: 'column',
        justifyContent:'center',
        alignItems:'center',
        width:90
    },
    rightContainer:{
        flexDirection: 'column',
        justifyContent:'flex-end',
        alignSelf:'flex-start',
        padding:5
    },
    grid:{
        flex:1,
        flexWrap:'wrap',
        flexDirection: 'row',
        justifyContent:'flex-start',
    },
    gridChild:{
        flexDirection: 'column',
        justifyContent:'center',
        alignItems:'center',
        margin:4,
        padding:2,

        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 5,
        color:'white'
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(ZoomEyeSearchResult);
