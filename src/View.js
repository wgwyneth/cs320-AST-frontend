import React from 'react'
import Table, { SelectColumnFilter } from './Table'  // new
import CreateGoalModal from './CreateGoalModal'
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useState } from "react";

const getData = () => {
    const data = [];
    fetch('http://localhost:9000/api/goals/getAllGoals/1')
    .then((response) => {
      if(!response.ok) throw new Error(response.status);
      else return response.json();
    })
    .then((data) => {
      var goals = [];
      for (var d in data){
        var api = "http://localhost:9000/api/goals/get/" + d;
        fetch(api)
        .then((response) => {
          if(!response.ok) throw new Error(response.status);
          else return response.json();
        })
        .then((data) => {
          if(data[0])
            goals.push(data[0]);
        })
        .catch((error) => {
          console.log('error: ' + error);
        }); 
      }
      return goals;
    })
    .catch((error) => {
      console.log('error: ' + error);
    });

  // data = [
  //   {
  //       name: 'Create Table',
  //       desc: 'Create a react goalview talble',
  //       status: 'Complete',
  //       date: '11/1', 
  //   },
  //   {
  //       name: 'Create Stylesheet',
  //       desc: 'Create a stylesheet w/ ukg guide',
  //       status: 'Active',
  //       date: '11/3'
  //   },
  //   {
  //       name: "Integrate Frontend + Backend",
  //       desc: 'Integrate frontend with backend',
  //       status: 'Active',
  //       date: '11/12'
  //   },
  //   {
  //       name: "Create secure password",
  //       desc: 'Store passwords in a more secure database',
  //       status: 'Inactive',
  //       date: '11/1'
  //   }
  // ]
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