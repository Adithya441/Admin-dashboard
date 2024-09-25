import React,{useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Alert, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { UserContext } from 'contexts/context';

const JWTLogin = () => {
  const navigate = useNavigate();
  const { setUsername } = useContext(UserContext);
  const details = [{Username:"Adithya441",email:"adithyachalumuri733@gmail.com",password:"123456"}];
  const username = details[0].Username;
  console.log(username);

  return (
    <UserContext.Provider value={username}>
    <Formik
      initialValues={{
        email: '',
        password: '',
        Username: '',
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        password: Yup.string().max(255).required('Password is required'),
      })}
      onSubmit={(values, { setSubmitting, setErrors, resetForm }) => {
        
        if (
          values.email === details[0].email &&
          values.password === details[0].password
        ) {
          resetForm();
          setUsername(details[0].Username);
          navigate('/app/dashboard/analytics');
        } else {
          setErrors({ submit: 'Invalid credentials, please try again.' });
        }
        setSubmitting(false);
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <input
              className="form-control"
              label="Email Address / Username"
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              type="email"
              value={values.email}
            />
            {touched.email && errors.email && <small className="text-danger form-text">{errors.email}</small>}
          </div>
          <div className="form-group mb-4">
            <input
              className="form-control"
              label="Password"
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
              type="password"
              value={values.password}
            />
            {touched.password && errors.password && <small className="text-danger form-text">{errors.password}</small>}
          </div>

          <div className="custom-control custom-checkbox text-start mb-4 mt-2">
            <input type="checkbox" className="custom-control-input mx-2" id="customCheck1" />
            <label className="custom-control-label" htmlFor="customCheck1">
              Save credentials.
            </label>
          </div>

          {errors.submit && (
            <Col sm={12}>
              <Alert variant="danger">{errors.submit}</Alert>
            </Col>
          )}

          <Row>
            <Col mt={2}>
              <Button
                className="btn-block mb-4"
                color="primary"
                disabled={isSubmitting}
                size="large"
                type="submit"
                variant="primary"
              >
                Signin
              </Button>
            </Col>
          </Row>
        </form>
      )}
    </Formik>
    </UserContext.Provider>
  );
};

export default JWTLogin;
