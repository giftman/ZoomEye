'use strict'

/**
 * ## Imports
 *
 * Redux
 */

/**
 * The actions we need
 */
var TimeAgo = require('react-native-timeago');
var React = require('react-native');
var {
    StyleSheet,
    Image,
    View,
    TouchableHighlight,
    Text,
    ScrollView,
    Component
} = React;
import Icon from 'react-native-vector-icons/FontAwesome';
const convertToString = require('../lib/JsonUtils').default;
class ZoomEyeProperty extends Component{

    constructor(props) {
        super(props);
        this.rowData = this.props.data;
    }


    render() {
        var tags = [];
        var textData = this.rowData.portinfo;
        if(textData) {
            for (var key of Object.keys(textData)) {
                // console.log(key + ": " + textData[key]);
                if(textData[key] && key != 'banner'){
                    tags.push(textData[key]);
                }
            }
        }
        var location = this.rowData.geoinfo.country.names.en + " " ;
        return (
            <View style={{marginTop:70,flex:1}}>
                <TouchableHighlight underlayColor='#ddd'>
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
                                <Text style={styles.price}>{this.rowData.ip}</Text>
                                <View style={styles.grid}>
                                    {tags.map((source, i) => (<Text key={i} style={styles.gridChild} >{source}</Text>))}
                                </View>
                            </View>


                            <View style={styles.rightContainer}>
                                <TimeAgo style={styles.title} time={this.rowData.timestamp} />
                            </View>


                        </View>
                        <View style={styles.separator}/>
                    </View>
                </TouchableHighlight>
                <ScrollView style={{height:300,flex:1}}>
                    <Text style={styles.description}>{convertToString(this.rowData.portinfo)}</Text>
                </ScrollView>
            </View>

        )
    }
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
module.exports = ZoomEyeProperty;
