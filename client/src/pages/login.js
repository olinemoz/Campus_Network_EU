import React, {useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {adminLogin, login} from '../redux/actions/authAction'
import {useDispatch, useSelector} from 'react-redux'


const Login = () => {
    const initialState = {email: '', password: ''}
    const [userData, setUserData] = useState(initialState)
    const [userType, setUserType] = useState(false);
    const {email, password} = userData

    const [typePass, setTypePass] = useState(false)

    const {auth} = useSelector(state => state)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        if (auth.token) history.push("/")
    }, [auth.token, history])

    const handleChangeInput = e => {
        const {name, value} = e.target
        setUserData({...userData, [name]: value})
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (!userType) {
            dispatch(login(userData));
        } else {
            dispatch(adminLogin(userData));
        }
    }

    return (
        <div>
            <div className="h-screen bg-indigo-100 flex justify-center items-center">
                <div className="lg:w-2/5 md:w-1/2 w-2/3">
                    <form className="bg-white p-10 rounded-lg shadow-lg min-w-full" onSubmit={handleSubmit}>
                        <h1 className="text-center text-2xl mb-6 text-gray-600 font-bold">Campus Network</h1>
                        <div>
                            <label
                                htmlFor="email"
                                className="text-gray-800 font-semibold block my-3 text-md"
                            >
                                Email
                            </label>
                            <input
                                className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
                                type="text"
                                name="email"
                                id="email"
                                placeholder="@email"
                                onChange={handleChangeInput}
                                value={email}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="text-gray-800 font-semibold block my-3 text-md"
                            >
                                Password
                            </label>
                            <input
                                className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
                                type={typePass ? "text" : "password"}
                                name="password"
                                id="password"
                                placeholder="password"
                                onChange={handleChangeInput}
                                value={password}
                            />
                            <small onClick={() => setTypePass(!typePass)}>
                                {typePass ? 'Hide' : 'Show'}
                            </small>

                            <div className="d-flex mt-2">
                                <label htmlFor="User">
                                    User:
                                    <input
                                        className="mx-2"
                                        type="radio"
                                        id="User"
                                        name="gender"
                                        value={userType}
                                        defaultChecked
                                        onClick={() => setUserType(false)}
                                    />
                                </label>

                                <label htmlFor="Admin">
                                    Admin:
                                    <input
                                        className="mx-2"
                                        type="radio"
                                        id="Admin"
                                        name="gender"
                                        value={userType}
                                        onClick={() => setUserType(true)}
                                    />
                                </label>
                            </div>

                        </div>
                        <button
                            disabled={!(email && password)}
                            type="submit"
                            className="w-full mt-1 bg-indigo-600 rounded-lg px-4 py-2 text-lg text-white tracking-wide font-semibold font-sans"
                        >
                            Login
                        </button>
                        <p className="my-2">
                            You don't have an account? <Link to="/register" style={{color: "crimson"}}>
                            Register</Link>
                        </p>
                    </form>
                </div>
            </div>


            {/*<div className="auth_page">*/}
            {/*    <form onSubmit={handleSubmit}>*/}
            {/*        <h3 className="text-uppercase text-center mb-4">Campus Network</h3>*/}

            {/*        <div className="form-group">*/}
            {/*            <label htmlFor="exampleInputEmail1">Email address</label>*/}
            {/*            <input*/}
            {/*                type="email"*/}
            {/*                className="form-control"*/}
            {/*                id="exampleInputEmail1"*/}
            {/*                name="email"*/}
            {/*                aria-describedby="emailHelp"*/}
            {/*                onChange={handleChangeInput}*/}
            {/*                value={email}*/}
            {/*            />*/}

            {/*            <small id="emailHelp" className="form-text text-muted">*/}
            {/*                We'll never share your email with anyone else.*/}
            {/*            </small>*/}
            {/*        </div>*/}

            {/*        <div className="form-group">*/}
            {/*            <label htmlFor="exampleInputPassword1">Password</label>*/}

            {/*            <div className="pass">*/}

            {/*                <input*/}
            {/*                    type={typePass ? "text" : "password"}*/}
            {/*                    className="form-control"*/}
            {/*                    id="exampleInputPassword1"*/}
            {/*                    onChange={handleChangeInput}*/}
            {/*                    value={password}*/}
            {/*                    name="password"*/}
            {/*                />*/}

            {/*                <small onClick={() => setTypePass(!typePass)}>*/}
            {/*                    {typePass ? 'Hide' : 'Show'}*/}
            {/*                </small>*/}
            {/*            </div>*/}

            {/*        </div>*/}

            {/*        /!*Admin Need to be Design*!/*/}
            {/*        <div className="d-flex justify-content-evenly  mx-0 mb-4">*/}
            {/*            <label htmlFor="User">*/}
            {/*                User:*/}
            {/*                <input*/}
            {/*                    type="radio"*/}
            {/*                    id="User"*/}
            {/*                    name="gender"*/}
            {/*                    value={userType}*/}
            {/*                    defaultChecked*/}
            {/*                    onClick={() => setUserType(false)}*/}
            {/*                />*/}
            {/*            </label>*/}

            {/*            <label htmlFor="Admin">*/}
            {/*                Admin:*/}
            {/*                <input*/}
            {/*                    type="radio"*/}
            {/*                    id="Admin"*/}
            {/*                    name="gender"*/}
            {/*                    value={userType}*/}
            {/*                    onClick={() => setUserType(true)}*/}
            {/*                />*/}
            {/*            </label>*/}
            {/*        </div>*/}


            {/*        <button type="submit" className="btn btn-dark w-100"*/}
            {/*                disabled={!(email && password)}>*/}
            {/*            Login*/}
            {/*        </button>*/}

            {/*<p className="my-2">*/}
            {/*    You don't have an account? <Link to="/register" style={{color: "crimson"}}>Register Now</Link>*/}
            {/*</p>*/}
            {/*    </form>*/}
            {/*</div>*/}
        </div>
    )
}

export default Login
