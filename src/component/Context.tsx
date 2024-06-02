import { ReactNode, createContext, useContext, useState } from "react";
import { BirthEvent } from './SearchBar';



interface ContextProps {
  data:BirthEvent[],
  updateData: (newData:BirthEvent) => void
}


const MyContext = createContext<ContextProps>({
  data: [],
  updateData: (newData: BirthEvent) => {},
});


export const MyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<BirthEvent[]>([]);

  const updateData = (newData: BirthEvent) => {
    setData((prevData) => [...prevData, newData]);
  };

  return (
    <MyContext.Provider value={{ data, updateData }}>
      {children}
    </MyContext.Provider>
  );
};

// Export context hook
export const useMyContext = () => useContext(MyContext);