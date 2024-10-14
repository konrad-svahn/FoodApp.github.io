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
import { likeTour } from "../redux/features/tourSlice";

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
  const excerpt = (str) => {
    if (str.length > 45) {
      str = str.substring(0, 45) + " ...";
    }
    return str;
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
        </>//{likes.length === 1 ? "Like" : "Likes"}
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
            style={{ float: "right"}}
            tag="a"
            //color="none"
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
        </div>

        <Link to={`/tour/${_id}`}>
          <div style={{height: "370px"}}>
          <MDBCardImage
            className="rounded-top-5"
            src={imageFile}
            alt={title}
            position="top"
            style={{ maxWidth: "100%", height: "230px" }}
          />
      
          <MDBCardBody>
            <MDBCardTitle className="text-start res-name">{title}</MDBCardTitle>
            <MDBCardText className="text-start">
              <div className="text-start user"> by {name}</div>
              <div className="text-start tag-card">
                {tags.map((tag) => (
                  <Link to={`/tours/tag/${tag}`}> #{tag}</Link>
                ))}
              </div>
              <div className="desc">{excerpt(description)}</div>
            </MDBCardText>
          </MDBCardBody>
          </div>
        </Link>
      </MDBCard>
    </MDBCardGroup>
  );
};

export default CardTour;