/**
 * Created by tdzl2003 on 12/18/16.
 */
import React, {PropTypes, Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    Dimensions
} from 'react-native';
import route from '../../utils/routerDecorator';
import nameMobx from './mobx/NameMobx';
import {observer} from 'mobx-react/native';


@observer
@route('home')
export default class Home extends Component {

    static title = '标题';
    static rightNavTitle = 'true';

    static contextTypes = {
        navigator: PropTypes.object,
    };

    componentDidMount() {
        nameMobx.startRandomChangeName();
    }

    componentWillUnMount() {
        nameMobx.endRandomChangeName();
    }

    onRightPressed = () => {
        this.context.navigator.push('/customKey/CustomKeyPage');
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text>{nameMobx.name}</Text>
                </View>

                <TouchableWithoutFeedback onPress={() => nameMobx.endRandomChangeName()}
                                          style={styles.button}>
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text>确定选择</Text>
                    </View>
                </TouchableWithoutFeedback>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    button: {
        width: Dimensions.get('window').width,
        height: 55,
        backgroundColor: 'red',
    }
});

