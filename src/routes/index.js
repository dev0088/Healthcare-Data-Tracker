import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Router, Stack, Scene, Actions,Tabs } from 'react-native-router-flux';
import { connect } from 'react-redux';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {
  Main,
  Login,
  Signup,
  Reset,
	Dashboard,
	Settings,
  HeartRate,
  BloodPressure
} from '~/modules';
import { colors } from '~/common/constants';

class Routes extends Component {
	render() {
		return (
			<Router
				navigationBarStyle={styles.navBar}
				titleStyle={styles.navTitle}
				sceneStyle={styles.routerScene}
			>
				<Scene key='root' panHandlers={null}>
					<Scene 
						key='main'
						hideNavBar
						component={Main}
						title={'Main'}
					/>
					<Scene 
						key='login'
						component={Login}
						title={'Login'}
					/>
					<Scene 
						key='signup'
						component={Signup}
						title={'Sign Up'}
					/>
					<Scene 
						key='forgotPasword'
						component={Reset}
						title={'Forgot Password'}
					/>
					<Scene
						key="home"
						hideNavBar
						tabs={true}
					>
						<Scene 
							key='dashboard'
							component={Dashboard}
							// hideNavBar
							title={'Dashboard'}
							initial
							icon={ () =>
								<MaterialIcon
									name='home'
									style={{
										backgroundColor: 'transparent',
										color: colors.primary,
										fontSize: 24,
									}}
								/>
							}
						/>
						<Scene 
							key='settings'
							component={Settings}
							title={'Settings'}
							icon={ () =>
								<MaterialIcon
									name='settings'
									style={{
										backgroundColor: 'transparent',
										color: colors.primary,
										fontSize: 24,
									}}
								/>
							}
						/>
					</Scene>
					<Scene 
						key='heartRate'
						component={HeartRate}
						title={'Heart Rate'}
						hideNavBar={false}
						hideTabBar={true}
					/>
					<Scene 
						key='bloodPressure'
						component={BloodPressure}
						title={'Blood Pressure'}
						hideNavBar={false}
						hideTabBar={true}
					/>
					</Scene>
			</Router>
		)
	}
}

const styles = StyleSheet.create({
  navBar: {
		backgroundColor: colors.light,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
  },
  navTitle: {
    color: colors.title,
  },
  routerScene: {
		// paddingTop: Navigator.NavigationBar.Styles.General.NavBarHeight,
		// some navbar padding to avoid content overlap
  },
});

const mapStateToProps = function(state) {
	const { auth } = state
	return {
		isAuthenticated: auth && auth.isAuthenticated
	}
}

export default connect(mapStateToProps)(Routes)
