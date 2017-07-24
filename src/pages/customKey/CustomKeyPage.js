/**
 * Created by yuanyuan on 17-7-24.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableWithoutFeedback
} from 'react-native';
import nameMobx from '../home/mobx/NameMobx';
import route from '../../utils/routerDecorator';

@route('CustomKeyPage')
export default class CustomKeyPage extends Component{

    constructor(props){
        super(props);

        this.state = {
            text: ''
        };
    }

    render(){
        console.warn('fsdfs');
        return (
            <View style={styles.container}>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                />
                <TouchableWithoutFeedback onPress={() => {}}>
                    <Text>添加文字</Text>
                </TouchableWithoutFeedback>
            </View>
        );
    }

    _onPress = () => {
        nameMobx.addNamePool(this.state.text);
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
});