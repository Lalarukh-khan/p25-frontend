import { useState, useEffect } from "react";
import axiosClient from '../../../axios-client';

export default function UserInformation(){
	// const [mattype, setMatType] = useState("");
	const [rowData, setRowData] = useState(null);
	useEffect(() => {
		loadshipments();
		loadcategories();
		document.getElementById("mainheadingtt").innerText = "User Information";
	}, []);
	const loadshipments = () => {
		axiosClient.get('/get-user')
		.then(({data}) => {
			console.log(data); 
			setRowData(data.data);
		})
		.catch((err) => {
			const response = err.response;
			if (response && response.status === 422) {
				console.log(response.data.message);
			}
		});
	}
	const loadcategories = () => {
		axiosClient.get('/get-role')
		.then(({data}) => {
			console.log(data); 
			const jsonData = data.data;
			function createSelect(options) {
				const selectContainer = document.getElementById('select-container');
				selectContainer.innerHTML = "";
					const select = document.createElement('select');
					select.className = `shpinput`;
					select.id = `slctcateg`;
					// Loop through the options and create <option> elements
					options.forEach(option => {
						const optionElement = document.createElement('option');
						optionElement.value = option.id;
						optionElement.text = option.username;
						select.appendChild(optionElement);
					});
					selectContainer.appendChild(select);
			}
			createSelect(jsonData);
		})
		.catch((err) => {
			const response = err.response;
			if (response && response.status === 422) {
				console.log(response.data.message);
			}
		});
	}
	const AddManufecturer = () => {
		const fullname =  document.getElementById("fullname").value;
		const email =  document.getElementById("email").value;
		const role =  document.getElementById("role").value;
		const username =  document.getElementById("username").value;
		const password =  document.getElementById("password").value;
		const mobile =  document.getElementById("mobile").value;
		const emergency =  document.getElementById("emergency").value;
		const address =  document.getElementById("address").value;
		const payload = new FormData();
		payload.append('fullname', fullname);
		payload.append('email', email);
		payload.append('role', role);
		payload.append('username', username);
		payload.append('password', password);
		payload.append('mobile', mobile);
		payload.append('emergency', emergency);
		payload.append('address', address);
		axiosClient.post('/add-user', payload)
		.then(({data}) => {
			console.log(data);
			document.getElementById("matconfirm").style.display = "block";
			document.getElementById("fullname").value = "";
			document.getElementById("email").value = "";
			document.getElementById("role").value = "";
			document.getElementById("username").value = "";
			document.getElementById("password").value = "";
			document.getElementById("mobile").value = "";
			document.getElementById("emergency").value = "";
			document.getElementById("address").value = "";
			loadshipments();
		})
		.catch((err) => {
			const response = err.response;
			if (response && response.status === 422) {
				console.log(response.data.message);
			}
		});
		
	}
	const addmatshow = () => {
		const toshow = document.getElementById("toshow");
		toshow.style.display = "block";
	} 
	return (
		<>
		<div className="container">
			<div className="row mb-3">
				<div className="col-lg-2 col-md-2 col-sm-12">
					<button className="categbtn" onClick={addmatshow}>Add User</button>
				</div>
				<div className="col-lg-10 col-md-10 col-sm-12"></div>
			</div>
			<div className="row mb-5" id="toshow" style={{display: "none"}}>
				<div className="col-lg-10 col-md-10 col-sm-12">
					<div className="row  mb-3">
						<div className="col-lg-2 col-md-2 col-sm-12">
							<input type="text" id="fullname" placeholder="Full Name" className="shpinput"/>
						</div>
						<div className="col-lg-2 col-md-2 col-sm-12">
							<input type="text" id="email" placeholder="Email" className="shpinput"/>
						</div>
						<div className="col-lg-4 col-md-4 col-sm-12">
							<div id="select-container"></div>
						</div>
						<div className="col-lg-2 col-md-2 col-sm-12">
							<input type="text" id="username" placeholder="User Name" className="shpinput"/>
						</div>
						<div className="col-lg-2 col-md-2 col-sm-12">
							<input type="text" id="password" placeholder="Password" className="shpinput"/>
						</div>
					</div>
					<div className="row  mb-3">
						<div className="col-lg-3 col-md-3 col-sm-12">
							<h6 className="h5heading">Mobile Number</h6>
							<input type="text" id="mobile" placeholder="xxxxxxxxxxxxx" className="shpinput"/>
						</div>
						<div className="col-lg-3 col-md-3 col-sm-12">
							<h6 className="h5heading">Emergency Contact</h6>
							<input type="text" id="emergency" placeholder="" className="shp2input"/>
						</div>
						<div className="col-lg-3 col-md-3 col-sm-12">
							<h6 className="h5heading">Present Address</h6>
							<input type="text" id="address" placeholder="xxxxxxxxxxxxx" className="shp2input"/>
						</div>
						<div className="col-lg-3 col-md-3 col-sm-12">
							<h6 className="h5heading" style={{visibility: "hidden"}}>Upload</h6>
							<button className="categbtn" id="categbtn" onClick={AddManufecturer}>Add User</button>
						</div>
						<h5 className="h5heading mt-3 sccssmsg" id="matconfirm" style={{display: 'none'}}>User Has Been Added Successfully!</h5>
					</div>
				</div>
				<div className="col-lg-2 col-md-2 col-sm-12"></div>
				<div id="categresult">
					<hr  className="mt-5 mb-5"/>
					{rowData && (
					<div id="matresult" className="mt-5 mb-3">
						<table className="shipmenttable">
						<tr>
							<th>SL No</th>
							<th>Full Name</th>
							<th>Email</th>
							<th>Role</th>
							<th>User Name</th>
							<th>Password</th>
							<th>Mobile Number</th>
							<th>Emergency Contact</th>
							<th>Present Address</th>
							<th>Status</th>
							<th>Action</th>
						</tr>
						{rowData.map((row, index) => (
							<tr key={row.id}>
								<td>{index + 1}</td>
								<td>{row.fullname}</td>
								<td>{row.email}</td>
								<td>{row.role}</td>
								<td>{row.username}</td>
								<td>{row.password}</td>
								<td>{row.mobile}</td>
								<td>{row.emergency}</td>
								<td>{row.address}</td>
								<td>{row.status}</td>
								<td><button>X</button>&nbsp;<button>Y</button></td>
							</tr>
						))}
						</table>
					</div>
					)}
				</div>
			</div>
		</div>	
		</>
	)
}