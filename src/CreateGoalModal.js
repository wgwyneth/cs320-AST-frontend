import React from "react";
import "./createGoalStyle.css"
import { useState } from "react";
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;
const CreateGoalModal = props => {
    let [goalname, setGoalname] = useState("Goal name here...");
    let [description, setDescription] = useState("Description here...");
    let [startdate, setStartdate] = useState(today);
    let [enddate, setEnddate] = useState(today);
    const setName = (usr) => {
        setGoalname(usr.target.value);
    }
   
    const setDesc = (usr) => {
        setDescription(usr.target.value);
    }
    const setStart = (usr) => {
        setStartdate(usr.target.value);
    }
    
    const setEnd = (usr) => {
        setEnddate(usr.target.value);
    }

    return(
        <>
            <div id="myModal" className="modal">
                <div className="modal-content">
                    <div className="titleContainer">
                        <button className="xButton" onClick={props.handleClose}>X</button>
                        <h1 className="title">Create Goal</h1>
                    </div>
                    <label className="sectionTitleContainer smallTitle" htmlfor="goalName">
                        Goal Name:
                    </label>
                    <input className="textInput" type="text" id="goalName" name="goalName" defaultValue="Goal Name Here" value={goalname} onChange={setName}></input>
                    <label htmlfor="description">
                        <div className="sectionTitleContainer">
                            <p className="description">
                                Description:
                            </p>
                        </div>
                    </label>
                    <textarea className="textArea" id="description" name="description" rows="4" cols="50" maxlength="500" value={description} onChange={setDesc}>
                        This is my goal description
                    </textarea>
                    <br></br>
                    <label className="sectionTitleContainer smallTitle" htmlFor="startdate">
                        Start Date:
                    </label>
                    <input className="dateInput" type="date" id="startdate" name="startdate" value={startdate} onChange={setStart}></input>
                    <br></br>
                    <label className="sectionTitleContainer smallTitle" style={{paddingRight:10}} htmlfor="enddate">
                        End Date:
                    </label>
                    <input className="dateInput" type="date" id="enddate" name="enddate" value={enddate} onChange={setEnd}></input>
                    <br></br>
                    <label className="sectionTitleContainer smallTitle" style={{paddingRight:32}} htmlfor="status">
                        Status:
                    </label>
                    <select className="dropdownInput" name="status" id="status" >
                        <option value="Active">Active</option>
                        <option value="Complete">Complete</option>
                        <option value="Incomplete">Inactive</option>
                    </select>
                    <br></br>
                    <label className="sectionTitleContainer smallTitle" style={{paddingRight:12}} htmlfor="category">
                        Category:
                    </label>
                    <select className="dropdownInput" name="category" id="category">
                        <option value="Personal">Personal</option>
                        <option value="Performance">Performance</option>
                        <option value="Developmental">Developmental</option>
                    </select>
                    <br></br>
                    <div className="close-titleContainer">
                      <center>
                          <h3 className="updateTitle" onClick={async () => {
                            var stat = document.getElementById("status");
                            var cat = document.getElementById("category");
                            var statVal = stat.value;
                            var catVal = cat.value;
                            var empid = localStorage.getItem('EmpID');
                            const response = await fetch('http://localhost:9000/api/goals/create', {
                            method: 'POST',
                            body: JSON.stringify({empid: empid, startdate: startdate, enddate: enddate, description: description, goaltype: catVal, status: statVal, goalname: goalname}),
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            }
                            });
                            response.json().then((data) => {
                            try{
                                if (data.goalid){
                                    var goal = {GoalID: data.goalid, EmpID: empid, StartDate: startdate, EndDate: enddate, Description: description, GoalType: catVal, Status: statVal, goalname: goalname}
                                    props.addGoal(goal);
                                    props.handleClose();
                                }
                            }
                            catch{
                                console.log("error in creating goal");
                                alert("Wrong Password!");
                                props.handleClose()
                            }
                            });
                        }}>
                              Finish
                          </h3>
                      </center>
                    </div>
                </div>  
            </div>
          
      </>
    );
}
export default CreateGoalModal;