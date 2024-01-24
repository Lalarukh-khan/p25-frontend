import { useEffect } from "react";
import axiosClient from '../../../axios-client';

export default function WarehouseInformation(){
	// const [mattype, setMatType] = useState("");
	useEffect(() => {
		loadshipments();
	}, []);
	const loadshipments = () => {
		axiosClient.get('/get-warehouse')
		.then(({data}) => {
			console.log(data); 
			const jsonData = data.data;
			// Function to create and append the <select> element
			function createSelect(options) {
				const allsubcategDiv = document.getElementById('allmnufs');
				allsubcategDiv.innerHTML = "";
				// if (selectContainer.innerHTML.trim() === '') {
					options.forEach(item => {
						// Create a div for each item
						const resultDiv = document.createElement('div');
						resultDiv.className = 'row resultmanuf';
						resultDiv.style.marginBottom = '4px';
						const col1 = document.createElement('div');
						col1.className = 'col-lg-9 col-md-9 col-sm-9';
						const categoryName = document.createElement('h5');
						categoryName.className = 'categfotn';
						categoryName.textContent = item.wrhidname;
						categoryName.id = item.id;
						const locationName = document.createElement('p');
						locationName.className = 'manuffotn';
						locationName.textContent = item.wrhidlocation;
						col1.appendChild(categoryName);
						col1.appendChild(locationName);
						const col2 = document.createElement('div');
						col2.className = 'col-lg-3 col-md-3 col-sm-3';
						col2.style.paddingTop = '10px';
						col2.style.paddingLeft = '30px';
						const buttonX = document.createElement('button');
						buttonX.textContent = 'X';
						const buttonY = document.createElement('button');
						buttonY.textContent = 'Y';
						col2.appendChild(buttonX);
						col2.appendChild(document.createTextNode('\u00A0')); // Non-breaking space
						col2.appendChild(buttonY);
						resultDiv.appendChild(col1);
						resultDiv.appendChild(col2);
						allsubcategDiv.appendChild(resultDiv);
				});
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
		const mnfid =  document.getElementById("mnfid").value;
		const mnfname =  document.getElementById("mnfname").value;
		const mnflocation =  document.getElementById("mnflocation").value;
		const payload = new FormData();
		payload.append('mnfid', mnfid);
		payload.append('mnfname', mnfname);
		payload.append('mnflocation', mnflocation);
		axiosClient.post('/add-warehouse', payload)
		.then(({data}) => {
			console.log(data);
			loadshipments();
			// document.getElementById("categresult").style.display = "block";
		})
		.catch((err) => {
			const response = err.response;
			// document.getElementById("categresult").style.display = "block";
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
				<div className="col-lg-3 col-md-3 col-sm-12">
					<button className="categbtn" onClick={addmatshow}>Warehouse Manufacture</button>
				</div>
				<div className="col-lg-9 col-md-9 col-sm-12"></div>
			</div>
			<div className="row mb-5" id="toshow" style={{display: "none"}}>
				<div className="col-lg-10 col-md-10 col-sm-12">
					<div className="row  mb-3">
						<div className="col-lg-4 col-md-4 col-sm-12">
							<input type="text" id="mnfname" placeholder="Warehouse Name" className="shpinput"/>
						</div>
						<div className="col-lg-4 col-md-4 col-sm-12">
							<input type="text" id="mnflocation" placeholder="Warehouse Location" className="shpinput"/>
						</div>
						<div className="col-lg-2 col-md-2 col-sm-12">
							<input type="text" id="mnfid" placeholder="Warehouse ID" className="shpinput"/>
						</div>
						<div className="col-lg-2 col-md-2 col-sm-12">
							<button className="categbtn" id="categbtn" onClick={AddManufecturer}>Add Warehouse</button>
						</div>
					</div>
				</div>
				<div className="col-lg-2 col-md-2 col-sm-12"></div>
				<div id="categresult">
					<hr />
						<div className="row">
							<div className="col-lg-4 col-md-4 col-sm-12" id="allmnufs">
								<div></div>
							</div>
						</div>
				</div>
			</div>
		</div>	
		</>
	)
}