import React, { useEffect } from "react";
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { getTours, setCurrentPage, setScrollPos} from "../redux/features/tourSlice";
import CardTour from "../components/CardTour";
import Spinner from "../components/Spinner";
import Sorter from "../components/Sorter";
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
 
const Home = () => {
  const { tours, loading, currentPage, numberOfPages, scrollPos, sortBy} = useSelector(
    (state) => ({
      ...state.tour,
    })
  );
  const dispatch = useDispatch();
  const query = useQuery();
  const searchQuery = query.get("searchQuery");
  const location = useLocation()
  
  const onBottom = () => {
    if (
      Math.abs(document.documentElement.scrollHeight - document.documentElement.scrollTop - document.documentElement.clientHeight) < 1 &&
      currentPage < numberOfPages && 
      window.scrollY != 0
    ) {
      dispatch(setScrollPos(window.scrollY))
      dispatch(setCurrentPage(currentPage + 1))
    }
  }

  useEffect(() => {
    if (loading == false) {
      if (scrollPos) window.scrollTo(0, scrollPos);
    }
  }, [loading]);

  useEffect(() => {
    dispatch(getTours(currentPage));
  }, [currentPage]);

  if (loading) {
    return <Spinner />;
  } 

  return (
    <>
      <div style={{height:"40px"}}></div>
      <div
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "1000px",
          alignContent: "center",
        }}
      >
        {window.onscroll = function() {onBottom()}}
        <Sorter></Sorter>

        <MDBRow className="mt-5">
          {tours.length === 0 && location.pathname === "/" && (
            <MDBTypography className="text-center mb-0" tag="h2">
              No Tours Found
            </MDBTypography>
          )}

          {tours.length === 0 && location.pathname !== "/" && (
            <MDBTypography className="text-center mb-0" tag="h2">
              We couldn't find any matches for "{searchQuery}"
            </MDBTypography>
          )}

          <MDBCol>
            <MDBContainer>
              <MDBRow className="row-cols-1 row-cols-md-3 g-2">
                {tours &&
                  tours.map((item) => <CardTour key={item._id} {...item} />)}
              </MDBRow>
            </MDBContainer>
          </MDBCol>
        </MDBRow>
      </div>
    </> 
  );
};

export default Home;