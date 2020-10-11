import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './login.scss';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { getAuthState, loginAction } from '../../../reducer/auth.slice';
import { useHistory } from 'react-router-dom';


export const Login = () => {
  const dispatch = useDispatch();
  const authState = useSelector(getAuthState);
                    
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const history = useHistory();
  
  useEffect(() => {
    let payLoad = {email, password}
    if(authState.isAuthenticated) {
      history.push('/dashboard');
    }
    if(isLoggingIn) {
      dispatch(loginAction(payLoad))
      setIsLoggingIn(false);
    }
  }, [email, password, isLoggingIn, authState, dispatch]);

  
    return (
      <div className="card bg-light shadow border-0">
        <div className="card-header bg-white pb-5">
          <div className="text-muted text-center mb-3"></div>
          <div className="btn-wrapper text-center">
            <h4>InstaShare Login</h4>
          </div>
        </div>
        <div className="card-body pr-5 pb-5">
          <div className="text-center text-muted mb-4">
          </div>
          <Form name="registerForm">
            <div className="form-group">
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="emailIcon"><i className="fa fa-envelope"></i></InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  placeholder="Email"
                  aria-label="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  type="email"
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
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  type="password"
                />
              </InputGroup>
            </div>
            <div className="text-center">
              <button type="button" className="btn btn-dark my-4" onClick={(e) => {setIsLoggingIn(true)}}>Sign in</button>
            </div>
          </Form>
        </div>
      </div>
    );
}


export default Login;
