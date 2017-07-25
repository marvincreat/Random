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
import PressButton from '../../components/PressButton';
import Constants from 'Constants';
import {setSpText} from '../../utils/fontUtil';

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
let minn = width < height ? width : height;

@observer
@route('home')
export default class Home extends Component {

    static title = '随机选菜';
    static rightNavTitle = true;
    static leftNavTitle = '返回';

    static contextTypes = {
        navigator: PropTypes.object,
    };

    componentWillUnMount() {
        nameMobx.endRandomChangeName();
    }

    onRightPressed = () => {
        this.context.navigator.push({location: '/customKey/CustomKeyPage'});
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.textView}>
                    <Text style={{fontSize: setSpText(25)}}>{nameMobx.name}</Text>
                </View>

                <View style={styles.buttonView}>
                    <PressButton
                        underlayColor={'#fff4b5'}
                        title={'开始'}
                        click={this._start}/>
                    <PressButton
                        style={{marginTop: 20}}
                        underlayColor={'#fff4b5'}
                        title={'停止'}
                        click={this._end}/>
                </View>

            </View>
        );
    }

    _start = () => {
        nameMobx.startRandomChangeName();
    };

    _end = () => {
        nameMobx.endRandomChangeName();
    };

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    buttonView: {
        position: 'absolute',
        height: 150,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textView: {
        width: width - 20,
        height: height - (__IOS__ ? 64 : 44) - (__ANDROID__ ? 20 : 0) - 30 - 150,
        borderWidth: Constants.window.pixel,
        borderColor: 'skyblue',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        marginHorizontal: 10,

    }
});

