import React from "react";
import "./createGoalStyle.css"
import { useState } from "react";

const EditGoalModal = props => {

    return(
        <>
            <div id="myModal" className="modal">
                <div className="modal-content">

                    <div className="titleContainer">
                        <h3 className="title">Manage Goal</h3>
                    </div>

                    <label className="sectionTitleContainer smallTitle" htmlfor="goalName">
                        Goal Name:
                    </label>

                    <input readOnly className="textInput" type="text" id="goalName" name="goalName" defaultValue="Goal Name Here"></input>

                    <label htmlfor="description">
                        <div className="sectionTitleContainer">
                            <p className="description">
                                Description:
                            </p>
                        </div>
                    </label>

                    <textarea readOnly className="textArea" id="description" name="description" rows="4" cols="50" maxlength="500">This is my goal description</textarea>

                    <br></br>

                    <label className="sectionTitleContainer smallTitle" htmlFor="startdate">
                        Start Date:
                    </label>

                    <input readOnly className="dateInput" type="date" id="startdate" name="startdate"></input>

                    <br></br>

                    <label className="sectionTitleContainer smallTitle" style={{paddingRight:10}} htmlfor="enddate">
                        End Date:
                    </label>

                    <input readOnly className="dateInput" type="date" id="enddate" name="enddate"></input>

                    <br></br>

                    <label className="sectionTitleContainer smallTitle" style={{paddingRight:32}} htmlfor="status">
                        Status:
                    </label>

                    <select className="dropdownInput" name="status" id="status" >
                        <option value="Active">Active</option>
                        <option value="Complete">Complete</option>
                        <option value="Incomplete">Incomplete</option>
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

                    {/* <label htmlfor="comments">
                        <div className="sectionTitleContainer">
                            <p className="comments">
                                Comments:
                            </p>
                        </div>
                    </label>

                    <textarea className="textArea" id="comments" name="comments" rows="4" cols="50" maxlength="500">Enter comments here...</textarea>

                    <br></br> */}

                    <div className="close-titleContainer">
                      <center>
                          <h3 className="updateTitle" onClick={props.handleClose}>
                              Finish
                          </h3>
                      </center>
                    </div>

                </div>  
            </div>
          
      </>
    );
}
export default EditGoalModal;