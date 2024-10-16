import React from "react";
import LeftSideBar from "../../components/Leftsidebar/LeftSideBar";
import ShowVideoGrid from "../../components/Showvideogrid/ShowVideoGrid";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function Search() {
  const { searchquery } = useParams();
  const res = useSelector(state=>state.videoReducer)?.data?.filter(q=>q?.title?.toUpperCase().includes(searchquery.toUpperCase()))

  /* const res = vids?.filter((q) =>
    q.title.toLowerCase().includes(searchquery.toLowerCase())
  ); */

  return (
    <div className="container_Pages_App">
      <LeftSideBar />
      <div className="container2_Pages_App">
        {res?.length !== 0 ? (
          <ShowVideoGrid vids={res} />
        ) : (
          <h3
            style={{
              color: "grey",
              letterSpacing: "0.03em",
              display: "flex",
              justifyContent: "center",
              marginTop: "20%",
            }}
          >
            Sorry, No results found!
          </h3>
        )}
      </div>
    </div>
  );
}

export default Search;
