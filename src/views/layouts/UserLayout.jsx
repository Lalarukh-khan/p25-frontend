import {Navigate, Outlet} from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
// import axiosClient from "../../axios-client";
// import {useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import $ from "jquery";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function UserLayout() {
	// const titleRef = useRef(null);
	const {token, setUser, setToken} = useStateContext();
	if (!token) {
		return <Navigate to="/login"/>
	}
	const onLogout = ev => {
		ev.preventDefault()
		setUser({})
		setToken(null)
	}
  return (
	<html
	lang="en"
	className="light-style layout-navbar-fixed layout-menu-fixed"
	dir="ltr"
	data-theme="theme-default"
	data-assets-path="assets/adminpanel/assets/"
	data-template="vertical-menu-template">
	<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0"
    />

		<title>P25 Project</title>
		<meta name="description" content="" />
		<link rel="icon" type="image/x-icon" href="assets/adminpanel/assets/img/favicon/favicon.ico" />
		<link rel="preconnect" href="https://fonts.googleapis.com" />
		<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
		<link
		href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap"
		rel="stylesheet"
		/>
		<link rel="stylesheet" href="assets/adminpanel/assets/vendor/fonts/boxicons.css" />
		<link rel="stylesheet" href="assets/adminpanel/assets/vendor/fonts/fontawesome.css" />
		<link rel="stylesheet" href="assets/adminpanel/assets/vendor/fonts/flag-icons.css" />
		<link rel="stylesheet" href="assets/adminpanel/assets/vendor/css/rtl/core.css" className="template-customizer-core-css" />
		<link rel="stylesheet" href="assets/adminpanel/assets/vendor/css/rtl/theme-default.css" className="template-customizer-theme-css" />
		<link rel="stylesheet" href="assets/adminpanel/assets/css/demo.css" />
		<link rel="stylesheet" href="assets/adminpanel/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css" />
		<link rel="stylesheet" href="assets/adminpanel/assets/vendor/libs/typeahead-js/typeahead.css" />
		<link rel="stylesheet" href="assets/adminpanel/assets/vendor/libs/apex-charts/apex-charts.css" />
		<script src="assets/adminpanel/assets/vendor/js/helpers.js"></script>
		<script src="assets/adminpanel/assets/vendor/js/template-customizer.js"></script>
		<script src="assets/adminpanel/assets/js/config.js"></script>
		<script type="text/javascript" src="https://cdn.jsdelivr.net/jquery/1/jquery.min.js"></script>
		<script type="text/javascript" src="https://cdn.jsdelivr.net/momentjs/latest/moment.min.js"></script>
		<script type="text/javascript" src="https://cdn.jsdelivr.net/bootstrap.daterangepicker/2/daterangepicker.js"></script>
		<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/bootstrap.daterangepicker/2/daterangepicker.css" />
		<link href="assets/adminpanel/assets/plugins/select2/css/select2.min.css" rel="stylesheet" />
		<link href="assets/adminpanel/assets/plugins/select2/css/select2-bootstrap4.css" rel="stylesheet" />
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-select@1.14.0-beta3/dist/css/bootstrap-select.min.css" />
		<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/0.8.2/css/flag-icon.min.css' />
		<link rel="stylesheet" type="text/css" href="assets/adminpanel/assets/plugins/quill/quill.core.css" />
		<link rel="stylesheet" type="text/css" href="assets/adminpanel/assets/plugins/quill/quill.snow.css" />
	</head>
	<body>
			<div className="page-wrapper">
				<div className="content-wrapper">
					<div className="container-xxl flex-grow-1 navtoprmvl">
						<Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
						<Container className="navbaredt" style={{padding: "0"}}>
							<Navbar.Brand href="#home" className="navbrand">Dashboard</Navbar.Brand>
							<Navbar.Toggle aria-controls="responsive-navbar-nav" />
							<Navbar.Collapse id="responsive-navbar-nav">
							<Nav className="me-auto">
								<Nav.Link href="#features" className="navlinkleft">Home</Nav.Link>
								<NavDropdown title="Material" className="navlinkleft" id="collapsible-nav-dropdown">
									<NavDropdown.Item href="/material-category">Add Material Category</NavDropdown.Item>
									<NavDropdown.Item href="/add-material">Add Material</NavDropdown.Item>
									<NavDropdown.Item href="/add-serial">Add Material S/N</NavDropdown.Item>
									<NavDropdown.Item href="/add-shipment">Shipment Information</NavDropdown.Item>
									<NavDropdown.Item href="/manufacture-information">Manufacture Information</NavDropdown.Item>
									<NavDropdown.Item href="/warehouse-information">Warehouse Information</NavDropdown.Item>
									<NavDropdown.Item href="/site-information">Site Information</NavDropdown.Item>
									<NavDropdown.Item href="/company-information">Company Information</NavDropdown.Item>
								</NavDropdown>
								<NavDropdown title="Material Requisition" className="navlinkleft" id="collapsible-nav-dropdown">
									<NavDropdown.Item href="#action/3.1">Create Requisition</NavDropdown.Item>
									<NavDropdown.Item href="#action/3.2">Requisition Update</NavDropdown.Item>
								</NavDropdown>
								<NavDropdown title="Settings" className="navlinkleft" id="collapsible-nav-dropdown">
									<NavDropdown.Item href="#action/3.1">User Information</NavDropdown.Item>
									<NavDropdown.Item href="#action/3.2">User Role Control</NavDropdown.Item>
								</NavDropdown>
							</Nav>
							<Nav>
								<Nav.Link onClick={onLogout}>
									<img src="assets/adminpanel/assets/images/navbar/bell.png" className="navlinkbell" />
								</Nav.Link>
								<Nav.Link eventKey={2} href="#memes">
									<img src="assets/adminpanel/assets/images/navbar/user.png"className="navlinkuser" />
								</Nav.Link>
							</Nav>
							</Navbar.Collapse>
						</Container>
						</Navbar>
						<Outlet />
						<div className="content-backdrop fade"></div>
					</div>
				</div>
			</div>
	<script src="assets/adminpanel/assets/vendor/libs/jquery/jquery.js"></script>
    <script src="assets/adminpanel/assets/vendor/libs/popper/popper.js"></script>
    <script src="assets/adminpanel/assets/vendor/js/bootstrap.js"></script>
    <script src="assets/adminpanel/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js"></script>
    <script src="assets/adminpanel/assets/vendor/libs/hammer/hammer.js"></script>
    <script src="assets/adminpanel/assets/vendor/libs/i18n/i18n.js"></script>
    <script src="assets/adminpanel/assets/vendor/libs/typeahead-js/typeahead.js"></script>
    <script src="assets/adminpanel/assets/vendor/js/menu.js"></script>
    <script src="assets/adminpanel/assets/vendor/libs/sortablejs/sortable.js"></script>
    <script src="assets/adminpanel/assets/vendor/libs/apex-charts/apexcharts.js"></script>
    <script src="assets/adminpanel/assets/js/main.js"></script>
    <script src="assets/adminpanel/assets/js/dashboards-analytics.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.0/jquery.validate.min.js"></script>
	<script src="assets/adminpanel/assets/plugins/quill/quill_new.min.js"></script>
	<script src="assets/adminpanel/assets/plugins/select2/js/select2.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/bootstrap-select@1.14.0-beta3/dist/js/bootstrap-select.min.js"></script>
	</body>
	</html>
  );
}
