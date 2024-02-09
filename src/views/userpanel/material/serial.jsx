import { useState, useEffect } from "react";
import axiosClient from '../../../axios-client';
import * as XLSX from 'xlsx';

export default function AddSerial(){
	// const [mattype, setMatType] = useState("");
	const [rowData, setRowData] = useState(null);
	const [filerowData, setfilerowData] = useState(null);
	useEffect(() => {
		loadwarehouse();
		loadmanufactures();
		const uniqueNumber = Date.now();
		const today = new Date().toISOString().split('T')[0];
		document.getElementById("matsid").value = uniqueNumber;
		document.getElementById('date').value = today;
		document.getElementById("mainheadingtt").innerText = "Material Serial Number";
	}, []);
	// const loadshipments = () => {
	// 	axiosClient.get('/get-shipments')
	// 	.then(({data}) => {
	// 		console.log(data); 
	// 		const jsonData = data.data; 
	// 		function createSelect(options) {
	// 			const selectContainer = document.getElementById('shipment-container');
	// 			selectContainer.innerHTML = "";
			
	// 			// Get unique types
	// 			const uniqueTypes = [...new Set(options.map(option => option.shipid))];
			
	// 			// Create select element
	// 			const select = document.createElement('select');
	// 			select.className = `shp3input`;
	// 			select.id = `slctshipment`;
			
	// 			// Loop through unique types and create <option> elements
	// 			uniqueTypes.forEach(shipid => {
	// 				const optionElement = document.createElement('option');
	// 				optionElement.value = shipid;
	// 				optionElement.text = shipid;
	// 				select.appendChild(optionElement);
	// 			});
	// 			select.addEventListener('change', function() {
	// 				loadshipmentvalues(this.value);
	// 				// loadSN();
	// 			});
	// 			selectContainer.appendChild(select);
	// 		}
	// 		createSelect(jsonData);
	// 	})
	// 	.catch((err) => {
	// 		const response = err.response;
	// 		if (response && response.status === 422) {
	// 			console.log(response.data.message);
	// 		}
	// 	});
	// }
	const loadmanufactures = () => {
		axiosClient.get('/get-manufacturers')
		.then(({data}) => {
			console.log(data); 
			const jsonData = data.data;
			// Function to create and append the <select> element
			function createSelect(options) {
				const selectContainer = document.getElementById('manufacture-container');
				selectContainer.innerHTML = "";
				// if (selectContainer.innerHTML.trim() === '') {
					const select = document.createElement('select');
					select.className = `shp2input`;
					select.id = `slctmnf`;
					// Loop through the options and create <option> elements
					options.forEach(option => {
						const optionElement = document.createElement('option');
						optionElement.value = option.mnfid;
						optionElement.text = option.mnfname;
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
	const AddSerial = () => {
		const matsid =  document.getElementById("matsid").value;
		const slctwrhs =  document.getElementById("slctwrhs").value;
		const shpquantity =  document.getElementById("shpupdatedqty").value;
		const slctmnf_id = document.getElementById("slctmnf").value;
		const payload = new FormData();
		payload.append('matsid', matsid);
		payload.append('slctwrhs', slctwrhs);
		payload.append('shpquantity', shpquantity);
		payload.append('slctmnf_id', slctmnf_id);
		axiosClient.post('/add-serial', payload)
		.then(({data}) => {
			console.log(data); 
			document.getElementById("successmsg").style.display = "block";
		})
		.catch((err) => {
			const response = err.response;
			if (response && response.status === 422) {
				console.log(response.data.message);
			}
		});
		
	}
	// const loadshipmentvalues = (shpid) => {
	// 	const payload = new FormData();
	// 	payload.append('shpid', shpid);
	// 	axiosClient.post('/get-shipmentvalues', payload) 
	// 	.then(({data}) => {
	// 		console.log(data); 
	// 		const jsonData = data.data;
	// 		function slctpackingno(options) {
	// 			const selectContainer = document.getElementById('slctpackingno');
	// 			selectContainer.innerHTML = "";
	// 			// if (selectContainer.innerHTML.trim() === '') {
	// 				const select = document.createElement('select');
	// 				select.className = `shp2input`;
	// 				select.id = `packingno`;
	// 				const optionElement = document.createElement('option');
	// 				optionElement.text = "";
	// 				select.appendChild(optionElement);
	// 				// Loop through the options and create <option> elements
	// 				options.forEach(option => {
	// 					const optionElement = document.createElement('option');
	// 					optionElement.value = option.packingno;
	// 					optionElement.text = option.packingno;
	// 					select.appendChild(optionElement);
	// 				});
	// 				selectContainer.appendChild(select);
	// 			// }
	// 		}
	// 		function slctshpcat(options) {
	// 			const selectContainer = document.getElementById('slctshpcat');
	// 			selectContainer.innerHTML = "";
	// 			// if (selectContainer.innerHTML.trim() === '') {
	// 				const select = document.createElement('select');
	// 				select.className = `shp2input`;
	// 				select.id = `shpcat`;
	// 				// Loop through the options and create <option> elements
	// 				options.forEach(option => {
	// 					const optionElement = document.createElement('option');
	// 					optionElement.value = option.slctcateg;
	// 					optionElement.text = option.categoryname;
	// 					select.appendChild(optionElement);
	// 				});
	// 				selectContainer.appendChild(select);
	// 			// }
	// 		}
	// 		function slctshpsubcat(options) {
	// 			const selectContainer = document.getElementById('slctshpsubcat');
	// 			selectContainer.innerHTML = "";
	// 			// if (selectContainer.innerHTML.trim() === '') {
	// 				const select = document.createElement('select');
	// 				select.className = `shp2input`;
	// 				select.id = `shpsubcat`;
	// 				// Loop through the options and create <option> elements
	// 				options.forEach(option => {
	// 					const optionElement = document.createElement('option');
	// 					optionElement.value = option.slctsubcateg;
	// 					optionElement.text = option.subcategoryname;
	// 					select.appendChild(optionElement);
	// 				});
	// 				selectContainer.appendChild(select);
	// 			// }
	// 		}
	// 		function slctshptype(options) {
	// 			const selectContainer = document.getElementById('slctshptype');
	// 			selectContainer.innerHTML = "";
	// 			// if (selectContainer.innerHTML.trim() === '') {
	// 				const select = document.createElement('select');
	// 				select.className = `shp2input`;
	// 				select.id = `shptype`;
	// 				// Loop through the options and create <option> elements
	// 				options.forEach(option => {
	// 					const optionElement = document.createElement('option');
	// 					optionElement.value = option.slcttype;
	// 					optionElement.text = option.typename;
	// 					select.appendChild(optionElement);
	// 				});
	// 				selectContainer.appendChild(select);
	// 			// }
	// 		}
	// 		function slctshpmatname(options) {
	// 			const selectContainer = document.getElementById('slctshpmatname');
	// 			selectContainer.innerHTML = "";
	// 			// if (selectContainer.innerHTML.trim() === '') {
	// 				const select = document.createElement('select');
	// 				select.className = `shp2input`;
	// 				select.id = `shpmatname`;
	// 				const optionElement = document.createElement('option');
	// 				optionElement.text = "";
	// 				select.appendChild(optionElement);
	// 				// Loop through the options and create <option> elements
	// 				options.forEach(option => {
	// 					const optionElement = document.createElement('option');
	// 					optionElement.value = option.slctmat;
	// 					optionElement.text = option.materialname;
	// 					select.appendChild(optionElement);
	// 				});
	// 				select.addEventListener('change', function() {
	// 					// loadshipmentvalues(this.value);
	// 					loadSN();
	// 				});
	// 				selectContainer.appendChild(select);
	// 			// }
	// 		}
	// 		slctpackingno(jsonData);
	// 		slctshpcat(jsonData);
	// 		slctshpsubcat(jsonData);
	// 		slctshptype(jsonData);
	// 		slctshpmatname(jsonData);
	// 		// document.getElementById("packingno").value = jsonData.packingno;
	// 		// document.getElementById("shpcat").value = jsonData.categoryname;
	// 		// document.getElementById("shpsubcat").value = jsonData.subcategoryname;
	// 		// document.getElementById("shptype").value = jsonData.typename;
	// 		document.getElementById("shpupdatedqty").value = jsonData[0].total_sn;
	// 		document.getElementById("shppurchase").value = jsonData[0].quantity;
	// 		document.getElementById("shpreceived").value = jsonData[0].receivedqty;
	// 		document.getElementById("shpremaining").value = jsonData[0].remainingqty;
	// 		document.getElementById("shpmatdescription").innerText = jsonData[0].materialdescription;
	// 		document.getElementById("shounit").value = jsonData[0].materialunit;
	// 		const number1 = parseFloat( jsonData[0].quantity);
	// 		const number2 = parseFloat(jsonData[0].total_sn);
	// 		if (!isNaN(number1) && !isNaN(number2)) {
	// 			const result = number1 - number2;
	// 			document.getElementById("shpremainingqty").value = result;
	// 		}
	// 	})
	// 	.catch((err) => {
	// 		const response = err.response;
	// 		// const quantity = document.getElementById("quantity");
	// 		// quantity.value = "";
	// 		if (response && response.status === 422) {
	// 			console.log(response.data.message);
	// 		}
	// 	});
	// }
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
						loadSN();
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
			const number1 = parseFloat(jsonData[0].receivedqty);
			const number2 = parseFloat(jsonData[0].total_sn);
				if (!isNaN(number1) && !isNaN(number2)) {
					const result = number1 - number2;
					document.getElementById("shpremainingqty").value = result;
				}
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
	const handleFile = (e) => {
		// const file = e.target.files[0];
	
		// if (file) {
		// 	const reader = new FileReader();
	
		// 	reader.onload = async (event) => {
		// 		const data = event.target.result;
		// 		const workbook = XLSX.read(data, { type: 'binary' });
	
		// 		// Assuming the first sheet is the target sheet
		// 		const sheetName = workbook.SheetNames[0];
		// 		const sheet = workbook.Sheets[sheetName];
	
		// 		// Convert sheet data to JSON
		// 		const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
		// 		const filteredData = jsonData.filter(row => row.length > 0);
	
		// 		// Merge the file data with the existing rowData
		// 		const mergedData = [...rowData || [], ...filteredData.slice(1)];

		// 		sendRows(filteredData.slice(1));
		// 		// Update the state with the merged data
		// 		setfilerowData(mergedData);
		// 	};
	
		// 	reader.readAsBinaryString(file);
		// }
		const file = e.target.files[0];

		if (file) {
		const reader = new FileReader();

		reader.onload = async (event) => {
			const data = event.target.result;
			const workbook = XLSX.read(data, { type: 'binary' });

			// Assuming the first sheet is the target sheet
			const sheetName = workbook.SheetNames[0];
			const sheet = workbook.Sheets[sheetName];

			// Convert sheet data to JSON
			const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

			// Filter out empty rows
			const filteredData = jsonData.filter(row => row.length > 0);

			// loadSN();
			// Send each row in a POST request
			setfilerowData(filteredData);
			sendRows(filteredData.slice(1));
		};

		reader.readAsBinaryString(file);
		}
	};
	const delserial = (slid) => {
		const confirmed = window.confirm('Are you sure you want to delete?');
		if (confirmed) {
			const payload = new FormData();
				payload.append('slid', slid);
				axiosClient.post('/delete-serial', payload)
				.then(({data}) => {
					console.log(data);
					loadSN();
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
	const UploadSN = () => {
		const shpsnmnly = document.getElementById("shpsnmnly").value;
		const slctshipment = document.getElementById("shpmatname").value;
		const payload = new FormData();
		payload.append('shpsnmnly', shpsnmnly);
		payload.append('slctshipment', slctshipment);
		axiosClient.post('/add-sn', payload)
		.then(({data}) => {
			console.log(data); 
			loadSN();
			const table = document.getElementById("sntable");
			const lastRow = table.rows[table.rows.length - 1];
			const firstTd = lastRow.cells[0]; 
			const firstTdValue = firstTd.textContent;
			const number1 = parseInt(firstTdValue);
			const result = number1+1;
			console.log("firstTdValue "+result);
			document.getElementById("shpupdatedqty").value = result;
		})
		.catch((err) => {
			const response = err.response;
			if (response && response.status === 422) {
				console.log(response.data.message);
			}
		});
	}
	const bulkupload = () => {
		document.getElementById("bulkupload").style.display = "block";
	}
	const sendRows = (rows) => {
		for (const row of rows) {
			const dataString = String(row);
			const dataArray = dataString.split(',');
			const shipid = dataArray[0];
			const serial = dataArray[1];
			const payload = new FormData();
			payload.append('slctshipment', shipid);
			payload.append('shpsnmnly', serial);
			axiosClient.post('/add-sn-bulk', payload)
			.then(({data}) => {
				console.log(data); 
			// 	// Function to create and append the <select> element
			})
			.catch((err) => {
				const response = err.response;
				if (response && response.status === 422) {
					console.log(response.data.message);
				}
			});
		}
		console.log("All Code Uploaded");
	};
	const loadSN = () => {
		const shipid = document.getElementById("shpmatname").value;
		const payload = new FormData();
		payload.append('slctshipment', shipid);
		axiosClient.post('/get-sn', payload)
		.then(({data}) => {
			console.log(data);
			document.getElementById("filetable").style.display = "none"; 
			setRowData(data.data);
		})
		.catch((err) => {
			setRowData("");
			const response = err.response;
			if (response && response.status === 422) {
				console.log(response.data.message);
			}
		});
	}
	return (
		<>
		<div className="container">
			<div className="row mb-3">
				<div className="col-lg-2 col-md-2 col-sm-12">
					<button className="categbtn" onClick={addmatshow}>Add Material Serial</button>
				</div>
				<div className="col-lg-10 col-md-10 col-sm-12"></div>
			</div>
			<div id="toshow" style={{display: "none"}}>
			<div className="row mb-5">
				<div className="col-lg-6 col-md-6 col-sm-12">
					<div className="row  mb-3">
						<div className="col-lg-6 col-md-6 col-sm-12">
							<h6 className="h5heading">Material ID</h6>
							<input type="text" id="matsid" placeholder="xxxxxxx" className="shp3input"/>
						</div>
						<div className="col-lg-6 col-md-6 col-sm-12">
							<h6 className="h5heading">Date of Upload</h6>
							<input type="date" id="date" placeholder="xxxxxxx" className="shp2input"/>
						</div>
					</div>
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
							<h6 className="h5heading">Updated S/N Quantity</h6>
							<input type="text" id="shpupdatedqty" className="shp2input" readOnly/>
						</div>
						<div className="col-lg-4 col-md-4 col-sm-12">
							<h6 className="h5heading">Remaining S/N Quantity</h6>
							<input type="text" id="shpremainingqty" className="shp2input" readOnly/>
						</div>
					</div>
					<div className="row  mb-3">
						<div className="col-lg-12 col-md-12 col-sm-12">
							<h6 className="h5heading">Manufacture Name</h6>
							<div id="manufacture-container"></div>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-2 col-md-2 col-sm-12">
						<button className="categbtn" id="categbtn" onClick={AddSerial}>Upload</button>
						</div>
						<h5 className="h5heading mt-3 sccssmsg" id="successmsg" style={{display: "none"}}>Material Serial has been successfully added!</h5>
					</div>
				</div>
				<div className="col-lg-6 col-md-6 col-sm-12">
					<div className="row mb-3">
						<div className="col-lg-5 col-md-5 col-sm-12">
						<span className="h5heading">Material Serial Number</span><button className="categbtn" onClick={bulkupload}>Upload XLS File</button>
						</div>
						<div className="col-lg-1 col-md-1 col-sm-12"></div>
						<div className="col-lg-6 col-md-6 col-sm-12">
						<span className="h5heading" style={{visibility:"hidden"}}>Material Serial Number</span>
							<div className="row">
								<div className="col-lg-8">
								<input type="text" id="shpsnmnly" className="shp2input" placeholder="Type"/>
								</div>
								<div className="col-lg-4">
								<button className="categbtn" onClick={UploadSN}>Upload</button>
								</div>
							</div>
						</div>
					</div>
					<input type="file" onChange={handleFile} accept=".xlsx, .xls" style={{display: "none"}} id="bulkupload"/>

					{rowData && (
					<div className="mt-5 mb-3">
						<table className="shipmenttable" id="sntable">
						<tr>
							<th>SL No</th>
							<th>Material Component</th>
							<th>Serial Number</th>
							<th>Action</th>
						</tr>
						{rowData.map((row, index) => (
							<tr key={row.id}>
								<td>{index + 1}</td>
								<td>{row.materialname}</td>
								<td>{row.serial}</td>
								<td><button onClick={() => delserial(row.id)} className="btn btn-danger" style={{width: "20px", height: "28px"}}><i className="bx bx-x"></i></button></td>
							</tr>
						))}
						</table>
					</div>
				)}
				<div id="filetable">
					{filerowData && (
					<div id="matresult" className="mt-5 mb-3">
						<table className="shipmenttable">
						<tr>
							<th>SL No</th>
							<th>Shipment ID</th>
							<th>Serial Number</th>
						</tr>
						{filerowData.map((row, rowIndex) => (
						<tr key={rowIndex}>
							<td>{rowIndex + 1}</td>
							{row.map((cell, cellIndex) => (
								<td key={cellIndex}>{cell}</td>
							))}
						</tr>
						))}
						</table>
					</div>
					)}
				</div>
				</div>
			</div>
			</div>
		</div>	
		</>
	)
}