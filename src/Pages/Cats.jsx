import { useEffect, useState } from "react";
import AxiosInstance from "../utils/AxiosInstance";

const Cats = () => {
  const [cats, setCats] = useState([]);

  const getCats = async () => {
    let response = await AxiosInstance.get(`categories/`);
    setCats(response.data);
  };

  useEffect(() => {
    getCats();
  }, []);

  return (
    <>
      <div className="container">
        <ul>
          {cats.map((cat) => (
            <li>
              {cat.id} | {cat.name} | {cat.description}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Cats;
