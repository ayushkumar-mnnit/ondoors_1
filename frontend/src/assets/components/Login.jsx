import { useNavigate } from 'react-router-dom';
import './css/login.css';
import { useToast } from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios'; // Ensure axios is imported

// eslint-disable-next-line react/prop-types
const Login = ({toggleForm}) => {
  const toast = useToast();
  const navigate=useNavigate()
  const [user, setUser] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(`/api/login`, user, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (result.data.success) {
        toast({
          title: result.data.message,
          status: 'success',
          duration: 4000,
          isClosable: true,
          position: 'top',
        });
        setUser({
          email: '',
          password: '',
        });
        navigate('/landing')
      }

    } catch (error) {
      console.log(error.response.data);

      toast({
        title: error.response.data.message || 'server is down',
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  return (
    <>
      <section className=" py-3 py-md-5 py-xl-8" style={{ backgroundColor: 'rgb(20, 28, 37)' }}>
        <div className="container">
          <div className="row gy-4 align-items-center">
            <div className="col-12 col-md-6 col-xl-7 d-flex justify-content-center position-relative">
              <img
                src="https://img.freepik.com/premium-photo/elegant-young-fashion-beautiful-girl-holding-bag-while-shopping-with-white-sexy-dress_226666-1786.jpg"
                alt="Fashion girl"
                className="img-fluid blended-image"
                style={{
                  maxWidth: '80%',
                  maxHeight: '450px',
                  objectFit: 'cover',
                  filter: 'blur(0)',
                  zIndex: '1',
                  borderRadius: '5x',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  width: '100%',
                  height: '100%',
                  filter: 'blur(30px)',
                  backgroundImage:
                    'url(https://img.freepik.com/premium-photo/elegant-young-fashion-beautiful-girl-holding-bag-while-shopping-with-white-sexy-dress_226666-1786.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  zIndex: '0',
                  borderRadius: '10px',
                }}
              ></div>
            </div>

            <div className="col-12 col-md-6 col-xl-5">
              <div className="card border-0 rounded-4 shadow">
                <div className="card-body p-3 p-md-4 p-xl-5">
                  <div className="row">
                    <div className="col-12">
                      <div className="mb-4">
                        <h3>Log in</h3>
                        <p>
                          Do not have an account? <button onClick={toggleForm}>Sign Up</button>
                        </p>
                      </div>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="row gy-3 overflow-hidden">
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input
                            type="email"
                            className="form-control"
                            onChange={handleChange}
                            value={user.email}
                            name="email"
                            id="email"
                            required
                          />
                          <label className="form-label">E-mail</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input
                            type="password"
                            className="form-control"
                            onChange={handleChange}
                            value={user.password}
                            name="password"
                            id="password"
                            required
                          />
                          <label className="form-label">Password</label>
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="d-grid">
                          <button className="btn btn-primary btn-lg" type="submit">
                            Log in
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                  <div className="row"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
