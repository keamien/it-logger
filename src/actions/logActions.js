import {
  ADD_LOG,
  CLEAR_CURRENT,
  DELETE_LOG,
  GET_LOGS,
  LOGS_ERROR,
  SEARCH_LOGS,
  SET_CURRENT,
  SET_LOADING,
  UPDATE_LOG,
} from './types'

export const addLog = (log) => async (dispatch) => {
  try {
    setLoading()

    const res = await fetch('/logs', {
      method: 'POST',
      body: JSON.stringify(log),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await res.json()

    dispatch({
      type: ADD_LOG,
      payload: data,
    })
  } catch (e) {}
}

const clearCurrent = () => {
  return {
    type: CLEAR_CURRENT,
  }
}

export const deleteLog = (id) => async (dispatch) => {
  try {
    setLoading()

    await fetch(`/logs/${id}`, {
      method: 'DELETE',
    })

    dispatch({
      type: DELETE_LOG,
      payload: id,
    })
  } catch (e) {
    dispatch({
      type: LOGS_ERROR,
      payload: e.response.statusText,
    })
  }
}

export const getLogs = () => async (dispatch) => {
  try {
    setLoading()

    const res = await fetch('/logs')
    const data = await res.json()

    dispatch({
      type: GET_LOGS,
      payload: data,
    })
  } catch (e) {
    dispatch({
      type: LOGS_ERROR,
      payload: e.response.statusText,
    })
  }
}

export const searchLogs = (text) => async (dispatch) => {
  try {
    setLoading()

    const res = await fetch(`/logs?q=${text}`)
    const data = await res.json()

    dispatch({
      type: SEARCH_LOGS,
      payload: data,
    })
  } catch (e) {
    dispatch({
      type: LOGS_ERROR,
      payload: e.response.statusText,
    })
  }
}

export const setCurrent = (log) => {
  return {
    type: SET_CURRENT,
    payload: log,
  }
}

export const setLoading = () => {
  return {
    type: SET_LOADING,
  }
}

export const updateLog = (log) => async (dispatch) => {
  try {
    setLoading()
    clearCurrent()

    const res = await fetch(`/logs/${log.id}`, {
      method: 'PUT',
      body: JSON.stringify(log),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await res.json

    dispatch({
      type: UPDATE_LOG,
      payload: data,
    })
  } catch (e) {
    dispatch({
      type: LOGS_ERROR,
      payload: e.response.statusText,
    })
  }
}
