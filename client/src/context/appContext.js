/**
 * @fileoverview This code creates a context and provider using React's Context API. It exports the useGlobalContext hook (@function useGlobalContext) and the AppProvider component (@function AppProvider), allowing the storage and management of states related to user authentication and job posting throughout the app's component
 */

//Necessary dependencies and constants imports
import axios from 'axios'
import '../axios'
import React, { useContext, useEffect, useReducer } from 'react'
import {
  SET_LOADING,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGOUT_USER,
  SET_USER,
  FETCH_JOBS_SUCCESS,
  FETCH_JOBS_ERROR,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  DELETE_JOB_ERROR,
  FETCH_SINGLE_JOB_SUCCESS,
  FETCH_SINGLE_JOB_ERROR,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_ERROR,
} from './actions'
import reducer from './reducer'

/** An object containing the default initial state of the application */
const initialState = {
  user: null,
  isLoading: false,
  jobs: [],
  showAlert: false,
  editItem: null,
  singleJobError: false,
  editComplete: false,
}

/** Returns a context objects which holds state values to be accessible to @function useGlobalContext*/
const AppContext = React.createContext()

/**
 * A function component that accepts `children` as props and contains functions for user authentication, job creation, and job modification. Wrap the components that need access to state values provided by `AppContext`
 * @param {Object} children
 * @returns the context provider with all the defined functions and the state
 */
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const setLoading = () => {
    dispatch({ type: SET_LOADING })
  }

  // register
  const register = async (userInput) => {
    setLoading()
    try {
      const { data } = await axios.post(`/auth/register`, {
        ...userInput,
      })

      dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user.name })
      localStorage.setItem(
        'user',
        JSON.stringify({ name: data.user.name, token: data.token })
      )
    } catch (error) {
      dispatch({ type: REGISTER_USER_ERROR })
    }
  }

  // login
  const login = async (userInput) => {
    setLoading()
    try {
      const { data } = await axios.post(`/auth/login`, {
        ...userInput,
      })
      dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user.name })
      localStorage.setItem(
        'user',
        JSON.stringify({ name: data.user.name, token: data.token })
      )
    } catch (error) {
      dispatch({ type: REGISTER_USER_ERROR })
    }
  }

  // logout
  const logout = () => {
    localStorage.removeItem('user')
    dispatch({ type: LOGOUT_USER })
  }

  // fetch jobs
  const fetchJobs = async () => {
    setLoading()
    try {
      const { data } = await axios.get(`/jobs`)
      dispatch({ type: FETCH_JOBS_SUCCESS, payload: data.jobs })
    } catch (error) {
      dispatch({ type: FETCH_JOBS_ERROR })
      logout()
    }
  }

  // create job
  const createJob = async (userInput) => {
    setLoading()
    try {
      const { data } = await axios.post(`/jobs`, {
        ...userInput,
      })

      dispatch({ type: CREATE_JOB_SUCCESS, payload: data.job })
    } catch (error) {
      dispatch({ type: CREATE_JOB_ERROR })
    }
  }
  const deleteJob = async (jobId) => {
    setLoading()
    try {
      await axios.delete(`/jobs/${jobId}`)

      fetchJobs()
    } catch (error) {
      dispatch({ type: DELETE_JOB_ERROR })
    }
  }

  const fetchSingleJob = async (jobId) => {
    setLoading()
    try {
      const { data } = await axios.get(`/jobs/${jobId}`)
      dispatch({ type: FETCH_SINGLE_JOB_SUCCESS, payload: data.job })
    } catch (error) {
      dispatch({ type: FETCH_SINGLE_JOB_ERROR })
    }
  }
  const editJob = async (jobId, userInput) => {
    setLoading()
    try {
      const { data } = await axios.patch(`/jobs/${jobId}`, {
        ...userInput,
      })
      dispatch({ type: EDIT_JOB_SUCCESS, payload: data.job })
    } catch (error) {
      dispatch({ type: EDIT_JOB_ERROR })
    }
  }

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      const newUser = JSON.parse(user)
      dispatch({ type: SET_USER, payload: newUser.name })
    }
  }, [])
  return (
    <AppContext.Provider
      value={{
        ...state,
        setLoading,
        register,
        login,
        logout,
        fetchJobs,
        createJob,
        deleteJob,
        fetchSingleJob,
        editJob,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

/**
 * A custom hook function that enables components to access the state and functions defined in `AppProvider` function. It does this by calling the useContext hook, passing `AppContext` as an argument and then returning the resulting value.
 * @returns the context passed down from the provider component AppProvider
 */
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppProvider }
