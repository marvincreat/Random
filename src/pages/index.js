/**
 * Created by tdzl2003 on 12/17/16.
 */
import Splash from './Splash';

import home from './home';
import NavBar from './NavBar';
import customKey from './customKey';

export default {
    path: '/',
    component: NavBar,
    childRoutes: [
        Splash,
        home,
        customKey
    ].map(v => v.routeConfig || v),
};
