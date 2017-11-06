import React from 'react';
import is from 'prop-types';
import { Link } from 'react-router-dom'

import * as api from '../actions/api'



export default class Quests extends React.PureComponent{
  static propTypes = {}

  constructor(){
    super()
    this.state = {
      questsArray: []
    }
  }


  componentDidMount() {
    this.getQuests(this.props.match.params.parent)
  }


  componentWillReceiveProps (nextProps) {
    if(nextProps.match.params.parent !== this.props.match.params.parent) {
      this.getQuests(nextProps.match.params.parent)
    }
  }


  getQuests = async (parent) => {
    this.setState({questsArray: parent ? await api.asyncGetBranches(parent) : await api.asyncGetQuests()})
  }


  render() {
    return(
      <div className="questList">
        <Link to="/quests/new"><button>+Quest</button></Link>
        <hr/>
        {this.state.questsArray.map((quest)=>{
          const highlightedAnswer = quest.highlightedAnswer ? JSON.parse(quest.highlightedAnswer) : ''
          return (
            <div key={`${quest._id}`} className="questContainer">
              <div className="questionContainer">
                <Link to={`/quests/view/${encodeURIComponent(quest.title)}/${quest._id}`}><h3>{quest.title}</h3></Link>
              </div>

              <div className="highlightedAnswer">
                <p className="answerAuthor"><b>{highlightedAnswer.author || ''}</b></p>
                <p className="answerBody">{highlightedAnswer.body || ''}</p>
              </div>
              <hr/>
            </div>
          )
        })}
      </div>
    );
  }
}