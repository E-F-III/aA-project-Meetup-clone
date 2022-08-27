import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";

import FooterInfo from '../FooterInfo'
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ firstName, lastName, email, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors([{ password: 'Confirm Password field must be the same as the Password field' }]);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{Object.values(error)[0]}</li>)}
        </ul>
        <h2>
          Email
        </h2>

        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w100"

        />
        <h2>
          First Name
        </h2>

        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          className="w100"

        />
        <h2>
          Last Name
        </h2>

        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          className="w100"

        />
        <h2>
          Password
        </h2>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w100"

        />
        <h2>
          Confirm Password
        </h2>

        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w100"

        />
        <div className="signup-footer w100 flex-column-center">
          {/* <button className="return" onclick="javascript:history.back()">Back</button> */}
          <button className="default signup" type="submit">Sign Up</button>
        </div>
      </form>
    </>
  );
}

export default SignupFormPage;
