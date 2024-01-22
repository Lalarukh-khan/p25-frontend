import axiosClient from '../../../axios-client';
import { useEffect } from "react";

export default function MaterialCategory(){
	useEffect(() => {
		loadcategories();
	}, [])
	const UpdateCategory = () => {
		const category = document.getElementById("category").value;
		document.getElementById("categbtn").innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" style="padding: 13px;"></span>`;
		const payload = new FormData();
		payload.append('category', category);
		axiosClient.post('/make-category', payload)
		.then(({data}) => {
			document.getElementById("categbtn").innerHTML = 'Update';
			document.getElementById("callcateg").innerText = category;
			console.log(data);
			loadcategories();
		})
		.catch((err) => {
			document.getElementById("categbtn").innerHTML = 'Update';
			const response = err.response;
			if (response && response.status === 422) {
				console.log(response.data.message);
			}
		});

	}
	const loadcategories = () => {
		axiosClient.get('/get-categories')
		.then(({data}) => {
			console.log(data); 
			const jsonData = data.data;
			// Function to create and append the <select> element
			function createSelect(options) {
				const selectContainer = document.getElementById('select-container');
				selectContainer.innerHTML = "";
				// if (selectContainer.innerHTML.trim() === '') {
					const select = document.createElement('select');
					select.className = `categinput`;
					select.id = `slctcateg`;
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
	const UpdateSubCategory = () => {
		const subcategory = document.getElementById("subcategory").value;
		const slctcategory = document.getElementById("slctcateg").value;
		const categid = slctcategory.replace("slctcategory", "");
		const slctcategoryname = document.getElementById("slctcateg");
		const selectedOption = slctcategoryname.options[slctcategoryname.selectedIndex];
		document.getElementById("subcategbtn").innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" style="padding: 13px;"></span>`;
		const payload = new FormData();
		payload.append('subcategory', subcategory);
		payload.append('categid', categid);
		axiosClient.post('/make-subcategory', payload)
		.then(({data}) => {
			document.getElementById("subcategbtn").innerHTML = 'Update';
			loadsubcategories(categid);
			document.getElementById("callcateg").innerText = selectedOption.text;
			console.log(data);
		})
		.catch((err) => {
			document.getElementById("subcategbtn").innerHTML = 'Update';
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
			// Function to create and append the <select> element
			function createSelect(options) {
				const allsubcategDiv = document.getElementById('allsubcateg');
				allsubcategDiv.innerHTML = "";
				// if (selectContainer.innerHTML.trim() === '') {
					options.forEach(item => {
						// Create a div for each item
						const resultDiv = document.createElement('div');
						resultDiv.className = 'row resultsidecateg';
						resultDiv.style.marginBottom = '4px';
						const col1 = document.createElement('div');
						col1.className = 'col-lg-10 col-md-10 col-sm-10';
						const categoryName = document.createElement('p');
						categoryName.className = 'categsidefotn';
						categoryName.textContent = item.name;
						categoryName.id = item.id;
						col1.appendChild(categoryName);
						const col2 = document.createElement('div');
						col2.className = 'col-lg-2 col-md-2 col-sm-2';
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
			const allsubcategDiv = document.getElementById('allsubcateg');
			allsubcategDiv.innerHTML = "";
			if (response && response.status === 422) {
				console.log(response.data.message);
			}
		});
	}

	return (
		<>
		<div className="container">
			<div className="row">
				<div className="col-lg-9 col-md-9 col-sm-12">
					<div className="row mb-3">
						<h5 className="h5heading">Add Category</h5>
						<div className="col-lg-10 col-md-10 col-sm-12">
							<input className="categinput" type="text" name="category" id="category"/>
						</div>
						<div className="col-lg-2 col-md-2 col-sm-12">
							<button className="categbtn" id="categbtn" onClick={UpdateCategory}>Update</button>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-5 col-md-5 col-sm-12">
							<h5 className="h5heading">Add Sub Category</h5>
						</div>
						<div className="col-lg-5 col-md-5 col-sm-12">
							<h5 className="h5heading">Present In</h5>
						</div>
						<div className="col-lg-2 col-md-2 col-sm-12"></div>
					</div>
					<div className="row  mb-5">
						<div className="col-lg-5 col-md-5 col-sm-12">
							<input className="categinput" type="text" name="subcategory" id="subcategory" />
						</div>
						<div className="col-lg-5 col-md-5 col-sm-12">
							<div id="select-container"></div>
						</div>
						<div className="col-lg-2 col-md-2 col-sm-12">
							<button className="categbtn" id="subcategbtn" onClick={UpdateSubCategory}>Update</button>
						</div>
					</div>
					{/* Bottom Section */}
					<div className="row mb-3" style={{borderBottom: "1px solid black"}}>
						<div className="col-lg-6 col-md-6 col-sm-12">
							<h5 className="h5heading">Category</h5>
						</div>
						<div className="col-lg-6 col-md-6 col-sm-12">
							<h5 className="h5heading">Sub Category</h5>
						</div>
					</div>
					<div className="row" id="categresult">
						<div className="col-lg-6 col-md-6 col-sm-12">
							<div className="row resultcateg">
								<div className="col-lg-10 col-md-10 col-sm-10">
									<h5 className="categfotn" id="callcateg"></h5>
								</div>
								<div className="col-lg-2 col-md-2 col-sm-2">
									<button>X</button>&nbsp;
									<button>Y</button>
								</div>
							</div>
						</div>
						<div className="col-lg-6 col-md-6 col-sm-12" id="allsubcateg">
								<div>
								</div>
						</div>
					</div>
				</div>
				<div className="col-lg-3 col-md-9 col-sm-12 greyback pt-5" style={{height: "100vh"}}>
					<h5 className="h5heading">Material Type</h5>
					<div className="row resultsidecateg mb-1" style={{marginLeft: "0px"}}>
						<div className="col-lg-9 col-md-9 col-sm-9">
							<p className="categsidefotn">Antenna System</p>
						</div>
						<div className="col-lg-3 col-md-3 col-sm-3">
							<button>X</button>&nbsp;
							<button>Y</button>
						</div>
					</div>
					<div className="row resultsidecateg mb-1" style={{marginLeft: "0px"}}>
						<div className="col-lg-9 col-md-9 col-sm-9">
							<p className="categsidefotn">Antenna System</p>
						</div>
						<div className="col-lg-3 col-md-3 col-sm-3">
							<button>X</button>&nbsp;
							<button>Y</button>
						</div>
					</div>
					<div className="row resultsidecateg mb-1" style={{marginLeft: "0px"}}>
						<div className="col-lg-9 col-md-9 col-sm-9">
							<p className="categsidefotn">Antenna System</p>
						</div>
						<div className="col-lg-3 col-md-3 col-sm-3">
							<button>X</button>&nbsp;
							<button>Y</button>
						</div>
					</div>
				</div>
			</div>
		</div>	
		</>
	)
}