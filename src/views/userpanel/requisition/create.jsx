import { useEffect, useState } from "react";
import axiosClient from '../../../axios-client';
import { useStateContext } from "../../contexts/ContextProvider";
import { Modal } from 'react-bootstrap';

export default function CreateRequisition(){
	const [toneModal, setToneModal] = useState(false);
	const [rnmnval, setRnmnVal] = useState("false");
	const [serialModal, setSerialModal] = useState(false);
	const [lssid, setLsid] = useState("false");
	const [rowData, setRowData] = useState(null);
	const [serialData, setSerialData] = useState(null);
	const TonehandleClose = () =>{
		setToneModal(false);
	}
	const SerialhandleClose = () =>{
		setSerialModal(false);
	}
	const OpenSerialModal = () =>{
		setSerialModal(true);
	}
	const OpenToneModal = () =>{
		setToneModal(true);
	}
    const {token} = useStateContext();
	useEffect(() => {
		userload();
		getCurrentDateTime();
		loadsites();
		loadcompanies();
		document.getElementById("btncreatedby").disabled = "true";
	}, []);
	const usercontrol = (rmnm) => {
		const payload = new FormData();
		payload.append('rmnm', rmnm);
		axiosClient.post('/check-usercontrol', payload)
		.then(({data}) => {
			const jsonData = data.data[0];
			if(jsonData.mrcreatedby == null){
				if(rowData !== null){
					console.log("Yes, its not null!");
					const createdby = document.getElementById("btncreatedby");
					createdby.style.background = "#F26422";
					createdby.disabled = false;
				}
			}
			else{
				const firin = document.getElementById("mrcreatedby");
				firin.innerHTML = "";
				firin.innerHTML = jsonData.mrcreatedby;
			}
			if(jsonData.sncreatedby !== null){
				const firin = document.getElementById("sncreatedby");
				firin.innerHTML = "";
				firin.innerHTML = jsonData.sncreatedby;
			}
			// console.log("rowData:", rowData); // Log rowData to console for debugging
			// if (rowData !== null) {
			// 	const createdby = document.getElementById("mrcreatedby");
			// 	if (createdby) {
			// 		console.log("Button found:", createdby); // Log the button element for debugging
			// 		createdby.style.background = "#F26422";
			// 		createdby.removeAttribute('disabled');
			// 	} else {
			// 		console.error("Button element not found"); // Log an error if the button element is not found
			// 	}
			// } else {
			// 	console.log("rowData is null, button will remain disabled");
			// }
		})
		.catch((err) => {
			const response = err.response;
			if (response && response.status === 422) {
				console.log(response.data.message);
			}
		});
	}
	const userload = () => {
		const uniqueNumber = Date.now();
		document.getElementById("rmnumb").value = uniqueNumber;
		document.getElementById("mruser").value = token;
		const today = new Date();
		const formattedDate = today.toISOString().split('T')[0];
		document.getElementById('outdate').min = formattedDate;
	}
	// const loadlisiting = (shpid) => {
	// 	const payload = new FormData();
	// 	payload.append('shpid', shpid);
	// 	axiosClient.post('/get-reqbyId', payload)
	// 	.then(({data}) => {
	// 		setRowData(data.data);
	// 	})
	// 	.catch((err) => {
	// 		const response = err.response;
	// 		if (response && response.status === 422) {
	// 			console.log(response.data.message);
	// 		}
	// 	});
	// }
	const loadlisitingRnmn = (shpid) => {
		const payload = new FormData();
		payload.append('shpid', shpid);
		axiosClient.post('/get-reqbyRNMN', payload)
		.then(({data}) => {
			setRowData(data.data);
		})
		.catch((err) => {
			const response = err.response;
			if (response && response.status === 422) {
				console.log(response.data.message);
			}
		});
	}
	const getCurrentDateTime = () => {
		const currentDate = new Date();
		let hours = currentDate.getHours();
		const minutes = currentDate.getMinutes();
		const ampm = hours >= 12 ? 'PM' : 'AM';
		hours = hours % 12 || 12;
		const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
		const day = currentDate.getDate();
		const month = currentDate.toLocaleString('default', { month: 'short' });
		const year = currentDate.getFullYear();
		const formattedDateTime = `${hours}:${formattedMinutes} ${ampm} ${day} ${month} ${year}`;
		document.getElementById("todaydate").value = formattedDateTime;
	}
	const loadsites = () => {
		axiosClient.get('/get-site')
		.then(({data}) => {
			console.log(data); 
			const jsonData = data.data;
			function createSelect(options) {
				const selectContainer = document.getElementById('site-container');
				selectContainer.innerHTML = "";
					const select = document.createElement('select');
					select.className = `shp2input`;
					select.id = `slctsite`;
					const optionElement = document.createElement('option');
					optionElement.text = "";
					select.appendChild(optionElement);
					options.forEach(option => {
						const optionElement = document.createElement('option');
						optionElement.value = option.id;
						optionElement.text = option.sitename; 
						select.appendChild(optionElement);
					});
					select.addEventListener('change', function() {
						loadaddressbyId(this.value);
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
	const loadaddressbyId = (siteid) => {
		const payload = new FormData();
		payload.append('siteid', siteid);
		axiosClient.post('/get-siteaddressbyId', payload)
		.then(({data}) => {
			console.log(data); 
			const jsonData = data.data[0];
			document.getElementById("destaddress").value = jsonData.sitelocation;
		})
		.catch((err) => {
			document.getElementById("destaddress").value = "";
			const response = err.response;
			if (response && response.status === 422) {
				console.log(response.data.message);
			}
		});
	}
	const loadcompanies = () => {
		axiosClient.get('/get-company')
		.then(({data}) => {
			console.log(data); 
			const jsonData = data.data;
			function createSelect(options) {
				const selectContainer = document.getElementById('company-container');
				selectContainer.innerHTML = "";
					const select = document.createElement('select');
					select.className = `shp2input`;
					select.id = `slctcomp`;
					const optionElement = document.createElement('option');
					optionElement.text = "";
					select.appendChild(optionElement);
					options.forEach(option => {
						const optionElement = document.createElement('option');
						optionElement.value = option.id;
						optionElement.text = option.compname; 
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
	const addrequest = () => {
		console.log("JESS"+rnmnval);
		if(rnmnval == "false"){
			const rmnm = document.getElementById("rmnumb").value;
			const mruser = document.getElementById("mruser").value;
			const slctsite = document.getElementById("slctsite").value;
			const outdate = document.getElementById("outdate").value;
			const ppperson = document.getElementById("ppperson").value;
			const ppnumber = document.getElementById("ppnumber").value;
			const slctcomp = document.getElementById("slctcomp").value;
			const trpmode = document.getElementById("trpmode").value;
			const trpnumber = document.getElementById("trpnumber").value;
			const payload = new FormData();
			payload.append('rmnm', rmnm);
			payload.append('mruser', mruser);
			payload.append('slctsite', slctsite);
			payload.append('outdate', outdate);
			payload.append('ppperson', ppperson);
			payload.append('ppnumber', ppnumber);
			payload.append('slctcomp', slctcomp);
			payload.append('trpmode', trpmode);
			payload.append('trpnumber', trpnumber);
			if(slctsite == ""){
				console.log("Nothing to work on")
			}
			else{
				axiosClient.post('/request-requisition', payload)
				.then(({data}) => {
					console.log(data);
					OpenToneModal();
					storeuserrequisition(rmnm);
					loadwarehouse();
					loadshipmentvalues(0);
					usercontrol(rmnm);
					const createdby = document.getElementById("btncreatedby");
					createdby.style.background = "#F26422";
					createdby.disabled = false;
					setRnmnVal(rmnm);
				})
				.catch((err) => {
					const response = err.response;
					if (response && response.status === 422) {
						console.log(response.data.message);
					}
				});
			}
		}
		else{
			OpenToneModal();
			loadwarehouse();
			loadshipmentvalues(0);
		}
	}
	const loadwarehouse = () => {
		axiosClient.get('/get-warehouse')
		.then(({data}) => {
			console.log(data); 
			const jsonData = data.data; 
			function createSelect(options) {
				const selectContainer = document.getElementById('warehouse-container');
				selectContainer.innerHTML = "";
					const select = document.createElement('select');
					select.className = `shp2input`;
					select.id = `slctwrhs`;
					const optionElement = document.createElement('option');
					optionElement.text = "";
					select.appendChild(optionElement);
					options.forEach(option => {
						const optionElement = document.createElement('option');
						optionElement.value = option.id;
						optionElement.text = option.wrhidname; 
						select.appendChild(optionElement);
					});
					select.addEventListener('change', function() {
						loadshipmentvalues(this.value);
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
	const loadshipmentvalues = (shpid) => {
		const payload = new FormData();
		payload.append('shpid', shpid);
		axiosClient.post('/get-shipmentvaluesbyWH', payload) 
		.then(({data}) => {
			console.log(data); 
			const jsonData = data.data;
			function slctpackingno(options) {
				const selectContainer = document.getElementById('slctpackingno');
				selectContainer.innerHTML = "";
				// if (selectContainer.innerHTML.trim() === '') {
					const select = document.createElement('select');
					select.className = `shp2input`;
					select.id = `packingno`;
					// Loop through the options and create <option> elements
					options.forEach(option => {
						const optionElement = document.createElement('option');
						optionElement.value = option.packingno;
						optionElement.text = option.packingno;
						select.appendChild(optionElement);
					});
					selectContainer.appendChild(select);
				// }
			}
			function slctshpcat(options) {
				const selectContainer = document.getElementById('slctshpcat');
				selectContainer.innerHTML = "";
				// if (selectContainer.innerHTML.trim() === '') {
					const select = document.createElement('select');
					select.className = `shp2input`;
					select.id = `shpcat`;
					// Loop through the options and create <option> elements
					options.forEach(option => {
						const optionElement = document.createElement('option');
						optionElement.value = option.slctcateg;
						optionElement.text = option.categoryname;
						select.appendChild(optionElement);
					});
					selectContainer.appendChild(select);
				// }
			}
			function slctshpsubcat(options) {
				const selectContainer = document.getElementById('slctshpsubcat');
				selectContainer.innerHTML = "";
				// if (selectContainer.innerHTML.trim() === '') {
					const select = document.createElement('select');
					select.className = `shp2input`;
					select.id = `shpsubcat`;
					// Loop through the options and create <option> elements
					options.forEach(option => {
						const optionElement = document.createElement('option');
						optionElement.value = option.slctsubcateg;
						optionElement.text = option.subcategoryname;
						select.appendChild(optionElement);
					});
					selectContainer.appendChild(select);
				// }
			}
			function slctshptype(options) {
				const selectContainer = document.getElementById('slctshptype');
				selectContainer.innerHTML = "";
				// if (selectContainer.innerHTML.trim() === '') {
					const select = document.createElement('select');
					select.className = `shp2input`;
					select.id = `shptype`;
					// Loop through the options and create <option> elements
					options.forEach(option => {
						const optionElement = document.createElement('option');
						optionElement.value = option.slcttype;
						optionElement.text = option.typename;
						select.appendChild(optionElement);
					});
					selectContainer.appendChild(select);
				// }
			}
			function slctshpmatname(options) {
				const selectContainer = document.getElementById('slctshpmatname');
				selectContainer.innerHTML = "";
				// if (selectContainer.innerHTML.trim() === '') {
					const select = document.createElement('select');
					select.className = `shp2input`;
					select.id = `shpmatname`;
					// Loop through the options and create <option> elements
					options.forEach(option => {
						const optionElement = document.createElement('option');
						optionElement.value = option.slctmat;
						optionElement.text = option.materialname;
						select.appendChild(optionElement);
					});
					selectContainer.appendChild(select);
				// }
			}
			slctpackingno(jsonData);
			slctshpcat(jsonData);
			slctshpsubcat(jsonData);
			slctshptype(jsonData);
			slctshpmatname(jsonData);
			// document.getElementById("packingno").value = jsonData.packingno;
			// document.getElementById("shpcat").value = jsonData.categoryname;
			// document.getElementById("shpsubcat").value = jsonData.subcategoryname;
			// document.getElementById("shptype").value = jsonData.typename;
			document.getElementById("shpupdatedqty").value = jsonData[0].total_sn;
			document.getElementById("shppurchase").value = jsonData[0].quantity;
			document.getElementById("shpreceived").value = jsonData[0].receivedqty;
			document.getElementById("shpremaining").value = jsonData[0].remainingqty;
			document.getElementById("shpmatdescription").innerText = jsonData[0].materialdescription;
			document.getElementById("shounit").value = jsonData[0].materialunit;
		})
		.catch((err) => {
			const response = err.response;
			// const quantity = document.getElementById("quantity");
			// quantity.value = "";
			if (response && response.status === 422) {
				console.log(response.data.message);
			}
		});
	}
	const calcaddq = () => {
		const input1Value = document.getElementById('shpreceived').value;
		const input2Value = document.getElementById('shpupdatedqty').value;
		const resultValue = document.getElementById('shpremainingqty');
		const number1 = parseFloat(input1Value);
		const number2 = parseFloat(input2Value);
		if(number2 <= number1){
			if (!isNaN(number1) && !isNaN(number2)) {
				const result = number1 - number2;
				resultValue.value = result;
			}
		}
		else{
			document.getElementById('shpupdatedqty').value = number1;
		}
	}
	const addwhreq = () => {
		const rmnm = document.getElementById("rmnumb").value;
		const slctwrhs = document.getElementById("slctwrhs").value;
		const packingno = document.getElementById("packingno").value;
		const shpcat = document.getElementById("shpcat").value;
		const slctshpsubcat = document.getElementById("shpsubcat").value;
		const shptype = document.getElementById("shptype").value;
		const shpmatname = document.getElementById("shpmatname").value;
		const shppurchase = document.getElementById("shppurchase").value;
		const shpreceived = document.getElementById("shpreceived").value;
		const shpremaining = document.getElementById("shpremaining").value;
		const shounit = document.getElementById("shounit").value;
		const shpupdatedqty = document.getElementById("shpupdatedqty").value;
		const shpremainingqty = document.getElementById("shpremainingqty").value;
		const payload = new FormData();
		payload.append('rmnm', rmnm);
		payload.append('slctwrhs', slctwrhs);
		payload.append('packingno', packingno);
		payload.append('shpcat', shpcat);
		payload.append('slctshpsubcat', slctshpsubcat);
		payload.append('shptype', shptype);
		payload.append('shpmatname', shpmatname);
		payload.append('shppurchase', shppurchase);
		payload.append('shpreceived', shpreceived);
		payload.append('shpremaining', shpremaining);
		payload.append('shounit', shounit);
		payload.append('shpupdatedqty', shpupdatedqty);
		payload.append('shpremainingqty', shpremainingqty);
		axiosClient.post('/add-requisitionlisiting', payload)
		.then(({data}) => {
			console.log(data);
			TonehandleClose();
			// const shpid = data.data;
			loadlisitingRnmn(rmnm);
			// setRowData(data.data);
		})
		.catch((err) => {
			const response = err.response;
			if (response && response.status === 422) {
				console.log(response.data.message);
			}
		});
	}
	const storeuserrequisition = (rmnm) =>{
		const payload = new FormData();
		payload.append('rmnm', rmnm);
		axiosClient.post('/add-userreq', payload)
		.then(({data}) => {
			console.log(data); 
		})
		.catch((err) => {
			const response = err.response;
			if (response && response.status === 422) {
				console.log(response.data.message);
			}
		});
	}
	const addsn = (lsid) => {
		loadserials();
		setLsid(lsid);
		OpenSerialModal();
	}
	const storesn = () => {
		const checkboxes = document.querySelectorAll('#serialtable input[type="checkbox"]');
		const selectedCheckboxes = [];
		checkboxes.forEach(function(checkbox) {
			if (checkbox.checked) {
				selectedCheckboxes.push(checkbox.value);
			}
		});
		const payload = new FormData();
		payload.append('lsid', lssid);
		payload.append('selectedCheckboxes', selectedCheckboxes);
		axiosClient.post('/update-lisitingsn', payload)
		.then(({data}) => {
			console.log(data);
			// const shpid = data.data;
			// loadlisiting(shpid.id);
			loadlisitingRnmn(rnmnval);
			setSerialModal();
		})
		.catch((err) => {
			const response = err.response;
			if (response && response.status === 422) {
				console.log(response.data.message);
			}
		});
	}
	const loadserials = () => {
		axiosClient.get('/get-allsn')
		.then(({data}) => {
			console.log(data); 
			setSerialData(data.data);
		})
		.catch((err) => {
			const response = err.response;
			if (response && response.status === 422) {
				console.log(response.data.message);
			}
		});
	}
	const createdbyuser = () => {
		const payload = new FormData();
		payload.append('email', token);
		payload.append('rmnm', rnmnval);
		axiosClient.post('/update-userreq', payload)
		.then(({data}) => {
			console.log(data);
			usercontrol(rnmnval);
		})
		.catch((err) => {
			const response = err.response;
			if (response && response.status === 422) {
				console.log(response.data.message);
			}
		});
	}
	return (
		<>
		<div className="container">
					<div className="row  mb-5 pt-3 pb-3" style={{background: "#9e9e9e"}}>
						<div className="col-lg-4 col-md-4 col-sm-12">
							<h3 style={{color: "#000", marginTop: "20px"}}>Material Requistion (MR)</h3>
						</div>
						<div className="col-lg-2 col-md-2 col-sm-12">
							<h5 style={{color: "#000", marginTop: "25px"}}>P25 project</h5>
						</div>
						<div className="col-lg-3 col-md-3 col-sm-12">
							<h5 className="h5heading">RM Number</h5>
							<input type="text" id="rmnumb" placeholder="xxxxx" className="shp2input" readOnly/>
						</div>
						<div className="col-lg-3 col-md-3 col-sm-12">
							<h5 className="h5heading">Created By</h5>
							<input type="text" id="mruser" placeholder="User" className="shp2input" readOnly/>
						</div>
					</div>
					<div className="row  mb-3">
						<div className="col-lg-3 col-md-3 col-sm-12">
							<h5 className="h5heading">Time & Date</h5>
							<input type="text" id="todaydate" placeholder="xxxxx" className="shp2input" readOnly/>
						</div>
						<div className="col-lg-3 col-md-3 col-sm-12">
							<h5 className="h5heading">Site Name</h5>
							<div id="site-container"></div>
						</div>
						<div className="col-lg-4 col-md-4 col-sm-12">
							<h5 className="h5heading">Destination Address</h5>
							<input type="text" id="destaddress" className="shp2input" readOnly/>
						</div>
						<div className="col-lg-2 col-md-2 col-sm-12">
							<h5 className="h5heading">Outbound Date</h5>
							<input type="date" id="outdate" className="shp2input"/>
						</div>
					</div>
					<div className="row  mb-3">
						<div className="col-lg-2 col-md-2 col-sm-12">
							<h5 className="h5heading">Pick-up Person</h5>
							<input type="text" id="ppperson" placeholder="xxxxx" className="shp2input"/>
						</div>
						<div className="col-lg-3 col-md-3 col-sm-12">
							<h5 className="h5heading">Pick-up Person Number</h5>
							<input type="text" id="ppnumber" placeholder="xxxxx" className="shp2input"/>
						</div>
						<div className="col-lg-3 col-md-3 col-sm-12">
							<h5 className="h5heading">Receiver Company</h5>
							<div id="company-container"></div>
						</div>
						<div className="col-lg-2 col-md-2 col-sm-12">
							<h5 className="h5heading">Transport Mode</h5>
							<input type="text" id="trpmode" placeholder="User" className="shp2input"/>
						</div>
						<div className="col-lg-2 col-md-2 col-sm-12">
							<h5 className="h5heading">Transport Number</h5>
							<input type="text" id="trpnumber" placeholder="User" className="shp2input"/>
						</div>
					</div>
					<hr />
				{rowData && (
					<div className="mt-5 mb-3">
						<table className="shipmenttable">
						<tr>
							<th>SL No</th>
							<th>Packing No.</th>
							<th>Material Component</th>
							<th>Material Description</th>
							<th>Material Type</th>
							<th>Material S/N</th>
							<th>Unit</th>
							<th>Quantity</th>
							<th>Remark</th>
						</tr>
						{rowData.map((row, index) => (
							<tr key={row.id}>
								<td>{index + 1}</td>
								<td>{row.packingno}</td>
								<td>{row.materialname}</td>
								<td>{row.materialdesc}</td>
								<td>{row.typename}</td>
								{row.addsl ? (
									<td>{row.addsl}</td>
								) : (
									<td>
										<button className="categbtn" onClick={() => addsn(row.id)} style={{width: "80%"}}>Add S/N</button>
									</td>
								)}
								<td>{row.unit}</td>
								<td>{row.addqty}</td>
								<td></td>
							</tr>
						))}
						</table>
					</div>
				)}
					<div className="row">
						<div className="col-lg-2 col-md-2 col-sm-12">
							<button className="categbtn" onClick={addrequest}>Add Material</button>
						</div>
					</div>
				<div className="row" style={{marginTop: "100px"}}>
					<div className="col-lg-3 col-md-3 col-sm-3">
							<h5 className="h5heading">MR Creator By: TVN POC</h5>
							<div id="mrcreatedby">
							<button className="categbtn" style={{background: "grey"}} id="btncreatedby" onClick={createdbyuser}>Submit</button>
							</div>
					</div>
					<div className="col-lg-3 col-md-3 col-sm-3">
							<h6 className="h5heading">S/R Creator By: WH Team (Proj & TVN)</h6>
							<div id="sncreatedby">
							<button className="categbtn" disabled style={{background: "grey"}} id="btnsnby">Submit</button>
							</div>
					</div>
					<div className="col-lg-3 col-md-3 col-sm-3">
					</div>
					<div className="col-lg-3 col-md-3 col-sm-3">
							<h5 className="h5heading" style={{visibility: "hidden"}}>S/R Creator By: TVN Head</h5>
							<button className="categbtn" disabled style={{background: "grey"}}>Print</button>
					</div>
				</div>
				<div className="row" style={{marginTop: "100px", marginBottom: "100px"}}>
					<div className="col-lg-3 col-md-3 col-sm-3">
							<h5 className="h5heading">Checked By: TVN PM</h5>
							<div className="row">
								<div className="col-lg-6"><button className="categbtn" disabled style={{background: "grey"}}>Submit</button></div>
								<div className="col-lg-6"><button className="categbtn" disabled style={{background: "red"}}>Reject</button></div>
							</div>
					</div>
					<div className="col-lg-3 col-md-3 col-sm-3">
							<h5 className="h5heading">Accepted By: TVN Head</h5>
							<div className="row">
								<div className="col-lg-6"><button className="categbtn" disabled style={{background: "grey"}}>Submit</button></div>
								<div className="col-lg-6"><button className="categbtn" disabled style={{background: "red"}}>Reject</button></div>
							</div>
					</div>
					<div className="col-lg-3 col-md-3 col-sm-3">
							<h5 className="h5heading">Review By: Purchaser POC</h5>
							<div className="row">
								<div className="col-lg-6"><button className="categbtn" disabled style={{background: "grey"}}>Submit</button></div>
								<div className="col-lg-6"><button className="categbtn" disabled style={{background: "red"}}>Reject</button></div>
							</div>
					</div>
					<div className="col-lg-3 col-md-3 col-sm-3">
							<h5 className="h5heading">Approved By: Purchaser PM</h5>
							<div className="row">
								<div className="col-lg-6"><button className="categbtn" disabled style={{background: "grey"}}>Submit</button></div>
								<div className="col-lg-6"><button className="categbtn" disabled style={{background: "red"}}>Reject</button></div>
							</div>
					</div>
				</div>
				<div className="row" style={{marginTop: "150px", marginBottom: "100px"}}>
					<div className="col-lg-3 col-md-3 col-sm-3">
							<h5 className="h6heading">MR Received By TVN WH ------/------/202</h5>
							<h5 className="h6heading">Name: ___________________________</h5>
							<h5 className="h6heading">Contact No: ______________________</h5>
							<h5 className="h6heading">Email: ___________________________</h5>
							<h5 className="h6heading">Track No: ________________________</h5>
					</div>
					<div className="col-lg-3 col-md-3 col-sm-3">
							<h5 className="h6heading">MR Checked By Purchaser ------/------/202</h5>
							<h5 className="h6heading">Name: ___________________________</h5>
							<h5 className="h6heading">Contact No: ______________________</h5>
							<h5 className="h6heading">Email: ___________________________</h5>
							<h5 className="h6heading">Track No: ________________________</h5>
					</div>
					<div className="col-lg-3 col-md-3 col-sm-3">
							<h5 className="h6heading">Handover By ------/------/202</h5>
							<h5 className="h6heading">Name: ___________________________</h5>
							<h5 className="h6heading">Contact No: ______________________</h5>
							<h5 className="h6heading">Email: ___________________________</h5>
							<h5 className="h6heading">Track No: ________________________</h5>
					</div>
					<div className="col-lg-3 col-md-3 col-sm-3">
							<h5 className="h6heading">Received By ------/------/202</h5>
							<h5 className="h6heading">Name: ___________________________</h5>
							<h5 className="h6heading">Contact No: ______________________</h5>
							<h5 className="h6heading">Email: ___________________________</h5>
							<h5 className="h6heading">Track No: ________________________</h5>
					</div>
				</div>
			<Modal show={toneModal} centered onHide={TonehandleClose} data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true" className="modal-lg">
				<Modal.Header>
					<button id="closemodal" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
						onClick={TonehandleClose}
					></button>
				</Modal.Header>
				<Modal.Body>
				
				<div className="row  mb-3">
						<div className="col-lg-6 col-md-6 col-sm-12">
							<h6 className="h5heading">Warehouse</h6>
							<div id="warehouse-container"></div>
						</div>
						<div className="col-lg-6 col-md-6 col-sm-12">
							<h6 className="h5heading">Packing/Box No.</h6>
							<div id="slctpackingno" >
								<select name="" id="" className="shp2input">
								</select>
							</div>
						</div>
					</div>
					<div className="row  mb-3">
						<div className="col-lg-6 col-md-6 col-sm-12">
							<h6 className="h5heading">Category</h6>
							<div id="slctshpcat" >
								<select name="" id="" className="shp2input">
								</select>
							</div>
						</div>
						<div className="col-lg-6 col-md-6 col-sm-12">
							<h6 className="h5heading">Sub Category</h6>
							<div id="slctshpsubcat" >
								<select name="" id="" className="shp2input">
								</select>
							</div>
						</div>
					</div>
					<div className="row  mb-3">
						<div className="col-lg-12 col-md-12 col-sm-12">
							<h6 className="h5heading">Material Type</h6>
							<div id="slctshptype" >
								<select name="" id="" className="shp2input">
								</select>
							</div>
						</div>
					</div>
					<div className="row  mb-3">
						<div className="col-lg-12 col-md-12 col-sm-12">
							<h6 className="h5heading">Material Component</h6>
							<div id="slctshpmatname" >
								<select name="" id="" className="shp2input">
								</select>
							</div>
						</div>
					</div>
					<div className="row  mb-3">
						<div className="col-lg-4 col-md-4 col-sm-12">
							<h6 className="h5heading">Purchased Quantity</h6>
							<input type="text" id="shppurchase" className="shp2input" readOnly/>
						</div>
						<div className="col-lg-4 col-md-4 col-sm-12">
							<h6 className="h5heading">Received Quantity</h6>
							<input type="text" id="shpreceived" className="shp2input" readOnly/>
						</div>
						<div className="col-lg-4 col-md-4 col-sm-12">
							<h6 className="h5heading">Remaining Quantity</h6>
							<input type="text" id="shpremaining" className="shp2input" readOnly/>
						</div>
					</div>
					<div className="row  mb-3">
						<div className="col-lg-12 col-md-12 col-sm-12">
							<h6 className="h5heading">Material Description</h6>
							<textarea id="shpmatdescription" rows="10" className="shp2input" readOnly></textarea>
						</div>
					</div>
					<div className="row  mb-3">
						<div className="col-lg-4 col-md-4 col-sm-12">
							<h6 className="h5heading">Unit</h6>
							<input type="text" id="shounit" className="shp2input" readOnly/>
						</div>
						<div className="col-lg-4 col-md-4 col-sm-12">
							<h6 className="h5heading">Add Quantity</h6>
							<input type="text" id="shpupdatedqty" className="shp2input" onInput={calcaddq}/>
						</div>
						<div className="col-lg-4 col-md-4 col-sm-12">
							<h6 className="h5heading">Remaining  Quantity</h6>
							<input type="text" id="shpremainingqty" className="shp2input" readOnly/>
						</div>
					</div>
					<div className="row mt-5">
						<div className="col-lg-2 col-md-2 col-sm-12">
						<button className="categbtn" id="categbtn" onClick={addwhreq}>Add</button>
						</div>
					</div>
				</Modal.Body>
			</Modal>
			<Modal show={serialModal} centered onHide={SerialhandleClose} data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true" className="modal-lg">
				<Modal.Header>
					<button id="closemodal" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
						onClick={SerialhandleClose}
					></button>
				</Modal.Header>
				<Modal.Body>
					<div className="row  mb-3">
						
				{serialData && (
					<div className="mt-5 mb-3">
						<input type="text"style={{display: "none"}} value={lssid}/>
						<table className="shipmenttable" id="serialtable">
						<tr>
							<th>SL No</th>
							<th>Select</th>
							<th>Serial Number</th>
						</tr>
						{serialData.map((row, index) => (
							<tr key={row.id}>
								<td>{index + 1}</td>
								<td><input type="checkbox" value={row.serial} /></td>
								<td>{row.serial}</td>
							</tr>
						))}
						</table>
					</div>
				)}
					</div>
					<div className="row mt-5">
						<div className="col-lg-2 col-md-2 col-sm-12">
						<button className="categbtn" id="categbtn" onClick={storesn}>Add</button>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</div>	
		</>
	)
}