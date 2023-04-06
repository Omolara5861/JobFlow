// Importing necessary libraries and components
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useGlobalContext } from '../context/appContext';
import FormRow from '../components/FormRow';
import Navbar from '../components/Navbar';
import Jobs from '../components/Jobs';

function Dashboard() {
  // Initializing state for form input values
  const [values, setValues] = useState({ company: '', position: '' });

  // Function to handle changes in form input values
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // Accessing context for isLoading, showAlert, fetchJobs, and createJob
  const { isLoading, showAlert, fetchJobs, createJob } = useGlobalContext();

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const { company, position } = values;
    if (company && position) {
      createJob(values);
      setValues({ company: '', position: '' });
    }
  };

  // Fetching jobs on component mount
  useEffect(() => {
    fetchJobs();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Rendering the dashboard with the Navbar, job form, and Jobs component
  return (
    <>
      <Navbar />

      <Wrapper className='page'>
      {/* Rendering an alert if showAlert is true */}
        {showAlert && (
          <div className='alert alert-danger'>
            there was an error, please try again
          </div>
        )}
        <form className='job-form' onSubmit={handleSubmit}>
          {/* Rendering a form row component for position input */}
          <FormRow
            type='name'
            name='position'
            value={values.position}
            handleChange={handleChange}
            horizontal
            placeholder='Position'
          />
          {/* Rendering a form row component for company input */}
          <FormRow
            type='name'
            name='company'
            value={values.company}
            handleChange={handleChange}
            horizontal
            placeholder='Company'
          />
          {/* Rendering the submit button */}
          <button type='submit' className='btn' disabled={isLoading}>
            {isLoading ? 'Adding New Job...' : 'Add Job'}
          </button>
        </form>

        <Jobs />
      </Wrapper>
    </>
  );
}
// Styling the dashboard component
const Wrapper = styled.section`
  padding: 3rem 0;

  .job-form {
    background: var(--white);
    display: grid;
    row-gap: 1rem;
    column-gap: 0.5rem;
    align-items: center;
    margin-bottom: 3rem;
    border-radius: var(--borderRadius);
    padding: 1.5rem;
    .form-input {
      padding: 0.75rem;
    }

    .form-input:focus {
      outline: 1px solid var(--primary-500);
    }
    .form-row {
      margin-bottom: 0;
    }
    .btn {
      padding: 0.75rem;
    }
    @media (min-width: 776px) {
      grid-template-columns: 1fr 1fr auto;
      .btn {
        height: 100%;
        padding: 0 2rem;
      }
      column-gap: 2rem;
    }
  }
  .alert {
    max-width: var(--max-width);
    margin-bottom: 1rem;
  }
`;

export default Dashboard;
