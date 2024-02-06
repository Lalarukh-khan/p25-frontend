import { useEffect, useState } from "react";
import axiosClient from '../../../axios-client';
import { Link } from 'react-router-dom';

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
	
	
    return (
        <div className="container">
		{rowData && (
			<div className="mt-5 mb-3">
				<table className="shipmenttable">
				<tr>
					<th>SL No</th>
					<th>MR Created By</th>
					<th>Time And Date</th>
					<th>Site Name</th>
					<th>Outbound Date</th>
					<th>Reciever Company</th>
					<th>MR Status</th>
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
						<td><Link to={`/load-requistion?id=${row.rm_number}`} style={{width: "80%", background: row.status.toLowerCase().includes("rejected") ? "#F22222" : "#F26422", border:"1px solid #F26422", color:"#fff"}}>{row.status}</Link>
						<br/>
						<Link to={`/recreate-requistion?id=${row.rm_number}`} style={{width: "50%", margin: 'auto', background: row.status.toLowerCase().includes("rejected") ? "rgb(49, 52, 250)" : "#F26422", border:"1px solid rgb(49, 52, 250)", color:"#fff", display: row.status.toLowerCase().includes("rejected") ? "block" : "none"}}>{row.status.toLowerCase().includes("rejected") ? "Recreate MR" : ""}</Link></td>
						{row.status.includes("Completed") ? (
							<td>Done</td>
						) : (
							<td>Not Done</td>
						)}
						{row.status.includes("Delivery") ? (
							<td><input type="file" id="fileuplaod" onChange={() => uploadFile(row.userid)}   /></td>
						) : (
							<td onClick={() => attachfile(row.userid)}><u style={{cursor:"pointer"}}>Attach file</u></td>
						)}
					</tr>
				))}
				</table>
			</div>
		)}
        </div>
    )
}
