import { useEffect, useState } from "react";
import axiosClient from '../../../axios-client';
import { Link } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export default function UpdateRequistion() {
	const [rowData, setRowData] = useState(null);
	useEffect(() => {
		loadrequistion();
		document.getElementById("mainheadingtt").innerText = "Requisition Update";
	}, []);
	const loadrequistion = () => {
		axiosClient.get('/get-allreqs')
		.then(({data}) => {
			console.log(data); 
			const jsonData = data.data;
			setRowData(jsonData);
		})
		.catch((err) => {
			const response = err.response;
			if (response && response.status === 422) {
				console.log(response.data.message);
			}
		});
	}
	const uploadFile = async (id) => {
        const fileInput = document.getElementById('fileuplaod');
        const file = fileInput.files[0];
        if (!file) {
            console.error('No file selected.');
            return;
        }
        const formData = new FormData();
        formData.append('id', id);
        formData.append('file', file);
		axiosClient.post('/mrfileupload', formData)
		.then(({data}) => {
			console.log(data); 
			window.location.href = "/update-requisition";
		})
		.catch((err) => {
			const response = err.response;
			if (response && response.status === 422) {
				console.log(response.data.message);
			}
		});
    };
	const attachfile = (id) => {
		const formData = new FormData();
		formData.append('id', id);
		axiosClient.post('/downloadFile', formData, { responseType: 'blob' })
			.then(response => {
				// Create a URL for the Blob object
				// console.log(response.data);
				const url = window.URL.createObjectURL(response.data);
	
				// Create a temporary link element to trigger the download
				const link = document.createElement('a');
				link.href = url;
				link.setAttribute('download', "file.pdf"); // Set a default filename here
	
				// Append the link to the document body and trigger the download
				document.body.appendChild(link);
				link.click();
	
				// Cleanup: remove the link and revoke the object URL
				document.body.removeChild(link);
				window.URL.revokeObjectURL(url);
			})
			.catch((err) => {
				const response = err.response;
				if (response && response.status === 422) {
					console.log(response.data.message);
				}
			});
	};
	const excelconversion = () => {
		// Get the table element by its ID
		const table = document.getElementById('mrtable');
	
		// Convert the table to a worksheet
		const ws = XLSX.utils.table_to_sheet(table);
	
		// Create a workbook and add the worksheet
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
	
		try {
			// Generate a blob from the workbook
			const wboutBlob = new Blob([XLSX.write(wb, { bookType: 'xlsx', type: 'array' })], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
	
			// Initiate the download
			saveAs(wboutBlob, 'table.xlsx');
		} catch (error) {
			console.error('Error downloading file:', error);
		}
	};
	
    return (
        <div className="container">
			<div className="row">
				<div className="col-lg-3">
					<button className="categbtn mt-3" style={{background: "red"}} id="btncreatedby" onClick={excelconversion}>Download Data</button>
				</div>
			</div>
		{rowData && (
			<div className="mt-5 mb-3">
				<table className="shipmenttable3" id="mrtable">
				<tr>
					<th>SL No</th>
					<th>MR Created By</th>
					<th>Time And Date</th>
					<th>Site Name</th>
					<th>Outbound Date</th>
					<th>Reciever Company</th>
					<th style={{width: "200px"}}>MR Status</th>
					<th>Reject Note</th>
					<th>Insatllation Status</th>
					<th>Supporting Document</th>
				</tr>
				{rowData.map((row, index) => (
					<tr key={row.id}>
						<td>{index + 1}</td>
						<td>{row.created_by}</td>
						<td>{row.created_at}</td>
						<td>{row.sitename}</td>
						<td>{row.outbound}</td>
						<td>{row.compname}</td>
						<td style={{
							backgroundColor: row.status.toLowerCase().includes("s/n") ? "#99AF0C" :
												row.status.toLowerCase().includes("checking") ? "#260A60" :
												row.status.toLowerCase().includes("accepted") ? "#092957" :
												row.status.toLowerCase().includes("review") ? "#164F4B" :
												row.status.toLowerCase().includes("approval") ? "#07847C" :
												row.status.toLowerCase().includes("delivery") ? "#188407" :
												row.status.toLowerCase().includes("rejected") ? "#F22222" :
												row.status.toLowerCase().includes("completed") ? "#F26422" : "#3b2419",
							color: "#fff",
							cursor: "pointer",
							width: '200px',
							padding: '6px',
						}}>
							<Link to={`/load-requistion?id=${row.rm_number}`} style={{
								display: 'block',
								color: "#fff",
								textDecoration: 'none', // Remove underline
								textAlign: 'center', // Center align text
								lineHeight: '1.5', // Set line height
								padding: '6px' // Padding for link
							}}>
								{row.status}
							</Link>
							{row.status.toLowerCase().includes("rejected") && (
								<div>
									<Link to={`/recreate-requistion?id=${row.rm_number}`} style={{
										width: "60%",
										margin: 'auto',
										background: "rgb(49, 52, 250)",
										border: "1px solid rgb(49, 52, 250)",
										color: "#fff",
										display: "block",
										textAlign: 'center', // Center align text
										padding: '6px' // Padding for link
									}}>
										&nbsp;Recreate MR&nbsp;
									</Link>
								</div>
							)}
						</td>
						<td>{row.reject_note}</td>
						{row.status.includes("Completed") ? (
							<td>Done</td>
						) : (
							<td>Not Done</td>
						)}
						{row.status.includes("Delivery") ? (
							<td><input type="file" id="fileuplaod" onChange={() => uploadFile(row.userid)} /></td>
						) : row.status.includes("Completed") ? (
							<td onClick={() => attachfile(row.userid)} style={{ cursor: "pointer", fontWeight: "bold" }}>DOWNLOAD &nbsp;<i className="bx bx-download" style={{marginTop: "-5px"}}></i></td>
						) : row.status.includes("Rejected") ? (
							<td style={{ cursor: "pointer", fontWeight: "bold" }}>Edit</td>
						) : (
							<td style={{ cursor: "pointer", color: "grey" }}>Attached File &nbsp;<i className="bx bx-link-alt" style={{marginTop: "-5px"}}></i></td>
						)}
					</tr>
				))}
				</table>
			</div>
		)}
        </div>
    )
}
