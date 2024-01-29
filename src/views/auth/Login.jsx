// import {createRef} from "react";
import { useState, useEffect } from "react";
import { useStateContext } from '../contexts/ContextProvider';
import axiosClient from '../../axios-client';

export default function Login(){
	const eyeiconpass = () =>  {
		var x = document.getElementById("password");
		if (x.type === "password") {
			x.type = "text";
		} else {
			x.type = "password";
		}
	};
	// const emailRef = createRef()
	// const passwordRef = createRef()
	const { setUser, setToken } = useStateContext()
	const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(true);
	const onSubmit = ev => {
		const email = document.getElementById("email").value;
		const password = document.getElementById("password").value;
		document.getElementById("sigin").innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" style="padding: 13px;"></span>`;
		ev.preventDefault();
		const payload = new FormData();
		payload.append('email', email);
		payload.append('password', password);
		const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
		axiosClient.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;
		axiosClient.post('/login', payload)
		.then(({data}) => {
			document.getElementById("sigin").innerHTML = 'Sign in';
			setUser(email);
			setToken(email);
			console.log(data);
		})
		.catch((err) => {
			document.getElementById("sigin").innerHTML = 'Sign in';
			const response = err.response;
			setMessage("User entered credentials are incorrect!")
			if (response && response.status === 422) {
			setMessage(response.data.message)
			}
		});
	}
	useEffect(() => {
		setLoading(false);
	}, [])

	if (loading) {
        return (
            <div
                className={`d-flex justify-content-center align-items-center w-100`}
                style={{ height: "40vh" }}
            >
				<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" style={{padding: "25px", color: "#9b51ff", marginTop: "100px"}}></span>
            </div>
        );
    }

	return (
		//  Content 
		<div className="container-xxl loginimg">
			<div className="row">
				<div className="col-lg-4 col-md-4 col-sm-12"></div>
				<div className="col-lg-8 col-md-8 col-sm-12">
					<div className="authentication-wrapper authentication-basic container-p-y">
						<div className="authentication-inner">
						<div className="card logincard">
							<div className="card-body">
							<div className="app-brand mt-3">
								<a href="#" className="app-brand-link gap-2">
								<span className="app-brand-text demo menu-text fw-bolder" style={{marginTop: "5px"}}>
									P25 Project
									</span>
								</a>
							</div>

							<form id="loginformAuthentication" className="mb-3" onSubmit={onSubmit} >
								{message &&
									<div className="text-danger">
									<p><b>{message}</b></p>
									</div>
								}
								<div className="mb-3">
								<label htmlFor="email" className="form-label loginlable"><b>Email</b></label>
								<input
									type="text"
									className="form-control logininpt"
									name="email"
									id="email"
									placeholder="Enter your Email"
									autoFocus
									required
								/>
								</div>
								<div className="mb-4 form-password-toggle">
								<div className="d-flex justify-content-between">
									<label className="form-label loginlable" htmlFor="password"><b>Password</b></label>
								</div>
								<div className="input-group input-group-merge">
									<input
									type="password"
									id="password"
									className="form-control logininpt"
									name="password"
									required
									placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
									aria-describedby="password"
									/>
									<span className="input-group-text cursor-pointer" onClick={eyeiconpass}><i className="bx bx-hide"></i></span>
								</div>
								</div>
								<div className="mb-3" style={{width: "50%"}}>
									<button className="btn nwwbauthbtn d-grid w-100" type="submit" id="sigin">Login</button>
								</div>
								<div className="mb-5">
									<label className="form-check-label loginlable" htmlFor="remember-me"><b> Forgot Password</b></label>
								</div>
								<div >
									<div className="row">
										<div className="col-lg-8 col-md-8 col-sm-12"></div>
										<div className="col-lg-4 col-md-4 col-sm-12">
											<img src="assets/adminpanel/assets/images/login/footerlogo.png" width="100px"/>
										</div>
									</div>
								</div>
							</form>
							</div>
						</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}