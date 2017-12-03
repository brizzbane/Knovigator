import React from 'react';
import is from 'prop-types';
import { Link } from 'react-router-dom'

import * as api from '../actions/api'



export default class Quest extends React.PureComponent{
  static propTypes = {
    match: is.shape({
      params: is.shape({
        title: is.string,
        id: is.string
      }).isRequired
    }).isRequired
  }


  constructor(props) {
    super()
    this.state = {
      title: props.match.params.title,
      answersArray: [],
      answer: '',
    }
  }


  componentDidMount() {
    if(!this.props.match.params.title) {
      this.updateTitle()
    } else {
      this.getAnswers()
    }
  }


  componentWillReceiveProps (nextProps) {
    if(nextProps.match.params.id !== this.props.match.params.id) {
      if(!nextProps.match.params.title) {
        this.updateTitle(nextProps.match.params.id)
      }
      this.getAnswers(nextProps.match.params.id)
    }
    if(nextProps.match.params.title && nextProps.match.params.title !== this.props.match.params.title) {
      this.state.title = nextProps.match.params.title
    }
  }


  updateTitle = (id = this.props.match.params.id) => {
    api.asyncQuestQuery(id)
      .then((quest)=>{
        this.props.history.replace(`/quests/view/${quest.title}/${quest._id}`)
      })
  }


  getAnswers = (id = this.props.match.params.id) => {
    api.asyncAnswerQuery(id).then( answersArray => {
      this.setState({answersArray})
    })
  }


  inputHandler = event => {
    const { name, value } = event.target;
    this.setState({[name]:value});
  }


  submitAnswer = () => {
    api.asyncNewAnswer({
      quest: this.props.match.params.id,
      body: this.state.answer,
      author: 'metamitya'
    })
      .then((answer) => {
        this.getAnswers()
        api.asyncEditQuest({
          _id: this.props.match.params.id,
          highlightedAnswer: JSON.stringify(answer)
        })
      })
  }


  render() {
    return(
      <div className="questList">
        <h3>{decodeURIComponent(this.props.match.params.title || this.state.title || '')}</h3>
        <hr/>

        {this.state.answersArray.map((answer)=>{
          return (
            <div key={`${answer._id}`} className="answerContainer">
              <p className="answerAuthor"><b>{answer.author}</b></p>
              <p className="answerBody">{answer.body}</p>
              <Link to={`/quests/new/${answer._id}`}><button>Branch</button></Link>
              {answer.branches.length === 1 &&
                <Link to={`/quests/view/${encodeURIComponent(answer.branches[0])}`}>
                  <button>1 Branch Expand >></button>
                </Link>}
              {answer.branches.length > 1 &&
                <Link to={`/quests/${answer._id}`}>
                  <button>{answer.branches.length} Branches Expand >></button>
                </Link>}
              <hr/>
            </div>
          )
        })}

        <br/>

        <div className="answerBox">
          <textarea
            name="answer"
            placeholder="type answer here..."
            onChange={this.inputHandler}
            value={this.state.answer}/>
          <button onClick={this.submitAnswer}>+Answer</button>
        </div>
      </div>
    );
  }
}