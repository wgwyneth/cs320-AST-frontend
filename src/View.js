import React from 'react'
import Table, { SelectColumnFilter } from './Table'  // new
import CreateGoalModal from './CreateGoalModal'
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useState } from "react";

const getData = () => {
    //eventually change so that frontend and backend are integrated
  const data = [
    {
        name: 'Create Table',
        desc: 'Create a react goalview talble',
        status: 'Complete',
        date: '11/1', 
    },
    {
        name: 'Create Stylesheet',
        desc: 'Create a stylesheet w/ ukg guide',
        status: 'Active',
        date: '11/3'
    },
    {
        name: "Integrate Frontend + Backend",
        desc: 'Integrate frontend with backend',
        status: 'Active',
        date: '11/12'
    },
    {
        name: "Create secure password",
        desc: 'Store passwords in a more secure database',
        status: 'Inactive',
        date: '11/1'
    }
  ]
  return [...data, ...data, ...data, ...data]
}

function App() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShowCreate = () => setShow(true);

  const columns = React.useMemo(() => [
    {
      Header: "Name",
      accessor: 'name',
    },
    {
      Header: "Description",
      accessor: 'desc',
    },
    {
      Header: "Status",
      accessor: 'status',
      Filter: SelectColumnFilter,
      filter: 'includes'
    },
    {
      Header: "Due by Date",
      accessor: 'date',
    },
  ], [])

  const data = React.useMemo(() => getData(), [])

  return (
    <>
      <h1>My Goals</h1>
      <div>
        <Table columns={columns} data={data} />
      </div>
    </>
  );
}

export default App;