import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useHistory, Link} from 'react-router-dom'
import {register} from '../redux/actions/authAction'
import {Tab, Tabs} from "react-bootstrap";

const Register = () => {
    const {auth, alert} = useSelector(state => state)
    const dispatch = useDispatch()
    const history = useHistory()

    const initialState = {
        fullname: '', username: '', email: '', password: '', cf_password: '', gender: 'male'
    }
    const [userData, setUserData] = useState(initialState)
    const {fullname, username, email, password, cf_password} = userData

    const [typePass, setTypePass] = useState(false)
    const [typeCfPass, setTypeCfPass] = useState(false)
    const [key, setKey] = useState('name');



    useEffect(() => {
        if (auth.token) history.push("/")
    }, [auth.token, history])


    const handleChangeInput = e => {
        const {name, value} = e.target
        setUserData({...userData, [name]: value})
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(register(userData))
    }

    return (
        <div>
            <div className="h-screen bg-indigo-100 flex justify-center items-center">
                <div className="lg:w-2/5 md:w-1/2 w-2/3">
                    <form className="bg-white p-10 rounded-lg shadow-lg min-w-full" onSubmit={handleSubmit}>
                        <h1 className="text-center text-2xl mb-6 text-gray-600 font-bold">Campus Network</h1>

                        <Tabs
                            id="controlled-tab-example"
                            activeKey={key}
                            onSelect={(k) => setKey(k)}
                            className="mb-3"
                        >
                            <Tab eventKey="name" title="Step 1" id="1">
                                <div>
                                    <label
                                        htmlFor="fullname"
                                        className="text-gray-800 font-semibold block my-3 text-md"
                                    >
                                        Full Name
                                    </label>
                                    <input
                                        className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
                                        type="text"
                                        placeholder="full name"
                                        id="fullname"
                                        name="fullname"
                                        onChange={handleChangeInput}
                                        value={fullname}
                                        style={{background: `${alert.fullname ? '#fd2d6a14' : ''}`}}
                                    />
                                    <small className="form-text text-danger">
                                        {alert.fullname ? alert.fullname : ''}
                                    </small>
                                </div>

                                <div>
                                    <label
                                        htmlFor="username"
                                        className="text-gray-800 font-semibold block my-3 text-md"
                                    >
                                        User Name
                                    </label>
                                    <input
                                        className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
                                        type="text"
                                        placeholder="username"
                                        id="username"
                                        name="username"
                                        onChange={handleChangeInput}
                                        value={username.toLowerCase().replace(/ /g, '')}
                                        style={{background: `${alert.username ? '#fd2d6a14' : ''}`}}
                                    />
                                    <small className="form-text text-danger">
                                        {alert.username ? alert.username : ''}
                                    </small>
                                </div>
                            </Tab>

                            <Tab eventKey="email" title="Step 2" id="2">
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
                                        style={{background: `${alert.email ? '#fd2d6a14' : ''}`}}
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
                                        id="password"
                                        placeholder="password"
                                        onChange={handleChangeInput}
                                        value={password}
                                        name="password"
                                        style={{background: `${alert.password ? '#fd2d6a14' : ''}`}}
                                    />
                                    <small onClick={() => setTypePass(!typePass)}>
                                        {typePass ? 'Hide' : 'Show'}
                                    </small>
                                    <small className="form-text text-danger">
                                        {alert.password ? alert.password : ''}
                                    </small>
                                </div>

                            </Tab>

                            <Tab eventKey="password" title="Step 3" id="3">
                                <div>
                                    <label
                                        htmlFor="cf_password"
                                        className="text-gray-800 font-semibold block my-3 text-md"
                                    >
                                        Confirm Password
                                    </label>
                                    <input
                                        className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
                                        type={typeCfPass ? "text" : "password"}
                                        id="cf_password"
                                        placeholder="confirm password"
                                        onChange={handleChangeInput}
                                        value={cf_password}
                                        name="cf_password"
                                        style={{background: `${alert.cf_password ? '#fd2d6a14' : ''}`}}
                                    />
                                    <small onClick={() => setTypeCfPass(!typeCfPass)}>
                                        {typeCfPass ? 'Hide' : 'Show'}
                                    </small>
                                    <small className="form-text text-danger">
                                        {alert.cf_password ? alert.cf_password : ''}
                                    </small>
                                </div>
                                <div className="row justify-content-between mx-0 mt-2">
                                    <label htmlFor="male">
                                        Male:
                                        <input
                                            className="mx-2"
                                            type="radio"
                                            id="male"
                                            name="gender"
                                            value="male"
                                            defaultChecked onChange={handleChangeInput}
                                        />
                                    </label>

                                    <label htmlFor="female">
                                        Female: <input className="mx-2"
                                                       type="radio" id="female" name="gender"
                                                       value="female" onChange={handleChangeInput}/>
                                    </label>

                                    <label htmlFor="other">
                                        Other: <input className="mx-2"
                                                      type="radio" id="other" name="gender"
                                                      value="other" onChange={handleChangeInput}/>
                                    </label>
                                </div>
                            </Tab>
                        </Tabs>
                        <button
                            type="submit"
                            className="w-full mt-2 bg-indigo-600 rounded-lg px-4 py-2 text-lg text-white tracking-wide font-semibold font-sans"
                        >
                            Register
                        </button>
                        <p className="my-2">
                            Already have an account? <Link to="/" style={{color: "crimson"}}>Login</Link>
                        </p>
                    </form>
                </div>
            </div>

            {/*<div className="auth_page">*/}
            {/*    <form onSubmit={handleSubmit}>*/}
            {/*        <h3 className="text-uppercase text-center mb-4">Campus Network</h3>*/}

            {/*        <div className="form-group">*/}
            {/*            <label htmlFor="fullname">Full Name</label>*/}
            {/*            <input*/}
            {/*                type="text"*/}
            {/*                className="form-control"*/}
            {/*                id="fullname"*/}
            {/*                name="fullname"*/}
            {/*                onChange={handleChangeInput}*/}
            {/*                value={fullname}*/}
            {/*                style={{background: `${alert.fullname ? '#fd2d6a14' : ''}`}}*/}
            {/*            />*/}

            {/*            <small className="form-text text-danger">*/}
            {/*                {alert.fullname ? alert.fullname : ''}*/}
            {/*            </small>*/}
            {/*        </div>*/}

            {/*        <div className="form-group">*/}
            {/*            <label htmlFor="username">User Name</label>*/}
            {/*            <input*/}
            {/*                type="text"*/}
            {/*                className="form-control"*/}
            {/*                id="username"*/}
            {/*                name="username"*/}
            {/*                onChange={handleChangeInput}*/}
            {/*                value={username.toLowerCase().replace(/ /g, '')}*/}
            {/*                style={{background: `${alert.username ? '#fd2d6a14' : ''}`}}*/}
            {/*            />*/}

            {/*            <small className="form-text text-danger">*/}
            {/*                {alert.username ? alert.username : ''}*/}
            {/*            </small>*/}
            {/*        </div>*/}

            {/*        <div className="form-group">*/}
            {/*            <label htmlFor="exampleInputEmail1">Email address</label>*/}
            {/*            <input*/}
            {/*                type="email"*/}
            {/*                className="form-control"*/}
            {/*                id="exampleInputEmail1"*/}
            {/*                name="email"*/}
            {/*                onChange={handleChangeInput} value={email}*/}
            {/*                style={{background: `${alert.email ? '#fd2d6a14' : ''}`}}*/}
            {/*            />*/}

            {/*            <small className="form-text text-danger">*/}
            {/*                {alert.email ? alert.email : ''}*/}
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
            {/*                    value={password} name="password"*/}
            {/*                    style={{background: `${alert.password ? '#fd2d6a14' : ''}`}}*/}
            {/*                />*/}

            {/*                <small onClick={() => setTypePass(!typePass)}>*/}
            {/*                    {typePass ? 'Hide' : 'Show'}*/}
            {/*                </small>*/}
            {/*            </div>*/}

            {/*            <small className="form-text text-danger">*/}
            {/*                {alert.password ? alert.password : ''}*/}
            {/*            </small>*/}
            {/*        </div>*/}

            {/*        <div className="form-group">*/}
            {/*            <label htmlFor="cf_password">Confirm Password</label>*/}

            {/*            <div className="pass">*/}

            {/*                <input*/}
            {/*                    type={typeCfPass ? "text" : "password"}*/}
            {/*                    className="form-control"*/}
            {/*                    id="cf_password"*/}
            {/*                    onChange={handleChangeInput}*/}
            {/*                    value={cf_password}*/}
            {/*                    name="cf_password"*/}
            {/*                    style={{background: `${alert.cf_password ? '#fd2d6a14' : ''}`}}*/}
            {/*                />*/}

            {/*                <small onClick={() => setTypeCfPass(!typeCfPass)}>*/}
            {/*                    {typeCfPass ? 'Hide' : 'Show'}*/}
            {/*                </small>*/}
            {/*            </div>*/}

            {/*            <small className="form-text text-danger">*/}
            {/*                {alert.cf_password ? alert.cf_password : ''}*/}
            {/*            </small>*/}
            {/*        </div>*/}

            {/*        <div className="row justify-content-between mx-0 mb-1">*/}
            {/*            <label htmlFor="male">*/}
            {/*                Male:*/}
            {/*                <input*/}
            {/*                    type="radio"*/}
            {/*                    id="male"*/}
            {/*                    name="gender"*/}
            {/*                    value="male"*/}
            {/*                    defaultChecked onChange={handleChangeInput}*/}
            {/*                />*/}
            {/*            </label>*/}

            {/*            <label htmlFor="female">*/}
            {/*                Female: <input type="radio" id="female" name="gender"*/}
            {/*                               value="female" onChange={handleChangeInput}/>*/}
            {/*            </label>*/}

            {/*            <label htmlFor="other">*/}
            {/*                Other: <input type="radio" id="other" name="gender"*/}
            {/*                              value="other" onChange={handleChangeInput}/>*/}
            {/*            </label>*/}
            {/*        </div>*/}

            {/*        <button type="submit" className="btn btn-dark w-100">*/}
            {/*            Register*/}
            {/*        </button>*/}

            {/*        <p className="my-2">*/}
            {/*            Already have an account? <Link to="/" style={{color: "crimson"}}>Login Now</Link>*/}
            {/*        </p>*/}
            {/*    </form>*/}
            {/*</div>*/}
        </div>
    )
}

export default Register
