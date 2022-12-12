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
                
                data[0].startdate = (data[0].startdate.toString().split('T')[0]);
                data[0].enddate = (data[0].enddate.toString().split('T')[0]);
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

  addGoal(goal) {
    this.setState({data: [...this.state.data, goal], isLoaded: true});
    console.log(goal);
    console.log(this.state.data);
  }

  render() {
    const {goals, isLoaded} = this.state;
    const columns = [
      {
        Header: "First Name",
        accessor: 'firstname',
        Filter: SelectColumnFilter,
        filter: 'includes'
      },
      {
        Header: "Last Name",
        accessor: "lastname",
      },
      {
        Header: "GoalID",
        accessor: 'goalid',
      },
      {
        Header: "Employee ID",
        accessor: 'empid',
      },
      {
        Header: "Start Date",
        accessor: 'startdate'
      },
      {
        Header: "End Date",
        accessor: 'enddate',
      },
      {
        Header: "Goal Type",
        accessor: "goaltype"
      },
      {
        Header: "Status",
        accessor: "status"
      },
      {
        Header: "Description",
        accessor: 'description'
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
            <Table columns={columns} data={this.state.data} addGoal = {(goal) => this.addGoal(goal)}/>
          </div>
          </div>
          </div>
        </main>
      </div>
    );
  }
}
export default View;