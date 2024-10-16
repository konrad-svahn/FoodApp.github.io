import React, { useEffect } from "react";
import {
  MDBCard,
  MDBRow,
  MDBCol,
  MDBTypography,
  MDBContainer 
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getToursByUser } from "../redux/features/tourSlice";
import CardTour from "../components/CardTour";
import Spinner from "../components/Spinner";
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Dashboard = () => {
  const { user } = useSelector((state) => ({ ...state.auth }));
  const { userTours, loading } = useSelector((state) => ({ ...state.tour }));
  const userId = user?.result?._id;
  const dispatch = useDispatch();
  const query = useQuery();
  const searchQuery = query.get("searchQuery");
  const location = useLocation();

  useEffect(() => {
    if (userId) {
      dispatch(getToursByUser(userId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <div style={{ height: "80px" }}></div>
      <div
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "1000px",
          alignContent: "center",
        }}
      >
          <h5 className="text-center">Dashboard: {user?.result?.name}</h5>
          {userTours.length === 0 && (
          <h3>No tour available with the user: {user?.result?.name}</h3>
          )}
          <hr style={{ maxWidth: "570px" }} />
          <MDBRow className="mt-5">
          <MDBCol>
            <MDBContainer>
              <MDBRow className="row-cols-1 row-cols-md-3 g-2">
              <Link to={`/addTour`}>
                <MDBCard style={{ maxWidth: "600px", height: "370px"}} className="mt-2" >
                  <i class="fas fa-plus fa-9x" style={{position: "relative", top: "100px", color: "#000000"}}></i>
                  <div style={{ height:"120px" }}></div>
                  add recipe 
                </MDBCard>
              </Link>
              {userTours.length > 0 && (
                userTours &&
                  userTours.map((item) => <CardTour key={item._id} {...item} />)
                )}
              </MDBRow>
            </MDBContainer>
          </MDBCol>
        </MDBRow> 
      </div>
    </>
  );
};

export default Dashboard;
