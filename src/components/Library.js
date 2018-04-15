import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from './../data/albums';
import './Library.css';

class Library extends Component {
  constructor(props) {
    super(props);
    this.state = { albums: albumData };
  }

  render () {
    return (
      <section className="mdl-grid library">
          {
            this.state.albums.map( (album, index) =>
              <Link to={`/album/${album.slug}`} key={index} className="mdl-cell mdl-cell--6-col" >
                  <img src={album.albumCover} alt={album.title} />
                  <div className="album-info">
                    <div className="title-info" style={{color: "#3c1053", fontWeight:"bold"}}>{album.title}</div>
                    <div className="artist-info" style={{color: "white", fontWeight: "normal"}}>{album.artist}</div>
                    <div className="songs-length-info" style={{color: "white", fontSize: "x-small"}}>{album.songs.length} songs</div>
                  </div>
              </Link>
            )
          }
      </section>
    );
  }
}

export default Library;
