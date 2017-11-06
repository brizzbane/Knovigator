import React from 'react';
import is from 'prop-types';

import * as api from '../actions/api'


export default class NewQuest extends React.PureComponent {
  static propTypes = {
    //propName: is.oneOfType([is.string, is.number])
  };


  state = {
    questTitle: ''
  }


  inputHandler = event => {
    const { name, value } = event.target;
    this.setState({[name]:value});
  }


  submit = () => {
    const parent = do { try { this.props.match.params.parent } catch(e) {}} || ''
    api.asyncNewQuest({
      title: this.state.questTitle,
      author: 'metamitya',
      parent: parent,
    })
      .then((quest)=>{
        if (parent) {
          api.asyncEditAnswer({
            _id: this.props.match.params.parent,
            branches: quest._id
          })
        }
        this.props.history.push('/quests')
      })
  }


  render() {
    return (
      <div>
        <textarea
          name="questTitle"
          placeholder="type query here..."
          onChange={this.inputHandler}
          value={this.state.questTitle}/>
        <button
          onClick={this.submit}>
            Start Quest
        </button>

      </div>
    )
  }
}