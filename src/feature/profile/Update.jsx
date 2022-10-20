import React from 'react'
import { useUpdateProfileMutation } from './profileApiSlice'
import { useParams, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from 'react';
import { FaTimes, FaCheck, FaInfoCircle, FaChevronDown } from "react-icons/fa";

const USER_REGEX = /^[a-zA-z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Update = () => {

    const { id } = useParams();

    const [editFunc] = useUpdateProfileMutation(id);

    // create a navigate function from useNavigate
    const navigate = useNavigate();

    // username state
    const [user, setUser] = useState("");
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    // password state
    const [pwd, setPwd] = useState("");
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    // error message state
    const [errMsg, setErrMsg] = useState("");

    // confirm password state
    const [matchPwd, setMatchPwd] = useState("");
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    



    // REGEX

    // check if username conforms to the RegEx
    useEffect(() => {
        const result = USER_REGEX.test(user); // return true or false
        setValidName(result);
    }, [user])

    // check if both password matches
    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd])

    // clear out the error message when dependency array changes
    useEffect(() => {
        setErrMsg("");
    }, [user, pwd, matchPwd])


    // used to set focus
    const userRef = useRef();
    const errRef = useRef();

    // when component mounts set focus on username input field
    useEffect(() => {
        userRef.current.focus();
    }, []);


    // handle User input
    const handleUserInput = (e) => setUser(e.target.value);
    const handlePwdInput = (e) => setPwd(e.target.value);
    const handlePwdMatch = (e) => setMatchPwd(e.target.value); 
    const handleGenderInput = (e) => setGender(e.target.value);
    const handleEmail = (e) => setEmail(e.target.value);
    const handlePhone = (e) => setPhone(e.target.value);
    

    // submit function 
    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS Hack
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            await editFunc({ id, user, pwd, phone, gender, email}).unwrap();
            // clear the form
            setUser("");
            setPwd("");
            setGender("");
            setEmail("");
            setPhone("");
            navigate("/login");
        } catch (err) {
            if (!err?.originalStatus) {
                setErrMsg('No Server Response'); // server is off
            } else if (err.originalStatus === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.originalStatus === 401) {
                setErrMsg('Unauthorized');
            } else if (err.originalStatus === 409) {
                setErrMsg('user already exists');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus(); // set the focus on the error message for screen readers
        }
    }

  return (
    <section className="section">
          <div className="container">
              
            <div className="row">
                <div className="col-12 intro text-center">
                    <h3 className="mt-4">Update</h3>
                    <p className="lead">Update your user info</p>
                </div>
            </div>
              
            <div className="row d-flex justify-content-center">
                
                    <div className="col-lg-7">
                      <p ref={errRef} aria-live="assertive" className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
                        <form className="row mb-4" onSubmit={handleSubmit}>
                            <div className="form-group col-12 mt-3">
                                <label htmlFor="username" className="form-label">Username:
                                    <span className={validName ? "valid" : "hide"}><FaCheck /></span>
                                    <span className={validName || !user ? "hide" : "invalid"}><FaTimes /></span>
                                </label>
                                <input
                                    type="text"
                                    className="form-control mt-1"
                                    id="username"
                                    ref={userRef}
                                    value={user}
                                    onChange={handleUserInput}
                                    autoComplete="off"
                                    required
                                    placeholder="Enter your username"
                                    aria-invalid={validName ? "false" : "true"}
                                    aria-describedby="uidnote"
                                    onFocus={() => setUserFocus(true)}
                                    onBlur={() => setUserFocus(false)}
                                />
                                <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                                    <FaInfoCircle />
                                    4 to 24 characters. <br />
                                    Must begin with a letter. <br />
                                    Letters, numbers, underscores, hyphens allowed.
                                </p>
                            </div>
                            <div className="form-group col-12 mt-3">
                                <label htmlFor="password" className="form-label">Password:
                                    <span className={validPwd ? "valid" : "hide"}><FaCheck /></span>
                                    <span className={validPwd || !pwd ? "hide" : "invalid"}><FaTimes /></span>
                                </label>
                                <input
                                    type="password"
                                    className="form-control mt-1"
                                    id="password"
                                    value={pwd}
                                    onChange={handlePwdInput}
                                    autoComplete="off"
                                    placeholder="Enter your password"
                                    required
                                    aria-invalid={validPwd ? "false" : "true"}
                                    aria-describedby="pwdnote"
                                    onFocus={() => setPwdFocus(true)}
                                    onBlur={() => setPwdFocus(false)}
                                />
                                <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                                    <FaInfoCircle />
                                    8 to 24 characters. <br />
                                    Must include uppercase and lowercase letters, a number and a special character. <br />
                                    Allowed  special characters: <span aria-label='exclamation mark'>!</span> <span aria-label="at symbol">@</span> <span aria-label='dollar sign'>$</span> <span aria-label='hashtag'>#</span> <span aria-label='percent'>%</span>
                                </p>
                            </div>

                            <div className="form-group col-12 mt-3">
                                <label htmlFor="confirm_pwd" className="form-label">Confirm Password:
                                    <span className={validMatch && matchPwd ? "valid" : "hide"}>
                                        <FaCheck />
                                    </span>
                                    <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                                        <FaTimes />
                                    </span>
                                </label>
                                <input
                                    value={matchPwd}
                                    onChange={handlePwdMatch}
                                    type="password"
                                    id="confirm_pwd"
                                    placeholder='Please confirm your password'
                                    className="form-control mt-1"
                                    autoComplete='off'
                                    required
                                    aria-invalid={validMatch ? "false" : "true"}
                                    aria-describedby="confirmnote"
                                    onFocus={() => setMatchFocus(true)}
                                    onBlur={() => setMatchFocus(false)}
                                />
                                <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                                    <FaInfoCircle />
                                    Must match the first password input field.
                                </p>
                            </div>
                            
                            {/* email */}

                            <div className="form-group col-md-12 mt-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="text"
                                    className="form-control mt-1"
                                    placeholder="e.g johndoe@gmail.com"
                                    value={email}
                                    onChange={handleEmail}
                                />
                            </div>

                            {/* Phone */}
                            <div className="form-group col-md-12 mt-3">
                                <label className="form-label">Phone Number</label>
                                <input
                                    type="text"
                                    className="form-control mt-1"
                                    placeholder="e.g 08023942413"
                                    value={phone}
                                    onChange={handlePhone}
                                />
                            </div>

                            {/* gender */}

                            <div className="form-group col-md-12 mt-3">
                                <label className="form-label">Gender</label>
                                <div className="input-field">
                                    <i className="icon"><FaChevronDown /></i>
                                    <select name="" value={gender} onChange={handleGenderInput} id="" className='form-control mt-1'>
                                        <option value="">Choose a gender</option>
                                        <option value="male">male</option>
                                        <option value="female">female</option>
                                </select>
                            </div>
                        </div>

                        <div className="text-center">
                            <button type="submit" disabled={!validName || !validPwd || !validMatch ? true : false} className="btn btn-primary form-button">Submit</button>
                        </div>
                              
                    </form>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Update