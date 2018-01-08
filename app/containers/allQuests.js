import React, {Fragment} from 'react';
import is from 'prop-types';

import * as api from '../actions/api'
import QuestList from '../components/common/questList'
import ActionBar from '../components/common/actionBar'


export default class Quests extends React.PureComponent{
  static propTypes = {}

  constructor(){
    super()
    this.state = {
      questsArray: [],
    }
  }


  componentDidMount() {
    api.getQuests().then( quests => {
      this.setState({questsArray: quests.filter( quest => quest.title !== 'Comments:')})
    })
  }


  newQuest = () => {
    this.props.history.push('/quests/new')
  }


  render() {
    return(
      <Fragment>
        <ActionBar title="QUESTS" buttonHandler={this.newQuest}/>
        <div className="pageTitle">QUESTS</div>
        <QuestList questsArray={this.state.questsArray} />
      </Fragment>
    )
  }
}