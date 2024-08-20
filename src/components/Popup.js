import React from 'react';

function Popup({ selected, closePopup }) {
  return (
    <section className="popup">
      <div className="content">
        <div className="plot">
          <img src={selected.Poster} alt={selected.Title} />
          <div>
            <h2>
              {selected.Title} <span>({selected.Year})</span>
            </h2>
            <p className="rating">Rating: {selected.imdbRating}</p>
            <p>{selected.Plot}</p>
            <button className="close" onClick={closePopup}>
              Close
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Popup;
