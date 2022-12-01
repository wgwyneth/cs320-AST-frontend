import React, {useEffect} from 'react'
import Table, { SelectColumnFilter } from './Table'
import Comments from './Comments';
import  './Table.css'

class View extends React.Component {
  constructor(props){
    super(props);
    this.state={data: [], isLoaded: false};
    const getData = async () => {
      var dataToGet = fetch('http://localhost:9000/api/goals/getAllGoals/' + localStorage.getItem('EmpID'))
      .then((response) => {
        if(!response.ok) throw new Error(response.status);
        else return response.json();
      })
      .then(async (data) => {
        var goals = [];
        for (var i = 0; i<data.length; i++){
          var api = "http://localhost:9000/api/goals/get/" + data[i].GoalID;
          var goal = await fetch(api)
          .then((response) => {
            if(!response.ok) throw new Error(response.status);
            else return response.json();
          })
          .then((data) => {
            if(data[0])
              {
                data[0].StartDate = (data[0].StartDate.toString().split('T')[0]);
                data[0].EndDate = (data[0].EndDate.toString().split('T')[0]);
                // data[0].StartDate = data[0].StartDate
                goals.push(data[0]);
              }
          })
          .catch((error) => {
            console.log('error: ' + error);
          });
        }
        this.setState({data: goals, isLoaded: true});
        return goals
      })
      return dataToGet;
    }
    getData();
  }
  
  render() {
    const {goals, isLoaded} = this.state;
    const columns = [
      {
        Header: "GoalID",
        accessor: 'GoalID',
      },
      {
        Header: "Employee ID",
        accessor: 'EmpID',
        Filter: SelectColumnFilter,
        filter: 'inclucdes'
      },
      {
        Header: "Start Date",
        accessor: 'StartDate'
      },
      {
        Header: "End Date",
        accessor: 'EndDate',
      },
      {
        Header: "Goal Type",
        accessor: "GoalType"
      },
      {
        Header: "Status",
        accessor: "Status"
      },
      {
        Header: "Description",
        accessor: 'Description'
      },
      {
        Header: "Goal Name",
        accessor: 'goalname'
      }
    ]
    
    return (
      <div>
      <style>
      @import url('https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c&display=swap');
      </style> 
        <main>
          <div className="top">
            <h1 className="">My Goals</h1>
          </div>
          <div class="table-container">
          <div class="wrapper">
          <div class="table-head">
            <Table columns={columns} data={this.state.data} />
          </div>
          </div>
          </div>
        </main>
      </div>
    );
  }
}
export default View;