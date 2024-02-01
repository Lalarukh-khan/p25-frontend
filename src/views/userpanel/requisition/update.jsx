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
						{/* {row.status ? (
							<td>{row.addsl}</td>
						) : (
							<td>
								<button className="categbtn" onClick={() => addsn(row.id)} style={{width: "80%"}}>Add S/N</button>
							</td>
						)} */}
						<td>Not Done</td>
						<td>Attach File</td>
					</tr>
				))}
				</table>
			</div>
		)}
        </div>
    )
}
