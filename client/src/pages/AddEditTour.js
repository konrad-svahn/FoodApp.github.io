import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBValidation,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";
import ChipInput from "material-ui-chip-input";
import FileBase from "react-file-base64";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createTour, updateTour } from "../redux/features/tourSlice";

const initialState = {
  title: "",
  description: "",
  time: "",
  tags: [],
  ingerdients: [],
};

const initialIngredient = {
  ingredient: "",
  amount: 0,
  unit: ""
}

const AddEditTour = () => {
  const [tourData, setTourData] = useState(initialState);
  const [ingredientData, setingredientData] = useState(initialIngredient);
  const [tagErrMsg, setTagErrMsg] = useState(null);
  const { error, userTours } = useSelector((state) => ({
    ...state.tour,
  }));
  const { user } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { ingredient, amount, unit} = ingredientData;
  const { title, description, time, tags, ingerdients} = tourData;
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const singleTour = userTours.find((tour) => tour._id === id);
      console.log(singleTour);
      setTourData({ ...singleTour });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tags.length) {
      setTagErrMsg("Please provide some tags");
    }
    if (title && description && tags) {
      const updatedTourData = { ...tourData, name: user?.result?.name };
      console.log(updatedTourData)
      if (!id) {
        dispatch(createTour({ updatedTourData, navigate, toast }));
      } else {
        dispatch(updateTour({ id, updatedTourData, toast, navigate }));
      }
      handleClear();
    }
  };
  const onInputChange = (e) => {
    const { name, value} = e.target;
    setTourData({ ...tourData, [name]: value });
    console.log("tourData")
    console.log(tourData)//*/
  };
  const onIngredientChange = (e) => {
    const { name, value} = e.target;
    setingredientData({ ...ingredientData, [name]: value });
  };
  const handleAddTag = (tag) => {
    setTagErrMsg(null);
    setTourData({ ...tourData, tags: [...tourData.tags, tag] });
  };
  const handleDeleteTag = (deleteTag) => {
    setTourData({
      ...tourData,
      tags: tourData.tags.filter((tag) => tag !== deleteTag),
    });
  };
  const handleAddIngredient = () => {
    setTourData({ ...tourData, ingerdients: [...tourData.ingerdients, ingredientData] });
    setingredientData({...ingredientData, idNumber: ingredientData.idNumber + 1})
  };
  const handleDeleteIngredient = (delIngredient) => {
    setTourData({
      ...tourData,
      ingerdients: tourData.ingerdients.filter((ingredient) => ingredient !== delIngredient),
    });
  };
  const handleClear = () => {
    setTourData({ title: "", description: "", tags: [] });
  };
  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "450px",
        alignContent: "center",
        marginTop: "120px",
      }}
      className="container"
    >
      <MDBCard alignment="center">
        <h5>{id ? "Update Tour" : "Add Tour"}</h5>
        <MDBCardBody>
          <MDBValidation className="row g-3" noValidate>
            <div className="col-md-12">
              <div className="text-start">Enter Title:</div>
              <MDBInput
                placeholder="Enter the dishes name"
                type="text"
                value={title || ""}
                name="title"
                onChange={onInputChange}
                className="form-control"
                required
                invalid
                validation="Please provide title"
              />
            </div>
            <div className="col-md-12">
              <div className="text-start">Enter Description:</div>
              <textarea
                placeholder="Describe how the dish is made"
                type="text"
                value={description}
                name="description"
                onChange={onInputChange}
                className="form-control" 
                required
                invalid
                textarea
                rows={4}
                validation="Please provide description"
              />
            </div>
            <div className="col-md-12">
              <div className="text-start">Enter Cooking Duration:</div>
              <MDBInput
                placeholder="An estimate of how long the dish takes to cook"
                type="text"
                value={time}
                name="time"
                onChange={onInputChange}
                className="form-control" 
                required
                invalid
                textarea
                rows={4}
                validation="Please provide description"
              />
            </div>
            <div className="col-md-12">
              <div className="text-start" style={{marginBottom:"6px"}}>Enter Tags:</div>
              <ChipInput
                name="tags"
                variant="outlined"
                placeholder="Enter Tag"
                fullWidth
                value={tags}
                onAdd={(tag) => handleAddTag(tag)}
                onDelete={(tag) => handleDeleteTag(tag)}
              />
              {tagErrMsg && <div className="tagErrMsg">{tagErrMsg}</div>}
            </div>

            <div className="col-md-12 text-start">Enter Ingredients:</div>
            <div className="col-md-12 d-flex" style={{top:"-13px"}}>
              <MDBInput
                type="text"
                value={ingredient}
                name="ingredient"
                onChange={onIngredientChange}
                className="form-control"
                required
                invalid
                rows={4}
                validation="Please provide description"
              /> 
              <MDBInput 
                type="number"
                value={amount}
                name="amount"
                onChange={onIngredientChange}
                className="form-control"
                required
                invalid
                rows={4}
                validation="Please provide description"
              />
              <select class="form-select" aria-label="Default select example" style={{width: "94px"}} name="unit" onChange={onIngredientChange}>
                <option key="1" selected value=""></option>
                <option key="2" value="l">l</option>
                <option key="3" value="dl">dl</option>
                <option key="4" value="ml">ml</option>
                <option key="5" value="g">g</option>
              </select>

              <MDBBtn
                className="mt-2"
                onClick={
                  handleAddIngredient
                }
                color="success"
              >
                <i class="fas fa-plus" style={{position: "relative", left: "-3px"}}></i>
              </MDBBtn>
            </div>

            <ul class="list-group list-group-light list-group-small">
              {tourData.ingerdients && tourData.ingerdients.map((item) => 
              <li class="list-group-item text-start"  style={{height:"40px", paddingLeft:"18px"}}>{item.ingredient.substring(0, 40) + " " + item.amount + " " + item.unit}
                <MDBBtn
                  className="mt-2"
                  onClick={() => handleDeleteIngredient(item)}
                  color="danger"
                  style={{position: "relative", height:"30px", top:"-12px", left:"-9px", float:"right", width:"56px"}}
                >
                  <i class="fas fa-minus" style={{position: "relative", top:"-8px", left:"-5px"}}></i>
                </MDBBtn>
              </li>)}
            </ul>

            <div style={{marginLeft: "7px"}} className="d-flex justify-content-start">
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setTourData({ ...tourData, imageFile: base64 })
                }
              />
            </div>
            <div className="col-12">
              <MDBBtn style={{ width: "100%" }} onClick={handleSubmit}>
                {id ? "Update" : "Submit"}
              </MDBBtn>
              <MDBBtn
                style={{ width: "100%" }}
                className="mt-2"
                color="danger"
                onClick={handleClear}
              >
                Clear
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

export default AddEditTour;