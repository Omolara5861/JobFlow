import { Link } from 'react-router-dom';
import styled from 'styled-components';
import main from '../assets/main.svg';
import { useGlobalContext } from '../context/appContext';
import { Redirect } from 'react-router-dom';
import logo from '../assets/logo.png';
function Home() {
  const { user } = useGlobalContext();

  return (
    <>
      {user && <Redirect to='/dashboard' />}
      <Wrapper>
        <nav>
          <img src={logo} class="logo" alt='jobs app' />
        </nav>
        <div className='container page'>
        <div className='info'>
            <h1>
              job <span>tracking</span> app
            </h1>
            <p>
              I'm baby wayfarers hoodie next level taiyaki brooklyn cliche blue
              bottle single-origin coffee chia. Aesthetic post-ironic venmo,
              quinoa lo-fi tote bag adaptogen everyday carry meggings +1 brunch
              narwhal.
            </p>
            <Link to='/register' className='btn btn-hero'>
              Login/Register
            </Link>
          </div>
          <img src={main} alt='job hunt' className='img main-img' />
        </div>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  .container {
    min-height: calc(100vh - 6rem);
    display: grid;
    align-items: center;
    margin-top: -3rem;
  }
  .logo {
    width: 130px
  }
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: 6rem;
    display: flex;
    align-items: center;
  }
  span {
    color: #2cb1bc;
  }
  h1 {
    font-weight: 700;
  }
  p {
    color: #486581;
  }
  .main-img {
    display: none;
  }
  @media (min-width: 992px) {
    .container {
      grid-template-columns: 1fr 1fr;
      column-gap: 6rem;
    }
    .main-img {
      display: block;
    }
  }
`;

export default Home;
