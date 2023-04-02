//The following codes defines a number of string constants, each representing an action type for a redux store that manages job postings and user authentication. These constants used to dispatch actions and update the store state. The actions include setting a loading state, registering a user successfully or with an error, setting the current user, fetching jobs successfully or with an error, logging out a user, creating a job successfully or with an error, deleting a job with an error, fetching a single job successfully or with an error, editing a job successfully or with an error. The constants are expected for use in other files.

/** Indicates the loading status for components or network requests */
export const SET_LOADING = 'SET_LOADING'

/** Indicates a successful user registration */
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS'

/** Indicates an error occurred during user registration */
export const REGISTER_USER_ERROR = 'REGISTER_USER_ERROR'

/** Sets the logged in user */
export const SET_USER = 'SET_USER'

/** Indicates successful retrieval of job listings */
export const FETCH_JOBS_SUCCESS = 'FETCH_JOBS_SUCCESS';

/** Indicates an error occurred during job listing retrieval*/
export const FETCH_JOBS_ERROR = 'FETCH_JOBS_ERROR'

/** Indicates a user logged out */
export const LOGOUT_USER = 'LOGOUT_USER'

/** Indicates successful creation of new job listing */
export const CREATE_JOB_SUCCESS = 'CREATE_JOB_SUCCESS';

/** Indicates an error occurred during job listing creation */
export const CREATE_JOB_ERROR = 'CREATE_JOB_ERROR';

/** Indicates an error occurred during job listing deletion */
export const DELETE_JOB_ERROR = 'DELETE_JOB_ERROR';

/** Indicates successful retrieval of a single job listing */
export const FETCH_SINGLE_JOB_SUCCESS = 'FETCH_SINGLE_JOB_SUCCESS';

/** Indicates an error occurred during job listing deletion */
export const FETCH_SINGLE_JOB_ERROR = 'FETCH_SINGLE_JOB_ERROR'

/** Indicates successful update of a job listing */
export const EDIT_JOB_SUCCESS = 'EDIT_JOB_SUCCESS'

/** Indicates an error occurred during job listing update */
export const EDIT_JOB_ERROR = 'EDIT_JOB_ERROR'
