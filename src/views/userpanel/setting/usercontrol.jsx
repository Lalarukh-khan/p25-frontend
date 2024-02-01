import { useState, useEffect } from "react";
import axiosClient from '../../../axios-client';

export default function UserControl(){
	const [rowData, setRowData] = useState(null);
	// const [mattype, setMatType] = useState("");
	useEffect(() => {
		loadRole();
		document.getElementById("mainheadingtt").innerText = "User Control Information";
	}, []);
	// const loadshipments = () => {
	// 	axiosClient.get('/get-role')
	// 	.then(({data}) => {
	// 		console.log(data); 
	// 		const admin = data.data[0];
	// 		if(admin.add_material == 1){ document.getElementById("add_material1").checked = true;}
	// 		if(admin.mcategory == 1){ document.getElementById("mcategory1").checked= true; }
	// 		if(admin.msn == 1){ document.getElementById("msn1").checked= true; }
	// 		if(admin.manufacture == 1){ document.getElementById("manufacture1").checked= true; }
	// 		if(admin.shipment == 1){ document.getElementById("shipment1").checked= true; }
	// 		if(admin.warehouse == 1){ document.getElementById("warehouse1").checked= true; }
	// 		if(admin.site == 1){ document.getElementById("site1").checked= true; }
	// 		if(admin.company == 1){ document.getElementById("company1").checked= true; }
	// 		if(admin.sitereq == 1){ document.getElementById("sitereq1").checked= true; }
	// 		if(admin.createreq == 1){ document.getElementById("createreq1").checked= true; }
	// 		if(admin.requpdate == 1){ document.getElementById("requpdate1").checked= true; }
	// 		if(admin.userinfo == 1){ document.getElementById("userinfo1").checked= true; }
	// 		if(admin.rolecontrol == 1){ document.getElementById("rolecontrol1").checked= true; }

	// 		const manager = data.data[1];
	// 		if(manager.add_material == 1){ document.getElementById("add_material2").checked = true;}
	// 		if(manager.mcategory == 1){ document.getElementById("mcategory2").checked= true; }
	// 		if(manager.msn == 1){ document.getElementById("msn2").checked= true; }
	// 		if(manager.manufacture == 1){ document.getElementById("manufacture2").checked= true; }
	// 		if(manager.shipment == 1){ document.getElementById("shipment2").checked= true; }
	// 		if(manager.warehouse == 1){ document.getElementById("warehouse2").checked= true; }
	// 		if(manager.site == 1){ document.getElementById("site2").checked= true; }
	// 		if(manager.company == 1){ document.getElementById("company2").checked= true; }
	// 		if(manager.sitereq == 1){ document.getElementById("sitereq2").checked= true; }
	// 		if(manager.createreq == 1){ document.getElementById("createreq2").checked= true; }
	// 		if(manager.requpdate == 1){ document.getElementById("requpdate2").checked= true; }
	// 		if(manager.userinfo == 1){ document.getElementById("userinfo2").checked= true; }
	// 		if(manager.rolecontrol == 1){ document.getElementById("rolecontrol2").checked= true; }

	// 		const general = data.data[2];
	// 		if(general.add_material == 1){ document.getElementById("add_material3").checked = true;}
	// 		if(general.mcategory == 1){ document.getElementById("mcategory3").checked= true; }
	// 		if(general.msn == 1){ document.getElementById("msn3").checked= true; }
	// 		if(general.manufacture == 1){ document.getElementById("manufacture3").checked= true; }
	// 		if(general.shipment == 1){ document.getElementById("shipment3").checked= true; }
	// 		if(general.warehouse == 1){ document.getElementById("warehouse3").checked= true; }
	// 		if(general.site == 1){ document.getElementById("site3").checked= true; }
	// 		if(general.company == 1){ document.getElementById("company3").checked= true; }
	// 		if(general.sitereq == 1){ document.getElementById("sitereq3").checked= true; }
	// 		if(general.createreq == 1){ document.getElementById("createreq3").checked= true; }
	// 		if(general.requpdate == 1){ document.getElementById("requpdate3").checked= true; }
	// 		if(general.userinfo == 1){ document.getElementById("userinfo3").checked= true; }
	// 		if(general.rolecontrol == 1){ document.getElementById("rolecontrol3").checked= true; }
	// 		// setRowData(data.slice(1));
	// 	})
	// 	.catch((err) => {
	// 		const response = err.response;
	// 		if (response && response.status === 422) {
	// 			console.log(response.data.message);
	// 		}
	// 	});
	// }
	const loadRole = () => {
		axiosClient.get('/get-role',)
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
	const UpdateUser = () => {
	document.getElementById("adminbtn").innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" style="padding: 13px;"></span>`;
		let add_material = 0;
		let mcategory = 0;
		let msn = 0;
		let manufacture = 0;
		let shipment = 0;
		let warehouse = 0;
		let site = 0;
		let company = 0;
		let sitereq = 0;
		let createreq = 0;
		let requpdate = 0;
		let userinfo = 0;
		let rolecontrol = 0;
		if (document.getElementById("add_material").checked == true) { add_material = 1; }
		if (document.getElementById("mcategory").checked == true) { mcategory = 1; }
		if (document.getElementById("msn").checked == true) { msn = 1; }
		if (document.getElementById("manufacture").checked == true) { manufacture = 1; }
		if (document.getElementById("shipment").checked == true) { shipment = 1; }
		if (document.getElementById("warehouse").checked == true) { warehouse = 1; }
		if (document.getElementById("site").checked == true) { site = 1; }
		if (document.getElementById("company").checked == true) { company = 1; }
		if (document.getElementById("sitereq").checked == true) { sitereq = 1; }
		if (document.getElementById("createreq").checked == true) { createreq = 1; }
		if (document.getElementById("requpdate").checked == true) { requpdate = 1; }
		if (document.getElementById("userinfo").checked == true) { userinfo = 1; }
		if (document.getElementById("rolecontrol").checked == true) { rolecontrol = 1; }
		const username = document.getElementById("username").value 
		const payload = new FormData();
		payload.append('username', username);
		payload.append('add_material', add_material);
		payload.append('mcategory', mcategory);
		payload.append('msn', msn);
		payload.append('manufacture', manufacture);
		payload.append('shipment', shipment);
		payload.append('warehouse', warehouse);
		payload.append('site', site);
		payload.append('company', company);
		payload.append('sitereq', sitereq);
		payload.append('createreq', createreq);
		payload.append('requpdate', requpdate);
		payload.append('userinfo', userinfo);
		payload.append('rolecontrol', rolecontrol);
		axiosClient.post('/add-role', payload)
		.then(({data}) => {
			console.log(data);
			loadRole();
			document.getElementById("adminbtn").innerHTML = "Update";
		})
		.catch((err) => {
			const response = err.response;
			document.getElementById("adminbtn").innerHTML = "Update";
			if (response && response.status === 422) {
				console.log(response.data.message);
			}
		});
		
	}
	// const UpdateAdmin = () => {
	// 	document.getElementById("adminbtn").innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" style="padding: 13px;"></span>`;
	// 	let add_material = 0;
	// 	let mcategory = 0;
	// 	let msn = 0;
	// 	let manufacture = 0;
	// 	let shipment = 0;
	// 	let warehouse = 0;
	// 	let site = 0;
	// 	let company = 0;
	// 	let sitereq = 0;
	// 	let createreq = 0;
	// 	let requpdate = 0;
	// 	let userinfo = 0;
	// 	let rolecontrol = 0;
	// 	if (document.getElementById("add_material1").checked == true) { add_material = 1; }
	// 	if (document.getElementById("mcategory1").checked == true) { mcategory = 1; }
	// 	if (document.getElementById("msn1").checked == true) { msn = 1; }
	// 	if (document.getElementById("manufacture1").checked == true) { manufacture = 1; }
	// 	if (document.getElementById("shipment1").checked == true) { shipment = 1; }
	// 	if (document.getElementById("warehouse1").checked == true) { warehouse = 1; }
	// 	if (document.getElementById("site1").checked == true) { site = 1; }
	// 	if (document.getElementById("company1").checked == true) { company = 1; }
	// 	if (document.getElementById("sitereq1").checked == true) { sitereq = 1; }
	// 	if (document.getElementById("createreq1").checked == true) { createreq = 1; }
	// 	if (document.getElementById("requpdate1").checked == true) { requpdate = 1; }
	// 	if (document.getElementById("userinfo1").checked == true) { userinfo = 1; }
	// 	if (document.getElementById("rolecontrol1").checked == true) { rolecontrol = 1; }
	// 	const payload = new FormData();
	// 	payload.append('role', "admin");
	// 	payload.append('add_material', add_material);
	// 	payload.append('mcategory', mcategory);
	// 	payload.append('msn', msn);
	// 	payload.append('manufacture', manufacture);
	// 	payload.append('shipment', shipment);
	// 	payload.append('warehouse', warehouse);
	// 	payload.append('site', site);
	// 	payload.append('company', company);
	// 	payload.append('sitereq', sitereq);
	// 	payload.append('createreq', createreq);
	// 	payload.append('requpdate', requpdate);
	// 	payload.append('userinfo', userinfo);
	// 	payload.append('rolecontrol', rolecontrol);
	// 	axiosClient.post('/update-role', payload)
	// 	.then(({data}) => {
	// 		console.log(data);
	// 		loadshipments();
	// 		document.getElementById("adminbtn").innerHTML = "Update";
	// 	})
	// 	.catch((err) => {
	// 		const response = err.response;
	// 		document.getElementById("adminbtn").innerHTML = "Update";
	// 		if (response && response.status === 422) {
	// 			console.log(response.data.message);
	// 		}
	// 	});
		
	// }
	// const UpdateManager = () => {
	// 	document.getElementById("managerbtn").innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" style="padding: 13px;"></span>`;
	// 	let add_material = 0;
	// 	let mcategory = 0;
	// 	let msn = 0;
	// 	let manufacture = 0;
	// 	let shipment = 0;
	// 	let warehouse = 0;
	// 	let site = 0;
	// 	let company = 0;
	// 	let sitereq = 0;
	// 	let createreq = 0;
	// 	let requpdate = 0;
	// 	let userinfo = 0;
	// 	let rolecontrol = 0;
	// 	if (document.getElementById("add_material2").checked == true) { add_material = 1; }
	// 	if (document.getElementById("mcategory2").checked == true) { mcategory = 1; }
	// 	if (document.getElementById("msn2").checked == true) { msn = 1; }
	// 	if (document.getElementById("manufacture2").checked == true) { manufacture = 1; }
	// 	if (document.getElementById("shipment2").checked == true) { shipment = 1; }
	// 	if (document.getElementById("warehouse2").checked == true) { warehouse = 1; }
	// 	if (document.getElementById("site2").checked == true) { site = 1; }
	// 	if (document.getElementById("company2").checked == true) { company = 1; }
	// 	if (document.getElementById("sitereq2").checked == true) { sitereq = 1; }
	// 	if (document.getElementById("createreq2").checked == true) { createreq = 1; }
	// 	if (document.getElementById("requpdate2").checked == true) { requpdate = 1; }
	// 	if (document.getElementById("userinfo2").checked == true) { userinfo = 1; }
	// 	if (document.getElementById("rolecontrol2").checked == true) { rolecontrol = 1; }
	// 	const payload = new FormData();
	// 	payload.append('role', "manager");
	// 	payload.append('add_material', add_material);
	// 	payload.append('mcategory', mcategory);
	// 	payload.append('msn', msn);
	// 	payload.append('manufacture', manufacture);
	// 	payload.append('shipment', shipment);
	// 	payload.append('warehouse', warehouse);
	// 	payload.append('site', site);
	// 	payload.append('company', company);
	// 	payload.append('sitereq', sitereq);
	// 	payload.append('createreq', createreq);
	// 	payload.append('requpdate', requpdate);
	// 	payload.append('userinfo', userinfo);
	// 	payload.append('rolecontrol', rolecontrol);
	// 	axiosClient.post('/update-role', payload)
	// 	.then(({data}) => {
	// 		console.log(data);
	// 		loadshipments();
	// 		document.getElementById("managerbtn").innerHTML = "Update";
	// 	})
	// 	.catch((err) => {
	// 		const response = err.response;
	// 		document.getElementById("managerbtn").innerHTML = "Update";
	// 		if (response && response.status === 422) {
	// 			console.log(response.data.message);
	// 		}
	// 	});
		
	// }
	// const UpdateUser = () => {
	// 	document.getElementById("userbtn").innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" style="padding: 13px;"></span>`;
	// 	let add_material = 0;
	// 	let mcategory = 0;
	// 	let msn = 0;
	// 	let manufacture = 0;
	// 	let shipment = 0;
	// 	let warehouse = 0;
	// 	let site = 0;
	// 	let company = 0;
	// 	let sitereq = 0;
	// 	let createreq = 0;
	// 	let requpdate = 0;
	// 	let userinfo = 0;
	// 	let rolecontrol = 0;
	// 	if (document.getElementById("add_material3").checked == true) { add_material = 1; }
	// 	if (document.getElementById("mcategory3").checked == true) { mcategory = 1; }
	// 	if (document.getElementById("msn3").checked == true) { msn = 1; }
	// 	if (document.getElementById("manufacture3").checked == true) { manufacture = 1; }
	// 	if (document.getElementById("shipment3").checked == true) { shipment = 1; }
	// 	if (document.getElementById("warehouse3").checked == true) { warehouse = 1; }
	// 	if (document.getElementById("site3").checked == true) { site = 1; }
	// 	if (document.getElementById("company3").checked == true) { company = 1; }
	// 	if (document.getElementById("sitereq3").checked == true) { sitereq = 1; }
	// 	if (document.getElementById("createreq3").checked == true) { createreq = 1; }
	// 	if (document.getElementById("requpdate3").checked == true) { requpdate = 1; }
	// 	if (document.getElementById("userinfo3").checked == true) { userinfo = 1; }
	// 	if (document.getElementById("rolecontrol3").checked == true) { rolecontrol = 1; }
	// 	const payload = new FormData();
	// 	payload.append('role', "user");
	// 	payload.append('add_material', add_material);
	// 	payload.append('mcategory', mcategory);
	// 	payload.append('msn', msn);
	// 	payload.append('manufacture', manufacture);
	// 	payload.append('shipment', shipment);
	// 	payload.append('warehouse', warehouse);
	// 	payload.append('site', site);
	// 	payload.append('company', company);
	// 	payload.append('sitereq', sitereq);
	// 	payload.append('createreq', createreq);
	// 	payload.append('requpdate', requpdate);
	// 	payload.append('userinfo', userinfo);
	// 	payload.append('rolecontrol', rolecontrol);
	// 	axiosClient.post('/update-role', payload)
	// 	.then(({data}) => {
	// 		console.log(data);
	// 		loadshipments();
	// 		document.getElementById("userbtn").innerHTML = "Update";
	// 	})
	// 	.catch((err) => {
	// 		const response = err.response;
	// 		document.getElementById("userbtn").innerHTML = "Update";
	// 		if (response && response.status === 422) {
	// 			console.log(response.data.message);
	// 		}
	// 	});
		
	// }

	return (
		<>
		<div className="container">
			<div className="row mb-5">
						{rowData && (
					<div className="row  mb-3">
						<div className="col-lg-4 col-md-4 col-sm-12 mt-3">
						<input type="text" id="username" placeholder="Enter Username" className="shpinput" style={{height: "40px"}}/>
							<div className="mt-3 mb-3">
							<div className="row">
								<div className="col-lg-11 col-md-11 col-sm-12">
									<h6 className="h5heading">Add Material</h6>
								</div>
								<div className="col-lg-1 col-md-1 col-sm-12">
									<input type="checkbox" id="add_material"/>
								</div>
							</div>
							<div className="row">
								<div className="col-lg-11 col-md-11 col-sm-12">
									<h6 className="h5heading">Add Material Category</h6>
								</div>
								<div className="col-lg-1 col-md-1 col-sm-12">
									<input type="checkbox" id="mcategory"/>
								</div>
							</div>
							<div className="row">
								<div className="col-lg-11 col-md-11 col-sm-12">
									<h6 className="h5heading">Add Material S/N</h6>
								</div>
								<div className="col-lg-1 col-md-1 col-sm-12">
									<input type="checkbox" id="msn"/>
								</div>
							</div>
							<div className="row">
								<div className="col-lg-11 col-md-11 col-sm-12">
									<h6 className="h5heading">Manufacture Information</h6>
								</div>
								<div className="col-lg-1 col-md-1 col-sm-12">
									<input type="checkbox" id="manufacture"/>
								</div>
							</div>
							<div className="row">
								<div className="col-lg-11 col-md-11 col-sm-12">
									<h6 className="h5heading">Shipment Information</h6>
								</div>
								<div className="col-lg-1 col-md-1 col-sm-12">
									<input type="checkbox" id="shipment"/>
								</div>
							</div>
							<div className="row">
								<div className="col-lg-11 col-md-11 col-sm-12">
									<h6 className="h5heading">Warehouse Information</h6>
								</div>
								<div className="col-lg-1 col-md-1 col-sm-12">
									<input type="checkbox" id="warehouse"/>
								</div>
							</div>
							<div className="row">
								<div className="col-lg-11 col-md-11 col-sm-12">
									<h6 className="h5heading">Site Information</h6>
								</div>
								<div className="col-lg-1 col-md-1 col-sm-12">
									<input type="checkbox" id="site"/>
								</div>
							</div>
							<div className="row">
								<div className="col-lg-11 col-md-11 col-sm-12">
									<h6 className="h5heading">Company Information</h6>
								</div>
								<div className="col-lg-1 col-md-1 col-sm-12">
									<input type="checkbox" id="company"/>
								</div>
							</div>
							<div className="row mb-3">
								<div className="col-lg-11 col-md-11 col-sm-12">
									<h6 className="h5heading">Add Site Requisition</h6>
								</div>
								<div className="col-lg-1 col-md-1 col-sm-12">
									<input type="checkbox" id="sitereq"/>
								</div>
							</div>
							<div className="row">
								<div className="col-lg-11 col-md-11 col-sm-12">
									<h6 className="h5heading" style={{color: "#F26422"}}>Create Requisition</h6>
								</div>
								<div className="col-lg-1 col-md-1 col-sm-12">
									<input type="checkbox"  id="createreq"/>
								</div>
							</div>
							<div className="row">
								<div className="col-lg-11 col-md-11 col-sm-12">
									<h6 className="h5heading" style={{color: "#F26422"}}>Requisition Update</h6>
								</div>
								<div className="col-lg-1 col-md-1 col-sm-12">
									<input type="checkbox" id="requpdate"/>
								</div>
							</div>
							<div className="row">
								<div className="col-lg-11 col-md-11 col-sm-12">
									<h6 className="h5heading" style={{color: "#F26422"}}>User Information</h6>
								</div>
								<div className="col-lg-1 col-md-1 col-sm-12">
									<input type="checkbox" id="userinfo"/>
								</div>
							</div>
							<div className="row">
								<div className="col-lg-11 col-md-11 col-sm-12">
									<h6 className="h5heading" style={{color: "#F26422"}}>User Role Control</h6>
								</div>
								<div className="col-lg-1 col-md-1 col-sm-12">
									<input type="checkbox" id="rolecontrol"/>
								</div>
							</div>
							</div>
							<button className="categbtn" id="adminbtn" onClick={UpdateUser}>Update</button>
						</div>
								{rowData.map((row, index) => (
									<div key={row.id} className="col-lg-4 col-md-4 col-sm-12 mt-3">
										<h6 className="h5hcntrl">{row.username}</h6>
							<div className="mt-3 mb-3">
							<div className="row">
								<div className="col-lg-11 col-md-11 col-sm-12">
									<h6 className="h5heading">Add Material</h6>
								</div>
								<div className="col-lg-1 col-md-1 col-sm-12">
									<input type="checkbox" id="add_material" checked={row.add_material === 1}/>
								</div>
							</div>
							<div className="row">
								<div className="col-lg-11 col-md-11 col-sm-12">
									<h6 className="h5heading">Add Material Category</h6>
								</div>
								<div className="col-lg-1 col-md-1 col-sm-12">
									<input type="checkbox" id="mcategory" checked={row.mcategory === 1}/>
								</div>
							</div>
							<div className="row">
								<div className="col-lg-11 col-md-11 col-sm-12">
									<h6 className="h5heading">Add Material S/N</h6>
								</div>
								<div className="col-lg-1 col-md-1 col-sm-12">
									<input type="checkbox" id="msn" checked={row.msn === 1}/>
								</div>
							</div>
							<div className="row">
								<div className="col-lg-11 col-md-11 col-sm-12">
									<h6 className="h5heading">Manufacture Information</h6>
								</div>
								<div className="col-lg-1 col-md-1 col-sm-12">
									<input type="checkbox" id="manufacture" checked={row.manufacture === 1}/>
								</div>
							</div>
							<div className="row">
								<div className="col-lg-11 col-md-11 col-sm-12">
									<h6 className="h5heading">Shipment Information</h6>
								</div>
								<div className="col-lg-1 col-md-1 col-sm-12">
									<input type="checkbox" id="shipment" checked={row.shipment === 1}/>
								</div>
							</div>
							<div className="row">
								<div className="col-lg-11 col-md-11 col-sm-12">
									<h6 className="h5heading">Warehouse Information</h6>
								</div>
								<div className="col-lg-1 col-md-1 col-sm-12">
									<input type="checkbox" id="warehouse" checked={row.warehouse === 1}/>
								</div>
							</div>
							<div className="row">
								<div className="col-lg-11 col-md-11 col-sm-12">
									<h6 className="h5heading">Site Information</h6>
								</div>
								<div className="col-lg-1 col-md-1 col-sm-12">
									<input type="checkbox" id="site" checked={row.site === 1}/>
								</div>
							</div>
							<div className="row">
								<div className="col-lg-11 col-md-11 col-sm-12">
									<h6 className="h5heading">Company Information</h6>
								</div>
								<div className="col-lg-1 col-md-1 col-sm-12">
									<input type="checkbox" id="company" checked={row.company === 1}/>
								</div>
							</div>
							<div className="row mb-3">
								<div className="col-lg-11 col-md-11 col-sm-12">
									<h6 className="h5heading">Add Site Requisition</h6>
								</div>
								<div className="col-lg-1 col-md-1 col-sm-12">
									<input type="checkbox" id="sitereq" checked={row.sitereq === 1}/>
								</div>
							</div>
							<div className="row">
								<div className="col-lg-11 col-md-11 col-sm-12">
									<h6 className="h5heading" style={{color: "#F26422"}}>Create Requisition</h6>
								</div>
								<div className="col-lg-1 col-md-1 col-sm-12">
									<input type="checkbox"  id="createreq" checked={row.createreq === 1}/>
								</div>
							</div>
							<div className="row">
								<div className="col-lg-11 col-md-11 col-sm-12">
									<h6 className="h5heading" style={{color: "#F26422"}}>Requisition Update</h6>
								</div>
								<div className="col-lg-1 col-md-1 col-sm-12">
									<input type="checkbox" id="requpdate" checked={row.requpdate === 1}/>
								</div>
							</div>
							<div className="row">
								<div className="col-lg-11 col-md-11 col-sm-12">
									<h6 className="h5heading" style={{color: "#F26422"}}>User Information</h6>
								</div>
								<div className="col-lg-1 col-md-1 col-sm-12">
									<input type="checkbox" id="userinfo" checked={row.userinfo === 1}/>
								</div>
							</div>
							<div className="row">
								<div className="col-lg-11 col-md-11 col-sm-12">
									<h6 className="h5heading" style={{color: "#F26422"}}>User Role Control</h6>
								</div>
								<div className="col-lg-1 col-md-1 col-sm-12">
									<input type="checkbox" id="rolecontrol" checked={row.rolecontrol === 1}/>
								</div>
							</div>
							</div>
							<button className="categbtn" id="adminbtn" onClick={UpdateUser}>Update</button>
									</div>
								))}
							</div>
						)}
						{/* <div className="col-lg-4 col-md-4 col-sm-12">
							<h6 className="h5hcntrl">Manager</h6>
							<div className="mt-3 mb-3">
							<div className="row">
								<div className="col-lg-11 col-md-11 col-sm-12">
									<h6 className="h5heading">Add Material</h6>
								</div>
								<div className="col-lg-1 col-md-1 col-sm-12">
									<input type="checkbox" id="add_material2"/>
								</div>
							</div>
							<div className="row">
								<div className="col-lg-11 col-md-11 col-sm-12">
									<h6 className="h5heading">Add Material Category</h6>
								</div>
								<div className="col-lg-1 col-md-1 col-sm-12">
									<input type="checkbox" id="mcategory2"/>
								</div>
							</div>
							<div className="row">
								<div className="col-lg-11 col-md-11 col-sm-12">
									<h6 className="h5heading">Add Material S/N</h6>
								</div>
								<div className="col-lg-1 col-md-1 col-sm-12">
									<input type="checkbox" id="msn2"/>
								</div>
							</div>
							<div className="row">
								<div className="col-lg-11 col-md-11 col-sm-12">
									<h6 className="h5heading">Manufacture Information</h6>
								</div>
								<div className="col-lg-1 col-md-1 col-sm-12">
									<input type="checkbox" id="manufacture2"/>
								</div>
							</div>
							<div className="row">
								<div className="col-lg-11 col-md-11 col-sm-12">
									<h6 className="h5heading">Shipment Information</h6>
								</div>
								<div className="col-lg-1 col-md-1 col-sm-12">
									<input type="checkbox" id="shipment2"/>
								</div>
							</div>
							<div className="row">
								<div className="col-lg-11 col-md-11 col-sm-12">
									<h6 className="h5heading">Warehouse Information</h6>
								</div>
								<div className="col-lg-1 col-md-1 col-sm-12">
									<input type="checkbox" id="warehouse2"/>
								</div>
							</div>
							<div className="row">
								<div className="col-lg-11 col-md-11 col-sm-12">
									<h6 className="h5heading">Site Information</h6>
								</div>
								<div className="col-lg-1 col-md-1 col-sm-12">
									<input type="checkbox" id="site2"/>
								</div>
							</div>
							<div className="row">
								<div className="col-lg-11 col-md-11 col-sm-12">
									<h6 className="h5heading">Company Information</h6>
								</div>
								<div className="col-lg-1 col-md-1 col-sm-12">
									<input type="checkbox" id="company2"/>
								</div>
							</div>
							<div className="row mb-3">
								<div className="col-lg-11 col-md-11 col-sm-12">
									<h6 className="h5heading">Add Site Requisition</h6>
								</div>
								<div className="col-lg-1 col-md-1 col-sm-12">
									<input type="checkbox" id="sitereq2"/>
								</div>
							</div>
							<div className="row">
								<div className="col-lg-11 col-md-11 col-sm-12">
									<h6 className="h5heading" style={{color: "#F26422"}}>Create Requisition</h6>
								</div>
								<div className="col-lg-1 col-md-1 col-sm-12">
									<input type="checkbox"  id="createreq2"/>
								</div>
							</div>
							<div className="row">
								<div className="col-lg-11 col-md-11 col-sm-12">
									<h6 className="h5heading" style={{color: "#F26422"}}>Requisition Update</h6>
								</div>
								<div className="col-lg-1 col-md-1 col-sm-12">
									<input type="checkbox" id="requpdate2"/>
								</div>
							</div>
							<div className="row">
								<div className="col-lg-11 col-md-11 col-sm-12">
									<h6 className="h5heading" style={{color: "#F26422"}}>User Information</h6>
								</div>
								<div className="col-lg-1 col-md-1 col-sm-12">
									<input type="checkbox" id="userinfo2"/>
								</div>
							</div>
							<div className="row">
								<div className="col-lg-11 col-md-11 col-sm-12">
									<h6 className="h5heading" style={{color: "#F26422"}}>User Role Control</h6>
								</div>
								<div className="col-lg-1 col-md-1 col-sm-12">
									<input type="checkbox" id="rolecontrol2"/>
								</div>
							</div>
							</div>
							<button className="categbtn" id="managerbtn" onClick={UpdateManager}>Update</button>
						</div>
						<div className="col-lg-4 col-md-4 col-sm-12">
							<h6 className="h5hcntrl">General User</h6>
							<div className="mt-3 mb-3">
							<div className="row">
								<div className="col-lg-11 col-md-11 col-sm-12">
									<h6 className="h5heading">Add Material</h6>
								</div>
								<div className="col-lg-1 col-md-1 col-sm-12">
									<input type="checkbox" id="add_material3"/>
								</div>
							</div>
							<div className="row">
								<div className="col-lg-11 col-md-11 col-sm-12">
									<h6 className="h5heading">Add Material Category</h6>
								</div>
								<div className="col-lg-1 col-md-1 col-sm-12">
									<input type="checkbox" id="mcategory3"/>
								</div>
							</div>
							<div className="row">
								<div className="col-lg-11 col-md-11 col-sm-12">
									<h6 className="h5heading">Add Material S/N</h6>
								</div>
								<div className="col-lg-1 col-md-1 col-sm-12">
									<input type="checkbox" id="msn3"/>
								</div>
							</div>
							<div className="row">
								<div className="col-lg-11 col-md-11 col-sm-12">
									<h6 className="h5heading">Manufacture Information</h6>
								</div>
								<div className="col-lg-1 col-md-1 col-sm-12">
									<input type="checkbox" id="manufacture3"/>
								</div>
							</div>
							<div className="row">
								<div className="col-lg-11 col-md-11 col-sm-12">
									<h6 className="h5heading">Shipment Information</h6>
								</div>
								<div className="col-lg-1 col-md-1 col-sm-12">
									<input type="checkbox" id="shipment3"/>
								</div>
							</div>
							<div className="row">
								<div className="col-lg-11 col-md-11 col-sm-12">
									<h6 className="h5heading">Warehouse Information</h6>
								</div>
								<div className="col-lg-1 col-md-1 col-sm-12">
									<input type="checkbox" id="warehouse3"/>
								</div>
							</div>
							<div className="row">
								<div className="col-lg-11 col-md-11 col-sm-12">
									<h6 className="h5heading">Site Information</h6>
								</div>
								<div className="col-lg-1 col-md-1 col-sm-12">
									<input type="checkbox" id="site3"/>
								</div>
							</div>
							<div className="row">
								<div className="col-lg-11 col-md-11 col-sm-12">
									<h6 className="h5heading">Company Information</h6>
								</div>
								<div className="col-lg-1 col-md-1 col-sm-12">
									<input type="checkbox" id="company3"/>
								</div>
							</div>
							<div className="row mb-3">
								<div className="col-lg-11 col-md-11 col-sm-12">
									<h6 className="h5heading">Add Site Requisition</h6>
								</div>
								<div className="col-lg-1 col-md-1 col-sm-12">
									<input type="checkbox" id="sitereq3"/>
								</div>
							</div>
							<div className="row">
								<div className="col-lg-11 col-md-11 col-sm-12">
									<h6 className="h5heading" style={{color: "#F26422"}}>Create Requisition</h6>
								</div>
								<div className="col-lg-1 col-md-1 col-sm-12">
									<input type="checkbox"  id="createreq3"/>
								</div>
							</div>
							<div className="row">
								<div className="col-lg-11 col-md-11 col-sm-12">
									<h6 className="h5heading" style={{color: "#F26422"}}>Requisition Update</h6>
								</div>
								<div className="col-lg-1 col-md-1 col-sm-12">
									<input type="checkbox" id="requpdate3"/>
								</div>
							</div>
							<div className="row">
								<div className="col-lg-11 col-md-11 col-sm-12">
									<h6 className="h5heading" style={{color: "#F26422"}}>User Information</h6>
								</div>
								<div className="col-lg-1 col-md-1 col-sm-12">
									<input type="checkbox" id="userinfo3"/>
								</div>
							</div>
							<div className="row">
								<div className="col-lg-11 col-md-11 col-sm-12">
									<h6 className="h5heading" style={{color: "#F26422"}}>User Role Control</h6>
								</div>
								<div className="col-lg-1 col-md-1 col-sm-12">
									<input type="checkbox" id="rolecontrol3"/>
								</div>
							</div>
							</div>
							<button className="categbtn" id="userbtn" onClick={UpdateUser}>Update</button>
						</div> */}
					{/* </div> */}
			</div>
		</div>	
		</>
	)
}