import { useReducer, useEffect } from 'react'

import axios from 'axios'

const ACTIONS = {
  MAKE_REQUEST: 'make-request',
  GET_DATA: 'get-data',
  ERROR: 'error',
  UPDATE_HAS_NEXT_PAGE: 'update-has-next-page'
}

const BASE_URL = "https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json"

function reducer(state, action){
  //reducer function called every time we call dispatch, whatever is passed is held in action variable
  switch(action.type){
    case ACTIONS.MAKE_REQUEST:
      return {
        loading: true,
        jobs: []
      }
    case ACTIONS.GET_DATA:
      return {
        ...state,
        loading: false,
        jobs: action.payload.jobs
      }
    case ACTIONS.ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        jobs: []
      }
    case ACTIONS.UPDATE_HAS_NEXT_PAGE:
      return {
        ...state,
        hasNextPage: action.payload.hasNextPage
      }
    default:
      return state
  }


}

export default function useFetchJobs( params, page ){
  const [state, dispatch] = useReducer(reducer, { jobs: [], loading: true })

  useEffect( () => {
    const cancelToken1 = axios.CancelToken.source()
    const cancelToken2 = axios.CancelToken.source()

    dispatch({ type: ACTIONS.MAKE_REQUEST})

    axios.get(BASE_URL, {
      cancelToken: cancelToken1.token,
      params: {
        markdown: true,
        page: page,
        ...params
      }
    }).then( res => {
      //save data to state by calling get data action
      dispatch({ type: ACTIONS.GET_DATA, payload: { jobs: res.data } })
    }).catch(err => {
      if(axios.isCancel(err)) return
      dispatch({ type: ACTIONS.ERROR, payload: { error: err } })
    })

    axios.get(BASE_URL, {
      cancelToken: cancelToken2.token,
      params: {
        markdown: true,
        page: page + 1,
        ...params
      }
    }).then( res => {
      //save data to state by calling get data action
      dispatch({ type: ACTIONS.UPDATE_HAS_NEXT_PAGE, payload: { hasNextPage: res.data.length !== 0 } })
    }).catch(err => {
      if(axios.isCancel(err)) return
      dispatch({ type: ACTIONS.ERROR, payload: { error: err } })
    })

    return() => {
      cancelToken2.cancel()
    }

  }, [params, page])


  return state


}