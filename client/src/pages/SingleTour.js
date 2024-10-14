import React, { useEffect, useLayoutEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBContainer,
  MDBIcon,
  MDBBtn,
  MDBTooltip,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import { getRelatedTours, setCurrentPage, getTour, likeTour } from "../redux/features/tourSlice";
import RelatedTours from "../components/RelatedTours";
import DisqusThread from "../components/DisqusThread";
import AddToShopping from "../components/AddToShopping";
import Like from "../components/Like"

const SingleTour = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state.auth }));
  const { tour, relatedTours } = useSelector((state) => ({ ...state.tour }));
  const { id } = useParams();
  const userId = user?.result?._id || user?.result?.googleId;
  const navigate = useNavigate();
  const tags = tour?.tags;

  const back = () => {
    dispatch(setCurrentPage(1))
    navigate("/")
  }

  useEffect(() => {
    if (id) {
      dispatch(getTour(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    tags && dispatch(getRelatedTours(tags));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags]);

  return (
    <>
      <img 
        class="bg-image" 
        src={tour.imageFile}
        style={{position: "fixed", height: "100vh", width: "100vw", left: "0vw" }}
      /> 
      <div class="mask" style={{position: "fixed", backgroundColor: tour.imageFile === undefined ? 'rgba(0, 0, 0, 0.1)':'rgba(0, 0, 0, 0.7)' }}></div>     
      <div style={{ height: "100px" }} ></div>

      <MDBContainer>
        <MDBCard className="mb-3 mt-2" style={{ backgroundColor: "rgb(240, 230, 234, 0.8)" }}>
          <MDBCardBody>
            <MDBBtn
              tag="a"
              color="none"
              style={{ float: "left", color: "#000" }}
              onClick={back}
            >
              <MDBIcon
                fas
                size="lg"
                icon="long-arrow-alt-left"
                style={{ float: "left" }}
              />
            </MDBBtn>
            <h3>{tour.title}</h3>
            <span>
              <p className="text-start tourName" style={{ position:"relative", left: "-3px"}}>Created By: {tour.name}</p>
            </span>
            <p className="text-start" style={{ position:"relative", top: "18px", left: "2px", fontSize: 16}}> Estimated cooking time: {tour.time !== undefined ? tour.time: "N/A"}</p>
            <div style={{ float: "left", position:"relative", top: "2px"}}>
              <span className="text-start">
                {tour && tour.tags && tour.tags.map((item) => `#${item} `)}
              </span>
            </div>
            <br/>
            <MDBCardText className="text-start mt-2" style={{ position:"relative", top: "-4px", left: "-3px"}}>
              <MDBIcon
                style={{ float: "left", margin: "5px" }}
                far
                icon="calendar-alt"
                size="lg"
              />
              <small className="text-muted">
                {moment(tour.createdAt).fromNow()}
              </small>
            </MDBCardText>

            <Like></Like>
            <AddToShopping></AddToShopping>
            <div style={{ height: "64px" }}></div>
            <ul class="list-group list-group-small border-0">
              {tour.ingerdients && tour.ingerdients.map((item) => 
              <li class="list-group-item text-start border-0"  style={{height:"40px", color: "#000000", backgroundColor: "rgb(255, 255, 255, 0)", top:"-15px", right:"-1px" }}>
                {item.ingredient.substring(0, 40) + " " + item.amount + " " + item.unit}
              </li>)}
            </ul>
            <MDBCardText className="lead mb-0 text-start" style={{color: "#000000"}}>
              {tour.description}
            </MDBCardText>
          </MDBCardBody>
          <div style={{ margin: "15px" }}>
            <RelatedTours relatedTours={relatedTours} tourId={id} />
          </div>
        </MDBCard>
        <DisqusThread id={id} title={tour.title} path={`/tour/${id}`} />
      </MDBContainer>
    </>
  );
};

export default SingleTour;