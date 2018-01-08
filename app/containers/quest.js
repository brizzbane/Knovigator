import React, {Fragment} from 'react';
import is from 'prop-types';

import * as api from '../actions/api'
import Answer from '../components/common/answer'
import ActionBar from '../components/common/actionBar'
import QuestPreview from '../components/common/questPreview'



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
      answerInput: '',
      parent: null
    }
  }


  componentDidMount() {
    this.getQuestInfo()
  }


  componentWillReceiveProps (nextProps) {
    //When user navigates from one quest to another, this component doesn't remount, it just receives the new id prop from the url
    if(nextProps.match.params.id !== this.props.match.params.id) {
      this.getQuestInfo(nextProps.match.params.id)
    }
  }


  getQuestInfo = (id = this.props.match.params.id) => {
    api.questQuery(id)
      .then((quest)=>{

        this.setState({
          title: quest.title,
          parent: quest.parentDetails ? quest.parentDetails : null
        })

        if(this.props.match.params.title !== quest.title) {
          //this.props.history.replace(`/quests/view/${quest.title}/${quest._id}`)
        }
      })

    this.getAnswers(id)
  }


  getAnswers = (id = this.props.match.params.id) => {
    api.getAnswers(id).then( answersArray => {
      this.setState({answersArray})
    })
  }


  inputHandler = event => {
    const { name, value } = event.target;
    this.setState({[name]:value});
  }


  submitAnswer = () => {
    api.postAnswer({
      quest: this.props.match.params.id,
      body: this.state.answerInput,
      author: 'metamitya'
    })
      .then(() => {
        this.getAnswers()
        this.setState({answerInput: ''})
      })
  }


  render() {
    return(
      <Fragment>
        <ActionBar title="QUEST"/>

        <div className="pageTitle">QUEST</div>

        <div className="answerList">

          <div className="questTitleContainer">
            <h3 className="questTitle">Q: {decodeURIComponent(this.props.match.params.title || this.state.title || '')}</h3>
            {this.state.parent &&
              <QuestPreview scaleDown quest={this.state.parent.questDetails} highlightedAnswer={this.state.parent}/>}
          </div>

          {this.state.answersArray.map( answer => <Answer key={answer._id} answer={answer}/>)}

          <div className="answerBox">
            <textarea
              name="answerInput"
              placeholder="type answer here..."
              onChange={this.inputHandler}
              value={this.state.answerInput}/>
            <button onClick={this.submitAnswer}>+Answer</button>
          </div>
        </div>
      </Fragment>
    );
  }
}