/**
 * Created by tdzl2003 on 12/18/16.
 */

import React, {PropTypes, Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    NativeModules,
    Alert
} from 'react-native';
import router from '../utils/routerDecorator';
import {loadToken} from '../logics/rpc';
import ApiProvider from '../utils/ApiProvider'

const UpdateModule = NativeModules.UpdateModule;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
});

@router('splash')
export default class Splash extends Component {
    static hideNavBar = true;
    static contextTypes = {
        navigator: PropTypes.object,
    };

    async componentWillMount() {
        this.context.navigator.replace({location: '/home/home'});
    }

    componentDidMount() {
        ApiProvider.getVersion().then(response => {
            if (response.success === true) {
                let result = response.data[0];
                let updateInfo = result.updateinfo;
                let updateUrl = result.updateurl;
                let jsUrl = result.jsurl;

                let checkVersionDic = {
                    version: result.version,
                    minversion: result.minversion,
                    jsversion: result.jsversion

                };

                //status 0 不更新， 1，原生更新可选，2，原生必须更新，3，最常见的，jsbundle热更新

                UpdateModule.checkVersion(checkVersionDic).then(resp => {

                    let updateUrlDic = {
                        updateState: resp.isNeedUpdateState,
                        url: updateUrl
                    };

                    if (resp.isNeedUpdateState) {
                        switch (resp.isNeedUpdateState) {
                            case 1:
                                Alert.alert(
                                    '更新提示',
                                    updateInfo,
                                    [
                                        {text: '下次再说', onPress: () => console.log('Cancel Pressed')},
                                        {
                                            text: '去更新', onPress: () => {
                                            UpdateModule.updateNative(updateUrlDic);
                                        }
                                        },
                                    ],
                                    {cancelable: false}
                                );
                                break;
                            case 2:
                                Alert.alert(
                                    '重要更新提示',
                                    updateInfo,
                                    [
                                        {
                                            text: '立即更新', onPress: () => {
                                            UpdateModule.updateNative(updateUrlDic);
                                        }
                                        },
                                    ],
                                    {cancelable: false}
                                );
                                break;
                            case 3:
                                UpdateModule.gotoUpdateJS(jsUrl);
                                break;
                            default:
                                return;
                        }
                    }

                }).catch(e => {
                    console.warn(e);
                });

            } else {
                console.log('getVersionFailedMsg:' + response.message);
            }
        }).catch(error => {
            console.warn("getVersionError" + error);
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>This is splash page</Text>
            </View>
        );
    }
}
