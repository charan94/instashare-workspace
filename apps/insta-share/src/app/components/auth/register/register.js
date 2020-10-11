import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './register.scss';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { getAuthState, registerAction } from '../../../reducer/auth.slice';
import { useHistory } from 'react-router-dom';

export const Register = () => {
  const dispatch = useDispatch();
  const authState = useSelector(getAuthState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (authState.isAuthenticated) {
      history.push('/dashboard');
    }
    if (isRegistering) {
      const payLoad = { email, password, firstName, lastName };
      dispatch(registerAction(payLoad))
      setIsRegistering(false);
    }
  }, [email, password, firstName, lastName, dispatch, isRegistering, setIsRegistering, authState])

  return (
    <div className="card bg-light shadow border-0">
      <div className="card-header bg-white">
        <div className="text-muted text-center mb-3"></div>
        <div className="btn-wrapper text-center">
          <h4>InstaShare Register</h4>
        </div>
      </div>
      <div className="card-body pr-5">
        <div className="text-center text-muted mb-4">
        </div>
        <Form name="registerForm">
          <div className="form-group">
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="fr"><i className="fa fa-user pr-1"></i></InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="First Name"
                aria-label="firstName"
                type="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </InputGroup>
          </div>
          <div className="form-group">
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="ln"><i className="fa fa-laptop"></i></InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="Last Name"
                aria-label="LastName"
                type="LastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </InputGroup>
          </div>
          <div className="form-group">
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="emailIcon"><i className="fa fa-envelope"></i></InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="Email"
                aria-label="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>
          </div>
          <div className="form-group">
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="passwordIcon"><i className="fa fa-lock pr-2"></i></InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="Password"
                aria-label="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputGroup>
          </div>
          <div className="text-center">
            <button type="button" className="btn btn-dark my-4" onClick={(e) => { setIsRegistering(true) }}>Register</button>
          </div>
        </Form>
      </div>
    </div>
  );
}
export default Register;
