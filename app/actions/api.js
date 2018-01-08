import ajax from '../helpers/ajax'


export async function postAnswer (post) {
  return ajax.post('/api/postAnswer', {
    body: JSON.stringify(post)
  })
}

export async function getParent (id) {
  return ajax.get(`/api/getParent/${id}`)
}

export async function getAnswers (id) {
  return ajax.get(`/api/getAnswers/${id}`)
}

export async function editAnswer (answer) {
  return ajax.patch('/api/editAnswer', {
    body: JSON.stringify(answer)
  })
}

export async function postQuest (quest) {
  return ajax.post('/api/postQuest', {
    body: JSON.stringify(quest)
  })
}

export async function getQuests () {
  return ajax.get('/api/getQuests')
}

export async function questQuery (id) {
  return ajax.get(`/api/questQuery/${id}`)
}

export async function editQuest (quest) {
  return ajax.patch('/api/editQuest', {
    body: JSON.stringify(quest)
  })
}

export async function getBranches (id) {
  return ajax.get(`/api/getBranches/${id}`)
}

export async function deleteAnswer (id) {
  return ajax.delete(`/api/deleteAnswer/${id}`)
}

export async function deleteQuest (id) {
  return ajax.delete(`/api/deleteQuest/${id}`)
}