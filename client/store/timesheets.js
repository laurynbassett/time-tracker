import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_TIMESHEETS = 'GET_TIMESHEETS'

/**
 * INITIAL STATE
 */
const defaultTimesheets = {}

/**
 * ACTION CREATORS
 */
const getTimesheets = timesheets => ({type: GET_TIMESHEETS, timesheets})

/**
 * THUNK CREATORS
 */
export const fetchTimesheets = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/timesheets/${userId}`)
    console.log('TIMESHEETS FETCHED', res.data)
    dispatch(getTimesheets(res.data))
  } catch (err) {
    console.error('Error fetching user timesheets: ', err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultTimesheets, action) {
  switch (action.type) {
    case GET_TIMESHEETS:
      return action.timesheets
    default:
      return state
  }
}
