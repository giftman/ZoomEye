'use strict';
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
import * as authActions from '../reducers/auth/authActions';
/**
 * Immutable
 */
import {Map} from 'immutable';
// import ErrorAlert from '../components/ErrorAlert';

const GiftedSpinner = require('react-native-gifted-spinner');

/**
 * ## Redux boilerplate
 */
const actions = [
    zoomeyeActions,
    authActions
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
var React = require('react-native');
import {Actions} from 'react-native-router-flux';
var {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableHighlight,
    Image,
    Component
} = React;


class ZoomEyeSearchView extends Component {

    constructor(props) {
        super(props);
        // this.errorAlert = new ErrorAlert();
    }

    componentDidMount() {
         this.props.actions.getUser();
        //this.props.actions.login("1556138063@qq.com","test1001");
    }

    onSearchTextChanged(event) {
        this.props.actions.setSearchString(event.nativeEvent.text);
    }

    // _handleResonse(response) {
    //     this.props.actions.isLoading(false);
    //     this.props.actions.setMessage(' ');
    //     if (response.application_response_code.substr(0,1) === '1'){
    //         // Actions.search_r({listings:response.listings, title:'Result' });
    //     }else{
    //         this.props.actions.setMessage('Location not recognized; please try again!');
    //     }
    // }
    render(){
        // this.errorAlert.checkError(this.props.zoomeye.error);
        let onButtonPress = buttonPressHandler.bind(null,
            this.props.actions.query,
            this.props.zoomeye.search.keyword,
            this.props.actions.clearResult

        );
        var spinner = this.props.zoomeye.isFetching ?  (<GiftedSpinner/>):(<View/>);
        return(   <View style={styles.container}>
                {spinner}
                <Text style={styles.description}>
                    Search by keyword,device,service ..!
                </Text>
                <Image source={require('../img/zoomeye.png')} style={styles.image} resizeMode={Image.resizeMode.contain}/>
                <View style={styles.flowRight}>
                    <TextInput
                        style={styles.searchInput}
                        value={this.props.zoomeye.search.keyword}
                        onChange={this.onSearchTextChanged.bind(this)}
                        />
                    <TouchableHighlight style={styles.button}
                                        underlayColor='#99d9f4'>
                        <Text
                            style={styles.buttonText}
                            onPress={onButtonPress}
                        >Go</Text>
                    </TouchableHighlight>
                </View>


                <Text style={styles.description}>{this.props.zoomeye.message}</Text>
            </View>
        );

    }
}

function buttonPressHandler(query,keyword,clearResult) {
    // this.props.actions.query(this.props.search.searchString,1,'app')
    clearResult();
    query(keyword,1,'');
}



var Dimensions = require('Dimensions');
var styles = StyleSheet.create({
    description: {
        marginBottom: 20,
        fontSize: 12,
        textAlign: 'center',
        color: '#656565'
    },
    container: {
        // marginTop: 45,
        justifyContent:'center',
        height:Dimensions.get('window').height,
        alignItems: 'center',
        backgroundColor:'#131313'
    },
    flowRight: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch',
        padding:10
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    button: {
        height: 36,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    searchInput: {
        height: 36,
        padding: 4,
        marginRight: 5,
        flex: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 8,
        color: '#48BBEC'
    },
    image:{
        width:217,
        height:138,
        marginBottom:10
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ZoomEyeSearchView);
