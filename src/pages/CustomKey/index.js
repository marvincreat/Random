/**
 * Created by yuanyuan on 17-7-24.
 */
import NavBar from './NavBar';

export default {
    path: '/',
    component: NavBar,
    childRoutes: [
        Splash,
        home,
    ].map(v => v.routeConfig || v),
};