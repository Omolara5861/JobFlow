/** @fileoverview This code exports a reducer function that manages the state of the application for actions related to user registration, authentication, job fetching, creation, deletion, and editing */

// Necessary action types imports
import {
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  SET_USER,
  FETCH_JOBS_SUCCESS,
  FETCH_JOBS_ERROR,
  LOGOUT_USER,
  SET_LOADING,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  DELETE_JOB_ERROR,
  FETCH_SINGLE_JOB_SUCCESS,
  FETCH_SINGLE_JOB_ERROR,
  EDIT_JOB_ERROR,
  EDIT_JOB_SUCCESS,
} from './actions'

/**
 * A reducer function that takes two parameters as input and returns the new state object based on the action type. This function updates the state by creating new state objects with properties that has been modify through the action type.The state object is created using the spread operator, which create a copy of the current state object and merges it with the new properties.
 * @param {object} state refers to the current state of the application, which is an object that represents the data and the state of the application. It contains all the properties that need to be managed by the reducer.
 * @param {object} action is an object that describes the change that need to be make to the state. It contains a `type` property, which indicates the action to be performed, and a `payload` property, which is an optional data payload that provides more information about the action.
 * @returns a new state object depending on an action type
 */
const reducer = (state, action) => {
  // When the `SET_LOADING` action is fired, it returns a new state with `isLoading` set to true and `showAlerts` and `editComplete` both set to false
  if (action.type === SET_LOADING) {
    return { ...state, isLoading: true, showAlert: false, editComplete: false }
  }

  // If `REGISTER_USER_SUCCESS` is fired, it returns a new state with `isLoading` set to `false` and `user` set to a payload passed in the action.
  if (action.type === REGISTER_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload,
    }
  }

  // If `REGISTER_USER_ERROR` is fired, it returns a new state with `isLoading` set to `false`, `user` set to `null`, and `showAlert` set to `true`.
  if (action.type === REGISTER_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      user: null,
      showAlert: true,
    }
  }

  // If `SET_USER` is fired, it returns a new state with `user` set to a payload passed in the action.
  if (action.type === SET_USER) {
    return { ...state, user: action.payload }
  }

  // If `LOGOUT_USER` is fired, it returns a new state with `user` is set to `null`, `showAlert` set to `false`, `jobs` set to an empty array, and `editItem` set to `null`.
  if (action.type === LOGOUT_USER) {
    return {
      ...state,
      user: null,
      showAlert: false,
      jobs: [],
      isEditing: false,
      editItem: null,
    }
  }

  // If `FETCH_JOBS_SUCCESS` is fired, it returns a new state with `isLoading` set to `false`, `editItem` set to `null`, `singleJobError` set to `false`, and `jobs` set to a payload passed in the action.
  if (action.type === FETCH_JOBS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      editItem: null,
      singleJobError: false,
      editComplete: false,
      jobs: action.payload,
    }
  }

  // If `FETCH_JOBS_ERROR` is fired, it returns a new state with `isLoading` set to `false`.
  if (action.type === FETCH_JOBS_ERROR) {
    return { ...state, isLoading: false }
  }

  // If `CREATE_JOB_SUCCESS` is fired, it returns a new state with `isLoading` set to `false` and `jobs` with a new item included.
  if (action.type === CREATE_JOB_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      jobs: [...state.jobs, action.payload],
    }
  }

  // If `CREATE_JOB_ERROR` or `DELETE_JOB_ERROR` is fired, it returns a new state with `isLoading` set to `false` and `showAlert` set to `true`.
  if (action.type === CREATE_JOB_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
    }
  }

  if (action.type === DELETE_JOB_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
    }
  }

  // If `FETCH_SINGLE_JOB_SUCCESS` is fired, it returns a new state with `isLoading` set to `false` and `editItem` set to payload passed in the action
  if (action.type === FETCH_SINGLE_JOB_SUCCESS) {
    return { ...state, isLoading: false, editItem: action.payload }
  }

  // If `FETCH_SINGLE_JOB_ERROR` is fired, it returns a new state with `isLoading` set to `false`, `singleJobError` set to `true`, and `editItem` set to an empty string.
  if (action.type === FETCH_SINGLE_JOB_ERROR) {
    return { ...state, isLoading: false, editItem: '', singleJobError: true }
  }

  // If `EDIT_JOB_SUCCESS` is fired, it returns a new state with `isLoading` set to `false`, `editComplete` set to `true`, and `editItem` set to payload passed in the action.
  if (action.type === EDIT_JOB_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      editComplete: true,
      editItem: action.payload,
    }
  }

  // If `EDIT_JOB_ERROR` is fired, it returns a new state with `isLoading` set to `false`, `editComplete` set to `true`, and `showAlert` set to `true`.
  if (action.type === EDIT_JOB_ERROR) {
    return {
      ...state,
      isLoading: false,
      editComplete: true,
      showAlert: true,
    }
  }

  // If none of the above actions are fired, it will throw an error with a message indicating the action that was passed in doesn't exist.
  throw new Error(`no such action : ${action}`)
}

// The reducer function is exported by default.
export default reducer
