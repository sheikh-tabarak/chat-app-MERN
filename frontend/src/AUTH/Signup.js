import React, { useState, useEffect } from "react";
import useInput from "../CUSTOM-HOOKS/useInput";
import LOGO from "../assets/img/chatapplogo.png";
import CHATTING from "../assets/img/chatting-1.gif";
import Loading from "../Loading";

function Signup(props) {
  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, []);

  const [responseMsg, setResponseMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    value: USERNAME,
    isValid: usernameIsValid,
    valueChangeHandler: usernameChangeHandler,
    clear: clearUsername,
  } = useInput((value) => value.trim().length > 5, "");

  const {
    value: EMAIL,
    isValid: emailIsValid,
    valueChangeHandler: emailChangeHandler,
    clear: clearEmail,
  } = useInput((value) => value.trim().length > 10 && value.includes("@"), "");

  const {
    value: PASSWORD,
    isValid: passwordIsValid,
    valueChangeHandler: passwordChangeHandler,
    clear: clearPassword,
  } = useInput((value) => value.trim().length >= 6, "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const signupData = {
      username: USERNAME,
      email: EMAIL,
      password: PASSWORD,
    };

    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/users/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(signupData),
        }
      );

      const responseData = await response.json();

      if (response.status !== 201) {
        throw new Error(responseData.message);
      }

      setResponseMsg(responseData.message);
    } catch (err) {
      setResponseMsg(err.message);
      setIsLoading(false);
    }

    clearEmail();
    clearPassword();
    clearUsername();
    setIsLoading(false);
  };

  const [passwordShown, setPasswordShown] = useState(false);

  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        // className="auth"
      >
        {isLoading ? (
          <Loading />
        ) : (
          <section class="vh-100 signuppagemain">
            <div class="container-fluid h-custom">
              <div class="row  align-items-left h-100">
                <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1 border p-4 shadow p-3 mb-3 mt-3 bg-white rounded">
                  <div class="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                    <img src={LOGO} alt="" />
                  </div>
                  <div class="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                    <p class="h3 fw-normal mb-4">Register a new account</p>
                  </div>

                  <div
                    className={
                      responseMsg == null
                        ? "invalid-feedback"
                        : "alert alert-danger d-flex align-items-center mt-0 mb-3"
                    }
                    role="alert"
                  >
                    <svg
                      class="bi flex-shrink-0 me-2"
                      width="24"
                      height="24"
                      role="img"
                      aria-label="Danger:"
                    ></svg>
                    <div>{responseMsg}</div>
                  </div>
                  <div class="mt-10 form-outline mb-4">
                    <input
                      type="text"
                      placeholder="Enter a username"
                      id="username"
                      value={USERNAME}
                      onChange={usernameChangeHandler}
                      className={
                        usernameIsValid
                          ? "form-control"
                          : " form-control  is-invalid"
                      }
                    />

                    <div
                      style={{ marginTop: -15 }}
                      id="username"
                      class="invalid-feedback"
                    >
                      Password must be atleast 6 digit longer
                    </div>
                  </div>
                  <div class="mt-10 form-outline mb-4">
                    {/* <label class="sm form-label" for="form3Example3">Email address</label> */}
                    {/* <input className={emailIsValid ? "input" : "invalid"} type="text"  placeholder='EMAIL' value={EMAIL}
          onChange={emailChangeHandler}  /> */}

                    <input
                      value={EMAIL}
                      onChange={emailChangeHandler}
                      type="email"
                      id="useremail"
                      class={
                        emailIsValid
                          ? "rounded form-control form-control-lg"
                          : "rounded form-control form-control-lg is-invalid"
                      }
                      placeholder="Enter a valid email address"
                    />
                    <div
                      style={{ marginTop: -15 }}
                      id="useremail"
                      class="invalid-feedback"
                    >
                      Enter a Valid Email Address
                    </div>
                  </div>

                  <div class="form-outline mb-3">
                    {/* <label class="sm form-label" for="form3Example4">Password</label> */}

                    {/* <input className={passwordIsValid ? "input" : "invalid"} type="password" placeholder='PASSWORD' value={PASSWORD} 
         onChange={passwordChangeHandler}  /> */}

                    {/* <div className='row'> */}
                    {/* <div className='col-9'> */}
                    <input
                      value={PASSWORD}
                      onChange={passwordChangeHandler}
                      type={passwordShown ? "text" : "password"}
                      id="userpassword"
                      class={
                        passwordIsValid
                          ? "form-control"
                          : " form-control  is-invalid"
                      }
                    />
                    {/* </div> */}

                    {/* <div className='col-3'>
      <button type='button' className='btn btn-block btn-toggle h-100' onClick={togglePassword}>Show</button>
      </div> */}

                    {/* </div> */}

                    <div
                      style={{ marginTop: -15 }}
                      id="userpassword"
                      class="invalid-feedback"
                    >
                      Password must be atleast 6 digit longer
                    </div>
                  </div>

                  <div class="text-center text-lg-start mt-4 pt-2">
                    <button class="btn-block btn btn-success btn-lg">
                      Register
                    </button>

                    {/* style={'padding-left: 2.5rem; padding-right: 2.5rem'} */}

                    <p class="small fw-bold mt-2 pt-1 mb-0">
                      Already have an account?{" "}
                      <a href="/login" class="link-danger">
                        Login
                      </a>
                    </p>
                  </div>
                </div>

                <div class="col-md-10 col-lg-8 col-xl-5 ml-5 mr--5 align-center">
                  {/* <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          class="img-fluid" alt="Sample image"/> */}

                  {/* <img
                    src={CHATTING}
                    class="img-fluid"
                    alt="Responsive image"
                  /> */}

                  {/* /  <img height={500} src={CHATTING} alt="" /> */}
                </div>
              </div>
            </div>
          </section>
        )}
      </form>

      {/* Old Code of Sign up Page*/}


      {/* <form onSubmit={handleSubmit} className="auth">
        {isLoading ? (
          <h2>LOADING...</h2>
        ) : (
          <>
            {" "}
            <h3> CREATE A NEW ACCOUNT </h3>
            <input
              className={usernameIsValid ? "input" : "invalid"}
              type="text"
              placeholder="USERNAME"
              value={USERNAME}
              onChange={usernameChangeHandler}
            />
            <input
              className={emailIsValid ? "input" : "invalid"}
              type="text"
              placeholder="EMAIL"
              value={EMAIL}
              onChange={emailChangeHandler}
            />
            <input
              className={passwordIsValid ? "input" : "invalid"}
              type="password"
              placeholder="PASSWORD"
              value={PASSWORD}
              onChange={passwordChangeHandler}
            />
            <button className="btn"> SUBMIT </button>
            <h3>{responseMsg}</h3>{" "}
          </>
        )}
      </form> */}
    </>
  );
}

export default Signup;
