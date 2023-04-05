import { Link } from "react-router-dom";
import styled from "styled-components";
import main from "../assets/main.svg";
import { useGlobalContext } from "../context/appContext";
import { Redirect } from "react-router-dom";
import logo from "../assets/logo.png";
function Home() {
  const { user } = useGlobalContext();

  return (
    <>
      {user && <Redirect to="/dashboard" />}
      <Wrapper>
        <nav>
          <img src={logo} className="logo" alt="jobs app" />
        </nav>
        <div className="container page">
          <div className="info">
            <h1>
              job <span>tracking</span> app
            </h1>
            <p>
              Looking for a better way to keep track of your job applications?
              Our innovative job tracking app is the perfect solution! With our
              user-friendly interface, you can easily
              manage your job search from start to finish. No more lost
              applications or missed deadlines - Jobflow keeps all your job
              details organized in one place, so you can stay on top of your
              progress and focus on landing your dream job. So why wait? Start
              taking control of your job search today and sign up for our job
              tracking app.
            </p>
            <Link to="/register" className="btn btn-hero">
              Login/Register
            </Link>
          </div>
          <img src={main} alt="job hunt" className="img main-img" />
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
    width: 130px;
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
