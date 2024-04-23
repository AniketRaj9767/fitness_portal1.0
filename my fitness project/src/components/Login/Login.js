import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slice/user';

function Login() {
  const [User, setUser] = useState({
    email: 'Some@gmai.com',
    password: '123456',
  });
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [RUser, setRUser] = useState({
    name: '',
    email: '',
    mpassword: '',
    cpassword: '',
    phoneNo: '',
    dob: '',
    role: 'user', // Default role is set to 'user'
  });

  const [currentPage, setcurrentPage] = useState('Login');

  const handlePageState = (e) => {
    setcurrentPage(e);
  };

  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...User, [name]: value });
  };

  const handleRInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setRUser({ ...RUser, [name]: value });
  };

  const handleRoleChange = (e) => {
    setRUser({ ...RUser, role: e.target.value });
  };

  const response = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify({
        User: { ...User },
      }),
    }).then((res)=> res.json().then((d)=>{
        dispatch(login(d.data))
        navigate('/dashboard');
    }));
  };

  const Rresponse = async (e) => {
    e.preventDefault();
    console.log("Calling Registration Route");
    const res = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        User: { ...RUser },
      }),
    }).then((res)=>res.json().then((d)=>{console.log(d);}));
  };

  return (
    <div className="section">
      <div className="container">
        <div className="row full-height justify-content-center bg">
          <div className="col-12 text-center align-self-center ">
            <div className="section pb-5 pt-2 pt-sm-2 text-center">
              <input
                className="checkbox"
                type="checkbox"
                id="reg-log"
                name="reg-log"
              />
              <label htmlFor="reg-log"></label>
              <div className="card-3d-wrap mx-auto">
                <div className="card-3d-wrapper">
                  <div className="card-front">
                    <div className="center-wrap">
                      <div className="section text-center">
                        <h4 className="mb-4 pb-3 heading">Log In</h4>
                        {/* Login form */}
                        <form>
            <div className="FormWrapper">
              <div className="inputtag">
                  <input
                    id="email"
                    name="email"
                    value={User.email}
                    onChange={handleInputs}
                    type="text"
                    className="form-style"

                    placeholder="Email Address"
                  />
              </div>
              <input
                id="password"
                className="form-style mt-2" 
                type="password"
                placeholder="Password"
                name="password"
                value={User.password}
                onChange={handleInputs}
              />
            </div>

            <button onClick={(e) => response(e)} className="btn mt-4">
              Login
            </button>
          </form>
                      </div>
                    </div>
                  </div>
                  <div className="card-back mt-2 ">
                    <div className="center-wrap">
                      <div className="section text-center">
                        <h4 className="mb-4 pb-3 heading">Sign Up</h4>
                        <div className="form-group">
                          {/* Role selection dropdown */}
                          <select
                            name="role"
                            className="form-style"
                            value={RUser.role}
                            onChange={handleRoleChange}
                          >
                            <option value="user">User/Trainee</option>
                            <option value="trainer">Trainer</option>
                            <option value="gymOwner">Gym Owner</option>
                          </select>
                        </div>
                        {/* Name input */}
                        <div className="form-group mt-2">
                          <input
                            type="text"
                            name="name"
                            className="form-style"
                            placeholder="Your Full Name"
                            autoComplete="off"
                            value={RUser.name}
                            onChange={handleRInputs}
                          />
                        </div>
                        {/* Email input */}
                        <div className="form-group mt-2">
                          <input
                            type="email"
                            name="email"
                            className="form-style"
                            placeholder="Your Email"
                            autoComplete="off"
                            value={RUser.email}
                            onChange={handleRInputs}
                          />
                        </div>
                        {/* Phone number input */}
                        {RUser.role !== "user" && (
                          <div className="form-group mt-2">
                            <input
                              type="number"
                              name="phoneNo"
                              className="form-style"
                              placeholder="Phone Number"
                              value={RUser.phoneNo}
                              onChange={handleRInputs}
                            />
                          </div>
                        )}
                        {/* Date of Birth input */}
                        {RUser.role !== "user" && (
                          <div className="form-group mt-2">
                            <input
                              type="date"
                              name="dob"
                              className="form-style"
                              placeholder="Date Of Birth"
                              autoComplete="off"
                              value={RUser.dob}
                              onChange={handleRInputs}
                            />
                          </div>
                        )}
                        {/* Password input */}
                        <div className="form-group mt-2">
                          <input
                            type="password"
                            name="mpassword"
                            className="form-style"
                            placeholder="Your Password"
                            autoComplete="off"
                            value={RUser.mpassword}
                            onChange={handleRInputs}
                          />
                        </div>
                        {/* Submit button */}
                        <button onClick={(e) => Rresponse(e)} className="btn mt-4">
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
