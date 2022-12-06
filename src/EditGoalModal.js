import React from "react";
import "./createGoalStyle.css"
import { useState } from "react";

const EditGoalModal = props => {

    return(
        <>
            <div id="myModal" className="modal">
                <div className="modal-content">

                    <label className="sectionTitleContainer smallTitle" style={{paddingRight:32}} htmlfor="status">
                        Status:
                    </label>

                    <select className="dropdownInput" name="status" id="status" >
                        <option value="Active">Active</option>
                        <option value="Complete">Complete</option>
                        <option value="Incomplete">Inactive</option>
                    </select>

                    <div className="close-titleContainer">
                      <center>
                          <h3 className="updateTitle" onClick={
                            async () => {props.handleClose();
                            var stat = document.getElementById("status").value;
                            const response = await fetch('http://localhost:9000/api/goals/update', {
                            method: 'POST',
                            body: JSON.stringify({"goalid": props.GoalID, "newstatus": stat}),
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            }
                            });
                            response.json().then((data) => {
                            try{
                                if (data.goalid){
                                    props.handleClose()
                                }
                            }
                            catch{
                                console.log("error in creating goal");
                                alert("Wrong Password!");
                                props.handleClose()
                            }
                            });
                            }
                            }>
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