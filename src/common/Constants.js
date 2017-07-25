/**
 * Created by Marvin on 2016/10/28.
 * @providesModule Constants
 */
import {Dimensions, PixelRatio} from 'react-native';


const window = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    withoutNavHeight:Dimensions.get('window').height - 64,//除去
    pixel: 1.0 / PixelRatio.get(),
};


//客服电话
const tel = {
    showTelephone: "400-600-6700",
    reallyTelephone: "tel:400-600-6700",
};


//todo 移动到ToobobColor文件里面
const colors = {
    pressButtonColor: '#ffe123',
    pressButtonPressColor: '#aaaaaa'
};
//输入框颜色
const input = {
    selectionColor: __IOS__ ? '#ffe212' : '#474747'
};
let PullRefreshStyle = {
    'progressBackgroundColor': '#ffffff',
    'colors': ['#ffe123'],
};
const btnColor = {
    default: '#ffe123',
};


export default {
    window,
    colors, btnColor, input,
    tel,
    PullRefreshStyle,
}