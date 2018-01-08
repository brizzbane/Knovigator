import React from 'react'
import is from 'prop-types'

import QuestPreview from '../common/questPreview'
import CommentsPreview from '../common/commentsPreview'


export default class QuestList extends React.PureComponent {
  static propTypes = {
    questsArray: is.array.isRequired
  }

  render () {
    return (
      <div className="questList">
        {this.props.questsArray.map((quest)=>{
          return quest.title !== 'Comments:' ?
            <QuestPreview key={quest._id} quest={quest} highlightedAnswer={quest.highlightedAnswerDetails}/>
            : <CommentsPreview key={quest._id} quest={quest} highlightedAnswer={quest.highlightedAnswerDetails}/>
        })}
      </div>
    )
  }
}
