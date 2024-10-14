import React, { useEffect } from "react";
import {
  MDBIcon,
  MDBBtn,
  MDBTooltip,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { likeTour } from "../redux/features/tourSlice";

const Like =()=>{
    const dispatch = useDispatch();
    const { user } = useSelector((state) => ({ ...state.auth }));
    const { tour } = useSelector((state) => ({ ...state.tour }));
    const { id } = useParams();
    const _id = id;
    const userId = user?.result?._id || user?.result?.googleId;

    const Add = () => {
        if (tour.likes !== undefined && tour !== undefined) {
          if (tour.likes.length > 0) {
            return tour.likes.find((like) => like === userId) ? (
              <>
                <MDBIcon fas icon="thumbs-up" />
                &nbsp;
                {tour.likes.length > 2 ? (
                  <MDBTooltip
                    tag="a"
                    title={`You and ${tour.likes.length - 1} other people likes`}
                  >
                    {tour.likes.length}
                  </MDBTooltip>
                ) : (
                  `${tour.likes.length}`
                )}
              </>
            ) : (
              <>
                <MDBIcon far icon="thumbs-up" />
                &nbsp;{tour.likes.length} 
              </>
            );
          }
          return (
            <>
              <MDBIcon far icon="thumbs-up" />
            </>
          );
        }
    };
    
    const handleAdd = () => {
        dispatch(likeTour({ _id }));
    };

    return (
        <MDBBtn
        className="border border-secondary"
        style={{  position: "relative", float: "left", width:"105px", color: "#606080", top:"-15px", right:"6px"}}
        tag="a"
        color="light"
        onClick={!user?.result ? null : handleAdd}
        >
            {!user?.result ? (
            <MDBTooltip title="Please login to like tour" tag="a">
                <Add/>
            </MDBTooltip>
            ) : (
            <Add/>
            )}
        </MDBBtn>
    )
}

export default Like;