import React, {Fragment} from 'react';
import is from 'prop-types';


import * as api from '../actions/api'
import QuestList from '../components/common/questList'
import ActionBar from '../components/common/actionBar'
import QuestPreview from '../components/common/questPreview'


export default class Quests extends React.PureComponent{
  static propTypes = {
    match: is.shape({
      params: is.shape({
        parent: is.string.isRequired
      }).isRequired
    }).isRequired
  }


  constructor(){
    super()
    this.state = {
      questsArray: [],
      parentPreview: null,
      questInput: ''
    }
  }


  componentDidMount() {
    this.getData(this.props.match.params.parent)
  }


  componentWillReceiveProps (nextProps) {
    if(nextProps.match.params.parent !== this.props.match.params.parent) {
      this.getData(nextProps.match.params.parent)
    }
  }


  getData = (parent) => {
    api.getBranches(parent).then( ({branches, parent}) => this.setState({questsArray: branches, parentPreview: parent}))
  }


  addQuest = async () => {
    const parent = this.props.match.params.parent

    await api.postQuest({
      title: this.state.questInput,
      author: 'metamitya',
      parent: parent
    })

    this.getData(parent)
  }


  questInputHandler = (e) => {
    this.setState({questInput: e.target.value})
  }


  render() {
    return(
      <Fragment>
        <div className="pageTitle">BRANCH QUESTS</div>

        {this.state.parentPreview &&
          <QuestPreview scaleDown quest={this.state.parentPreview.questDetails} highlightedAnswer={this.state.parentPreview}/>}

        <ActionBar
          branches
          inputValue={this.state.questInput}
          inputHandler={this.questInputHandler}
          buttonHandler={this.addQuest}/>

        <QuestList questsArray={this.state.questsArray} parentPreview={this.state.parentPreview} />
      </Fragment>
    )
  }
}