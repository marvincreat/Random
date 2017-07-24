/**
 * Created by tdzl2003 on 12/18/16.
 */
import Home from './Home';

export default {
  path: 'home',
  childRoutes: [
    Home,
  ].map(v => v.routeConfig || v),
};
