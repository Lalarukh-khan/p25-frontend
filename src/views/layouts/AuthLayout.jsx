import {Navigate, Outlet} from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function AuthLayout() {
  const {token } = useStateContext();
  if (token) {
    return <Navigate to="/" />;
  }

  return (
	<html lang="en" className="light-style customizer-hide">
	<head>
		{/* <meta charset="UTF-8" /> */}
		<title> Login | P25 Project </title>
		<meta name="csrf-token"/>
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<link rel="preconnect" href="https://fonts.googleapis.com" />
		<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
		<link
		href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet" />

		<link rel="stylesheet" href="/assets/adminpanel/assets/vendor/fonts/boxicons.css" />
		<link rel="stylesheet" href="/assets/adminpanel/assets/vendor/fonts/fontawesome.css" />
		<link rel="stylesheet" href="/assets/adminpanel/assets/vendor/fonts/flag-icons.css" />

		<link rel="stylesheet" href="/assets/adminpanel/assets/vendor/css/rtl/core.css" className="template-customizer-core-css" />
		<link rel="stylesheet" href="/assets/adminpanel/assets/vendor/css/rtl/theme-default.css" className="template-customizer-theme-css" />
		<link rel="stylesheet" href="/assets/adminpanel/assets/css/demo.css" />
		<link rel="stylesheet" href="/assets/adminpanel/assets/css/login.css" />
		<link rel="stylesheet" href="/assets/adminpanel/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css" />
		<link rel="stylesheet" href="/assets/adminpanel/assets/vendor/libs/typeahead-js/typeahead.css" />

		<link rel="stylesheet" href="/assets/adminpanel/assets/vendor/libs/formvalidation/dist/css/formValidation.min.css" />
		<link href="/assets/adminpanel/assets/plugins/sweetalert2/sweetalert2.min.css" rel="stylesheet" type="text/css" />

		<link rel="stylesheet" href="/assets/adminpanel/assets/vendor/css/pages/page-auth.css" />

		<script src="/assets/adminpanel/assets/vendor/js/helpers.js"></script>

		<script src="/assets/adminpanel/assets/vendor/js/template-customizer.js"></script>
		<script src="/assets/adminpanel/assets/js/config.js"></script>
	</head>
	<body>
      <Outlet />
		<script src="/assets/adminpanel/assets/plugins/sweetalert2/sweetalert2.min.js"></script>
		<script src="/assets/adminpanel/assets/js/danidev.js"></script>

		<script src="/assets/adminpanel/assets/vendor/libs/jquery/jquery.js"></script>
		<script src="/assets/adminpanel/assets/vendor/libs/popper/popper.js"></script>
		<script src="/assets/adminpanel/assets/vendor/js/bootstrap.js"></script>
		<script src="/assets/adminpanel/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js"></script>

		<script src="/assets/adminpanel/assets/vendor/libs/hammer/hammer.js"></script>
		<script src="/assets/adminpanel/assets/vendor/libs/i18n/i18n.js"></script>
		<script src="/assets/adminpanel/assets/vendor/libs/typeahead-js/typeahead.js"></script>

		<script src="/assets/adminpanel/assets/vendor/js/menu.js"></script>

		<script src="/assets/adminpanel/assets/vendor/libs/formvalidation/dist/js/FormValidation.min.js"></script>
		<script src="/assets/adminpanel/assets/vendor/libs/formvalidation/dist/js/plugins/Bootstrap5.min.js"></script>
		<script src="/assets/adminpanel/assets/vendor/libs/formvalidation/dist/js/plugins/AutoFocus.min.js"></script>

		<script src="/assets/adminpanel/assets/js/main.js"></script>

		<script src="/assets/adminpanel/assets/js/pages-auth.js"></script>
		
		<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-P57DBTR"
		height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
		<noscript>
			<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-P57DBTR"
			height="0" width="0" style="display:none;visibility:hidden"></iframe>
		</noscript>

		{/* @yield('js') */}

	</body>
	</html>
  );
}
