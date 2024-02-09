import { useEffect, useState } from "react";
import axiosClient from '../../../axios-client';
import { useStateContext } from "../../contexts/ContextProvider";
import { Modal } from 'react-bootstrap';

export default function RecreateRequisition(){
	const [serialModal, setSerialModal] = useState(false);
	const [rejectModal, setRejectModal] = useState(false);
	const [toneModal, setToneModal] = useState(false);
	const [lssid, setLsid] = useState("false");
	const [listid, setlistid] = useState(null);
	const [rowData, setRowData] = useState(null);
	const [topid, setTopid] = useState(null);
	const [serialData, setSerialData] = useState(null);
	const SerialhandleClose = () =>{
		setSerialModal(false);
	}
	const OpenToneModal = () =>{
		setToneModal(true);
	}
	const TonehandleClose = () =>{
		setToneModal(false);
	}
	const OpenSerialModal = () =>{
		setSerialModal(true);
	}
	const RejecthandleClose = () =>{
		setRejectModal(false);
	}
	const OpenRejectModal = () =>{
		setRejectModal(true);
	}
    const {token} = useStateContext();
	useEffect(() => {
		userload();
		getCurrentDateTime();
		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);
		const id = urlParams.get('id');
		setTopid(id);
		usercontrol(id);
		loadlisitingRnmn(id);
		document.getElementById("mainheadingtt").innerText = "Update Material Requisition";
		document.getElementById("checkedby").disabled = "true";
		document.getElementById("checkedbyrjct").disabled = "true";
		document.getElementById("accpetedby").disabled = "true";
		document.getElementById("acceptedbyrjct").disabled = "true";
		document.getElementById("reviewby").disabled = "true";
		document.getElementById("reviewbyrjct").disabled = "true";
		document.getElementById("approveby").disabled = "true";
		document.getElementById("approvebyrjct").disabled = "true";
		// checkbyuser(token);
	}, []);
	const usercontrol = (rmnm) => {
		const payload = new FormData();
		payload.append('rmnm', rmnm);
		axiosClient.post('/check-usercontrol', payload)
		.then(({data}) => {
			const jsonData = data.data[0];
			if(jsonData.approvedby !== null){
				const firin = document.getElementById("approvebywhole");
				firin.innerHTML = "";
				firin.innerHTML = jsonData.approvedby;
			}
			if(jsonData.acceptedby !== null){
				const firin = document.getElementById("accptbywhole");
				firin.innerHTML = "";
				firin.innerHTML = jsonData.acceptedby;
				const createdby = document.getElementById("reviewby");
				const createdby2 = document.getElementById("reviewbyrjct");
				// createdby.style.background = "#F26422";
				createdby.disabled = true;
				createdby2.disabled = true;
			}
			if(jsonData.reviewby !== null){
				const firin = document.getElementById("rvwbywhole");
				firin.innerHTML = "";
				firin.innerHTML = jsonData.reviewby;
				const createdby = document.getElementById("approveby");
				const createdby2 = document.getElementById("approvebyrjct");
				// createdby.style.background = "#F26422";
				createdby.disabled = true;
				createdby2.disabled = true;
			}
			if(jsonData.mrcreatedby !== null){
				const firin = document.getElementById("mrcreatedby");
				firin.innerHTML = "";
				firin.innerHTML = jsonData.mrcreatedby;
			}
			if(jsonData.sncreatedby !== null){
				const firin = document.getElementById("sncreatedby");
				firin.innerHTML = "";
				firin.innerHTML = jsonData.sncreatedby;
				const createdby = document.getElementById("checkedby");
				const createdby2 = document.getElementById("checkedbyrjct");
				// createdby.style.background = "#F26422";
				createdby.disabled = true;
				createdby2.disabled = true;
			}
			if(jsonData.checkedby !== null){
				const firin = document.getElementById("checkbywhole");
				firin.innerHTML = "";
				firin.innerHTML = jsonData.checkedby;
				const createdby = document.getElementById("accpetedby");
				const createdby2 = document.getElementById("acceptedbyrjct");
				// createdby.style.background = "#F26422";
				createdby.disabled = true;
				createdby2.disabled = true;
			}
		})
		.catch((err) => {
			const response = err.response;
			if (response && response.status === 422) {
				console.log(response.data.message);
			}
		});
	}
	const userload = () => {
		// const uniqueNumber = Date.now();
		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);
		const id = urlParams.get('id');
		document.getElementById("rmnumb").value = id;
		const today = new Date();
		const formattedDate = today.toISOString().split('T')[0];
		document.getElementById('outdate').min = formattedDate;
	}
	const loadlisitingRnmn = (shpid) => {
		const payload = new FormData();
		payload.append('shpid', shpid);
		axiosClient.post('/get-reqbyRNMN', payload)
		.then(({data}) => {
			const jsonData = data.data[0];
			document.getElementById("site-container").value = jsonData.sitename;
			document.getElementById("company-container").value = jsonData.compname;
			document.getElementById("destaddress").value = jsonData.sitelocation;
			document.getElementById("outdate").value = jsonData.outbound;
			document.getElementById("ppperson").value = jsonData.ppperson;
			document.getElementById("ppnumber").value = jsonData.ppnumber;
			document.getElementById("trpmode").value = jsonData.trsmode;
			document.getElementById("trpnumber").value = jsonData.trsnumber;
			document.getElementById("mruser").value = jsonData.created_by;
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
	const addsn = (lsid, matid) => {
		loadserials(matid);
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
			loadlisitingRnmn(topid);
			setSerialModal();
			checkuserrole(token);
		})
		.catch((err) => {
			const response = err.response;
			if (response && response.status === 422) {
				console.log(response.data.message);
			}
		});
	}
	const checkuserrole = (email) => {
		const payload = new FormData();
		payload.append('email', email);
		axiosClient.post('/check-userauth', payload)
		.then(({data}) => {
			console.log(data);
			if(data.data.msn == 1){
				const table = document.getElementById("mrreqtable");
				let hasButton = false;
				for (let i = 0; i < table.rows.length; i++) {
					const td = table.rows[i].cells[5]; 
					if (td.querySelector("button")) {
						hasButton = true;
						break;
					}
				}
				if (hasButton) {
					console.log("Yes");
				} else {
					const createdby = document.getElementById("btnsnby");
					createdby.style.background = "#F26422";
					createdby.disabled = false;
				}
			}
		})
		.catch((err) => {
			const response = err.response;
			if (response && response.status === 422) {
				console.log(response.data.message);
			}
		});
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
						loadpackingno(this.value);
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
	const loadpackingno = (shpid) => {
		const payload = new FormData();
		payload.append('shpid', shpid);
		axiosClient.post('/get-packingvaluesbyWH', payload) 
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
					const optionElement = document.createElement('option');
					optionElement.text = "";
					select.appendChild(optionElement);
					// Loop through the options and create <option> elements
					options.forEach(option => {
						const optionElement = document.createElement('option');
						optionElement.value = option;
						optionElement.text = option;
						select.appendChild(optionElement);
					});
					select.addEventListener('change', function() {
						loadvaluesbypacking(this.value);
					});
					selectContainer.appendChild(select);
				// }
			}
			slctpackingno(jsonData);
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
	const loadvaluesbypacking = (packid) => {
		const payload = new FormData();
		payload.append('packid', packid);
		axiosClient.post('/get-valuesbypack', payload) 
		.then(({data}) => {
			console.log(data); 
			const jsonData = data.data;
			function slctshpcat(options) {
				const selectContainer = document.getElementById('slctshpcat');
				selectContainer.innerHTML = "";
				const uniqueValues = new Set();
					const select = document.createElement('select');
					select.className = `shp2input`;
					select.id = `shpcat`;
					const optionElement = document.createElement('option');
					optionElement.text = "";
					select.appendChild(optionElement);
					// Loop through the options and create <option> elements
					options.forEach(option => {
						if (!uniqueValues.has(option.slctcateg)) {
							const optionElement = document.createElement('option');
							optionElement.value = option.slctcateg;
							optionElement.text = option.categoryname;
							select.appendChild(optionElement);
							uniqueValues.add(option.slctcateg);
						}
					});
					select.addEventListener('change', function() {
						loadsubcategories(this.value);
					});
					selectContainer.appendChild(select);
			}
			function slctshptype(options) {
				const selectContainer = document.getElementById('slctshptype');
				selectContainer.innerHTML = "";
				const uniqueValues = new Set();
					const select = document.createElement('select');
					select.className = `shp2input`;
					select.id = `shptype`;
					const optionElement = document.createElement('option');
					optionElement.text = "";
					select.appendChild(optionElement);
					// Loop through the options and create <option> elements
					options.forEach(option => {
						if (!uniqueValues.has(option.slcttype)) {
							const optionElement = document.createElement('option');
							optionElement.value = option.slcttype;
							optionElement.text = option.typename;
							select.appendChild(optionElement);
							uniqueValues.add(option.slcttype);
						}
					});
					selectContainer.appendChild(select);
			}
			function slctshpmatname(options) {
				const selectContainer = document.getElementById('slctshpmatname');
				selectContainer.innerHTML = "";
				// if (selectContainer.innerHTML.trim() === '') {
					const select = document.createElement('select');
					select.className = `shp2input`;
					select.id = `shpmatname`;
					const optionElement = document.createElement('option');
					optionElement.text = "";
					select.appendChild(optionElement);
					// Loop through the options and create <option> elements
					options.forEach(option => {
						const optionElement = document.createElement('option');
						optionElement.value = option.slctmat;
						optionElement.text = option.materialname;
						select.appendChild(optionElement);
					});
					select.addEventListener('change', function() {
						loadmatvalues(this.value);
					});
					selectContainer.appendChild(select);
				// }
			}
			slctshptype(jsonData);
			slctshpcat(jsonData);
			slctshpmatname(jsonData);
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
	const loadsubcategories = (categid) => {
		const payload = new FormData();
		payload.append('categid', categid);
		axiosClient.post('/get-subcategory', payload)
		.then(({data}) => {
			console.log(data); 
			const jsonData = data.data;
			function createSelect(options) {
				const selectContainer = document.getElementById('slctshpsubcat');
				selectContainer.innerHTML = "";
				// if (selectContainer.innerHTML.trim() === '') {
					const select = document.createElement('select');
					select.className = `shp2input`;
					select.id = `slctsubcateg`;
					// Loop through the options and create <option> elements
					options.forEach(option => {
						const optionElement = document.createElement('option');
						optionElement.value = option.id;
						optionElement.text = option.name;
						select.appendChild(optionElement);
					});
					selectContainer.appendChild(select);
				// }
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
	const loadmatvalues = (matid) => {
		const payload = new FormData();
		payload.append('matid', matid);
		axiosClient.post('/get-matvalbypack', payload)
		.then(({data}) => {
			const jsonData = data.data;
			document.getElementById("shpupdatedqty").value = jsonData[0].total_sn;
			document.getElementById("shppurchase").value = jsonData[0].quantity;
			document.getElementById("shpreceived").value = jsonData[0].receivedqty;
			document.getElementById("shpremaining").value = jsonData[0].remainingqty;
			document.getElementById("shpmatdescription").innerText = jsonData[0].materialdescription;
			document.getElementById("shounit").value = jsonData[0].materialunit;
			const rmval = document.getElementById("shpremainingqty");
			const number1 = parseFloat(jsonData[0].receivedqty);
			const number2 = parseFloat(jsonData[0].total_sn);
			if(number2 <= number1){
				if (!isNaN(number1) && !isNaN(number2)) {
					const result = number1 - number2;
					if(number2 == 0){
						rmval.value = "";
					}
					else{
						rmval.value = result;
					}
					
				}
			}
			
		})
		.catch((err) => {
			const response = err.response;
			if (response && response.status === 422) {
				console.log(response.data.message);
			}
		});

	}
	// const calcaddq = () => {
	// 	const input1Value = document.getElementById('shpreceived').value;
	// 	const input2Value = document.getElementById('shpupdatedqty').value;
	// 	const resultValue = document.getElementById('shpremainingqty');
	// 	const number1 = parseFloat(input1Value);
	// 	const number2 = parseFloat(input2Value);
	// 	if(number2 <= number1){
	// 		if (!isNaN(number1) && !isNaN(number2)) {
	// 			const result = number1 - number2;
	// 			resultValue.value = result;
	// 		}
	// 	}
	// 	else{
	// 		document.getElementById('shpupdatedqty').value = number1;
	// 	}
	// }
	const loadserials = (matid) => {
		const payload = new FormData();
		payload.append('matid', matid);
		console.log("fields"+matid);
		axiosClient.post('/get-allsnbyMat', payload)
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
	const snbyuser = () => {
		const payload = new FormData();
		payload.append('email', token);
		payload.append('rmnm', topid);
		axiosClient.post('/update-SNuserreq', payload)
		.then(({data}) => {
			console.log(data);
			const queryString = window.location.search;
			const urlParams = new URLSearchParams(queryString);
			const id = urlParams.get('id');
			usercontrol(id);
		})
		.catch((err) => {
			const response = err.response;
			if (response && response.status === 422) {
				console.log(response.data.message);
			}
		});
	}
	const chckbyuser = () => {
		const payload = new FormData();
		payload.append('email', token);
		payload.append('rmnm', topid);
		axiosClient.post('/update-Chuserreq', payload)
		.then(({data}) => {
			console.log(data);
			const queryString = window.location.search;
			const urlParams = new URLSearchParams(queryString);
			const id = urlParams.get('id');
			usercontrol(id);
		})
		.catch((err) => {
			const response = err.response;
			if (response && response.status === 422) {
				console.log(response.data.message);
			}
		});
	}
	const accpkbyuser = () => {
		const payload = new FormData();
		payload.append('email', token);
		payload.append('rmnm', topid);
		axiosClient.post('/update-Accuserreq', payload)
		.then(({data}) => {
			console.log(data);
			const queryString = window.location.search;
			const urlParams = new URLSearchParams(queryString);
			const id = urlParams.get('id');
			usercontrol(id);
		})
		.catch((err) => {
			const response = err.response;
			if (response && response.status === 422) {
				console.log(response.data.message);
			}
		});
	}
	const reviewbyuser = () => {
		const payload = new FormData();
		payload.append('email', token);
		payload.append('rmnm', topid);
		axiosClient.post('/update-Rvwuserreq', payload)
		.then(({data}) => {
			console.log(data);
			const queryString = window.location.search;
			const urlParams = new URLSearchParams(queryString);
			const id = urlParams.get('id');
			usercontrol(id);
		})
		.catch((err) => {
			const response = err.response;
			if (response && response.status === 422) {
				console.log(response.data.message);
			}
		});
	}
	const Approvebyuser = () => {
		const payload = new FormData();
		payload.append('email', token);
		payload.append('rmnm', topid);
		axiosClient.post('/update-Appruserreq', payload)
		.then(({data}) => {
			console.log(data);
			const queryString = window.location.search;
			const urlParams = new URLSearchParams(queryString);
			const id = urlParams.get('id');
			usercontrol(id);
		})
		.catch((err) => {
			const response = err.response;
			if (response && response.status === 422) {
				console.log(response.data.message);
			}
		});
	}
	const rejectthis = () => {
		const rejectnote = document.getElementById("rejectnote").value;
		const payload = new FormData();
		payload.append('email', token);
		payload.append('rmnm', topid);
		payload.append('rejectnote', rejectnote);
		axiosClient.post('/reject-req', payload)
		.then(({data}) => {
			console.log(data);
			RejecthandleClose();
			window.location.href = "/update-requisition";
		})
		.catch((err) => {
			const response = err.response;
			if (response && response.status === 422) {
				console.log(response.data.message);
			}
		});
	}
	const SearchTable = () => {
		var input, filter, table, tr, td, i, txtValue;
		input = document.getElementById("searchinput");
		filter = input.value.toUpperCase();
		table = document.getElementById("serialtable");
		tr = table.getElementsByTagName("tr");
		for (i = 0; i < tr.length; i++) {
			td = tr[i].getElementsByTagName("td")[2];
			if (td) {
			txtValue = td.textContent || td.innerText;
			if (txtValue.toUpperCase().indexOf(filter) > -1) {
				tr[i].style.display = "";
			} else {
				tr[i].style.display = "none";
			}
			}       
		}
	}
	const updatereqlist = (reqlid) => {
		setlistid(reqlid);
		OpenToneModal();
		loadwarehouse();
	}
	const updatewhreq = () => {
			const slctwrhs = document.getElementById("slctwrhs").value;
			const packingno = document.getElementById("packingno").value;
			const shpcat = document.getElementById("shpcat").value;
			const slctshpsubcat = document.getElementById("slctsubcateg").value;
			const shptype = document.getElementById("shptype").value;
			const shpmatname = document.getElementById("shpmatname").value;
			const shppurchase = document.getElementById("shppurchase").value;
			const shpreceived = document.getElementById("shpreceived").value;
			const shpremaining = document.getElementById("shpremaining").value;
			const shounit = document.getElementById("shounit").value;
			const shpupdatedqty = document.getElementById("shpupdatedqty").value;
			const shpremainingqty = document.getElementById("shpremainingqty").value;
			const payload = new FormData();
			payload.append('listid', listid);
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
			axiosClient.post('/update-requisitionlisiting', payload)
			.then(({data}) => {
				console.log(data);
				TonehandleClose();
				loadlisitingRnmn(topid);
			})
			.catch((err) => {
				const response = err.response;
				if (response && response.status === 422) {
					console.log(response.data.message);
				}
			});
	}
	const updaterequest = () => {
		const payload = new FormData();
		payload.append('topid', topid);
		axiosClient.post('/update-requisitionwhole', payload)
			.then(({data}) => {
				console.log(data);
				window.location.href = "/update-requisition";
			})
			.catch((err) => {
				const response = err.response;
				if (response && response.status === 422) {
					console.log(response.data.message);
				}
			});
	}
	const delcat = (catid) => {
		const confirmed = window.confirm('Are you sure you want to delete?');
		if (confirmed) {
			const payload = new FormData();
				payload.append('categid', catid);
				axiosClient.post('/delete-rqlisting', payload)
				.then(({data}) => {
					console.log(data);
					loadlisitingRnmn(topid);
				})
				.catch((err) => {
					alert("There's an issue in deleting!");
					const response = err.response;
					if (response && response.status === 422) {
						console.log(response.data.message);
					}
			});
		}
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
							<input type="text" id="site-container" className="shp2input"  readOnly/>
						</div>
						<div className="col-lg-4 col-md-4 col-sm-12">
							<h5 className="h5heading">Destination Address</h5>
							<input type="text" id="destaddress" className="shp2input" readOnly/>
						</div>
						<div className="col-lg-2 col-md-2 col-sm-12">
							<h5 className="h5heading">Outbound Date</h5>
							<input type="text" id="outdate" className="shp2input" readOnly/>
						</div>
					</div>
					<div className="row  mb-3">
						<div className="col-lg-2 col-md-2 col-sm-12">
							<h5 className="h5heading">Pick-up Person</h5>
							<input type="text" id="ppperson" placeholder="xxxxx" className="shp2input" readOnly/>
						</div>
						<div className="col-lg-3 col-md-3 col-sm-12">
							<h5 className="h5heading">Pick-up Person Number</h5>
							<input type="text" id="ppnumber" placeholder="xxxxx" className="shp2input" readOnly/>
						</div>
						<div className="col-lg-3 col-md-3 col-sm-12">
							<h5 className="h5heading">Receiver Company</h5>
							<input type="text" id="company-container" className="shp2input" readOnly />
						</div>
						<div className="col-lg-2 col-md-2 col-sm-12">
							<h5 className="h5heading">Transport Mode</h5>
							<input type="text" id="trpmode" placeholder="User" className="shp2input" readOnly/>
						</div>
						<div className="col-lg-2 col-md-2 col-sm-12">
							<h5 className="h5heading">Transport Number</h5>
							<input type="text" id="trpnumber" placeholder="User" className="shp2input" readOnly/>
						</div>
					</div>
					<hr />
				{rowData && (
					<div className="mt-5 mb-3">
						<table className="shipmenttable2" id="mrreqtable">
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
							<th>Update</th>
							<th>Action</th>
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
										<button className="categbtn" onClick={() => addsn(row.id, row.matid)} style={{width: "80%"}}>Add S/N</button>
									</td>
								)}
								<td>{row.unit}</td>
								<td>{row.addqty}</td>
								<td></td>
								<td><button className="categbtn" onClick={() => updatereqlist(row.id)} style={{width: "80%"}}>Update</button></td>
								<td><button onClick={() => delcat(row.id)} className="btn btn-danger" style={{width: "20px", height: "28px"}}><i className="bx bx-x"></i></button></td>
							</tr>
						))}
						</table>
					</div>
				)}
				<div className="row">
					<div className="col-lg-2 col-md-2 col-sm-12">
						<button className="categbtn" onClick={updaterequest}>Send Material Request</button>
					</div>
				</div>
				<div className="row" style={{marginTop: "100px"}}>
					<div className="col-lg-3 col-md-3 col-sm-3">
							<h5 className="h5heading">MR Creator By: TVN POC</h5>
							<div id="mrcreatedby">
							<button className="categbtn" style={{background: "grey"}} id="btncreatedby">Submit</button>
							</div>
					</div>
					<div className="col-lg-3 col-md-3 col-sm-3">
							<h6 className="h5heading">S/R Creator By:  WH Team (Proj & TVN)</h6>
							<div id="sncreatedby">
							<button className="categbtn" style={{background: "grey"}} id="btnsnby" onClick={snbyuser}>Submit</button>
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
							<div id="checkbywhole">
							<div className="row">
								<div className="col-lg-6"><button className="categbtn" style={{background: "grey"}} id="checkedby" onClick={chckbyuser}>Submit</button></div>
								<div className="col-lg-6"><button className="categbtn" style={{background: "red"}} id="checkedbyrjct" onClick={OpenRejectModal}>Reject</button></div>
							</div>
							</div>
					</div>
					<div className="col-lg-3 col-md-3 col-sm-3">
							<h5 className="h5heading">Accepted By: TVN Head</h5>
							<div id="accptbywhole">
							<div className="row">
								<div className="col-lg-6"><button className="categbtn" style={{background: "grey"}} id="accpetedby" onClick={accpkbyuser}>Submit</button></div>
								<div className="col-lg-6"><button className="categbtn" style={{background: "red"}} id="acceptedbyrjct" onClick={OpenRejectModal}>Reject</button></div>
							</div>
							</div>
					</div>
					<div className="col-lg-3 col-md-3 col-sm-3">
							<h5 className="h5heading">Review By: Purchaser POC</h5>
							<div id="rvwbywhole">
							<div className="row">
								<div className="col-lg-6"><button className="categbtn" style={{background: "grey"}} id="reviewby" onClick={reviewbyuser}>Submit</button></div>
								<div className="col-lg-6"><button className="categbtn" style={{background: "red"}} id="reviewbyrjct" onClick={OpenRejectModal}>Reject</button></div>
							</div>
							</div>
					</div>
					<div className="col-lg-3 col-md-3 col-sm-3">
							<h5 className="h5heading">Approved By: Purchaser PM</h5>
							<div id="approvebywhole">
							<div className="row">
								<div className="col-lg-6"><button className="categbtn" style={{background: "grey"}} id="approveby" onClick={Approvebyuser}>Submit</button></div>
								<div className="col-lg-6"><button className="categbtn" style={{background: "red"}} id="approvebyrjct" onClick={OpenRejectModal}>Reject</button></div>
							</div>
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
							<input type="text" id="shpupdatedqty" className="shp2input" readOnly/>
						</div>
						<div className="col-lg-4 col-md-4 col-sm-12">
							<h6 className="h5heading">Remaining  Quantity</h6>
							<input type="text" id="shpremainingqty" className="shp2input" readOnly/>
						</div>
					</div>
					<div className="row mt-5">
						<div className="col-lg-2 col-md-2 col-sm-12">
						<button className="categbtn" id="categbtn" onClick={updatewhreq}>Update</button>
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
					Search: <input type="text" id="searchinput" onKeyUp={SearchTable} placeholder="Search for serial...." />
						<input type="text"style={{display: "none"}} value={lssid}/>
						<table className="shipmenttable2 mt-3" id="serialtable">
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
			<Modal show={rejectModal} centered onHide={RejecthandleClose} data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true" className="modal-lg">
				<Modal.Header>
					<button id="closemodal" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
						onClick={RejecthandleClose}
					></button>
				</Modal.Header>
				<Modal.Body>
					<div className="row  mb-3">
						<h5>Enter Reason for Rejection:</h5>
						<textarea name="rejectnote" cols="20" rows="5" id="rejectnote"></textarea>
					</div>
					<div className="row mt-5">
						<div className="col-lg-2 col-md-2 col-sm-12">
						<button className="categbtn" id="categbtn" onClick={rejectthis} style={{backgroundColor:"red"}}>Reject</button>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</div>	
		</>
	)
}