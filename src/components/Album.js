import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';
import './Album.css';

class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      currentTime: 0,
      volume: .5,
      duration: album.songs[0].duration,
      isPlaying: false
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
  }

  componentDidMount() {
    this.eventListeners = {
      timeupdate: e => {
        this.setState({ currentTime: this.audioElement.currentTime });
      },
      durationchange: e => {
        this.setState({ duration: this.audioElement.duration });
      },
      volumechange: e => {
        this.setState({ volume: this.audioElement.volume });
      }
    };
    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
    this.audioElement.addEventListener('volumechange', this.eventListeners.volumechange);
  }

  componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
    this.audioElement.removeEventListener('volumechange', this.eventListeners.volumechange);
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }

  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true });
  }

  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false });
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
    } else {
      if (!isSameSong) { this.setSong(song); }
      this.play();
    }
  }

  handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong ===song);
    const newIndex = Math.max(0, currentIndex - 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play(newSong);
  }

  handleNextClick() {
     const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
     const newIndex = Math.min(this.state.album.songs.length - 1 , currentIndex + 1);
     const newSong = this.state.album.songs[newIndex];
     this.setSong(newSong);
     this.play(newSong);
  }

  handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: newTime});
  }

  formatTime(time) {
    if ( isNaN( time)) {
      return "-:--";
    } else {
    const minutes = Math.floor(time / 60);
    const seconds = (((time % 60) < 10) ? ( "0" + Math.floor(time % 60)) : (Math.floor(time % 60)));
    const newTime = minutes + ':' + seconds;
    return newTime;

    }
  }


  handleVolumeChange(e) {
    const newVolume = e.target.value;
    this.audioElement.volume = newVolume;
    this.setState({ volume: newVolume});
  }

  render() {
    return (
      <div className="album">
        <div className="mdl-grid" style={{width: '100%', margin: 'auto'}}>
        <div className="mdl-cell mdl-cell--6-col album-details">
          <img id="album-cover-art" src={this.state.album.albumCover} alt="Album cover" />
          <div className="album-details" style= {{textAlign: "center"}}>
            <h2 id="album-title" style={{color: "#3c1053", fontWeight: "bold"}}>{this.state.album.title}</h2>
            <h3 className="artist" style={{color: "white"}}>{this.state.album.artist}</h3>
            <div id="release-info" style={{color: "white"}}>{this.state.album.releaseInfo}</div>
          </div>
        </div>
        <div className="mdl-cell mdl-cell--6-col song-list" style={{margin:"auto", textAlign:"left"}}>
        <table id="song-list">
          <colgroup>
            <col id="song-number-column" />
            <col id="song-title-column" />
            <col id="song-duration-column" />
          </colgroup>
          <tbody>
            {
              this.state.album.songs.map ( (song, index) =>
                <tr  className="mdl-grid song" style={{width: "100%", margin: "auto"}} key={index} onClick={() => this.handleSongClick(song)}

                  onMouseEnter={() => this.setState({ isHovered: index + 1 })}
                  onMouseLeave={() => this.setState({ isHovered: false })}>
                  <td className="song-actions" style={{paddingRight: "40px"}}>
                  { (this.state.currentSong.title === song.title) ?
                   <span className={this.state.isPlaying ? "fa fa-pause" : "fa fa-play"} style={{fontSize: "18px"}}></span>
                   :
                   (this.state.isHovered === index+1) ?
                   <span className="fa fa-play"  style={{fontSize: "18px"}}></span>
                   :
                   <span className="song-number" style={{fontSize: "18px"}}>{ index + 1 }</span>
                 }
                  </td>
                  <td className="song-title" style={{color: "#3c1053", fontSize: "18px", fontWeight: "bold", minWidth: "200px"}} >{song.title}</td>
                  <td className="song-duration" style={{color: "#3c1053", fontSize: "18px"}} >{this.formatTime(song.duration)}</td>
                </tr>
              )
            }
          </tbody>
        </table>
        </div>
        </div>
        <PlayerBar
          isPlaying={this.state.isPlaying}
          formattedTime={this.formatTime(this.audioElement.currentTime)}
          formattedDuration={this.formatTime(this.audioElement.duration)}
          currentSong={this.state.currentSong}
          currentTime={this.audioElement.currentTime}
          duration={this.audioElement.duration}
          volume={this.audioElement.volume}
          handleSongClick={() => this.handleSongClick(this.state.currentSong)}
          handlePrevClick={() => this.handlePrevClick()}
          handleNextClick={() => this.handleNextClick()}
          handleTimeChange={(e) => this.handleTimeChange(e)}
          handleVolumeChange={(e) => this.handleVolumeChange(e)}
        />
      </div>
    );
  }
}

export default Album;
