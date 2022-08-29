import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  const demoLogin = (e) => {
    e.preventDefault();

    const demoUser = { credential: 'demo@user.io', password: 'password' }

    return dispatch(sessionActions.login(demoUser))
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Log In</h1>

      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <div>
        <h2>Email</h2>
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
          className="w100"
        />
      </div>
      <div>
        <h2>Password</h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w100"
        />
        <div className="w100 flex-column-center">
          <button className="default" type="submit" >Log In</button>
          <button className='demo' onClick={demoLogin}>Demo User</button>
        </div>
      </div>
    </form>
  );
}

export default LoginForm;
