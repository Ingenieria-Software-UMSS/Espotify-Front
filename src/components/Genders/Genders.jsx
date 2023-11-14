import React from "react";

const Genders = ({ artist }) => {
  return (
    <div style={{
      display: 'flex',
      gap: '20px',
      padding: '20px',
      flexWrap: 'wrap',
    }}>
      <button
        type="button"
        className="artist-button"
        style={{
          width: "200px",
          height: "200px",
          backgroundImage: `url('https://i.scdn.co/image/ab67fb8200005caf013ee3c983e6f60bf28bad5a')`,
          cursor: "pointer",
          backgroundColor: "#00b516",
          color: "#fff",
          fontWeight: "bold",
          fontSize: 20,
        }}
      >
        Pop
      </button>
      <button
        type="button"
        className="artist-button"
        style={{
          width: "200px",
          height: "200px",
          backgroundImage: `url('https://concerts.spotifycdn.com/images/live-events_category-image.jpg')`,
          cursor: "pointer",
          backgroundColor: "#00b5ad",
          color: "#fff",
          fontWeight: "bold",
          fontSize: 20,
        }}
      >
        Rock
      </button>
      <button
        type="button"
        className="artist-button"
        style={{
          width: "200px",
          height: "200px",
          cursor: "pointer",
          backgroundColor: "#673079",
          backgroundImage: `url('https://i.scdn.co/image/ab67fb8200005cafa59f90c077c9f618fd0dde30')`,
          color: "#fff",
          fontWeight: "bold",
          fontSize: 20,
        }}
      >
        Reggaetón
      </button>
      <button
        type="button"
        className="artist-button"
        style={{
          width: "200px",
          height: "200px",
          cursor: "pointer",
          backgroundColor: "#21ba45",
          backgroundImage: `url('https://i.scdn.co/image/ab67fb8200005caf65600929b4e7da6b813ce8b7')`,
          color: "#fff",
          fontWeight: "bold",
          fontSize: 20,
        }}
      >
        Cumbia
      </button>
      <button
        type="button"
        className="artist-button"
        style={{
          width: "200px",
          height: "200px",
          backgroundImage: `url('https://i.scdn.co/image/ab67fb8200005caf18079442afeec2a30f3b9502')`,
          cursor: "pointer",
          backgroundColor: "#00b5ad",
          color: "#fff",
          fontWeight: "bold",
          fontSize: 20,
        }}
      >
        Salsa
      </button>
      <button
        type="button"
        className="artist-button"
        style={{
          width: "200px",
          height: "200px",
          backgroundImage: `url('https://i.scdn.co/image/ab67fb8200005cafe914a07d20cec7a65e2e5dad')`,
          cursor: "pointer",
          backgroundColor: "#00b5ad",
          color: "#fff",
          fontWeight: "bold",
          fontSize: 20,
        }}
      >
        Merengue
      </button>
      <button
        type="button"
        className="artist-button"
        style={{
          width: "200px",
          height: "200px",
          backgroundImage: `url('	https://i.scdn.co/image/ab67fb8200005cafefa737b67ec51ec989f5a51d')`,
          cursor: "pointer",
          backgroundColor: "#00b5ad",
          color: "#fff",
          fontWeight: "bold",
          fontSize: 20,
        }}
      >
        Metal
      </button>
    </div>
  )
};

export default Genders;
