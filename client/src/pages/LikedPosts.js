import React, { useEffect } from "react";
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { getLikedTours } from "../redux/features/tourSlice";
import CardTour from "../components/CardTour";
import Spinner from "../components/Spinner";
import { useNavigate } from 'react-router-dom'
import Sorter from "../components/Sorter";
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
 
const Home = () => {
  const { user } = useSelector((state) => ({ ...state.auth }));
  const userId = user?.result?._id;
  const { tours, loading, curentPage} = useSelector(
    (state) => ({
      ...state.tour,
    })
  );
  const navigate =  useNavigate()
  const dispatch = useDispatch();
  const query = useQuery();
  const searchQuery = query.get("searchQuery");
  const location = useLocation()

  useEffect(() => {
    console.log(user)
    if (userId){
        dispatch(getLikedTours(userId));
    } else {
        navigate("/")
    }
  }, [curentPage]);

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
        <Sorter></Sorter>
        <MDBRow className="mt-5">
          {tours.length === 0 && location.pathname === "/LikedPosts" && (
            <MDBTypography className="text-center mb-0" tag="h2">
              No Tours Found
            </MDBTypography>
          )}

          {tours.length === 0 && location.pathname !== "/LikedPosts" && (
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