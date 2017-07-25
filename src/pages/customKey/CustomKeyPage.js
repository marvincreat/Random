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
import nameMobx from '../home/mobx/NameMobx';

import route from '../../utils/routerDecorator';
import PressButton from '../../components/PressButton';

@route('CustomKeyPage')
export default class CustomKeyPage extends Component{

    static title = '自定义';

    constructor(props){
        super(props);

        this.state = {
            text: ''
        }
    }

    render(){
        return (
            <View style={styles.container}>
                <InputCell
                    value={this.state.text}
                    title="添加菜项"
                    onChangeText={(text)=>{
                                this.setState({text})
                            }}
                    maxLength={10}
                    placeholder='请输入菜品名称'/>

                <View style={styles.btnView}>
                    <PressButton
                        underlayColor={'#fff4b5'}
                        title={'添加'}
                        click={this._add}/>
                </View>

            </View>
        );
    }

    _add = () => {
        nameMobx.addNamePool(this.state.text);
        this.setState({
            text: ''
        });
        console.warn(nameMobx.namePool.length);
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    btnView: {
        flex: 1,
        paddingTop: 15,
        alignItems: 'center'
    }
});

