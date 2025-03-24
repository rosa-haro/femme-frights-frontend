import React, { useEffect, useState } from 'react'
import { getTMDBPosterUrl } from '../../../core/services/moviesFetch';
import { ClipLoader } from 'react-spinners';

const MoviePosterComponent = ({ tmdbId }) => {
    const [url, setUrl] = useState("");
    const [loaded, setLoaded] = useState(false);
  
    useEffect(() => {
      const load = async () => {
        const poster = await getTMDBPosterUrl(tmdbId);
        setUrl(poster);
      };
      if (tmdbId) load();
    }, [tmdbId]);
  
    if (!url) return <ClipLoader color="#888" size={30} />;
  
    return (
      <div style={{ position: "relative" }}>
        {!loaded && (
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
            <ClipLoader color="#888" size={30} />
          </div>
        )}
        <img
          src={url}
          alt="Movie poster"
          onLoad={() => setLoaded(true)}
          onError={(e) => {
            e.target.src = "/fallback-poster.jpg";
            setLoaded(true);
          }}
          style={{
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.3s ease-in-out",
            width: "100%",
            borderRadius: "8px",
          }}
        />
        <figcaption>
          Image provided by{" "}
          <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer">
            TMDb
          </a>
        </figcaption>
      </div>
    );
  };
  
  export default MoviePosterComponent;