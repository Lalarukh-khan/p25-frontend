import { useState, useEffect } from "react";
import axiosClient from '../../../axios-client';
import * as XLSX from 'xlsx';

export default function AddMaterial(){
	const [activeButtonText, setActiveButtonText] = useState("");
	const [rowData, setRowData] = useState(null);
	useEffect(() => {
		loadcategories();
		loadsubcategories(0);
		loadmattypes();
		loadmaterials();
		document.getElementById("mainheadingtt").innerText = "Add Material";
	}, []);
	const loadcategories = () => {
		axiosClient.get('/get-categories')
		.then(({data}) => {
			console.log(data); 
			const jsonData = data.data;
			// Function to create and append the <select> element
			function createSelect(options) {
				const selectContainer = document.getElementById('category-container');
				selectContainer.innerHTML = "";
				// if (selectContainer.innerHTML.trim() === '') {
					const select = document.createElement('select');
					select.className = `matinput`;
					select.id = `slctcateg`;
					// Loop through the options and create <option> elements
					const optionElement = document.createElement('option');
					optionElement.text = "";
					select.appendChild(optionElement);
					options.forEach(option => {
						const optionElement = document.createElement('option');
						optionElement.value = option.id;
						optionElement.text = option.name;
						select.appendChild(optionElement);
					});
					select.addEventListener('change', function() {
						loadsubcategories(this.value);
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
	const loadmattypes = () => {
		axiosClient.get('/get-mattypes')
		.then(({data}) => {
			console.log(data); 
			const jsonData = data.data;
			// Function to create and append the <select> element
			function createSelect(options) {
				const selectContainer = document.getElementById('alltypecateg');
				selectContainer.innerHTML = "";
				// if (selectContainer.innerHTML.trim() === '') {
					const select = document.createElement('select');
					select.className = `matinput`;
					select.id = `type`;
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
	const loadsubcategories = (categid) => {
		const payload = new FormData();
		payload.append('categid', categid);
		axiosClient.post('/get-subcategory', payload)
		.then(({data}) => {
			console.log(data); 
			const jsonData = data.data;
			console.log("jsonData"+jsonData);
			function createSelect(options) {
				const selectContainer = document.getElementById('subcategory-container');
				selectContainer.innerHTML = "";
				// if (selectContainer.innerHTML.trim() === '') {
					const select = document.createElement('select');
					select.className = `matinput`;
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
			const selectContainer = document.getElementById('subcategory-container');
			selectContainer.innerHTML = "";
			const select = document.createElement('select');
			select.className = `matinput`;
			selectContainer.appendChild(select);
			if (response && response.status === 422) {
				console.log(response.data.message);
			}
		});
	}
	const loadmaterials = () => {
		axiosClient.get('/get-material')
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
	const setActiveButton = (buttonText) => {
		setActiveButtonText(buttonText);
	}
	const AddMaterial = () => {
		const component =  document.getElementById("component").value;
		const model =  document.getElementById("model").value;
		const description =  document.getElementById("description").value;
		const partno =  document.getElementById("partno").value;
		const type =  document.getElementById("type").value;
		const quantity =  document.getElementById("quantity").value;
		const slctcateg =  document.getElementById("slctcateg").value;
		const slctsubcateg =  document.getElementById("slctsubcateg").value;
		// const slctcategoryname = document.getElementById("slctcateg");
		// const selectedOption = slctcategoryname.options[slctcategoryname.selectedIndex];
		// const slctsubcategoryname = document.getElementById("slctsubcateg");
		// const selectedsubOption = slctsubcategoryname.options[slctsubcategoryname.selectedIndex];
		// const slcttype = document.getElementById("type");
		// const selectedtypeOption = slcttype.options[slcttype.selectedIndex];
		const payload = new FormData();
		payload.append('component', component);
		payload.append('model', model);
		payload.append('description', description);
		payload.append('partno', partno);
		payload.append('type', type);
		payload.append('quantity', quantity);
		payload.append('slctcateg', slctcateg);
		payload.append('slctsubcateg', slctsubcateg);
		payload.append('activeButtonText', activeButtonText);
		axiosClient.post('/add-material', payload)
		.then(({data}) => {
			console.log(data); 
			document.getElementById("matconfirm").style.display = "block";
			loadmaterials();
			// const jsonData = data.data;
			// console.log("Results:"+jsonData);
			// const matresult = document.getElementById("matresult");
			// const rstcomponent = document.getElementById("rstcomponent");
			// const rstmodel = document.getElementById("rstmodel");
			// const rstdescription = document.getElementById("rstdescription");
			// const rstpartno = document.getElementById("rstpartno");
			// const rstctg = document.getElementById("rstctg");
			// const rstsubctg = document.getElementById("rstsubctg");
			// const rsttype = document.getElementById("rsttype");
			// const rstqty = document.getElementById("rstqty");
			// const rstunit = document.getElementById("rstunit");
			// rstcomponent.innerText = component;
			// rstmodel.innerText = model;
			// rstdescription.innerText = description;
			// rstpartno.innerText = partno;
			// rstqty.innerText = quantity;
			// rstunit.innerText = activeButtonText;
			// rstctg.innerText = selectedOption.text;
			// rstsubctg.innerText = selectedsubOption.text;
			// rsttype.innerText = selectedtypeOption.text;

			// matresult.style.display = "block";
		// 	// Function to create and append the <select> element
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
		document.getElementById("bulkupload").style.display = "none";
	}
	const handleFile = (e) => {
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

			// Send each row in a POST request
			sendRows(filteredData.slice(1));

			// setRowData(filteredData.slice(1));
		};

		reader.readAsBinaryString(file);
		}
	};
	const bulkupload = () => {
		document.getElementById("bulkupload").style.display = "block";
		document.getElementById("toshow").style.display = "none";
	}
	const sendRows = (rows) => {
		for (const row of rows) {
			const dataString = String(row);
			const dataArray = dataString.split(',');
			const component = dataArray[0];
			const model = dataArray[1];
			const description = dataArray[2];
			const partno = dataArray[3];
			const slctcateg = dataArray[4];
			const slctsubcateg = dataArray[5];
			const type = dataArray[6];
			const quantity = dataArray[7];
			const bactiveButtonText = dataArray[8];
			const payload = new FormData();
			payload.append('component', component);
			payload.append('model', model);
			payload.append('description', description);
			payload.append('partno', partno);
			payload.append('type', type);
			payload.append('quantity', quantity);
			payload.append('category', slctcateg);
			payload.append('subcategory', slctsubcateg);
			payload.append('activeButtonText', bactiveButtonText);
			axiosClient.post('/add-material-bulk', payload)
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
		document.getElementById("uploading").style.display = "block";
		loadmaterials();
	};
	return (
		<>
		<div className="container">
			<div className="row mb-3">
				<div className="col-lg-2 col-md-2 col-sm-12">
					<button className="addmatbtn" onClick={addmatshow}>Add Material</button>
				</div>
				<div className="col-lg-2 col-md-2 col-sm-12">
					<button className="addmatbtn" onClick={bulkupload}>Bulk Upload</button>
				</div>
				<div className="col-lg-8 col-md-8 col-sm-12"></div>
			</div>
			<input type="file" onChange={handleFile} accept=".xlsx, .xls" style={{display: "none"}} id="bulkupload"/>
			<div id="uploading" style={{display: "none"}} ><br />Bulk Material Uploaded</div>
			<div className="row mb-5" id="toshow" style={{display: "none"}}>
				<div className="col-lg-9 col-md-9 col-sm-12">
					<div className="row  mb-3">
						<div className="col-lg-3 col-md-3 col-sm-12">
							<h6 className="h5heading">Material Component</h6>
							<input type="text" id="component" placeholder="Text with Number 100" className="matinput"/>
						</div>
						<div className="col-lg-3 col-md-3 col-sm-12">
							<h6 className="h5heading">Material Model</h6>
							<input type="text" id="model" placeholder="xxxxxxxxxxx" className="matinput"/>
						</div>
						<div className="col-lg-4 col-md-4 col-sm-12">
							<h6 className="h5heading">Material Description</h6>
							<input type="text" id="description" placeholder="xxxxxxxxxxx" className="matinput"/>
						</div>
						<div className="col-lg-2 col-md-2 col-sm-12">
							<h6 className="h5heading">Part Number (Opt.)</h6>
							<input type="text" id="partno" placeholder="xxxxxxxxxxx" className="matinput"/>
						</div>
					</div>
					<div className="row mb-3">
						<div className="col-lg-3 col-md-3 col-sm-12">
							<h6 className="h5heading">Select Category</h6>
							<div id="category-container"></div>
						</div>
						<div className="col-lg-2 col-md-2 col-sm-12">
							<h6 className="h5heading">Select Sub Category</h6>
							<div id="subcategory-container"></div>
						</div>
						<div className="col-lg-2 col-md-2 col-sm-12">
							<h6 className="h5heading">Material Type</h6>
							<div id="alltypecateg">
									<div>
									</div>
							</div>
						</div>
						<div className="col-lg-2 col-md-2 col-sm-12">
							<h6 className="h5heading">Purchased Quantity</h6>
							<input type="text" id="quantity" placeholder="xxxxx" className="matinput"/>
						</div>
						<div className="col-lg-3 col-md-3 col-sm-12">
							<h6 className="h5heading">Material Unit</h6>
							<button className="addmbtn" onClick={() => setActiveButton('Set')}>Set</button>
							<button className="addmbtn" onClick={() => setActiveButton('Pcs')}>Pcs</button>
							<button className="addmbtn" onClick={() => setActiveButton('M')}>M</button>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-2 col-md-2 col-sm-12">
						<button className="categbtn" id="categbtn" onClick={AddMaterial}>Add Material</button>
						</div>
						<h5 className="h5heading mt-3" id="matconfirm" style={{display: 'none'}}>Material Added Successfully!</h5>
					</div>
				</div>
				<div className="col-lg-3 col-md-3 col-sm-12"></div>
			</div>
			{/* <div id="matresult" style={{display: "none"}}>
				<table className="shipmenttable">
				<tr>
					<th>SL No</th>
					<th>Material Component</th>
					<th>Material Model</th>
					<th>Material Description</th>
					<th>Part Number</th>
					<th>Select Category</th>
					<th>Select Sub Category</th>
					<th>Material Type</th>
					<th>Purchased Quantity</th>
					<th>Material Unit</th>
				</tr>
				<tr>
					<td id="rs1">1</td>
					<td id="rstcomponent">Shipment ID</td>
					<td id="rstmodel">Shipment Name (PGD)</td>
					<td id="rstdescription">Shipment From</td>
					<td id="rstpartno">Category</td>
					<td id="rstctg">Sub Category</td>
					<td id="rstsubctg">Material Name</td>
					<td id="rsttype">Type of Material</td>
					<td id="rstqty">Packing/Box NO.</td>
					<td id="rstunit">Purchased QTY</td>
				</tr>
				</table>
			</div> */}

			{/* {rowData && (
			<div id="matresult" className="mt-5 mb-3">
				<table className="shipmenttable">
				<tr>
					<th>SL No</th>
					<th>Material Component</th>
					<th>Material Model</th>
					<th>Material Description</th>
					<th>Part Number</th>
					<th>Select Category</th>
					<th>Select Sub Category</th>
					<th>Material Type</th>
					<th>Purchased Quantity</th>
					<th>Material Unit</th>
				</tr>
				{rowData.map((row, rowIndex) => (
				<tr key={rowIndex}>
					<td>{rowIndex + 1}</td>
					{row.map((cell, cellIndex) => (
						<td key={cellIndex}>{cell}</td>
					))}
				</tr>
				))}
				</table>
			</div>
			)} */}
			{rowData && (
					<div id="matresult" className="mt-5 mb-3">
						<table className="shipmenttable">
						<tr>
							<th>SL No</th>
							<th>Material Component</th>
							<th>Material Model</th>
							<th>Material Description</th>
							<th>Part Number</th>
							<th>Select Category</th>
							<th>Select Sub Category</th>
							<th>Material Type</th>
							<th>Purchased Quantity</th>
							<th>Material Unit</th>
						</tr>
						{rowData.map((row, index) => (
							<tr key={row.id}>
								<td>{index + 1}</td>
								<td>{row.component}</td>
								<td>{row.model}</td>
								<td>{row.description}</td>
								<td>{row.partno}</td>
								<td>{row.slctcateg}</td>
								<td>{row.slctsubcateg}</td>
								<td>{row.type}</td>
								<td>{row.quantity}</td>
								<td>{row.activeButtonText}</td>
							</tr>
						))}
						</table>
					</div>
					)}
		</div>	
		</>
	)
}