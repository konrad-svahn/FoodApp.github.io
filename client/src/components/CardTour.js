import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBCardGroup,
  MDBBtn,
  MDBIcon,
  MDBTooltip,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { likeTour ,deleteTour} from "../redux/features/tourSlice";
import { toast } from "react-toastify";

const CardTour = ({
  imageFile,
  description,
  title,
  tags,
  _id,
  name,
  likes,
}) => {
  const { user } = useSelector((state) => ({ ...state.auth }));
  const userId = user?.result?._id || user?.result?.googleId;

  const dispatch = useDispatch();
  const excerpt = (str, num) => {

    if (str.length > num) {
      str = str.substring(0, num) + " ...";
    }
    return str;
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this tour ?")) {
      dispatch(deleteTour({ id, toast }));
    }
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
          <MDBIcon fas icon="thumbs-up" />
          &nbsp;
          {likes.length > 2 ? (
            <MDBTooltip
              tag="a"
              title={`You and ${likes.length - 1} other people likes`}
            >
              {likes.length}
            </MDBTooltip>
          ) : (
            `${likes.length}`
          )}
        </>
      ) : (
        <>
          <MDBIcon far icon="thumbs-up" />
          &nbsp;{likes.length} 
        </>
      );
    }
    return (
      <>
        <MDBIcon far icon="thumbs-up" />
      </>
    );
  };

  const handleLike = () => {
    dispatch(likeTour({ _id }));
  };

  return (
    <MDBCardGroup style={{height: "370px"}}>
      <MDBCard className="h-100 mt-2 d-sm-flex rounded-5" style={{ maxWidth: "20rem"}} href={`/tour/${_id}`}>

        <div className="text-start" style={{ height: "0px"}}>
          <MDBBtn
            className="border border-secondary"
            style={{  position: "relative", float: "right", width:"105px", color: "#606080", top:"7px", right:"5px"}}
            tag="a"
            color="light"
            onClick={!user?.result ? null : handleLike}
          >
            {!user?.result ? (
              <MDBTooltip title="Please login to like tour" tag="a">
                <Likes />
              </MDBTooltip>
            ) : (
              <Likes />
            )}
          </MDBBtn>
          
          <div style={{ 
            visibility: window.location.pathname === "/dashboard" ? "visible":"hidden", 
            height: "0px",
            position:"relative",
            top: imageFile !== undefined ? "240px":"62px", 
            right: "-230px"}}
          >
            <MDBBtn className="mt-1" tag="a" color="none">
              <MDBIcon
                fas
                icon="trash"
                style={{ color: "#dd4b39" }}
                size="lg"
                onClick={() => handleDelete(_id)}
              />
            </MDBBtn>
            <Link to={`/editTour/${_id}`}>
              <MDBBtn tag="a" color="none">
                <MDBIcon
                  fas
                  icon="edit"
                  style={{ color: "#55acee", marginLeft: "10px" }}
                  size="lg"
                />
              </MDBBtn>
            </Link>
          </div>
        </div>

        <Link to={`/tour/${_id}`}>
          <div style={{height: "370px"}}>
          <MDBCardImage
            className="rounded-top-5"
            src={imageFile}
            alt=" "
            position="top"
            style={{ maxWidth: "100%", height: "230px" }}
          />
      
          <MDBCardBody>
          <div style={{height: imageFile === undefined ? "15px":"5px"}}></div>
            <MDBCardTitle style={{width:imageFile === undefined ? "190px":"200px", height:"40px"}} className="text-start res-name">{excerpt(title, 40)}</MDBCardTitle>
            <MDBCardText className="text-start">
              <div style={{width:"200px"}} className="text-start user"> by {name}</div>
              <div style={{width:"200px"}} className="text-start tag-card">
                {tags.slice(0, 2).map((tag) => (
                  <Link to={`/tours/tag/${tag}`}> #{tag}</Link>
                ))}
              </div>
              <div style={{position: "relative", top: "-40px", height:"15px"}}>{excerpt(description,imageFile === undefined ? 404:60)}</div>
            </MDBCardText>
          </MDBCardBody>
          </div>
        </Link>
      </MDBCard>
    </MDBCardGroup>
  );
};

export default CardTour;