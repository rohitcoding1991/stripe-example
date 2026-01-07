import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import dayjs from "dayjs";
import { Chip } from "@mui/material";

export default function DataTable({ data }) {
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "planName", headerName: "Plan Name", width: 130 },
    {
      field: "amount",
      headerName: "Amount",
      width: 90,
    },
    {
      field: "startDate",
      headerName: "Start Date",
      width: 160,
    },
    {
      field: "endDate",
      headerName: "End Date",
      width: 160,
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => {
        return params.row.status === "active" ? (
          <Chip label="Active" color="success" />
        ) : null;
      },
    },
  ];

  // Mapping the data into the desired format
  const rows = data?.subscriptionHistory?.map((item, idx) => {
    return {
      id: idx+1, // Using index as ID
      planName: item?.planName, 
      amount: "$"+item?.amount, 
      startDate: dayjs(item?.startDate).format("DD MMM, YYYY"),
      endDate: dayjs(item?.endDate).format("DD MMM, YYYY"), 
      status: item?.status,
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
