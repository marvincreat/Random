/**
 * Created by yuanyuan on 17-7-24.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import InputCell from './InputCell';
import route from '../../utils/routerDecorator';

@route('CustomKeyPage')
export default class CustomKeyPage extends Component{

    constructor(props){
        super(props);

        this.state = {
            text: ''
        }
    }

    render(){
        return (
            <View>
                <InputCell
                    value={this.state.text}
                    title="添加"
                    onChangeText={(text)=>{
                                this.setState({text})
                            }}
                    maxLength={10}
                    placeholder='请输入文字'/>
            </View>
        );
    }
}