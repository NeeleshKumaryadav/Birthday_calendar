import React, { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';
import {v4 as uuidv4}  from 'uuid';
import { Props } from "./Calander";
import dayjs, { Dayjs } from "dayjs";
import FavBirthday from './Birthday';



export interface BirthEvent {
    text: string;
    starred:boolean
    id:string
  }

  export interface Propdrill{
    name:Dayjs,
    state:BirthEvent[]
}

const SearchForm: React.FC<Props> = (props) => {
  const [births, setBirths] = useState<BirthEvent[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredBirths, setFilteredBirths] = useState<BirthEvent[]>([]);
  const [favBirth,setFavBirth] = useState<BirthEvent[]>([]);

  const selectDate: Dayjs = props.name
  const date:String[] = selectDate.toDate().toDateString().split(' ');


  //pairing
  const monthPairing: { [key: string]: number } = {
    Jan: 1,
    Feb: 2,
    Mar: 3,
    Apr: 4,
    May: 5,
    Jun: 6,
    Jul: 7,
    Aug: 8,
    Sep: 9,
    Oct: 10,
    Nov: 11,
    Dec: 12
  };
  
  

  const getMonthDigit = (month: string): Number | undefined => {
    return monthPairing[month];
  };
  

  useEffect(() => {
    const fetchBirths = async () => {
      try {
        const monthDigit = getMonthDigit(date[1].toString());
        const day=  Number(date[2])
        const response = await axios.get<{ births: BirthEvent[] }>(`https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/births/${monthDigit}/${day}`);
        const data = response.data.births.map((birth: any) => ({id: uuidv4(), text: birth.text, starred: false }));
        if (data) {
          setBirths(data);
          setFilteredBirths(data); // Initialize filteredBirths with all data
        } else {
          console.error('Invalid data format from API');
        }
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchBirths();
  }, [date[0],date[1],date[2],date[3]]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (searchQuery==='') {
      setFilteredBirths([]);
    } else {
      const filtered = births.filter(birth => birth.text.toLowerCase().includes(searchQuery.toLowerCase()));
      setFilteredBirths(filtered);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // The filtering is already handled in handleInputChange
  };


  const toggleStar = (index: string) => {
    const updatedItem = filteredBirths.map((item)=>item.id==index ? {...item,starred:!item.starred} : item)
    setFilteredBirths(updatedItem);
    const fav = updatedItem.filter((item)=>item.starred===true)
    setFavBirth(fav)
    // React.render(<FavBirthday name={props.name} state={favBirth} />)

    // const newData = [...filteredBirths];
    // newData[index].starred = !newData[index].starred;
    // setFilteredBirths(newData);
    // Invoke your special function here with newData[index] as the parameter
  };



  return (
    <div className='flex'>
    <div className='w-1/2 bg-yellow-200 p-4'>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <strong className='text-2xl'>Birthday on {date[1]} {date[2]}</strong>
          <input
            type="search"
            id="default-search"
            value={searchQuery}
            onChange={handleInputChange}
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder=""
            required
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>
      <div className='h-96 w-100 overflow-scroll mx-auto'>
        <strong className='text-xl'>Search Result</strong>
        <ul>
          {filteredBirths.map((birth) => (
            <li key={birth.id}>
                <button onClick={() => toggleStar(birth.id)}>
                  {birth.starred ? '★' : '☆'}
                </button>
                {birth.text}</li>
          ))}
        </ul>
        
      </div>
    </div >
    <div className='w-1/2 bg-cyan-200'>
    <FavBirthday name={props.name} state={favBirth} />
    </div>
    </div>
  );
};

export default SearchForm;
