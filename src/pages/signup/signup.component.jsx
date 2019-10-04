import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import firebase from '../../firebase/firebase.utils';
import { AuthContext } from '../../firebase/auth.context';

import Button from '../../components/Button/button.component';
import TextField from '@material-ui/core/TextField';

import Axios from 'axios';

import './signup.style.css';

const SignupPage = ({ history }) => {
  const [values, setValues] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const { currentUser } = useContext(AuthContext);

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSignUp = async event => {
    event.preventDefault();
    const { email, password } = values;
    try {
      if (currentUser) {
        throw Error("You're already logged in");
      }
      const { user } = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      if (user) {
        await user.updateProfile({
          displayName: `${values.firstName} ${values.lastName}`
        })
      }
      
      await Axios.post(`${process.env.REACT_APP_API_SERVER_URL}/signup`, {
        user_email: user.email,
        u_id: user.uid,
        first_name: values.firstName,
        last_name: values.lastName
      });
      history.push('/main');
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <h1>Create New Account</h1>

      <form className="signup__form" onSubmit={handleSignUp}>
        <TextField
          id="outlined-first-name-input"
          label="First Name"
          type="text"
          name="name"
          margin="normal"
          variant="outlined"
          value={values.firstName}
          onChange={handleChange('firstName')}
        />
        <TextField
          id="outlined-last-name-input"
          label="Last Name"
          type="text"
          name="name"
          margin="normal"
          variant="outlined"
          value={values.lastName}
          onChange={handleChange('lastName')}
        />
        <TextField
          id="outlined-email-input"
          label="Email Address"
          type="email"
          name="email"
          autoComplete="email"
          margin="normal"
          variant="outlined"
          value={values.email}
          onChange={handleChange('email')}
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          margin="normal"
          variant="outlined"
          value={values.password}
          onChange={handleChange('password')}
        />
        <div className="form_submit_button">
          <Button type="submit">Create Account</Button>
        </div>
      </form>
    </div>
  );
};

export default withRouter(SignupPage);
