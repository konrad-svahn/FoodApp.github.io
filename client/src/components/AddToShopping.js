import React, { useEffect } from "react";
import { MDBBtn } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addToShoping } from "../redux/features/authSlice";

const AddToShopping =()=>{
    const dispatch = useDispatch();
    const { user } = useSelector((state) => ({ ...state.auth }));
    const { id } = useParams();

    const Add = () => {
        if ( user !== null && user !== undefined && user.result.shoppingList !== undefined ) {
          if (user.result.shoppingList.length > 0) {
            return user.result.shoppingList.find((index) => index === id) ? ( 
              <svg xmlns="http://www.w3.org/2000/svg" width="23px" height="23px" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
              </svg>
            ) : (
              <p>add</p>
            );
          }
          return (
              <p>add</p>
          );
        }
    };
    
    const handleAdd = () => {
        dispatch(addToShoping({ id }));
    };

    useEffect(() => {
      if (user?.result) {
        localStorage.setItem("profile", JSON.stringify( user ))
      }
    }, [user]);
    

    return (
        <MDBBtn
        className="border border-secondary"
        style={{  position: "relative", float: "left", width:"105px", height:"49px", color: "#606080", top:"-15px", right:"6px"}}
        tag="a"
        color="light"
        onClick={!user?.result ? null : handleAdd}
        hidden={!user?.result ? true:false}
        >
          <Add/>
        </MDBBtn>
    )
}

export default AddToShopping;