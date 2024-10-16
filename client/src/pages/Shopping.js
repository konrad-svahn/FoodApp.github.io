import React, { useEffect, useLayoutEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBTypography,
  MDBContainer,
  MDBIcon,
  MDBBtn,
  MDBCol,
  MDBRow,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { getManyTours } from "../redux/features/tourSlice";
import { addToShoping } from "../redux/features/authSlice";

const Shopping = () => {

    const dispatch = useDispatch();
    const { user } = useSelector((state) => ({ ...state.auth }));
    const { tours } = useSelector((state) => ({ ...state.tour }));
    
    useEffect(() => {
        if (user?.result) {
            dispatch(getManyTours(user.result.shoppingList))
            localStorage.setItem("profile", JSON.stringify( user ))
        }
    }, [user]);

    const handleAdd = (item) => {
        let id = item._id;
        dispatch(addToShoping({ id }));
    };

    const updateStats = (toAdd, stats) => {
        if (toAdd[2] == "") {
            stats.none = stats.none + toAdd[1]
        } else {
            stats[toAdd[2]] = stats[toAdd[2]] + toAdd[1] 
        }
        return stats
    }

    const handleString = (str1, str2) => {
        let sub1 = str1.trimEnd()
        let sub2 = str2.trimEnd()
        let sub3 = sub1.substr(-1);
        let sub4 = sub2.substr(-1);
        if (sub3 == "s") {
            sub1 = sub1.substring(0, sub1.length - 1)
        }
        if (sub4 == "s") {
            sub2 = sub2.substring(0, sub2.length - 1)
        }
        return [sub1, sub2] 
    }

    // creates the ingredient list based on the recipes the user has added to it
    const getIngredientList = () => {
        let list = []
        tours && tours.map((item) => {item.ingerdients.forEach(element => {        
            list.push([element.ingredient, element.amount, element.unit])
        })})

        let list2 = []
        for(let i = 0; i < list.length; i++){  
            let in2 = true
            for(let j = 0; i + j < list.length; j++){
                if (i != i+j) {
                    let [str1, str2] = handleString(list[i][0],list[i+j][0]) 
                    if (str1 == str2) {
                        in2 = false   
                    }
                }
            }
            if (in2) {
                let stats = {none: 0, l: 0, dl: 0, ml: 0, g: 0}
                stats = updateStats(list[i],stats)

                for (let j = 0; j < i; j++) {
                    let [str1, str2] = handleString(list[i][0],list[j][0])
                    if (str1 == str2) {
                        stats = updateStats(list[j],stats)
                    }
                }
                list2.push([list[i][0], stats])
            }
        }
        //console.log(list2)
        return list2
    }

    return (
        <>
        <div style={{ height: "100px" }} ></div>
        <MDBContainer>
            <MDBTypography className="text-center mb-0" tag="h2" hidden={!tours.length == 0 ? true:false}>
                No Recipes In List
            </MDBTypography>
            <MDBCard className="mb-3 mt-2 border-0" style={{ backgroundColor: "rgb(240, 230, 234, 0.8)" }}>
            <MDBCardBody style={{ minHeight: "770px" }}>                    
                <MDBRow className="row-cols-1 row-cols-md-2 g-2">
                    <MDBCol>
                        <MDBCard style={{ backgroundColor: "rgb(255, 255, 255, 0)", marginTop:"8px", minHeight:"77vh", height: "98%"}} hidden={tours.length == 0 ? true:false}> 
                            <div class="text-start" style={{paddingLeft:"12px", paddingRight:"90px", paddingBottom:"8px", paddingTop:"14px", fontWeight:"bold", fontSize:"20px"}}>
                                All ingerdients
                            </div>
                            <ul class="list-group list-group-small border-0" style={{position:"relative", paddingBottom:"20px", left:"12px"}}>
                                {tours && getIngredientList().map((item) => 
                                <li class="list-group-item text-start border-0"  style={{height:"25px", color: "#000000", backgroundColor: "rgb(255, 255, 255, 0)" }}>
                                    <div class="flex-container" style={{display: "flex"}}>
                                        <div style={{ paddingRight: "4px" }}> {item[0] + ": "} </div>
                                        <div hidden={item[1].none < 1 ? true:false} style={{ paddingRight: "15px" }}> {item[1].none + ""}</div>
                                        <div hidden={item[1].l < 1 ? true:false} style={{ paddingRight: "15px" }}> {item[1].l + "l"}</div>
                                        <div hidden={item[1].dl < 1 ? true:false} style={{ paddingRight: "15px" }}> {item[1].dl + "dl"}</div>
                                        <div hidden={item[1].ml < 1 ? true:false} style={{ paddingRight: "15px" }}> {item[1].ml + "ml"}</div>
                                        <div hidden={item[1].g < 1 ? true:false} style={{ paddingRight: "15px" }}> {item[1].g + "g"}</div>
                                    </div>
                                </li>)}
                            </ul>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol>
                        <ul class="list-group list-group-small border-0">
                            {tours && tours.map((item) => 
                            <li class="list-group-item border-0"  style={{ backgroundColor: "rgb(255, 255, 255, 0)", marginBottom:"10px"}}>
                                <MDBCard  style={{ backgroundColor: "rgb(255, 255, 255, 0)"}}>
                                    <div style={{height:"10px"}}>
                                        <MDBBtn
                                            className="border border-secondary"
                                            style={{  position: "relative", width:"50px", height:"30px", color: "rgb(240, 230, 234)", float:"right", right:"6px", top:"8px"}}
                                            tag="a"
                                            color="danger"
                                            onClick={() => handleAdd(item)}
                                            hidden={!user?.result ? true:false}
                                        >
                                            <i class="fas fa-minus" style={{position: "relative", top:"-8px", left:"-5px"}}></i>
                                        </MDBBtn>
                                    </div>
                                    <div class="text-start" style={{paddingLeft:"12px", paddingRight:"90px", paddingBottom:"8px", paddingTop:"4px", fontWeight:"bold", fontSize:"20px"}}>
                                        {item.title.substring(0, 114)}
                                    </div>
                                    <div class="text-start" style={{padding:"8px", paddingBottom:"14px"}}>
                                        {item.ingerdients.map((ingredient) => 
                                            <li style={{ position:"relative", left:"18px" }}>
                                                {ingredient.ingredient+" "+ingredient.amount+" "+ingredient.unit+" "}
                                            </li>
                                        )}
                                    </div>
                                </MDBCard>
                            </li>)}
                        </ul>
                    </MDBCol>
                </MDBRow>
            </MDBCardBody> 
            </MDBCard>
        </MDBContainer>
        
        </>
    );
};

export default Shopping;