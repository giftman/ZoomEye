/**
 * # Profile.js
 *
 * This component provides an interface for a logged in user to change
 * their username and email.
 * It too is a container so there is boilerplate from Redux similar to
 * ```App``` and ```Login```
 */
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
import * as profileActions from '../reducers/profile/profileActions';
import * as globalActions from '../reducers/global/globalActions';
/**
 * Immutable Mapn
 */
import {Map} from 'immutable';

/**
 * The ErrorAlert will display any and all errors
 */
import ErrorAlert from '../components/ErrorAlert';

/**
 * The Header will display a Image and support Hot Loading
 */
import Header from '../components/Header';

/**
 * The itemCheckbox will display the state of the email verified
 */
import ItemCheckbox from '../components/ItemCheckbox';
/**
 * The necessary React components
 */
import Icon from 'react-native-vector-icons/FontAwesome';
import  Button from  'apsl-react-native-button';
import React,
{
  Component,
  StyleSheet,
  View,
  Text,
  Image,
}
from 'react-native';





/**
* ## Redux boilerplate
*/
const actions = [
  profileActions,
  globalActions
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


class Profile extends Component {
  /**
   * ## Profile class
   * Set the initial state and prepare the errorAlert
   */
  constructor(props) {
    super(props);
    this.errorAlert = new ErrorAlert();
    this.state = {
      formValues: {
        username: '',
        email: ''
      }
    };
  }

  /**
   * ### componentDidMount
   *
   * During Hot Loading, when the component mounts due the state
   * immediately being in a "logged in" state, we need to just set the
   * form fields.  Otherwise, we need to go fetch the fields
   */
  componentDidMount() {

    //     if (this.props.profile.form.fields.username == '' && this.props.profile.form.fields.email == '') {
    //   this.props.actions.getProfile(this.props.global.currentUser);
    //     } else {
    //   this.setState({
    //     formValues: {
    //       username: this.props.profile.form.fields.username,
    //       email: this.props.profile.form.fields.email
    //     }
    //   });
    // }

  }

  /**
   * ### render
   * display the form wrapped with the header and button
   */
  render() {
    this.errorAlert.checkError(this.props.profile.form.error);

    let self = this;

    /**
     * Set up the field definitions.  If we're fetching, the fields
     * are disabled.
     */


    /**
     * Wrap the form with the header and button.  The header props are
     * mostly for support of Hot reloading. See the docs for Header
     * for more info.
     */
    return (
      <View style={styles.container}>
        <View style={styles.names}>
          <View style={styles.names_left}>
            <Icon style={{color: "#bcbcbc",paddingRight:5}} name={"smile-o"} size={14} />
            <Text style={styles.titleText} >{"你好,qxlmcdzv2289"}</Text>
          </View>
          <View style={styles.names_right}>
            <Image
              style={{marginRight:5,width: 60, height: 20}}
              source={require('../img/diamond.png')} />


          <Icon style={{color: "#bcbcbc"}} name={"angle-right"} size={14} />
          </View>
        </View>
        <View style={styles.money}>
            <View style={styles.money_up}>
                <Text style={styles.moneyText}>{"累计收益(元)"}</Text>
                <View style={styles.baseCenter}>
                    <Text style={styles.moneyTextCenter}>{"81.48"}</Text>
                    <Image
                        style={{width: 13, height: 13}}
                        source={require('../img/question.png')} />
                </View>
                <Image
                    style={{marginRight:5,width: 50, height: 50,justifyContent:'flex-start',
        alignSelf:'flex-start'}}
                    source={require('../img/profile_activity.png')} />
            </View>
            <View style={styles.money_down}>
                <View style={styles.baseUpDown}>
                <View style={styles.baseCenter}>
                    <Text style={styles.moneyText}>{"资产总计(元)"}</Text>
                    <Image
                        style={{width: 13, height: 11}}
                        source={require('../img/question.png')} />
                </View>
                <Text style={styles.moneyTextBold}>{"10102.03"}</Text>
                </View>
                <View style={styles.divider}></View>
                <View style={styles.baseUpDown}>
                    <View style={styles.baseCenter}>
                        <Text style={styles.moneyText}>{"资产总计(元)"}</Text>
                        <Image
                            style={{width: 13, height: 11}}
                            source={require('../img/question.png')} />
                    </View>
                    <Text style={styles.moneyTextBold}>{"10102.03"}</Text>
                </View>
            </View>
        </View>
        <View style={styles.button}>

            <Button style={styles.button1} textStyle={{color:'white'}}>充值</Button>
            <Button style={styles.button2} textStyle={{color:'white'}}>提现</Button>
        </View>

        <View style={styles.grid}>
            <View style={styles.gridChild}>
                <Icon style={{color: "#bcbcbc"}} name={"smile-o"} size={30} />
                <Text style={styles.titleText}>{"资产总计"}</Text>
            </View>
            <View style={styles.gridChild}>
                <Icon style={{color: "#bcbcbc"}} name={"smile-o"} size={30} />
                <Text style={styles.titleText}>{"资产总计"}</Text>
            </View>
            <View style={styles.gridChild}>
                <Icon style={{color: "#bcbcbc"}} name={"smile-o"} size={30} />
                <Text style={styles.titleText}>{"资产总计"}</Text>
            </View>
            <View style={styles.gridChild}>
                <Icon style={{color: "#bcbcbc"}} name={"smile-o"} size={30} />
                <Text style={styles.titleText}>{"资产总计"}</Text>
            </View>
            <View style={styles.gridChild}>
                <Icon style={{color: "#bcbcbc"}} name={"smile-o"} size={30} />
                <Text style={styles.titleText}>{"资产总计"}</Text>
            </View>
            <View style={styles.gridChild}>
                <Icon style={{color: "#bcbcbc"}} name={"smile-o"} size={30} />
                <Text style={styles.titleText}>{"资产总计"}</Text>
            </View>

        </View>

      </View>
    );
  }
  /**
 * ## Styles
 */
}

var Dimensions = require('Dimensions');

var styles = StyleSheet.create({
    divider:{
        height:40,
        width:.8,
        alignSelf:'center',
        backgroundColor:'#efeff4'
    },
    baseUpDown:{
        flex:1,
        flexDirection: 'column',
        justifyContent:'center',
        alignItems:'flex-start',
    },

    baseCenter:{
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center',
    },
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#efeff4'
  },
  titleText:{
    fontFamily:'Cochin',
    fontSize:12,
  },
  names: {
    height:45,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingLeft:10,
    paddingRight:10 ,
  },
  names_left:{
    flexDirection: 'row',
    justifyContent:'center',
    alignItems:'center',
  },
  names_right:{
    flexDirection: 'row',
    justifyContent:'center',
    alignItems:'center',
  },
  money:{
    height:140,
      flexDirection: 'column',
    backgroundColor: '#fefefe'
  },
    money_up:{
        flex:4,
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent:'space-between',
        borderBottomWidth:1,
        borderColor: '#efeff4',
},
    moneyText:{
        fontSize:14,
        color: '#bcbcbc',
        paddingLeft:15,
        paddingTop:5
    },
    moneyTextBold:{
        fontSize:14,
        color: 'black',
        paddingLeft:15,
        paddingTop:5
    },
    moneyTextCenter:{
        fontSize:32,
        color:'#fb7743',
        marginRight:5
    },
    money_down:{
        flex:3,
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems:'center',
        justifyContent:'space-between',

    },
  button:{
      flexDirection: 'row',
      justifyContent:'center',
      alignItems:'center',
      paddingLeft:25,
      paddingRight:25,
      paddingTop:15
  },
    button1:{
        flex:1,
        marginRight:10,
        backgroundColor: '#fb7743',
        borderColor:  'white',
    },
    button2:{
        marginLeft:10,
        flex:1,
        backgroundColor: '#f6c541',
        borderColor:  'white'
    },
  grid:{
      backgroundColor:'white',
      flex:2,
      flexWrap:'wrap',
      flexDirection: 'row',
      justifyContent:'flex-start',
  },
    gridChild:{
        flexDirection: 'column',
        justifyContent:'center',
        alignItems:'center',
        width:Dimensions.get('window').width/3,
        height:75,
        borderWidth:.5,
        borderColor:'#efeff4',

    },
});
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
