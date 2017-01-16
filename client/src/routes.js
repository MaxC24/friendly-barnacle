import Base from './components/Base.jsx';
import Homepage from './components/HomePage.jsx';
import DashboardPage from './containers/DashboardPage.jsx';
import LoginPage from './containers/LoginPage.jsx';
import SignUpPage from './containers/SignUpPage.jsx';
import BoardPage from './containers/BoardPage.jsx';
import Auth from './modules/Auth';

const routes = {

	component: Base,
	childRoutes: [
		{
			path: '/',
			getComponent: (location, callback) => {
				if(Auth.isUserAuthenticated()) {
					callback(null, DashboardPage);
				} else {
					callback(null, LoginPage);
				}
			}
		},

		{
			path:'/login',
			component: LoginPage
		},

		{
			path: '/signup',
			component: SignUpPage
		},
		{
			path: '/logout',
			onEnter: (nextState, replace) => {
				Auth.deauthenticateUser();
				replace('/');
			}
		},
		{
			path: '/board',
			component: BoardPage
		}
	]
}

export default routes;
