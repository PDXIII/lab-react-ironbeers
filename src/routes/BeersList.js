import { useEffect, useState } from "react";
import Header from "../components/Header";
import Spinner from "../components/Spinner";
import axios from "axios";
import { Link } from "react-router-dom";

const BeersList = () => {
  const [beerList, setBeerList] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get(process.env.REACT_APP_API)
      .then((response) => {
        // console.log("beer list: ",response);
        setBeerList(response.data);
      })
      .catch((err) => console.error(err));
  };
  const renderList = () => {
    return (
      <section className="BeerList">
        {beerList.map((beer) => {
          return <BeerCard key={beer._id} beer={beer} />;
        })}
      </section>
    );
  };

  return (
    <>
      <Header />
      {beerList ? renderList() : <Spinner />}
    </>
  );
};

const BeerCard = (props) => {
  return (
    <Link to={"/beers/" + props.beer._id}>
      <div className="BeerCard grid grid-cols-4 p-4 gap-2 mb-2 shadow bg-slate-100 hover:shadow-lg hover:bg-slate-50 ">
        <img
          src={props.beer.image_url}
          alt={props.beer.name}
          className="col-span-1 m-auto h-24 w-auto"
        />
        <div className="text-container col-span-3 flex flex-col justify-center">
          <h2 className="text-xl font-semibold mb-1">{props.beer.name}</h2>
          <blockquote className="text-lg text-gray-600">
            {props.beer.tagline}
          </blockquote>
          <p>
            <strong>Created by: </strong>
            {props.beer.contributed_by}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default BeersList;