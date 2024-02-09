import axiosClient from '../../../axios-client';
import { useState, useEffect } from "react";

export default function MaterialCategory(){
	const [rowData, setRowData] = useState(null);
	useEffect(() => {
		loadcategories();
		loadmattypes();
		loadcatsubcat();
		document.getElementById("mainheadingtt").innerText = "Material Catergory";
	}, [])
	const UpdateCategory = () => {
		const category = document.getElementById("category").value;
		document.getElementById("categbtn").innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" style="padding: 13px;"></span>`;
		const payload = new FormData();
		payload.append('category', category);
		axiosClient.post('/make-category', payload)
		.then(({data}) => {
			document.getElementById("categbtn").innerHTML = 'Update';
			document.getElementById("catconfirm").style.display="block";
			document.getElementById("category").value = "";
			console.log(data);
			loadcategories();
			loadcatsubcat();
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
		document.getElementById("subcategbtn").innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" style="padding: 13px;"></span>`;
		const payload = new FormData();
		payload.append('subcategory', subcategory);
		payload.append('categid', categid);
		axiosClient.post('/make-subcategory', payload)
		.then(({data}) => {
			document.getElementById("subcategbtn").innerHTML = 'Update';
			document.getElementById("subcategory").value = "";
			console.log(data);
			loadcatsubcat();
			document.getElementById("subcatconfirm").style.display="block";
		})
		.catch((err) => {
			document.getElementById("subcategbtn").innerHTML = 'Update';
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
			function createSelect(options) {
				const allsubcategDiv = document.getElementById('alltypecateg');
				allsubcategDiv.innerHTML = "";
				// if (selectContainer.innerHTML.trim() === '') {
					options.forEach(item => {
						// Create a div for each item
						const resultDiv = document.createElement('div');
						resultDiv.className = 'row resultsidecateg mb-1';
						resultDiv.style.marginLeft = '0px';
						const col1 = document.createElement('div');
						col1.className = 'col-lg-9 col-md-9 col-sm-9';
						const categoryName = document.createElement('p');
						categoryName.className = 'categsidefotn';
						categoryName.textContent = item.name;
						categoryName.id = item.id;
						col1.appendChild(categoryName);
						const col2 = document.createElement('div');
						col2.className = 'col-lg-3 col-md-3 col-sm-3';
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
			const allsubcategDiv = document.getElementById('alltypecateg');
			allsubcategDiv.innerHTML = "";
			if (response && response.status === 422) {
				console.log(response.data.message);
			}
		});
	}
	const loadcatsubcat = () => {
		axiosClient.get('/get-catsubcat')
		.then(({data}) => {
			setRowData(data.data);
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
				axiosClient.post('/delete-category', payload)
				.then(({data}) => {
					console.log(data);
					loadcatsubcat();
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
	const editcat = (catid) => {
		const userInput = window.prompt('Enter new category name:', '');
			if (userInput !== null) {
				const payload = new FormData();
				payload.append('categid', catid);
				payload.append('newname', userInput);
				axiosClient.post('/update-category', payload)
				.then(({data}) => {
					console.log(data);
					alert(`Category name updated to, ${userInput}!`);
					loadcatsubcat();
				})
				.catch((err) => {
					alert("There's an issue in updating!");
					const response = err.response;
					if (response && response.status === 422) {
						console.log(response.data.message);
					}
				});
			} else {
				alert('No input provided.');
			}
	}
	const delsubcat = (catid) => {
		const confirmed = window.confirm('Are you sure you want to delete?');
		if (confirmed) {
			const payload = new FormData();
				payload.append('categid', catid);
				axiosClient.post('/delete-subcategory', payload)
				.then(({data}) => {
					console.log(data);
					loadcatsubcat();
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
	const editsubcat = (catid) => {
		const userInput = window.prompt('Enter new sub category name:', '');
			if (userInput !== null) {
				const payload = new FormData();
				payload.append('categid', catid);
				payload.append('newname', userInput);
				axiosClient.post('/update-subcategory', payload)
				.then(({data}) => {
					console.log(data);
					alert(`Sub Category name updated to, ${userInput}!`);
					loadcatsubcat();
				})
				.catch((err) => {
					alert("There's an issue in updating!");
					const response = err.response;
					if (response && response.status === 422) {
						console.log(response.data.message);
					}
				});
			} else {
				alert('No input provided.');
			}
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
							<span id="catconfirm" className="sccssmsg" style={{display: 'none'}}>Category Updated Successfully!</span>
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
							<span id="subcatconfirm" style={{display: 'none'}} className="sccssmsg">Sub Category Updated Successfully!</span>
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
					{rowData && (
						<div>
							{rowData.map((category, index) => (
								<div className="row mb-3" key={index}>
									<div className="col-lg-6 col-md-6 col-sm-12">
										<div className="row resultcateg">
											<div className="col-lg-9 col-md-9 col-sm-9">
												<h5 className="categfotn" id={category.category_id}>{category.category_name}</h5>
											</div>
											<div className="col-lg-3 col-md-3 col-sm-3">
												<button onClick={() => delcat(category.category_id)} className="btn btn-danger" style={{width: "20px", height: "28px"}}><i className="bx bx-x"></i></button>&nbsp;
												<button onClick={() => editcat(category.category_id)} className="btn btn-primary" style={{width: "20px", height: "28px"}}><i className="bx bx-edit"></i></button>
											</div>
										</div>
									</div>
									{category.subcategories && category.subcategories.length > 0 && (
										<div className="col-lg-6 col-md-6 col-sm-12">
											{/* Render subcategories */}
											{category.subcategories.map((subcategory, subIndex) => (
												<div key={subIndex}>
													<div className='row resultsidecateg' style={{marginBottom: "4px"}}>
														<div className="col-lg-9 col-md-9 col-sm-9">
															<p className="categsidefotn" id={subcategory.id}>{subcategory.name}</p>
														</div>
														<div className="col-lg-3 col-md-3 col-sm-3">
															<button onClick={() => delsubcat(subcategory.id)} className="btn btn-danger" style={{width: "20px", height: "28px"}}><i className="bx bx-x"></i></button>&nbsp;
															<button onClick={() => editsubcat(subcategory.id)} className="btn btn-primary" style={{width: "20px", height: "28px"}}><i className="bx bx-edit"></i></button>
														</div>
													</div>
												</div>
											))}
										</div>
									)}
								</div>
							))}
						</div>
					)}
				</div>
				<div className="col-lg-3 col-md-9 col-sm-12 greyback pt-5" style={{height: "100vh"}}>
					<h5 className="h5heading">Material Type</h5>
						<div id="alltypecateg">
								<div>
								</div>
						</div>
					{/* <div className="row resultsidecateg mb-1" style={{marginLeft: "0px"}}>
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
					</div> */}
				</div>
			</div>
		</div>	
		</>
	)
}