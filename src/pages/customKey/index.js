/**
 * Created by yuanyuan on 17-7-24.
 */
import CustomKeyPage from './CustomKeyPage';

export default {
    path: 'customKey',
    childRoutes: [
        CustomKeyPage
    ].map(v => v.routeConfig || v),
};