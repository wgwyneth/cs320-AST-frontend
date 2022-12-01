import React from "react";
import "./SelectGoalActionStyle.css";
import { useState } from "react";

const SelectGoalActionModal = props => {

    return(
        <>
            <div id="myModal" className="modal">
                <div className="modal-content">

                    <div className="options-container">
                        <div className="option" onClick={() => {console.log(props); props.setShowCommentModal(true); props.handleClose()}}>
                            <h3>
                                View/Add Comments    
                            </h3>
                        </div>
                        <div className="option" onClick={() => {props.setShowEditGoalModal(true); props.handleClose();}}>
                            <h3>
                                Update Goals
                            </h3>
                        </div>
                        <div className="option" onClick={() => {props.handleClose()}}>
                            <h3>
                                Return
                            </h3>
                        </div>
                    </div>
                </div>  
            </div>
          
      </>
    );
}
export default SelectGoalActionModal;