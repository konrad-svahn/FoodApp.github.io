import React from "react";
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { excerpt } from "../utility";

const RelatedTours = ({ relatedTours, tourId }) => {
  return (
    <>
      {relatedTours && relatedTours.length > 0 && (
        <>
          {relatedTours.length > 1 && <h4>Related Tours</h4>}
          <MDBRow className="row-cols-1 row-cols-md-3 g-4">
            {relatedTours
              .filter((item) => item._id !== tourId)
              .splice(0, 3)
              .map((item) => (
                <MDBCol>
                  <MDBCard style={{height: "370px"}}>
                    <Link to={`/tour/${item._id}`}>
                      <div style={{height: "370px"}}>
                        <MDBCardImage
                          src={item.imageFile}
                          alt=" "
                          position="top"
                          style={{ maxWidth: "100%", height: "230px" }}
                        />
                        <span className="text-start tag-card" style={{position: "relative", top: "4px"}}>
                          {item.tags.map((tag) => (
                            <Link to={`/tours/tag/${tag}`}> #{tag}</Link>
                          ))}
                        </span>
                        <MDBCardBody>
                          <MDBCardTitle className="text-start">
                            {item.title}
                          </MDBCardTitle>
                          <MDBCardText className="text-start">
                            {excerpt(item.description, item.imageFile === undefined ? 404:60)}
                          </MDBCardText>
                        </MDBCardBody>
                      </div>
                    </Link>  
                  </MDBCard>
                </MDBCol>
              ))}
          </MDBRow>
        </>
      )}
    </>
  );
};

export default RelatedTours;