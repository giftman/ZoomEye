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
import * as searchActions from './reducers/search/searchActions';
/**
 * Immutable
 */ 
import {Map} from 'immutable';
const {
  SET_SEARCH
} = require('./lib/constants').default;

/**
 * ## Redux boilerplate
 */
const actions = [
  searchActions
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
    ActivityIndicatorIOS,
    Image,
    Component
} = React;

var SearchResults = require('./SearchResults')

class SearchPage extends Component {

    onSearchTextChanged(event) {
        this.props.actions.setSearchString(event.nativeEvent.text);
    }
    _executeQuery(query) {
        this.props.actions.isLoading(true);
        fetch(query)
            .then(response => response.json())
            .then(json => this._handleResonse(json.response))
            .catch(error =>this.props.actions.isLoading(false));
    }

    _handleResonse(response) {
         this.props.actions.isLoading(false);
         this.props.actions.setMessage(' ');
         if (response.application_response_code.substr(0,1) === '1'){
             Actions.search_r({listings:response.listings, title:'Result' });
         }else{
             this.props.actions.setMessage('Location not recognized; please try again!');
         }
    }

    onSearchPressed() {
        var query = urlForQueryAndPage('place_name', this.props.search.searchString, 1);
        this._executeQuery(query);
    }
    onLocationPressed() {
  navigator.geolocation.getCurrentPosition(
    location => {
      var search = location.coords.latitude + ',' + location.coords.longitude;
      this.props.actions.setSearchString(search);
      var query = urlForQueryAndPage('centre_point', search, 1);
      this._executeQuery(query);
    },
    error => {
      this.props.actions.setMessage('Something had happened ' + error);
    });
}
    render(){
        var spinner = this.props.search.isLoading ? (<ActivityIndicatorIOS hidden='true' size='large'/>):(<View/>);
        return(   <View style={styles.container}>
                <Text style={styles.description}>
                Search by place-name,postcode or search near your location!
                </Text>
                <View style={styles.flowRight}>
                <TextInput
                style={styles.searchInput}
                value={this.props.search.searchString}
                onChange={this.onSearchTextChanged.bind(this)}
                placeholder='Search via name or postcode'/>
                <TouchableHighlight style={styles.button}
                underlayColor='#99d9f4'>
                <Text
                style={styles.buttonText}
                onPress={this.onSearchPressed.bind(this)}
                >Go</Text>
                </TouchableHighlight>
                </View>
                <TouchableHighlight style={styles.button} onPress={this.onLocationPressed.bind(this)}>
                    <Text style={styles.buttonText}>Location</Text>
                    </TouchableHighlight>
                    <Image source={require('image!house')} style={styles.image}/>
                    {spinner}
                <Text style={styles.description}>{this.props.search.message}</Text>
                    </View>
                    );

    }
}

function urlForQueryAndPage(key,value,pageNumber) {
    var data = {
        country:'uk',
        pretty:'1',
        encoding:'json',
        listing_type:'buy',
        action:'search_listings',
        page:pageNumber
    }
    data[key] = value;
    var querystring = Object.keys(data).map(key=>key + '=' + encodeURIComponent(data[key])).join('&')
        return 'http://api.nestoria.co.uk/api?'+ querystring;
}


var styles = StyleSheet.create({
    description: {
        marginBottom: 20,
        fontSize: 12,
        textAlign: 'center',
        color: '#656565'
    },
    container: {
        padding: 30,
        marginTop: 65,
        alignItems: 'center'
    },
    flowRight: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch'
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
        height:138
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
