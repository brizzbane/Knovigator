import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

import mainReducer from './reducers/mainReducer';
import Quests from './containers/quests'
import Quest from './containers/quest'
import NewQuest from './containers/newQuest'
import MainContainer from './containers/mainContainer';
import Stateful from './components/test/stateful';
import Functional from './components/test/functional';
import ReduxContainer from './components/test/reduxContainer';



let store;
const reduxDevTools = true;

if (reduxDevTools) {
	store = createStore(
		mainReducer,
		composeWithDevTools( 
			applyMiddleware(thunk),
		)
	)
} else {
	store = createStore(
		mainReducer,
		applyMiddleware(thunk)
	)
}


export function renderApp() {
	//Authenticate and get resources here
	//if(window.express && window.express.errors) errorHandler(window.express.errors);
	
	// authenticate(user =>{
	// 	store.dispatch(newSession(user))
	// })

	return (
		<Provider store={store} key="provider">
			<div>
				<Router>
					<Switch>
						<MainContainer exact path='/quests' Component={Quests}/>
            <MainContainer exact path='/quests/new' Component={NewQuest}/>
            <MainContainer exact path='/quests/new/:parent' Component={NewQuest}/>
            <MainContainer exact path='/quests/view/:id' Component={Quest}/>
            <MainContainer exact path='/quests/view/:title/:id' Component={Quest}/>
            <MainContainer exact path='/quests/:parent' Component={Quests}/>
						<MainContainer exact path='/functional' Component={Functional}/>
						<MainContainer exact path='/stateful' Component={Stateful}/>
						<MainContainer path='/stateful/:param' Component={Stateful}/>
						<MainContainer path='/redux' Component={ReduxContainer}/>
            <Redirect to="/quests" />
					</Switch>
				</Router>
			</div>
		</Provider>
	);
}



//--------------TEST DISPATCH ACTIONS-------------------

// console.log(store.getState())
// let unsubscribe = store.subscribe(() =>
//   console.log(store.getState())
// );

//store.dispatch(AppActions.newPopup({visible:true}))



