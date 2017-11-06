import ajax from '../helpers/ajax'

// {title, body, author, parent, date}
export async function asyncNewAnswer (post) {
  return ajax.post('/api/answers', {
    body: JSON.stringify(post)
  })
}

export async function asyncGetAnswers () {
  return ajax.get('/api/answers')
}

export async function asyncAnswerQuery (id) {
  return ajax.get(`/api/answers/${id}`)
}

export async function asyncEditAnswer (answer) {
  return ajax.patch('/api/answers', {
    body: JSON.stringify(answer)
  })
}

export async function asyncNewQuest (quest) {
  return ajax.post('/api/quests', {
    body: JSON.stringify(quest)
  })
}

export async function asyncGetQuests () {
  return ajax.get('/api/quests')
}

export async function asyncQuestQuery (id) {
  return ajax.get(`/api/quest/${id}`)
}

export async function asyncEditQuest (quest) {
  return ajax.patch('/api/quests', {
    body: JSON.stringify(quest)
  })
}

export async function asyncGetBranches (id) {
  return ajax.get(`/api/quests/${id}`)
}