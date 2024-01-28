// import { useStateContext } from "../contexts/ContextProvider";
// import {useEffect, useState} from "react";
// import axiosClient from "../../axios-client";
// import $ from 'jquery';
import 'react-daterange-picker/dist/css/react-calendar.css';
import { Link } from "react-router-dom";
import { Card, Col, Form, Row, Stack, Table } from "react-bootstrap";
// import axiosClient from '../../../axios-client';

export default function UserDashboard() {
  const MATERIAL_REQUISITION_STATUSES = [
    {
      title: "MR Created",
      value: 100,
      variant: 'primary'
    },
    {
      title: "MR Approved",
      value: 90,
      variant: 'success'
    },
    {
      title: "MR Pending",
      value: 10,
      variant: 'danger'
    }
  ]
  
  const MATERIAL_DELIVERY_STATUSES = [
    {
      title: 'Work in Progress',
      value: 90
    },
    {
      title: 'Delivery to site ',
      value: 50
    },
    {
      title: 'Delivery Pending',
      value: 40
    },
    {
      title: 'Installation done',
      value: 10
    }
  ]
    return (
        <div>
          <Row>
        <Col>
          <Table bordered>
            <thead>
              <tr>
                <th>Category</th>
                <th>Purchased Quantity</th>
                <th>Warehouse Quantity</th>
                <th>On site Quantity</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={4}>Core System</td>
              </tr>
              <tr>
                <td><Link>Main Equipment</Link></td>
                <td>5000</td>
                <td>5000</td>
                <td>5000</td>
              </tr>
            </tbody>
          </Table>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title className="mb-4">Material Requisition Status</Card.Title>

              <Stack direction="horizontal" gap={3} className="mb-5">
                {MATERIAL_REQUISITION_STATUSES.map((item, idx) => (
                  <Card
                    key={idx}
                    bg={item.variant}
                    className="w-100"
                    text="white"
                  >
                    <Card.Header>{item.title}</Card.Header>
                    <Card.Body>
                      <Card.Title style={{ fontSize: '2rem', color: '#fff'}}>{item.value}</Card.Title>
                    </Card.Body>
                  </Card>
                ))}
              </Stack>

              <Card.Title className="mb-4">Material Delivery Status</Card.Title>

              <Stack>
                <Form>
                  {MATERIAL_DELIVERY_STATUSES.map((item, idx) => (
                    <Form.Group key={idx} as={Row} className="mb-3">
                      <Form.Label column sm="3">
                        {item.title}
                      </Form.Label>
                      <Col sm="9">
                        <Form.Control disabled type="text" placeholder={item.title} value={item.value} />
                      </Col>
                    </Form.Group>
                  ))}
                </Form>
              </Stack>
            </Card.Body>
          </Card>
        </Col>
      </Row>
        </div>
    )
}
