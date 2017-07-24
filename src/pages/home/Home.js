/**
 * Created by tdzl2003 on 12/18/16.
 */
import React, { PropTypes, Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
    TouchableWithoutFeedback
} from 'react-native';
import route from '../../utils/routerDecorator';
import nameMobx from './mobx/NameMobx';
import {observer} from 'mobx-react/native';



@observer
@route('home')
export default class Home extends Component {

  static title = '标题';
  static rightNavTitle = 'fsd';
  static leftNavTitle = '返回';

  static contextTypes = {
    navigator: PropTypes.object,
  };

    componentDidMount() {
        nameMobx.startRandomChangeName();
    }

    componentWillUnMount() {
        nameMobx.endRandomChangeName();
    }

  render() {
    return (
      <View style={styles.container}>
        <Text>{nameMobx.name}</Text>
        <TouchableWithoutFeedback onPress={() => nameMobx.endRandomChangeName()}
                                  >
            <View>
                <Text style={styles.button}>确定选择</Text>
            </View>

        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    button: {
      position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 55,
        backgroundColor: 'red'
    }
});

