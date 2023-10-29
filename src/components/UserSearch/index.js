import React, { useCallback, useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";
import ListUsers from "../ListUser";

function UserSearch() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [q, setQ] = useState("");

  const fetchUsers = useCallback(
    async (page) => {
      setLoading(true);
      const response = await axios.get(
        `https://api.github.com/search/users?q=${q}&page=${page}&per_page=${perPage}&sort=followers`,
      ).catch(err=>{
        console.log(err);
      });

      setData(response?.data);
      setTotalRows(response?.data?.total_count);
      setLoading(false);
    },
    [perPage, q]
  );

  const handlePageChange = (page) => {
    fetchUsers(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true);
    const response = await axios.get(
      `https://api.github.com/search/users?q=${q}&page=${page}&per_page=${newPerPage}`,
    ).catch(err=>{
      console.log(err);
    });

    setData(response?.data);
    setPerPage(newPerPage);
    setLoading(false);
  };

  useEffect(() => {
    if (q !== "") {
      fetchUsers(1);
    } else {
      setData([]);
      setLoading(false);
    }
  }, [q, fetchUsers]);

  return (
    <section>
      <div className="title">Github User Search</div>
      <input
        type="text"
        name="search"
        className="search-input"
        placeholder="Type here to search..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <ListUsers
        data={data?.items}
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        progressPending={loading}
      />
    </section>
  );
}

export default UserSearch;
