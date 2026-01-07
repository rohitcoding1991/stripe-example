import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import dayjs from "dayjs";

export default function ProductDataTable({ data }) {
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "productName", headerName: "Product Name", width: 130 },
    {
      field: "amount",
      headerName: "Amount",
      width: 90,
    },
    {
      field: "paymentDate",
      headerName: "Payment Date",
      width: 130,
    },
    {
      field: "paymentTime",
      headerName: "Payment Time",
      width: 160,
    }
  ];

  // Mapping the data into the desired format
  const rows = data?.map((item, idx) => {
    return {
      id: idx+1, // Using index as ID
      productName: item?.productName, 
      amount: "$"+item?.amount, 
      paymentDate: dayjs(item?.paymentDate).format("DD MMM, YYYY"),
      paymentTime: dayjs(item?.paymentDate).format("hh:mm, A"),
    };
  });

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
