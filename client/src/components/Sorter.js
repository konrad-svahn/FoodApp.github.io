import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSortBy, setCurrentPage} from "../redux/features/tourSlice";
import { useNavigate } from 'react-router-dom'

const Sorter = () => {
    const navigate =  useNavigate()
    const dispatch = useDispatch();
    const { user } = useSelector((state) => ({ ...state.auth }));
    const {sortBy} = useSelector(
        (state) => ({
          ...state.tour,
        })
    );
    const changeSort = (sort) => {
        dispatch(setSortBy(sort))
        if (sort == "all") {
          dispatch(setCurrentPage(1))
          navigate("/")
        }
        if (sort == "likes") {
          navigate("/LikedPosts")
        }
    }

  return (
    user?.result?._id && (
      <select class="form-select" style={{ position:"relative", width: "94px", top:"35px", left:"6px"}} name="unit" onChange={(e) => changeSort(e.target.value)}>
        <option key="1" selected={"all" == sortBy ? true:false} value="all">all</option>
        <option key="2" selected={"likes" == sortBy ? true:false} value="likes">likes</option>
      </select>
    )
  );
};

export default Sorter;