/**
 * Created by yuanyuan on 17-2-28.
 */

import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    Text,
    Dimensions,
    TouchableHighlight,
    TouchableWithoutFeedback,
    View
} from 'react-native';

import Constants from 'Constants';

export  default  class  PressButton extends Component {

    static props = {
        style: PropTypes.any,
        click: PropTypes.func,
        textStyle: PropTypes.any,
        title: PropTypes.title
    };

    render() {

        if (this.props.noHightlight){
            return (
                <TouchableWithoutFeedback
                                    onPress={()=>{
                                    this.props.click && this.props.click();
                  }}>
                    <View style={[styles.loginBtnContainer,this.props.style]}>
                        <Text style={!this.props.textStyle ? styles.loginBtn : this.props.textStyle}>{this.props.title || ''}</Text>
                    </View>
                </TouchableWithoutFeedback>
            );
        }

        return (<TouchableHighlight underlayColor={ this.props.underlayColor || Constants.colors.pressButtonPressColor} style={[styles.loginBtnContainer,this.props.style]}
                                    onPress={()=>{
                                    this.props.click && this.props.click();
                  }}>
            <Text style={!this.props.textStyle ? styles.loginBtn : this.props.textStyle}>{this.props.title || ''}</Text>
        </TouchableHighlight>);
    }

}

const styles = StyleSheet.create({
    loginBtnContainer: {
        width: Dimensions.get('window').width - 30,
        height: 45,
        borderRadius: 2,
        backgroundColor: Constants.colors.pressButtonColor,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginBtn: {
        color:'#474747',
        fontSize: 17,
    }
});