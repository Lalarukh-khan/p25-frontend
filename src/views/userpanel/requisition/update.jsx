import {  Col, Row, Stack, Table, } from "react-bootstrap";
// import { ChevronDown } from "react-bootstrap-icons";

export default function UpdateRequistion() {
	const COLUMNS = [
		{ id: "SLNo", headerName: "SLNo" },
		{ id: "ShipmentNo", headerName: "ShipmentNo" },
		{ id: "Box_No", headerName: "Box_No" },
		{ id: "Part Number", headerName: "Part Number" },
		{ id: "Material Name", headerName: "Material Name" },
		{ id: "ItemDescription", headerName: "ItemDescription" },
		{ id: "ManufacturarName", headerName: "ManufacturarName" },
		{ id: "ItemCategory", headerName: "ItemCategory" },
		{ id: "ItemType", headerName: "ItemType" },
		{ id: "SerialNo", headerName: "SerialNo" },
		{ id: "AssignSite", headerName: "AssignSite" },
		{ id: "MaterialLocation", headerName: "MaterialLocation" },
		{ id: "MRStatus ", headerName: "MRStatus " },
		{ id: "Update Print File", headerName: "Update Print File" },
		{ id: "Installation done", headerName: "Installation done" },
	]
	const REQUISITIONS = [
		{
		"SLNo": "-",
		"ShipmentNo": "-",
		"Box_No": "-",
		"Part Number": "-",
		"Material Name": "-",
		"ItemDescription": "-",
		"ManufacturarName": "-",
		"ItemCategory": "-",
		"ItemType": "-",
		"SerialNo": "-",
		"AssignSite": "-",
		"MaterialLocation": "-",
		"MRStatus ": "-",
		"Update Print File": "-",
		"Installation done": "-",
		},
	]
    return (
        <div>
          <Row>
        <Col>
          <Table bordered>
            <thead>
              <tr>
                {COLUMNS.map((column, idx) => (
                  <th key={idx} style={{ minWidth: 120 }}>
                    <Stack direction="horizontal" gap={2}>
                      {column.headerName}

                      {/* <Button size="sm" variant="link" className="ms-auto"></Button> */}
                    </Stack>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {REQUISITIONS.map((item, idx) => (
                <tr key={idx}>
                  {COLUMNS.map((column, idx) => (
                    <td key={idx}>{item[column.id]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
        </div>
    )
}
