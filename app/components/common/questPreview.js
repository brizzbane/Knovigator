import React, {Fragment} from 'react';
import is from 'prop-types';
import { Link } from 'react-router-dom'

import Answer from './answer'
import AdminDropdownMenu from './adminDropdownMenu'
import * as api from '../../actions/api'



export default class QuestPreview extends React.PureComponent{
	static propTypes = {
		quest: is.object.isRequired,
    highlightedAnswer: is.object,
    scaleDown: is.bool
	}


	deleteQuest = () => api.deleteQuest(this.props.quest._id)


	render() {
	  const {quest, scaleDown, highlightedAnswer} = this.props

		return(
      <div key={`${quest._id}`} className={`questContainer ${scaleDown ? 'scaleDown' : ''}`}>

        <div className={`${scaleDown ? 'previewQuestTitleContainer' : 'questTitleContainer'} ${quest.parentDetails ? 'withParent' : ''}`}>

          {scaleDown && <div className="parentText">PARENT</div>}

          <Link to={`/quests/view/${encodeURIComponent(quest.title)}/${quest._id}`}>
            <h3 className="questTitle">Q: {quest.title}</h3>
          </Link>

          {quest.parentDetails &&
            <QuestPreview
              scaleDown
              quest={quest.parentDetails.questDetails}
              highlightedAnswer={quest.parentDetails}/>}
        </div>

        {highlightedAnswer &&
          <Fragment>
            <Answer questPreview scaleDown={scaleDown} answer={highlightedAnswer}/>

            {!scaleDown &&
              <div className="expandQuestContainer">
                <Link to={`/quests/view/${encodeURIComponent(quest.title)}/${quest._id}`}>More</Link>
              </div>}
          </Fragment>}

        {!scaleDown && <AdminDropdownMenu className="questAdminButton" deleteHandler={this.deleteQuest}/>}
      </div>
		);
	}
}