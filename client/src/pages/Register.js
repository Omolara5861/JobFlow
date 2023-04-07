 // Importing the useState hook from React for state management
import { useState } from 'react';
// Importing styled-components for styling
import styled from 'styled-components';
// Importing the useGlobalContext hook from custom context for global state management
import { useGlobalContext } from '../context/appContext';
// Importing Redirect from react-router-dom for client-side navigation
import { Redirect } from 'react-router-dom';
 // Importing the FormRow component
import FormRow from '../components/FormRow';
 // Importing the logo image
import logo from '../assets/logo.png';

/**
 * 
 * @returns
 */
function Register() {
    //Initialize the state with useState hook for form values and toggle between member and non-member
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        isMember: true,
    });

    // Access the global state and functions from context
    const { user, register, login, isLoading, showAlert } = useGlobalContext();
    const toggleMember = () => {
        // Update state to toggle member and non-member values
        setValues({ ...values, isMember: !values.isMember });
    };
    const handleChange = (e) => {
        // Update state for form values on input change
        setValues({ ...values, [e.target.name]: e.target.value });
    };
    const onSubmit = (e) => {
        e.preventDefault();
        const { name, email, password, isMember } = values;

        // If isMember is true, log in the user with the entered email and password else If isMember is false, register the user with entered name, email, and password
        if (isMember) {
            login({ email, password });
        } else {
            register({ name, email, password });
        }
    };

    return (
        // React.Fragment
        <>
        {/* Redirecting user to dashboard if user is logged in */}
            {user && <Redirect to='/dashboard' />}
            <Wrapper className='page full-page'>
                <div className='container'>
                    {showAlert && (
                        // Display an alert if there is an error in the form submission
                        <div className='alert alert-danger'>
                            there was an error, please try again
                        </div>
                    )}
                    <form className='form' onSubmit={onSubmit}>
                        <img src={logo} alt='logo' className='logo' />
                        {/* Display 'Login' or 'Register' depending on the value of isMember */}
                        <h4>{values.isMember ? 'Login' : 'Register'}</h4>
                        {/* Display name input field for non-members */}
                        {!values.isMember && (
                            <FormRow
                                type='name'
                                name='name'
                                value={values.name}
                                handleChange={handleChange}
                            />
                        )}
                        {/* Display email input field */}
                        <FormRow
                            type='email'
                            name='email'
                            value={values.email}
                            handleChange={handleChange}
                        />
                        {/* Display password input field */}
                        <FormRow
                            type='password'
                            name='password'
                            value={values.password}
                            handleChange={handleChange}
                        />
                        <button
                            type='submit'
                            className='btn btn-block'
                            disabled={isLoading}
                        >
                            {/* Change text to 'Fetching User...' if the form is being submitted */}
                            {isLoading ? 'Fetching User...' : 'Submit'}
                        </button>
                        <p>
                            {values.isMember ? 'Not a member yet?' : 'Already a member?'}
                            {/*Toggle between member and non-member on button click*/}
                            <button
                                type='button'
                                onClick={toggleMember}
                                className='member-btn'
                            >{/* Display text based on isMember value*/}
                                {values.isMember ? 'Register' : 'Login'}
                            </button>
                        </p>
                    </form>
                </div>
            </Wrapper>
        </>
    );
}

// Styling using styled-components
const Wrapper = styled.section`
display: grid;
align-items: center;
.logo {
    display: block;
    margin: 0 auto;
    width: 130px;
}
.form {
    max-width: 400;
    border-top: 5px solid var(--primary-500);
}
h4 {
    text-align: center;
}
p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
}
.btn {
    margin-top: 1rem;
}
.member-btn {
    background: transparent;
    border: transparent;
    color: var(--primary-500);
    cursor: pointer;
}
`;

export default Register;
