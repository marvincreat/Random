/**
 * Created by wjyx on 2017/6/1.
 *
 */

import React, {Component,PropTypes} from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
} from 'react-native';
import Constants from 'Constants';

export default class InputCell extends Component {

    static propTypes:{
        title:PropTypes.string,//左边title描述信息
        placeholder:PropTypes.string.isRequired,//输入框的占位文字
        onChangeText:PropTypes.func,//输入框的输入过程的回调
        maxLength:PropTypes.number,//最大长度
        showOptionalText:PropTypes.bool,//是否显示可选项
    };

    static defaultProps = {
        title:"小费",
        placeholder:'试着加点小费吧~',
        showOptionalText:false,
        onChangeText:(text)=>{
            console.warn(`InputCell not reset onChangeText func : ` + text);
        }
    };

    render(){
        const {title,
            style,
            placeholder,
            onChangeText,
            textInputStyle,
            showOptionalText,
            ...otherSetting} = this.props;
        return (<View style={{backgroundColor:'white'}}>
            <View style={[styles.container,style]}>
                <View style={styles.leftContainer}>
                    <Text style={styles.title}>{title}</Text>
                    {showOptionalText ? <Text style={styles.optional}>（选填）</Text> : null}
                </View>
                <View style={styles.rightContainer}>
                    <TextInput style={[styles.textInput,textInputStyle]}
                               placeholder={placeholder}
                               onChangeText={onChangeText}
                               enablesReturnKeyAutomatically={true}
                               placeholderTextColor={'#bbb'}
                               autoCorrect={false}
                               underlineColorAndroid={'transparent'}
                                {...otherSetting}
                               selectionColor={Constants.input.selectionColor}/>
                </View>
            </View>
        </View>);
    }
}


const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        borderBottomWidth:Constants.window.pixel,
        borderBottomColor:'#e9e9e9',
        marginLeft:15,
        height:55,
        alignItems:'center',
    },
    //左边部分的容器
    leftContainer:{
        flexDirection:'row',
        alignItems:'center',
        width:90,
    },
    //title
    title:{
        fontSize:14,
        color:'#474747'
    },
    rightContainer:{
        height:55,
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        overflow:'hidden'
    },
    textInput:{
        fontSize:14,
        color:'#474747',
        flex:1,
        marginRight:14,
    },
    //可选样式
    optional: {
        fontSize: 10,
        color: '#474747',
        marginTop: 3,
    },
});