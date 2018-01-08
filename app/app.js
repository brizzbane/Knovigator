import React from 'react';
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

import mainReducer from './reducers/mainReducer';
import Quests from './containers/allQuests'
import Branches from './containers/branches'
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


function renderApp() {

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
            <MainContainer exact path='/branches/:parent' Component={Branches}/>
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

ReactDOM.render(renderApp(), document.getElementById('app'));
