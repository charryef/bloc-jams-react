import React, {Component} from 'react';

class PlayerBar extends Component {
  render() {
    return (
      <section className="mdl-grid player-bar" style={{margin: "auto", width: "100%", textAlign: "center"}}>
        <section className="mdl-cell mdl-cell--2-col buttons">
          <span id="previous" onClick={this.props.handlePrevClick} >
            <i className="fa fa-backward" style={{fontSize: "24px", color: "black", paddingRight: "12px"}}></i>
          </span>
          <span id="play-pause" onClick={this.props.handleSongClick} >
            <span>{this.props.isPlaying ?
              <i className="fa fa-pause" style={{fontSize: "24px", color: "black", paddingRight: "12px"}}/>
              :
              <i className="fa fa-play" style={{fontSize: "24px", color: "black", paddingRight: "12px"}} />
              }
            </span>
          </span>
          <span id="next" onClick={this.props.handleNextClick}>
            <i className="fa fa-forward" style={{fontSize: "24px", color: "black"}}></i>
          </span>
        </section>
        <section className="mdl-cell mdl-cell--8-col time-control">
          <div className="current-time">{this.props.formattedTime}</div>
          <p style={{width: "80%", margin: "auto"}}>
          <input
            type="range"
            className="mdl-slider mdl-js-slider"
            value={(this.props.currentTime / this.props.duration) || 0}
            id="s1"
            max="1"
            min="0"
            step="0.01"
            onChange={this.props.handleTimeChange}
          />
          </p>
          <div className="total-time">{this.props.formattedDuration}</div>
        </section>
        <section className="mdl-cell mdl-cell--2-col volume-control">
          <i className="fa fa-volume-down" style={{fontSize: "24px", color: "black"}}></i>
          <p style={{width: "70%", margin: "auto"}}>
           <input
            type="range"
            className="mdl-slider mdl-js-slider"
            value={(this.props.volume)}
            max="1"
            mix="0"
            step="0.01"
            onChange={this.props.handleVolumeChange}
            />
            </p>
            <i className="fa fa-volume-up" style={{fontSize: "24px", color: "black"}}></i>
        </section>
      </section>
    );
  }
}

export default PlayerBar;
