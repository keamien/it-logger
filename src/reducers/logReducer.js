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
} from '../actions/types'

const initialState = {
  logs: null,
  current: null,
  loading: false,
  error: null,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_LOG:
      return {
        ...state,
        logs: [...state.logs, action.payload],
        loading: false,
      }
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      }
    case DELETE_LOG:
      return {
        ...state,
        logs: state.logs.filter((log) => log.id !== action.payload),
        loading: false,
      }
    case GET_LOGS:
      return {
        ...state,
        logs: action.payload,
        loading: false,
      }
    case LOGS_ERROR:
      console.error(action.payload)
      return {
        ...state,
        error: action.payload,
      }
    case SEARCH_LOGS:
      return {
        ...state,
        logs: action.payload,
      }
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      }
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      }
    case UPDATE_LOG:
      return {
        ...state,
        logs: state.logs.map((log) => (log.id === action.payload.id ? action.payload : log)),
      }
    default:
      return state
  }
}
