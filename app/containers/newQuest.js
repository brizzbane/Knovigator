import React from 'react';
import is from 'prop-types';

import * as api from '../actions/api'


export default class NewQuest extends React.PureComponent {
  static propTypes = {
    //propName: is.oneOfType([is.string, is.number])
  };


  constructor (props) {
    super()
    const parent = props.match.params.parent
    this.state = {
      parent: parent,
      parentPreview: null,
      questTitle: parent ? 'Comments:' : '',
      answer: '',
    }
  }


  componentDidMount () {
    if (this.state.parent) {
      api.getParent(this.state.parent).then( parent => {
        console.log(parent)
        this.setState({parentPreview: parent})
      })
    }
  }


  inputHandler = event => {
    const { name, value } = event.target;
    this.setState({[name]:value});
  }


  submit = () => {
    api.postQuest({
      title: this.state.questTitle,
      author: 'metamitya',
      parent: this.state.parent,
    })
      .then((quest)=>{
        if (this.state.parent) {
          api.editAnswer({
            _id: this.state.parent,
            branches: quest._id
          })
        }
        this.props.history.push('/quests')
      })
  }


  render() {
    return (
      <div>
        Quest Title:
        <br/>
        <input
          name="questTitle"
          placeholder="Quest name"
          onChange={this.inputHandler}
          value={this.state.questTitle}/>
        <br/>
        <br/>

        {this.state.parentPreview &&
          <div>
            Parent Preview:
            <div>
              {this.state.parentPreview.author}
            </div>
            <div>
              {this.state.parentPreview.body}
            </div>
          </div>}

        <br/>
        <br/>
        <textarea
          name="answer"
          placeholder="provide quest details or answer"
          onChange={this.inputHandler}
          value={this.state.answer}
        />
        <button
          onClick={this.submit}>
            Start Quest
        </button>

      </div>
    )
  }
}