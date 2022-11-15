import React from "react";
import "./createGoalStyle.css"
import { useState } from "react";

const CreateGoalModal = props => {

    return(
        <>
        {props.content}
        </>

    //     <div>
    //         <div id="myModal" className="modal">
    //             <div className="modal-content">
    //                 <div className="titleContainer">
    //                     <h3 className="title">Create Goal</h3>
    //                 </div>

    //                 <label className="sectionTitleContainer smallTitle" htmlfor="goalName">
    //                     Goal Name:
    //                 </label>

    //                 <input className="textInput" type="text" id="goalName" name="goalName" defaultValue="Goal Name Here"></input>

    //                 <label htmlfor="description">
    //                     <div className="sectionTitleContainer">
    //                         <p className="sectionTitle">
    //                             Description:
    //                         </p>
    //                     </div>
    //                 </label>
    //                 <textarea className="textArea" id="description" name="description" rows="4" cols="50" maxlength="500">This is my goal description</textarea>

    //                 <br></br>

    //                 <label className="sectionTitleContainer smallTitle" htmlFor="startdate">
    //                     Start Date:
    //                 </label>
    //                 <input className="dateInput" type="date" id="startdate" name="startdate"></input>

    //                 <br></br>

    //                 <label className="sectionTitleContainer smallTitle" style={{paddingRight:10}} htmlfor="enddate">
    //                     End Date:
    //                 </label>
    //                 <input className="dateInput" type="date" id="enddate" name="enddate"></input>


    //                 <br></br>

    //                 <label className="sectionTitleContainer smallTitle" style={{paddingRight:32}} htmlfor="status">
    //                     Status:
    //                 </label>


    //                 <select className="dropdownInput" name="status" id="status" >
    //                     <option value="Active">Active</option>
    //                     <option value="Complete">Complete</option>
    //                     <option value="Incomplete">Incomplete</option>
    //                 </select>

    //                 <br></br>

    //                 <label className="sectionTitleContainer smallTitle" style={{paddingRight:12}} htmlfor="category">
    //                     Category:
    //                 </label>
    //                 <select className="dropdownInput" name="category" id="category">
    //                     <option value="Personal">Personal</option>
    //                     <option value="Performance">Performance</option>
    //                     <option value="Developmental">Developmental</option>
    //                 </select>
    //                 <br></br>
    //                 <div className="close titleContainer">
    //                 <center>
    //                     <h3 className="updateTitle" onClick={props.handleClose}>
    //                         Finish
    //                     </h3>
    //                 </center>
    //             </div>
    //         </div>
    //     </div>
    // </div>
    );

}
export default CreateGoalModal