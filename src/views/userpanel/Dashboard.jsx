// import { useStateContext } from "../contexts/ContextProvider";
// import {useEffect, useState} from "react";
// import axiosClient from "../../axios-client";
// import $ from 'jquery';
import 'react-daterange-picker/dist/css/react-calendar.css';
// import { Link } from "react-router-dom";
import { Card, Col, Row, Table } from "react-bootstrap";
// import axiosClient from '../../../axios-client';

export default function UserDashboard() {
  // const MATERIAL_REQUISITION_STATUSES = [
  //   {
  //     title: "MR Created",
  //     value: 100,
  //     variant: 'primary'
  //   },
  //   {
  //     title: "MR Approved",
  //     value: 90,
  //     variant: 'success'
  //   },
  //   {
  //     title: "MR Pending",
  //     value: 10,
  //     variant: 'danger'
  //   }
  // ]
  
  // const MATERIAL_DELIVERY_STATUSES = [
  //   {
  //     title: 'Work in Progress',
  //     value: 90
  //   },
  //   {
  //     title: 'Delivery to site ',
  //     value: 50
  //   },
  //   {
  //     title: 'Delivery Pending',
  //     value: 40
  //   },
  //   {
  //     title: 'Installation done',
  //     value: 10
  //   }
  // ]
    return (
        <div>
          <Row>
        <Col>
          <Table bordered>
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
          </Table>
        </Col>
        <Col>
          <Card style={{background:"#F7F7F7"}}>
            <Card.Body>
              <Card.Title className="mb-4" style={{color: "black", textAlign: "center", fontWeight: "bold", fontSize: "25px"}}>Material Requisition Status</Card.Title>

              <div className="row mb-5">
                <div className="col-lg-4 col-md-4">
                  <div style={{color: "white",fontSize:"30px", fontWeight:"bold",textAlign:"center",padding: "10px 0px", backgroundColor:"#F26422"}}>100</div>
                  <h5 className="h5heading" style={{textAlign: "center"}}>MR Created</h5>
                </div>
                <div className="col-lg-4 col-md-4">
                  <div style={{color: "white",fontSize:"30px", fontWeight:"bold",textAlign:"center",padding: "10px 0px", backgroundColor:"#3F9B49"}}>90</div>
                  <h5 className="h5heading" style={{textAlign: "center"}}>MR Created</h5>
                </div>
                <div className="col-lg-4 col-md-4">
                  <div style={{color: "white",fontSize:"30px", fontWeight:"bold",textAlign:"center",padding: "10px 0px", backgroundColor:"#C60000"}}>10</div>
                  <h5 className="h5heading" style={{textAlign: "center"}}>MR Created</h5>
                </div>
              </div>
              <Card.Title className="mb-4" style={{color: "black", textAlign: "center", fontWeight: "bold", fontSize: "25px"}}>Material Delivery Status</Card.Title>

              <div className="row">
                <div className="col-lg-12">
                  <input className="categinput mb-1" type="text" value="90" style={{fontSize: "30px", fontWeight: "bold"}}/>
                  <h5 className="h5heading">Work in progress</h5>
                </div>
                <div className="col-lg-12">
                  <input className="categinput mb-1" type="text" value="50" style={{fontSize: "30px", fontWeight: "bold"}}/>
                  <h5 className="h5heading">Delivery to site</h5>
                </div>
                <div className="col-lg-12">
                  <input className="categinput mb-1" type="text" value="40" style={{fontSize: "30px", fontWeight: "bold"}}/>
                  <h5 className="h5heading">Delivery Pending</h5>
                </div>
                <div className="col-lg-12">
                  <input className="categinput mb-1" type="text" value="10" style={{fontSize: "30px", fontWeight: "bold"}}/>
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
