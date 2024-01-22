import { useState, useEffect } from "react";
import axiosClient from '../../../axios-client';
import * as XLSX from 'xlsx';

export default function AddMaterial(){
	const [activeButtonText, setActiveButtonText] = useState("");
	useEffect(() => {
		loadcategories();
		loadsubcategories(1);
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
		const slctcategoryname = document.getElementById("slctcateg");
		const selectedOption = slctcategoryname.options[slctcategoryname.selectedIndex];
		const slctsubcategoryname = document.getElementById("slctsubcateg");
		const selectedsubOption = slctsubcategoryname.options[slctsubcategoryname.selectedIndex];
		const slcttype = document.getElementById("type");
		const selectedtypeOption = slcttype.options[slcttype.selectedIndex];
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
			const jsonData = data.data;
			console.log("Results:"+jsonData);
			const result = document.getElementById("result");
			const rstcomponent = document.getElementById("rstcomponent");
			const rstmodel = document.getElementById("rstmodel");
			const rstdescription = document.getElementById("rstdescription");
			const rstpartno = document.getElementById("rstpartno");
			const rstctg = document.getElementById("rstctg");
			const rstsubctg = document.getElementById("rstsubctg");
			const rsttype = document.getElementById("rsttype");
			const rstqty = document.getElementById("rstqty");
			const rstunit = document.getElementById("rstunit");
			rstcomponent.value = component;
			rstmodel.value = model;
			rstdescription.value = description;
			rstpartno.value = partno;
			rstqty.value = quantity;
			rstunit.value = activeButtonText;
			rstctg.value = selectedOption.text;
			rstsubctg.value = selectedsubOption.text;
			rsttype.value = selectedtypeOption.text;

			result.style.display = "block";
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
		};

		reader.readAsBinaryString(file);
		}
	};
	const bulkupload = () => {
		document.getElementById("bulkupload").style.display = "block";
	}
	const sendRows = (rows) => {
		for (const row of rows) {
			const dataString = String(row);
			const dataArray = dataString.split(',');
			const component = dataArray[0];
			const model = dataArray[1];
			const description = dataArray[2];
			const partno = dataArray[3];
			const type = dataArray[4];
			const quantity = dataArray[5];
			const slctcateg = dataArray[6];
			const slctsubcateg = dataArray[7];
			const bactiveButtonText = dataArray[8];
			const payload = new FormData();
			payload.append('component', component);
			payload.append('model', model);
			payload.append('description', description);
			payload.append('partno', partno);
			payload.append('type', type);
			payload.append('quantity', quantity);
			payload.append('slctcateg', slctcateg);
			payload.append('slctsubcateg', slctsubcateg);
			payload.append('activeButtonText', bactiveButtonText);
			axiosClient.post('/add-material', payload)
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
		document.getElementById("sccssbulk").style.display = "block";
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
			<h3 id="sccssbulk"className="mt-3" style={{display: "none"}} >Data has been Uploaded!</h3>
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
							<select name="type" id="type" className="matinput">
								<option value="1">New</option>
								<option value="2">Used</option>
							</select>
						</div>
						<div className="col-lg-2 col-md-2 col-sm-12">
							<h6 className="h5heading">Purchased Quantity</h6>
							<input type="text" id="quantity" placeholder="Text with Number 100" className="matinput"/>
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
					</div>
				</div>
				<div className="col-lg-3 col-md-3 col-sm-12"></div>
			</div>
			<div id="result" style={{display: "none"}}>
				<div className="row mb-3">
					<div className="col-lg-3 col-md-3 col-sm-12">
						<h6 className="h5heading">Material Component</h6>
						<input type="text" placeholder="xxxxxxxxxxx" className="matinput" id="rstcomponent" readOnly/>
					</div>
					<div className="col-lg-3 col-md-3 col-sm-12">
						<h6 className="h5heading">Material Model</h6>
						<input type="text" placeholder="xxxxxxxxxxx" className="matinput" id="rstmodel" readOnly/>
					</div>
					<div className="col-lg-3 col-md-3 col-sm-12">
						<h6 className="h5heading">Material Description</h6>
						<input type="text" placeholder="xxxxxxxxxxx" className="matinput" id="rstdescription" readOnly/>
					</div>
					<div className="col-lg-3 col-md-3 col-sm-12">
						<h6 className="h5heading">Part Number</h6>
						<input type="text" placeholder="xxxxxxxxxxx" className="matinput" id="rstpartno" readOnly/>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-3 col-md-3 col-sm-12">
						<h6 className="h5heading">Select Category</h6>
						<input type="text" placeholder="xxxxxxxxxxx" className="matinput" id="rstctg" readOnly/>
					</div>
					<div className="col-lg-3 col-md-3 col-sm-12">
						<h6 className="h5heading">Select Sub Category</h6>
						<input type="text" placeholder="xxxxxxxxxxx" className="matinput" id="rstsubctg" readOnly/>
					</div>
					<div className="col-lg-3 col-md-3 col-sm-12">
						<h6 className="h5heading">Material Type</h6>
						<input type="text" placeholder="xxxxxxxxxxx" className="matinput" id="rsttype" readOnly/>
					</div>
					<div className="col-lg-2 col-md-2 col-sm-12">
						<h6 className="h5heading">Purchased Quality</h6>
						<input type="text" placeholder="xxxxxxxxxxx" className="matinput" id="rstqty" readOnly/>
					</div>
					<div className="col-lg-1 col-md-1 col-sm-12">
						<h6 className="h5heading">MaterialUnit</h6>
						<input type="text" placeholder="xxxxxxxxxxx" className="matinput" id="rstunit" readOnly/>
					</div>
				</div>
			</div>
		</div>	
		</>
	)
}