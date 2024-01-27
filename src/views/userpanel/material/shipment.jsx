import { useState, useEffect } from "react";
import axiosClient from '../../../axios-client';

export default function AddShipment(){
	const [rowData, setRowData] = useState(null);
	useEffect(() => {
		loadcategories();
		loadsubcategories(0);
		// loadmaterialbytype(0);
		loadmaterialvalues(0);
		loadsubmattypes(0);
		loadshipments();
		loadwarehouse();
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
					select.className = `shpinput`;
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
	const loadwarehouse = () => {
		axiosClient.get('/get-warehouse')
		.then(({data}) => {
			console.log(data); 
			const jsonData = data.data;
			// Function to create and append the <select> element
			function createSelect(options) {
				const selectContainer = document.getElementById('warehouse-container');
				selectContainer.innerHTML = "";
				// if (selectContainer.innerHTML.trim() === '') {
					const select = document.createElement('select');
					select.className = `shpinput`;
					select.id = `slctwrhs`;
					// Loop through the options and create <option> elements
					const optionElement = document.createElement('option');
					optionElement.text = "";
					select.appendChild(optionElement);
					options.forEach(option => {
						const optionElement = document.createElement('option');
						optionElement.value = option.id;
						optionElement.text = option.wrhidname; 
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
	const loadsubmattypes = (subid) => {
		const payload = new FormData();
		payload.append('subid', subid);
		axiosClient.post('/get-mattypesbysub', payload)
		.then(({data}) => {
			console.log(data); 
			const jsonData = data.data;
			// Function to create and append the <select> element
			function createSelect(options) {
				const selectContainer = document.getElementById('alltypecateg');
				selectContainer.innerHTML = "";
			
				// Get unique types
				const uniqueTypes = [...new Set(options.map(option => option.type))];
			
				// Create select element
				const select = document.createElement('select');
				select.className = `shpinput`;
				select.id = `mattypes`;
			
				// Loop through unique types and create <option> elements
				uniqueTypes.forEach(type => {
					const optionElement = document.createElement('option');
					optionElement.value = type;
					if (type == "1") {
						optionElement.text = "New Material";
					} else if (type == "2") {
						optionElement.text = "Spare Parts";
					} else if (type == "3") {
						optionElement.text = "Returned Items From Sites";
					}
					select.appendChild(optionElement);
				});
				select.addEventListener('change', function() {
					loadmaterialbytype(this.value, subid);
				});
				if (select.options.length === 1) {
					loadmaterialbytype(select.options[0].value, subid);
				}
				selectContainer.appendChild(select);
			}
			
			createSelect(jsonData);
		})
		.catch((err) => {
			document.getElementById("mattypes").innerHTML = "";
			loadmaterialbytype(0,0);
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
					select.className = `shpinput`;
					select.id = `slctsubcateg`;
					// Loop through the options and create <option> elements
					options.forEach(option => {
						const optionElement = document.createElement('option');
						optionElement.value = option.id;
						optionElement.text = option.name;
						select.appendChild(optionElement);
					});
					select.addEventListener('change', function() {
						loadsubmattypes(this.value);
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
			select.className = `shpinput`;
			selectContainer.appendChild(select);
			if (response && response.status === 422) {
				console.log(response.data.message);
			}
		});
	}
	const loadshipments = () => {
		axiosClient.get('/get-allshipments')
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
	const loadmaterialbytype = (typeid, subid) => {
		const payload = new FormData();
		payload.append('typeid', typeid);
		payload.append('subid', subid);
		axiosClient.post('/get-materialbytype', payload)
		.then(({data}) => {
			console.log(data); 
			const jsonData = data.data;
			// Function to create and append the <select> element
			function createSelect(options) {
				const selectContainer = document.getElementById('material-container');
				selectContainer.innerHTML = "";
				// if (selectContainer.innerHTML.trim() === '') {
					const select = document.createElement('select');
					select.className = `shpinput`;
					select.id = `slctmat`;
					// Loop through the options and create <option> elements
					options.forEach(option => {
						const optionElement = document.createElement('option');
						optionElement.value = option.id;
						optionElement.text = option.component;
						select.appendChild(optionElement);
					});
					select.addEventListener('change', function() {
						loadmaterialvalues(this.value);
					});
					if (select.options.length === 1) {
						loadmaterialvalues(select.options[0].value);
					}
					selectContainer.appendChild(select);
				// }
			}
			createSelect(jsonData);
		})
		.catch((err) => {
			document.getElementById("slctmat").innerHTML = "";
			document.getElementById("quantity").value = "";
			const response = err.response;
			if (response && response.status === 422) {
				console.log(response.data.message);
			}
		});
	}
	const loadmaterialvalues = (matid) => {
		const payload = new FormData();
		payload.append('matid', matid);
		axiosClient.post('/get-materialvalues', payload)
		.then(({data}) => {
			console.log(data); 
			const jsonData = data.data[0];
			const quantity = document.getElementById("quantity");
			quantity.value = jsonData.quantity;
		})
		.catch((err) => {
			const response = err.response;
			const quantity = document.getElementById("quantity");
			quantity.value = "";
			if (response && response.status === 422) {
				console.log(response.data.message);
			}
		});
	}
	const AddShipment = () => {
		const shipid =  document.getElementById("shipid").value;
		const name =  document.getElementById("name").value;
		const from =  document.getElementById("from").value;
		const slctcateg =  document.getElementById("slctcateg").value;
		const slctsubcateg =  document.getElementById("slctsubcateg").value;
		const slctmat =  document.getElementById("slctmat").value;
		const slctmattype =  document.getElementById("mattypes").value;
		const packingno =  document.getElementById("packingno").value;
		const quantity =  document.getElementById("quantity").value;
		const shipmentqty =  document.getElementById("shipmentqty").value;
		const receivedqty =  document.getElementById("receivedqty").value;
		const remainingqty =  document.getElementById("remainingqty").value;
		const slctwrhs =  document.getElementById("slctwrhs").value;
		const payload = new FormData();
		payload.append('shipid', shipid);
		payload.append('name', name);
		payload.append('from', from);
		payload.append('slctwrhs', slctwrhs);
		payload.append('slctcateg', slctcateg);
		payload.append('slctsubcateg', slctsubcateg);
		payload.append('slctmat', slctmat);
		payload.append('slcttype', slctmattype);
		payload.append('packingno', packingno);
		payload.append('quantity', quantity);
		payload.append('shipmentqty', shipmentqty);
		payload.append('receivedqty', receivedqty);
		payload.append('remainingqty', remainingqty);
		axiosClient.post('/add-shipment', payload)
		.then(({data}) => {
			console.log(data); 
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
	const handleRemainingInput = () => {
		const input1Value = document.getElementById('quantity').value;
		const input2Value = document.getElementById('receivedqty').value;
		const input3Value = document.getElementById('shipmentqty').value;
		const resultValue = document.getElementById('remainingqty');
		const number1 = parseFloat(input1Value);
		const number2 = parseFloat(input2Value);
		const number3 = parseFloat(input3Value);
		if(number2 <= number3){
			if (!isNaN(number1) && !isNaN(number2)) {
				const result = number1 - number2;
				resultValue.value = result;
			}
		}
		else{
			document.getElementById('receivedqty').value = number3;
		}
	}
	return (
		<>
		<div className="container">
			<div className="row mb-3">
				<div className="col-lg-2 col-md-2 col-sm-12">
					<button className="categbtn" onClick={addmatshow}>Add Shipment</button>
				</div>
				<div className="col-lg-10 col-md-10 col-sm-12"></div>
			</div>
			<div className="row mb-5" id="toshow" style={{display: "none"}}>
				<div className="col-lg-10 col-md-10 col-sm-12">
					<div className="row  mb-3">
						<div className="col-lg-2 col-md-2 col-sm-12">
							<input type="text" id="shipid" placeholder="Shipment ID" className="shpinput"/>
						</div>
						<div className="col-lg-2 col-md-2 col-sm-12">
							<input type="text" id="name" placeholder="Shipment name (PGD)" className="shpinput"/>
						</div>
						<div className="col-lg-2 col-md-2 col-sm-12">
							<input type="text" id="from" placeholder="Shipment From" className="shpinput"/>
						</div>
						<div className="col-lg-2 col-md-2 col-sm-12">
							<div id="warehouse-container"></div>
						</div>
						<div className="col-lg-2 col-md-2 col-sm-12">
							<div id="category-container"></div>
						</div>
						<div className="col-lg-2 col-md-2 col-sm-12">
							<div id="subcategory-container"></div>
						</div>
					</div>
					<div className="row mb-3">
						<div className="col-lg-2 col-md-2 col-sm-12">
							<h6 className="h5heading">Type of Material</h6>
							<div id="alltypecateg">
									<div>
										<select name="" id="" className="shpinput">
											<option value=""></option>
										</select>
									</div>
							</div>
						</div>
						<div className="col-lg-2 col-md-2 col-sm-12">
							<h6 className="h5heading">Material Component</h6>
							<div id="material-container">
										<select name="" id="" className="shpinput">
											<option value=""></option>
										</select>
							</div>
						</div>
						<div className="col-lg-2 col-md-2 col-sm-12">
							<h6 className="h5heading">Packing/Box No.</h6>
							<input type="text" placeholder="xxxxxxxx" className="shp2input" id="packingno"/>
						</div>
						<div className="col-lg-2 col-md-2 col-sm-12">
							<h6 className="h5heading">Purchased (Q)</h6>
							<input type="text" id="quantity" className="shp3input" readOnly/>
						</div>
						<div className="col-lg-1 col-md-1 col-sm-12">
							<h6 className="h5heading">Shipment(Q)</h6>
							<input type="text" id="shipmentqty" className="shp2input"/>
						</div>
						<div className="col-lg-1 col-md-1 col-sm-12">
							<h6 className="h5heading">Received(Q)</h6>
							<input type="text" id="receivedqty" className="shp2input" onInput={handleRemainingInput}/>
						</div>
						<div className="col-lg-2 col-md-2 col-sm-12">
							<h6 className="h5heading">Remainaing (Q)</h6>
							<input type="text" id="remainingqty" className="shp3input" readOnly/>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-2 col-md-2 col-sm-12">
						<button className="categbtn" id="categbtn" onClick={AddShipment}>Submit</button>
						</div>
					</div>
				</div>
				<div className="col-lg-2 col-md-2 col-sm-12"></div>
			</div>
				<hr />
				{rowData && (
					<div className="mt-5 mb-3">
						<table className="shipmenttable">
						<tr>
							<th>SL No</th>
							<th>Shipment ID</th>
							<th>Shipment Name (PGD)</th>
							<th>Shipment From</th>
							<th>Warehouse</th>
							<th>Category</th>
							<th>Sub Category</th>
							<th>Material Name</th>
							<th>Type of Material</th>
							<th>Packing/Box NO.</th>
							<th>Purchased QTY</th>
							<th>Shipment QTY</th>
							<th>Received QTY</th>
							<th>Remaining QTY</th>
						</tr>
						{rowData.map((row, index) => (
							<tr key={row.id}>
								<td>{index + 1}</td>
								<td>{row.shipid}</td>
								<td>{row.name}</td>
								<td>{row.shpfrom}</td>
								<td>{row.warehousename}</td>
								<td>{row.categoryname}</td>
								<td>{row.subcategoryname}</td>
								<td>{row.materialname}</td>
								<td>{row.typename}</td>
								<td>{row.packingno}</td>
								<td>{row.quantity}</td>
								<td>{row.shipmentqty}</td>
								<td>{row.receivedqty}</td>
								<td>{row.remainingqty}</td>
							</tr>
						))}
						</table>
					</div>
				)}
		</div>	
		</>
	)
}