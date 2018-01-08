import React, {Fragment} from 'react';
import is from 'prop-types';
import { Link } from 'react-router-dom'

import * as api from '../../actions/api'
import Answer from './answer'


export default class CommentsPreview extends React.PureComponent{
	static propTypes = {
		quest: is.object.isRequired,
    highlightedAnswer: is.object
	}


	state = {
	  expandComments: false,
    commentInput: '',
    comments: null
  }


  expandComments = () => {
	  api.getAnswers(this.props.quest._id).then( commentsArray => {
	    this.setState({
        comments: commentsArray,
        expandComments: true
      }, () => this.textAreaNode.focus())
    })
  }


	render() {
	  const {quest, highlightedAnswer} = this.props

		return(
      <div key={`${quest._id}`} className="questContainer">

        <div className='commentsTitleContainer'>

          <Link to={`/quests/view/${encodeURIComponent(quest.title)}/${quest._id}`}>
            <h3 className="questTitle">Q: {quest.title}</h3>
          </Link>
        </div>

        {this.state.comments ?
          this.state.comments.map( answer => <Answer key={answer._id} answer={answer}/>)
        :
          <Fragment>
            {highlightedAnswer &&
              <div className="commentsAnswerPreview">
                <p className="answerAuthor"><b>{highlightedAnswer.author}</b></p>
                <pre className="answerBody">{highlightedAnswer.body}</pre>
              </div>}
          </Fragment>}

        <div className="commentInputContainer">
          {this.state.expandComments ?
            <textarea
              className="commentTextarea"
              placeholder="Add comment"
              ref={(node) => this.textAreaNode = node}
              value={this.state.commentInput}
              onChange={(e) => this.setState({commentInput: e.target.value})}
              onBlur={() => this.setState(this.state.commentInput ? null : {expandComments: false, comments: null})}/>

          : <input
              className="commentInput"
              placeholder="Add comment"
              onFocus={this.expandComments}/>}
        </div>
      </div>
		);
	}
}