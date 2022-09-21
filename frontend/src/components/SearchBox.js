import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBox() {
  let [name, setName] = useState("");

  let navigate = useNavigate();

  let submitHandler = (e) => {
    e.preventDefault();
    navigate(`/search/name/${name}`);
  };
  return (
    <form className="search" onSubmit={submitHandler}>
      <div className="row">
        <input
          type="text"
          name="q"
          id="q"
          onChange={(e) => setName(e.target.value)}
        />
        <button className="" type="submit">
          <svg
            width="20"
            height="20"
            viewBox="0 0 17 18"
            class=""
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="#000" fill-rule="evenodd">
              <path
                class="_34RNph"
                d="m11.618 9.897l4.225 4.212c.092.092.101.232.02.313l-1.465 1.46c-.081.081-.221.072-.314-.02l-4.216-4.203"
              ></path>
              <path
                class="_34RNph"
                d="m6.486 10.901c-2.42 0-4.381-1.956-4.381-4.368 0-2.413 1.961-4.369 4.381-4.369 2.42 0 4.381 1.956 4.381 4.369 0 2.413-1.961 4.368-4.381 4.368m0-10.835c-3.582 0-6.486 2.895-6.486 6.467 0 3.572 2.904 6.467 6.486 6.467 3.582 0 6.486-2.895 6.486-6.467 0-3.572-2.904-6.467-6.486-6.467"
              ></path>
            </g>
          </svg>
          {/* <i className="fa fa-search"></i> */}
        </button>
      </div>
    </form>
  );
}

export default SearchBox;
