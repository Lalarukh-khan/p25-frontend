import { useState, useEffect } from "react";
import axiosClient from '../../../axios-client';

export default function AddSerial(){
	const [mattype, setMatType] = useState("");
	useEffect(() => {
		loadcategories();
		loadsubcategories(1);
		loadmaterial();
		loadmaterialvalues(1);
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
					select.className = `shpinput`;
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
			select.className = `shpinput`;
			selectContainer.appendChild(select);
			if (response && response.status === 422) {
				console.log(response.data.message);
			}
		});
	}
	const loadmaterial = () => {
		axiosClient.get('/get-material')
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
	const loadmaterialvalues = (matid) => {
		const payload = new FormData();
		payload.append('matid', matid);
		axiosClient.post('/get-materialvalues', payload)
		.then(({data}) => {
			console.log(data); 
			const jsonData = data.data[0];
			const quantity = document.getElementById("quantity");
			quantity.value = jsonData.quantity;
			setMatType(jsonData.type);
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
		// const slctcateg =  document.getElementById("slctcateg").value;
		// const slctsubcateg =  document.getElementById("slctsubcateg").value;
		// const slctmat =  document.getElementById("slctmat").value;
		const packingno =  document.getElementById("packingno").value;
		const quantity =  document.getElementById("quantity").value;
		const shipmentqty =  document.getElementById("shipmentqty").value;
		const receivedqty =  document.getElementById("receivedqty").value;
		const remainingqty =  document.getElementById("remainingqty").value;
		const slctcategoryname = document.getElementById("slctcateg");
		const selectedOption = slctcategoryname.options[slctcategoryname.selectedIndex];
		const slctsubcategoryname = document.getElementById("slctsubcateg");
		const selectedsubOption = slctsubcategoryname.options[slctsubcategoryname.selectedIndex];
		const slctmatname = document.getElementById("slctmat");
		const selectedMatOption = slctmatname.options[slctmatname.selectedIndex];
		const result = document.getElementById("result");
		let mattypename = "";
		if(mattype == 1){
			mattypename = "New Material";
		}
		else{
			mattypename = "Used Material";
		}
		// const payload = new FormData();
		// payload.append('shipid', shipid);
		// payload.append('name', name);
		// payload.append('from', from);
		// payload.append('slctcateg', slctcateg);
		// payload.append('slctsubcateg', slctsubcateg);
		// payload.append('slctmat', slctmat);
		// payload.append('packingno', packingno);
		// payload.append('quantity', quantity);
		// payload.append('shipmentqty', shipmentqty);
		// payload.append('receivedqty', receivedqty);
		// payload.append('remainingqty', remainingqty);
		// axiosClient.post('/add-shipment', payload)
		// .then(({data}) => {
		// 	console.log(data); 
			const rs2 = document.getElementById("rs2");
			const rs3 = document.getElementById("rs3");
			const rs4 = document.getElementById("rs4");
			const rs5 = document.getElementById("rs5");
			const rs6 = document.getElementById("rs6");
			const rs7 = document.getElementById("rs7");
			const rs8 = document.getElementById("rs8");
			const rs9 = document.getElementById("rs9");
			const rs10 = document.getElementById("rs10");
			const rs11 = document.getElementById("rs11");
			const rs12 = document.getElementById("rs12");
			const rs13 = document.getElementById("rs13");
			rs2.innerText = shipid;
			rs3.innerText = name;
			rs4.innerText = from;
			rs5.innerText = selectedOption.text;
			rs6.innerText = selectedsubOption.text;
			rs7.innerText = selectedMatOption.text;
			rs8.innerText = mattypename;
			rs9.innerText = packingno;
			rs10.innerText = quantity;
			rs11.innerText = shipmentqty;
			rs12.innerText = receivedqty;
			rs13.innerText = remainingqty;
			result.style.display = "block";
		// })
		// .catch((err) => {
		// 	const response = err.response;
		// 	if (response && response.status === 422) {
		// 		console.log(response.data.message);
		// 	}
		// });
		
	}
	const addmatshow = () => {
		const toshow = document.getElementById("toshow");
		toshow.style.display = "block";
	}
	const handleRemainingInput = () => {
		const input1Value = document.getElementById('quantity').value;
		const input2Value = document.getElementById('receivedqty').value;
		const resultValue = document.getElementById('remainingqty');
		const number1 = parseFloat(input1Value);
		const number2 = parseFloat(input2Value);
		if (!isNaN(number1) && !isNaN(number2)) {
			const result = number1 - number2;
			resultValue.value = result;
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
						<div className="col-lg-3 col-md-3 col-sm-12">
							<div id="category-container"></div>
						</div>
						<div className="col-lg-3 col-md-3 col-sm-12">
							<div id="subcategory-container"></div>
						</div>
					</div>
					<div className="row mb-3">
						<div className="col-lg-2 col-md-2 col-sm-12">
							<h6 className="h5heading">Type of Material</h6>
							<button className="shpinput">Material Type/Spare &gt;</button>
						</div>
						<div className="col-lg-2 col-md-2 col-sm-12">
							<h6 className="h5heading">Material Component</h6>
							<div id="material-container"></div>
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
			<div id="result" style={{display: "none"}}>
				<hr />
				<table className="shipmenttable">
				<tr>
					<th>SL No</th>
					<th>Shipment ID</th>
					<th>Shipment Name (PGD)</th>
					<th>Shipment From</th>
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
				<tr>
					<td id="rs1">1</td>
					<td id="rs2">Shipment ID</td>
					<td id="rs3">Shipment Name (PGD)</td>
					<td id="rs4">Shipment From</td>
					<td id="rs5">Category</td>
					<td id="rs6">Sub Category</td>
					<td id="rs7">Material Name</td>
					<td id="rs8">Type of Material</td>
					<td id="rs9">Packing/Box NO.</td>
					<td id="rs10">Purchased QTY</td>
					<td id="rs11">Shipment QTY</td>
					<td id="rs12">Received QTY</td>
					<td id="rs13">Remaining QTY</td>
				</tr>
				</table>
			</div>
		</div>	
		</>
	)
}