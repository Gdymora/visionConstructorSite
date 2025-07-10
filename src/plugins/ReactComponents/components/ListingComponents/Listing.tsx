import React, { useState, useEffect } from 'react';

interface ListingProps {
  mlsid: string;
  children?: React.ReactNode;
}

const Listing: React.FC<ListingProps> = ({ mlsid, children }) => {
  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCounter((prevCounter) => prevCounter + 1);
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array means this effect runs only once after the initial render

  return (
    <div>
      <div>Mlsid: {mlsid}</div>
      <div>{children}</div>
      <div>Counter: {counter}</div>
    </div>
  );
};

export default Listing;
