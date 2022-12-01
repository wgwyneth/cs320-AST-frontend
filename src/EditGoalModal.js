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
                        <option value="Incomplete">Incomplete</option>
                    </select>

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