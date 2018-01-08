import React, {Fragment} from 'react'
import is from 'prop-types'
import { Link } from 'react-router-dom'

import AdminDropdownMenu from './adminDropdownMenu'
import * as api from '../../actions/api'


export default class Answer extends React.PureComponent {

  static propTypes = {
    scaleDown: is.bool,
    answer: is.object.isRequired,
    questPreview: is.bool
  }


  deleteAnswer = () => api.deleteAnswer(this.props.answer._id)


  render () {
    const {answer, scaleDown, questPreview} = this.props
    return (
      <div key={`${answer._id}`} className={scaleDown ? 'previewAnswerContainer' : 'answerContainer'}>
        <p className="answerAuthor"><b>{answer.author}</b></p>
        <pre className="answerBody">{answer.body}</pre>
        {!scaleDown &&
          <Fragment>
            <Link to={`/branches/${answer._id}`}>
              <button>Add Branch{answer.branches && answer.branches.length ? ` ${answer.branches.length}` : ''}</button>
            </Link>
            {!questPreview && <AdminDropdownMenu className="answerAdminButton" deleteHandler={this.deleteAnswer}/>}
          </Fragment>}
      </div>
    )
  }
}
