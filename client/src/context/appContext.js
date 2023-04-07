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
 * A function component that define the provider for `AppContext`, it accepts `children` as props and contains functions for user authentication, job creation, and job modification. Wrap the components that need access to state values provided by `AppContext`
 * @param {object} children An object that represents the child components that will be rendered inside the `AppProvider` component.
 * @returns the context provider with all the defined functions and the state
 */
const AppProvider = ({ children }) => {
  // Use the reducer hook to create the state and dispatch functions
  const [state, dispatch] = useReducer(reducer, initialState)

  // Set loading state
  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  }

  /**
   * Defines the register function
   * @param {object} userInput An object containing the user's registration details
   */
  const register = async (userInput) => {
    // Set loading state
    setLoading()
    try {
      const { data } = await axios.post(`/auth/register`, {
        ...userInput,
      });

      // Dispatch success action and set user in local storage
      dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user.name })
      localStorage.setItem(
        'user',
        JSON.stringify({ name: data.user.name, token: data.token })
      );
    } catch (error) {
      //Dispatch error action
      dispatch({ type: REGISTER_USER_ERROR });
    }
  }

  /**
   * Define the login function
   * @param {object} userInput An object containing the user's email and password
   */
  const login = async (userInput) => {
    //Set the loading state
    setLoading()
    try {
      const { data } = await axios.post(`/auth/login`, {
        ...userInput,
      })
      // Dispatch success action and set user in local storage
      dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user.name })
      localStorage.setItem(
        'user',
        JSON.stringify({ name: data.user.name, token: data.token })
      );
    } catch (error) {
      // Dispatch error action
      dispatch({ type: REGISTER_USER_ERROR });
    }
  }

  /** Define the logout function */
  const logout = () => {
    // Remove user from local storage
    localStorage.removeItem('user');
    // Dispatch logout action
    dispatch({ type: LOGOUT_USER });
  }

  /** Define the fetch jobs function */
  const fetchJobs = async () => {
    // Set the loading state
    setLoading();
    try {
      const { data } = await axios.get(`/jobs`);
      // Dispatch success action
      dispatch({ type: FETCH_JOBS_SUCCESS, payload: data.jobs });
    } catch (error) {
      // Dispatch error action and logout user
      dispatch({ type: FETCH_JOBS_ERROR });
      logout();
    }
  }

  /**
   * Define the create job function
   * @param {object} userInput An object containing the job information inputted by the user
   */
  const createJob = async (userInput) => {
    // Set the loading state
    setLoading();
    try {
      const { data } = await axios.post(`/jobs`, {
        ...userInput,
      });
      // Dispatch success action
      dispatch({ type: CREATE_JOB_SUCCESS, payload: data.job });
    } catch (error) {
      // Dispatch error action
      dispatch({ type: CREATE_JOB_ERROR });
    }
  }

  /**
   * Define the delete job function
   * @param {string} jobId The id of the job to delete
   */
  const deleteJob = async (jobId) => {
    //Set the loading state
    setLoading();
    try {
      await axios.delete(`/jobs/${jobId}`);
     // Fetch jobs after deleting a job
      fetchJobs();
    } catch (error) {
      // Dispatch error action
      dispatch({ type: DELETE_JOB_ERROR });
    }
  }

  /**
   * Define the fetch single job function
   * @param {string} jobId The id of the job to fetch
   */
  const fetchSingleJob = async (jobId) => {
    // Set loading state
    setLoading();
    try {
      const { data } = await axios.get(`/jobs/${jobId}`);
      //Dispatch success action
      dispatch({ type: FETCH_SINGLE_JOB_SUCCESS, payload: data.job });
    } catch (error) {
      // Dispatch error action
      dispatch({ type: FETCH_SINGLE_JOB_ERROR });
    }
  }

  /**
   * Define the edit job function
   * @param {string} jobId The id of the job to edit
   * @param {string} userInput The updated job info
   */
  const editJob = async (jobId, userInput) => {
    // Set the loading state 
    setLoading();
    try {
      const { data } = await axios.patch(`/jobs/${jobId}`, {
        ...userInput,
      });
      // Dispatch success action
      dispatch({ type: EDIT_JOB_SUCCESS, payload: data.job });
    } catch (error) {
      // Dispatch error action
      dispatch({ type: EDIT_JOB_ERROR });
    }
  }

  /** Use the useEffect hook to set the user in the state from the local storage on initial render */
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const newUser = JSON.parse(user);
      dispatch({ type: SET_USER, payload: newUser.name });
    }
  }, []);

  // Return the contex provider with all the defined functions and the state
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
  );
}

/**
 * A custom hook function that enables components to access the state and functions defined in `AppProvider` function. It does this by calling the useContext hook, passing `AppContext` as an argument and then returning the resulting value.
 * @returns the context passed down from the provider component AppProvider
 */
export const useGlobalContext = () => {
  return useContext(AppContext);
}

export { AppProvider }
