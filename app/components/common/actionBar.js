import React, {Fragment} from 'react';
import is from 'prop-types';



export default class ActionBar extends React.PureComponent{
	static propTypes = {
	  buttonHandler: is.func.isRequired,
		inputHandler: is.func.isRequired,
    inputValue: is.string.isRequired,
    addQuestHandler: is.func,
    title: is.string,
    branches: is.bool
	}

	static defaultProps = {
	  inputValue: '',
    inputHandler: () => console.log('search needs an input handler'),
    buttonHandler: () => console.log('button needs handler')
  }


	render() {
		return(
		  <div className="actionBarContainer">
        <input
          className="searchQuests"
          value={this.props.inputValue}
          onChange={this.props.inputHandler}
          placeholder={this.props.branches ? 'Start a new quest or add to existing quests' : "Search Quests"}
        />

        {!this.props.branches && <div className="orText">OR</div>}

        <button onClick={this.props.buttonHandler} className="addQuestButton">+QUEST</button>
      </div>
		);
	}
}
