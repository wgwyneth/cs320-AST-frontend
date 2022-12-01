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
                            View/Add Comments    
                        </div>
                        {props.CanEdit && <div className="option" onClick={() => {props.setShowEditGoalModal(true); props.handleClose();}}>
                            Update Goals
                        </div>}
                        <div className="option" onClick={() => {props.handleClose()}}>
                            Return
                        </div>
                    </div>
                </div>  
            </div>
          
      </>
    );
}
export default SelectGoalActionModal;