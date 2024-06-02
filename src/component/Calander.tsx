import dayjs, { Dayjs } from "dayjs";
import React, { useEffect, useState } from "react";
import { generateDate, months, DateObject } from "../utils/calander";
import cn from "../utils/cn";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import FavBirthday from "./Birthday";
import SearchBar from './SearchBar';


interface GeneratedDate {
  date: Dayjs;
  currentMonth: boolean;
  today: boolean;
}

export interface Props{
    name:Dayjs
}

const Calendar: React.FC = () => {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const currentDate = dayjs();
  const [today, setToday] = useState<Dayjs>(currentDate);
  const [selectDate, setSelectDate] = useState<Dayjs>(currentDate);



  return (
    <>
    <div className="flex gap-10 sm:divide-x justify-center sm:w-90 mx-auto h-screen items-center sm:flex-row flex-col bg-blue-300">
      <div className="w-96 h-96 ">
        <div className="flex justify-between items-center br-blue">
          <h1 className="select-none font-semibold">
            {months[today.month()]}, {today.year()}
          </h1>
          <div className="flex gap-10 items-center">
            <GrFormPrevious
              className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
              onClick={() => {
                setToday(today.month(today.month() - 1));
              }}
            />
            <h1
              className="cursor-pointer hover:scale-105 transition-all"
              onClick={() => {
                setToday(currentDate);
              }}
            >
              Today
            </h1>
            <GrFormNext
              className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
              onClick={() => {
                setToday(today.month(today.month() + 1));
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-7">
          {days.map((day, index) => (
            <h1
              key={index}
              className="text-sm text-center h-14 w-14 grid place-content-center text-gray-500 select-none"
            >
              {day}
            </h1>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {generateDate(today.month(), today.year()).map(
            ({ date, currentMonth, today }: DateObject, index: number) => (
              <div
                key={index}
                className="p-2 text-center h-14 grid place-content-center text-sm border-t"
              >
                <h1
                  className={cn(
                    currentMonth ? "" : "text-gray-400",
                    today ? "bg-red-600 text-white" : "",
                    selectDate.toDate().toDateString() === date.toDate().toDateString()
                      ? "bg-black text-white"
                      : "",
                    "h-10 w-10 rounded-full grid place-content-center hover:bg-black hover:text-white transition-all cursor-pointer select-none"
                  )}
                  onClick={() => {
                    setSelectDate(date);
                  }}
                >
                  {date.date()}
                </h1>
              </div>
            )
          )}
        </div>
      </div>
    </div>
    <SearchBar name={selectDate}/>
    </>
  );
};

export default Calendar;
