import dayjs, { Dayjs } from "dayjs";
import { Key, useContext, useEffect, useState } from "react";
import axios from "axios";
import { BirthEvent } from "./SearchBar";
import { Propdrill } from "./SearchBar";




const FavBirthday : React.FC<Propdrill> = (props) =>{
    const selectDate: Dayjs = props.name
    const date:String[] = selectDate.toDate().toDateString().split(' ');

    
    return (
        <div className="h-96 w-96 sm:px-5">
        <h1 className="font-semibold">
          <p className="text-2xl"> Favourite Birthdays</p> <br /> {selectDate.toDate().toDateString()}
        </h1>
        <p className="text-gray-400">
            {props.state && 
            <ul>
            {props.state.map((birth)=>(
               <li key={birth.id}>{birth.text}</li>
            ))}
            </ul>}
        </p>
      </div>
    );
}

export default FavBirthday;