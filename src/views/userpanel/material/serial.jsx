import { useEffect } from "react";
import axiosClient from '../../../axios-client';

export default function AddSerial(){
	// const [mattype, setMatType] = useState("");
	useEffect(() => {
		loadshipments();
		loadshipmentvalues(1);
		loadmanufactures();
	}, []);
	const loadshipments = () => {
		axiosClient.get('/get-shipments')
		.then(({data}) => {
			console.log(data); 
			const jsonData = data.data;
			// Function to create and append the <select> element
			function createSelect(options) {
				const selectContainer = document.getElementById('shipment-container');
				selectContainer.innerHTML = "";
				// if (selectContainer.innerHTML.trim() === '') {
					const select = document.createElement('select');
					select.className = `shp3input`;
					select.id = `slctshipment`;
					// Loop through the options and create <option> elements
					options.forEach(option => {
						const optionElement = document.createElement('option');
						optionElement.value = option.id;
						optionElement.text = option.shipid;
						select.appendChild(optionElement);
					});
					select.addEventListener('change', function() {
						loadshipmentvalues(this.value);
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
		const slctshipment =  document.getElementById("slctshipment").value;
		const shpquantity =  document.getElementById("shpquantity").value;
		const slctmnf = document.getElementById("slctmnf");
		const slctmnf_id = document.getElementById("slctmnf").value;
		const matname = slctmnf.options[slctmnf.selectedIndex];
		const result = document.getElementById("result");
		const payload = new FormData();
		payload.append('matsid', matsid);
		payload.append('slctshipment', slctshipment);
		payload.append('shpquantity', shpquantity);
		payload.append('slctmnf_id', slctmnf_id);
		axiosClient.post('/add-serial', payload)
		.then(({data}) => {
			console.log(data); 
			const rs2 = document.getElementById("rs2");
			const rs3 = document.getElementById("rs3");
			const rs4 = document.getElementById("rs4");
			const rs5 = document.getElementById("rs5");
			rs2.innerText = matsid;
			rs3.innerText = slctshipment;
			rs4.innerText = shpquantity;
			rs5.innerText = matname.text;
			result.style.display = "block";
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
		axiosClient.post('/get-shipmentvalues', payload) 
		.then(({data}) => {
			console.log(data); 
			const jsonData = data.data[0];
			document.getElementById("packingno").value = jsonData.packingno;
			document.getElementById("shpcat").value = jsonData.categoryname;
			document.getElementById("shpsubcat").value = jsonData.subcategoryname;
			document.getElementById("shptype").value = jsonData.typename;
			document.getElementById("shpmatname").value = jsonData.materialname;
			document.getElementById("shppurchase").value = jsonData.quantity;
			document.getElementById("shpreceived").value = jsonData.receivedqty;
			document.getElementById("shpremaining").value = jsonData.remainingqty;
			document.getElementById("shpmatdescription").innerText = jsonData.materialdescription;
			document.getElementById("shounit").value = jsonData.materialunit;
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
	const addmatshow = () => {
		const toshow = document.getElementById("toshow");
		toshow.style.display = "block";
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
						<div className="col-lg-4 col-md-4 col-sm-12">
							<h6 className="h5heading">Material ID</h6>
							<input type="text" id="matsid" placeholder="xxxxxxx" className="shp3input"/>
						</div>
						<div className="col-lg-4 col-md-4 col-sm-12">
							<h6 className="h5heading">Date of Upload</h6>
							<input type="date" id="date" placeholder="xxxxxxx" className="shp2input"/>
						</div>
						<div className="col-lg-4 col-md-4 col-sm-12"></div>
					</div>
					<div className="row  mb-3">
						<div className="col-lg-5 col-md-5 col-sm-12">
							<h6 className="h5heading">Shipment ID</h6>
							<div id="shipment-container"></div>
						</div>
						<div className="col-lg-5 col-md-5 col-sm-12">
							<h6 className="h5heading">Packing/Box No.</h6>
							<input type="text" id="packingno" placeholder="xxxxxxx" className="shp2input" readOnly/>
						</div>
						<div className="col-lg-2 col-md-2 col-sm-12"></div>
					</div>
					<div className="row  mb-3">
						<div className="col-lg-6 col-md-6 col-sm-12">
							<h6 className="h5heading">Category</h6>
							<input type="text" id="shpcat" placeholder="xxxxxxx" className="shp2input" readOnly/>
						</div>
						<div className="col-lg-6 col-md-6 col-sm-12">
							<h6 className="h5heading">Sub Category</h6>
							<input type="text" id="shpsubcat" placeholder="xxxxxxx" className="shp2input" readOnly/>
						</div>
					</div>
					<div className="row  mb-3">
						<div className="col-lg-12 col-md-12 col-sm-12">
							<h6 className="h5heading">Material Type</h6>
							<input type="text" id="shptype" placeholder="xxxxxxx" className="shp2input" readOnly/>
						</div>
					</div>
					<div className="row  mb-3">
						<div className="col-lg-12 col-md-12 col-sm-12">
							<h6 className="h5heading">Material Name</h6>
							<input type="text" id="shpmatname" placeholder="xxxxxxx" className="shp2input" readOnly/>
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
						<div className="col-lg-6 col-md-6 col-sm-12">
							<h6 className="h5heading">Unit</h6>
							<input type="text" id="shounit" className="shp2input" readOnly/>
						</div>
						<div className="col-lg-6 col-md-6 col-sm-12">
							<h6 className="h5heading">Quantity</h6>
							<input type="text" id="shpquantity" className="shp2input"/>
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
					</div>
				</div>
				<div className="col-lg-6 col-md-6 col-sm-12">
					<div id="result" style={{display: "none"}}>
						<table className="shipmenttable">
						<tr>
							<th>SL No</th>
							<th>Material ID</th>
							<th>Shipment ID</th>
							<th>Quantity</th>
							<th>Manufacturer Name</th>
						</tr>
						<tr>
							<td id="rs1">1</td>
							<td id="rs2">Shipment ID</td>
							<td id="rs3">Shipment Name (PGD)</td>
							<td id="rs4">Shipment From</td>
							<td id="rs5">Category</td>
						</tr>
						</table>
					</div>
				</div>
			</div>
			</div>
		</div>	
		</>
	)
}