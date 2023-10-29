import React from "react";
import DataTable from "react-data-table-component";
import "./styles.css";

function ListUsers({
  data = [],
  paginationTotalRows,
  onChangeRowsPerPage,
  onChangePage,
  progressPending,
}) {
  const columns = [
    {
      name: "S.No",
      cell: (row, index) => index + 1,
    },
    {
      name: "Username",
      selector: (row) => row.login,
    },
    {
      name: "Avatar",
      selector: (row) => <img src={row.avatar_url} alt="profile_image" />,
    },
    {
      name: "Profile",
      selector: (row) => <a href={row?.html_url} target="_blank" rel="noreferrer">View Profile</a>,
    },
    {
      name: "Type",
      selector: (row) => row.type,
    },
  ];
  return (
    <DataTable
      columns={columns}
      data={data}
      pagination
      responsive
      highlightOnHover
      noDataComponent={<h3>No search results found.</h3>}
      paginationServer
      paginationTotalRows={paginationTotalRows}
      onChangeRowsPerPage={onChangeRowsPerPage}
      onChangePage={onChangePage}
      progressPending={progressPending}
    />
  );
}

export default ListUsers;
