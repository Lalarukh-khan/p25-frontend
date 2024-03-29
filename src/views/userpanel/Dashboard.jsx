// import { useStateContext } from "../contexts/ContextProvider";
import {useEffect, useState} from "react";
import React from 'react';
import axiosClient from "../../axios-client";
import { Link } from "react-router-dom";
// import $ from 'jquery';
import 'react-daterange-picker/dist/css/react-calendar.css';
// import { Link } from "react-router-dom";
import { Card, Col, Row, Table } from "react-bootstrap";
// import axiosClient from '../../../axios-client';

export default function UserDashboard() {
	const [rowData, setRowData] = useState(null);
	useEffect(() => {
		loadcatsubcat();
    dashboardreq();
		document.getElementById("mainheadingtt").innerText = "Dashboard";
	}, [])
	const loadcatsubcat = () => {
		axiosClient.get('/get-catsubcat')
		.then(({data}) => {
			setRowData(data.data);
      const jsonData = data.data;
      jsonData.forEach(option => {
        handleCategoryChange(option.category_id);
      });
		})
		.catch((err) => {
			const response = err.response;
			if (response && response.status === 422) {
				console.log(response.data.message);
			}
		});
	}
  const dashboardreq = () => {
		axiosClient.get('/req-dashboard')
		.then(({data}) => {
			document.getElementById("workinprogess").value = data.notApprovedRows;
			document.getElementById("deliversite").value = data.completedRows;
			document.getElementById("deliverpending").value = data.attachRows;
			document.getElementById("installdone").value = data.installRows;
			document.getElementById("totalcreated").innerText = data.totalRows; 
			document.getElementById("approvedby").innerText = data.approvedRows;
			document.getElementById("pendingby").innerText = data.notApprovedRows;
      // document.getElementById("prchase1").innerText = 200;
      // document.getElementById("warehs1").innerText = 90;
      // document.getElementById("addqty1").innerText = 60;
      // document.getElementById("prchase2").innerText = 200;
      // document.getElementById("warehs2").innerText = 90;
      // document.getElementById("addqty2").innerText = 55;
      // document.getElementById("prchase3").innerText = 600;
      // document.getElementById("warehs3").innerText = 340;
      // document.getElementById("addqty3").innerText = 300;
      // document.getElementById("prchase6").innerText = 600; 
      // document.getElementById("warehs6").innerText = 340;
      // document.getElementById("addqty6").innerText = 22;
      // document.getElementById("prchase7").innerText = 350;
      // document.getElementById("warehs7").innerText = 280;
      // document.getElementById("addqty7").innerText = 185;
      // document.getElementById("prchase8").innerText = 550;
      // document.getElementById("warehs8").innerText = 100;
      // document.getElementById("addqty8").innerText = 29;
		})
		.catch((err) => {
			const response = err.response; 
			if (response && response.status === 422) {
				console.log(response.data.message);
			}
		});
	}
  const handleSubcategoryChange = (selectedValue, catid) => {
    const payload = new FormData();
		payload.append('selectedValue', selectedValue);
		axiosClient.post('/getpuchaseqty', payload)
		.then(({data}) => {
      console.log(data);
      const jsonData = data.data;
			document.getElementById("prchase"+catid).innerText = jsonData;
		})
		.catch((err) => {
			document.getElementById("prchase"+catid).innerText = "0";
			const response = err.response;
			if (response && response.status === 422) {
				console.log(response.data.message);
			}
		});
		axiosClient.post('/getwarehouseqty', payload)
		.then(({data}) => {
      console.log(data);
      const jsonData = data.data;
      document.getElementById("warehs"+catid).innerText = jsonData;
		})
		.catch((err) => {
			document.getElementById("warehs"+catid).innerText = "0";
			const response = err.response;
			if (response && response.status === 422) {
				console.log(response.data.message);
			}
		});
		axiosClient.post('/getsiteqty', payload)
		.then(({data}) => {
      console.log(data);
      const jsonData = data.data;
      document.getElementById("addqty"+catid).innerText = jsonData;
		})
		.catch((err) => {
      document.getElementById("addqty"+catid).innerText = "0";
			const response = err.response;
			if (response && response.status === 422) {
				console.log(response.data.message);
			}
		});
  }
  const handleCategoryChange = (catid) => {
    const payload = new FormData();
		payload.append('selectedValue', catid);
		axiosClient.post('/getpuchaseqtybyctg', payload)
		.then(({data}) => {
      console.log(data);
      const jsonData = data.data;
			document.getElementById("prchasecat"+catid).innerText = jsonData;
		})
		.catch((err) => {
			document.getElementById("prchase"+catid).innerText = "0";
			const response = err.response;
			if (response && response.status === 422) {
				console.log(response.data.message);
			}
		});
		axiosClient.post('/getwarehouseqtybyctg', payload)
		.then(({data}) => {
      console.log(data);
      const jsonData = data.data;
      document.getElementById("warehscat"+catid).innerText = jsonData;
		})
		.catch((err) => {
			document.getElementById("warehs"+catid).innerText = "0";
			const response = err.response;
			if (response && response.status === 422) {
				console.log(response.data.message);
			}
		});
		axiosClient.post('/getsiteqtybyctg', payload)
		.then(({data}) => {
      console.log(data);
      const jsonData = data.data;
      document.getElementById("addqtycat"+catid).innerText = jsonData;
		})
		.catch((err) => {
      document.getElementById("addqty"+catid).innerText = "0";
			const response = err.response;
			if (response && response.status === 422) {
				console.log(response.data.message);
			}
		});
  }
    return (
        <div>
          <Row>
        <Col>
					{/* {rowData && (
						<table>
            <thead>
              <tr style={{borderTop: "1px solid transparent"}}>
                <th>Category &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp; </th>
                <th>Purchased Quantity</th>
                <th>Warehouse Quantity</th>
                <th>On site Quantity</th>
              </tr>
            </thead>
              <tbody>
							{rowData.map((category, index) => (
								<div key={index}>
                    <div colSpan={4} style={{color: "black", fontSize: "20px"}} id={category.category_id}>{category.category_name}</div>
										<td>
									{category.subcategories && category.subcategories.length > 0 && (
                    <div>
											{category.subcategories.map((subcategory, subIndex) => (
                          <div name="" id="" key={subIndex}>
                            <option value={subcategory.id} id={subcategory.id}>{subcategory.name}</option>
                          </div>
											))}
                      </div>
									)}
                </td>
                  <td style={{color: "black", fontWeight: "bold", fontSize: "18px"}}>100</td>
                  <td style={{color: "black", fontWeight: "bold", fontSize: "18px"}}>50</td>
                  <td style={{color: "black", fontWeight: "bold", fontSize: "18px"}}>10</td>
                </div>
							))}
              </tbody>
						</table>
					)} */}

{rowData && (
  <Table bordered>
    <thead>
      <tr style={{ borderTop: "1px solid transparent" }}>
        <th style={{width: "280px"}}>Category</th>
        <th style={{textAlign: "center"}}>Purchased Quantity</th>
        <th style={{textAlign: "center"}}>Warehouse Quantity</th>
        <th style={{textAlign: "center"}}>On site Quantity</th>
      </tr>
    </thead>
    <tbody>
      {rowData.map((category, index) => (
        <React.Fragment key={index}>
          <tr  style={{borderBottom: "1px solid transparent", marginBottom: "10px"}}>
            <td style={{ color: "black", fontSize: "20px" }}>
              {category.category_name}
            </td>
            <td style={{ color: "black", fontWeight: "bold", fontSize: "18px", textAlign: "center" }} id={"prchasecat"+category.category_id}>
              0
            </td>
            <td style={{ color: "black", fontWeight: "bold", fontSize: "18px", textAlign: "center" }} id={"warehscat"+category.category_id}>
              0
            </td>
            <td style={{ color: "black", fontWeight: "bold", fontSize: "18px", textAlign: "center" }} id={"addqtycat"+category.category_id}>
              0
            </td>
          </tr>
            <tr style={{borderBottom: "1px solid transparent"}}>
            {category.subcategories && category.subcategories.length > 0 ? (
              <td>
                <select className="shpinput" onChange={(event) => handleSubcategoryChange(event.target.value, category.category_id)}>
                  <option value=""> </option>
                  {category.subcategories.map((subcategory, subIndex) => (
                    <option key={subIndex} value={subcategory.id}>
                      {subcategory.name}
                    </option>
                  ))}
                </select>
              </td>
          ) : (
              <td></td>
          )}
            <td style={{ color: "black", fontWeight: "bold", fontSize: "18px", textAlign: "center" }} id={"prchase"+category.category_id}>
              0
            </td>
            <td style={{ color: "black", fontWeight: "bold", fontSize: "18px", textAlign: "center" }} id={"warehs"+category.category_id}>
              0
            </td>
            <td style={{ color: "black", fontWeight: "bold", fontSize: "18px", textAlign: "center" }} id={"addqty"+category.category_id}>
              0
            </td>
          </tr>
        </React.Fragment>
      ))}
    </tbody>
  </Table>
)}

          {/* <Table bordered>
            <thead>
              <tr style={{borderTop: "1px solid transparent"}}>
                <th>Category &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp; </th>
                <th>Purchased Quantity</th>
                <th>Warehouse Quantity</th>
                <th>On site Quantity</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{border: "1px solid transparent"}}>
                <td colSpan={4} style={{color: "black", fontSize: "20px"}}>Core System</td>
              </tr>
              <tr style={{borderBottom: "1px solid transparent"}}>
                <td className="dashsub">Main Equipment &nbsp; &nbsp;  &nbsp;  &nbsp; &nbsp; &nbsp;  &nbsp;  &gt;</td>
                <td style={{color: "black", fontWeight: "bold", fontSize: "18px"}}>100</td>
                <td style={{color: "black", fontWeight: "bold", fontSize: "18px"}}>50</td>
                <td style={{color: "black", fontWeight: "bold", fontSize: "18px"}}>10</td>
              </tr>
              <tr style={{border: "1px solid transparent"}}>
                <td colSpan={4} style={{color: "black", fontSize: "20px"}}>Radio Base Station</td>
              </tr>
              <tr style={{borderBottom: "1px solid transparent"}}>
                <td className="dashsub">2 BR&nbsp; &nbsp;  &nbsp;  &nbsp; &nbsp;   &nbsp;  &nbsp; &nbsp; &nbsp;  &nbsp;    &nbsp;  &nbsp; &nbsp; &nbsp;  &nbsp;    &nbsp;  &nbsp; &nbsp; &nbsp;  &nbsp;  &gt;</td>
                <td style={{color: "black", fontWeight: "bold", fontSize: "18px"}}>5000</td>
                <td style={{color: "black", fontWeight: "bold", fontSize: "18px"}}>5000</td>
                <td style={{color: "black", fontWeight: "bold", fontSize: "18px"}}>5000</td>
              </tr>
              <tr style={{border: "1px solid transparent"}}>
                <td colSpan={4} style={{color: "black", fontSize: "20px"}}>Antenna System</td>
              </tr>
              <tr style={{borderBottom: "1px solid transparent"}}>
                <td className="dashsub">RFDS System&nbsp; &nbsp;  &nbsp;  &nbsp; &nbsp;   &nbsp;  &nbsp; &nbsp; &nbsp;  &nbsp;  &nbsp;&gt;</td>
                <td style={{color: "black", fontWeight: "bold", fontSize: "18px"}}>5000</td>
                <td style={{color: "black", fontWeight: "bold", fontSize: "18px"}}>5000</td>
                <td style={{color: "black", fontWeight: "bold", fontSize: "18px"}}>5000</td>
              </tr>
              <tr style={{border: "1px solid transparent"}}>
                <td colSpan={4} style={{color: "black", fontSize: "20px"}}>Power System</td>
              </tr>
              <tr style={{borderBottom: "1px solid transparent"}}>
                <td className="dashsub">Rectifier&nbsp; &nbsp;  &nbsp;  &nbsp; &nbsp;   &nbsp;  &nbsp; &nbsp; &nbsp;  &nbsp;    &nbsp;  &nbsp; &nbsp; &nbsp;  &nbsp;  &nbsp;  &gt;</td>
                <td style={{color: "black", fontWeight: "bold", fontSize: "18px"}}>5000</td>
                <td style={{color: "black", fontWeight: "bold", fontSize: "18px"}}>5000</td>
                <td style={{color: "black", fontWeight: "bold", fontSize: "18px"}}>5000</td>
              </tr>
              <tr style={{border: "1px solid transparent"}}>
                <td colSpan={4} style={{color: "black", fontSize: "20px"}}>Subscriber Unit</td>
              </tr>
              <tr style={{borderBottom: "1px solid transparent"}}>
                <td className="dashsub">FS Mobile Radio UHF&nbsp; &nbsp;  &nbsp;  &gt;</td>
                <td style={{color: "black", fontWeight: "bold", fontSize: "18px"}}>5000</td>
                <td style={{color: "black", fontWeight: "bold", fontSize: "18px"}}>5000</td>
                <td style={{color: "black", fontWeight: "bold", fontSize: "18px"}}>5000</td>
              </tr>
              <tr style={{border: "1px solid transparent"}}>
                <td colSpan={4} style={{color: "black", fontSize: "20px"}}>VCC & Consoles</td>
              </tr>
              <tr style={{borderBottom: "1px solid transparent"}}>
                <td className="dashsub">VCC Equipped&nbsp; &nbsp;  &nbsp;  &nbsp; &nbsp; &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &gt;</td>
                <td style={{color: "black", fontWeight: "bold", fontSize: "18px"}}>5000</td>
                <td style={{color: "black", fontWeight: "bold", fontSize: "18px"}}>5000</td>
                <td style={{color: "black", fontWeight: "bold", fontSize: "18px"}}>5000</td>
              </tr>
              <tr style={{border: "1px solid transparent"}}>
                <td colSpan={4} style={{color: "black", fontSize: "20px"}}>Others</td>
              </tr>
              <tr style={{borderBottom: "1px solid transparent"}}>
                <td className="dashsub">Cabinet Premium&nbsp; &nbsp;  &nbsp;  &nbsp; &nbsp; &nbsp;  &nbsp; &gt;</td>
                <td style={{color: "black", fontWeight: "bold", fontSize: "18px"}}>5000</td>
                <td style={{color: "black", fontWeight: "bold", fontSize: "18px"}}>5000</td>
                <td style={{color: "black", fontWeight: "bold", fontSize: "18px"}}>5000</td>
              </tr>
            </tbody>
          </Table> */}
        </Col>
        <Col>
          <Card style={{background:"#F7F7F7"}}>
            <Card.Body>
              <Card.Title className="mb-4" style={{color: "black", textAlign: "center", fontWeight: "bold", fontSize: "25px"}}>Material Requisition Status</Card.Title>

              <div className="row mb-5">
                <div className="col-lg-4 col-md-4">
                  <Link to="/update-requisition">
                  <div style={{color: "white",fontSize:"30px", fontWeight:"bold",textAlign:"center",padding: "10px 0px", backgroundColor:"#F26422"}} id="totalcreated"></div>
                  <h5 className="h5heading" style={{textAlign: "center"}}>MR Created</h5>
                  </Link>
                </div>
                <div className="col-lg-4 col-md-4">
                  <Link to="/update-requisition">
                  <div style={{color: "white",fontSize:"30px", fontWeight:"bold",textAlign:"center",padding: "10px 0px", backgroundColor:"#3F9B49"}} id="approvedby"></div>
                  <h5 className="h5heading" style={{textAlign: "center"}}>MR Approved</h5>
                  </Link>
                </div>
                <div className="col-lg-4 col-md-4">
                  <Link to="/update-requisition">
                  <div style={{color: "white",fontSize:"30px", fontWeight:"bold",textAlign:"center",padding: "10px 0px", backgroundColor:"#C60000"}} id="pendingby"></div>
                  <h5 className="h5heading" style={{textAlign: "center"}}>MR Pending</h5>
                  </Link>
                </div>
              </div>
              <Card.Title className="mb-4" style={{color: "black", textAlign: "center", fontWeight: "bold", fontSize: "25px"}}>Material Delivery Status</Card.Title>

              <div className="row">
                <div className="col-lg-12">
                  <input className="categinput mb-1" type="text" style={{fontSize: "30px", fontWeight: "bold"}} readOnly id="workinprogess"/>
                  <h5 className="h5heading">Work in progress</h5>
                </div>
                <div className="col-lg-12">
                  <input className="categinput mb-1" type="text" style={{fontSize: "30px", fontWeight: "bold"}} readOnly id="deliversite"/>
                  <h5 className="h5heading">Delivery to site</h5>
                </div>
                <div className="col-lg-12">
                  <input className="categinput mb-1" type="text" style={{fontSize: "30px", fontWeight: "bold"}} readOnly id="deliverpending"/>
                  <h5 className="h5heading">Delivery Pending</h5>
                </div>
                <div className="col-lg-12">
                  <input className="categinput mb-1" type="text"  style={{fontSize: "30px", fontWeight: "bold"}} readOnly id="installdone"/>
                  <h5 className="h5heading">Installation Done</h5>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
        </div>
    )
}
