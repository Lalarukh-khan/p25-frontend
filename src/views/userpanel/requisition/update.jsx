import { useEffect, useState } from "react";
import axiosClient from '../../../axios-client';
import { Link } from 'react-router-dom';

export default function UpdateRequistion() {
	const [rowData, setRowData] = useState(null);
	useEffect(() => {
		loadrequistion();
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
						<td><Link to={`/load-requistion?id=${row.rm_number}`} style={{width: "80%", background: "#F26422", border:"1px solid #F26422", color:"#fff"}}>{row.status}</Link></td>
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
