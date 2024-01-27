import { useEffect } from "react";
import axiosClient from '../../../axios-client';

export default function ManufactureInformation(){
	// const [mattype, setMatType] = useState("");
	useEffect(() => {
		loadshipments();
	}, []);
	const loadshipments = () => {
		axiosClient.get('/get-manufacturers')
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
						categoryName.textContent = item.mnfname;
						categoryName.id = item.id;
						const locationName = document.createElement('p');
						locationName.className = 'manuffotn';
						locationName.textContent = item.mnflocation;
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
		axiosClient.post('/add-manufecturer', payload)
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
		// editmnf();
	}
	// const delmnf = (catid) => {
	// 	const confirmed = window.confirm('Are you sure you want to delete?');
	// 	if (confirmed) {
	// 		const payload = new FormData();
	// 			payload.append('categid', catid);
	// 			axiosClient.post('/delete-category', payload)
	// 			.then(({data}) => {
	// 				console.log(data);
	// 				loadcatsubcat();
	// 			})
	// 			.catch((err) => {
	// 				alert("There's an issue in deleting!");
	// 				const response = err.response;
	// 				if (response && response.status === 422) {
	// 					console.log(response.data.message);
	// 				}
	// 		});
	// 	}
	// }
// 	const editmnf = () => {
// 		// const userInput = window.prompt('Enter new manufacture name:', '');
// 		// 	if (userInput !== null) {
// 		// 		const payload = new FormData();
// 		// 		payload.append('categid', catid);
// 		// 		payload.append('newname', userInput);
// 		// 		axiosClient.post('/update-manufacture', payload)
// 		// 		.then(({data}) => {
// 		// 			console.log(data);
// 		// 			alert(`Manufacture name updated to, ${userInput}!`);
// 		// 			loadcatsubcat();
// 		// 		})
// 		// 		.catch((err) => {
// 		// 			alert("There's an issue in updating!");
// 		// 			const response = err.response;
// 		// 			if (response && response.status === 422) {
// 		// 				console.log(response.data.message);
// 		// 			}
// 		// 		});
// 		// 	} else {
// 		// 		alert('No input provided.');
// 		// 	}
// 		// Prompt the user to enter three values separated by commas
// const userInput = window.prompt('Please enter three values separated by commas (,):', '');

// // Check if the user provided input
// if (userInput !== null) {
//     // Split the input string into an array of values using commas as the delimiter
//     const inputsArray = userInput.split(',');

//     // Trim whitespace from each value and store them in separate variables
//     const input1 = inputsArray[0].trim();
//     const input2 = inputsArray[1].trim();
//     const input3 = inputsArray[2].trim();

//     // Log the inputs
//     console.log('Input 1:', input1);
//     console.log('Input 2:', input2);
//     console.log('Input 3:', input3);
// } else {
//     // User clicked Cancel or closed the prompt
//     console.log('No input provided.');
// }

// 	}
	return (
		<>
		<div className="container">
			<div className="row mb-3">
				<div className="col-lg-2 col-md-2 col-sm-12">
					<button className="categbtn" onClick={addmatshow}>Add Manufacture</button>
				</div>
				<div className="col-lg-10 col-md-10 col-sm-12"></div>
			</div>
			<div className="row mb-5" id="toshow" style={{display: "none"}}>
				<div className="col-lg-10 col-md-10 col-sm-12">
					<div className="row  mb-3">
						<div className="col-lg-4 col-md-4 col-sm-12">
							<input type="text" id="mnfname" placeholder="Manufacture" className="shpinput"/>
						</div>
						<div className="col-lg-4 col-md-4 col-sm-12">
							<input type="text" id="mnflocation" placeholder="Manufacturer Location" className="shpinput"/>
						</div>
						<div className="col-lg-2 col-md-2 col-sm-12">
							<input type="text" id="mnfid" placeholder="Manufacturer ID" className="shpinput"/>
						</div>
						<div className="col-lg-2 col-md-2 col-sm-12">
							<button className="categbtn" id="categbtn" onClick={AddManufecturer}>Add Manufacturer</button>
						</div>
					</div>
				</div>
				<div className="col-lg-2 col-md-2 col-sm-12"></div>
				<div id="categresult" >
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