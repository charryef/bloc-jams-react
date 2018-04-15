import React from 'react';

const Landing = () => (
<section className="landing">
  <h1 className="hero-title">Turn the music up!</h1>
    <div className="mdl-grid selling-points" style={{width: '100%', margin: 'auto'}}>
      <div className="mdl-cell mdl-cell---4-col point">
        <div style={{fontSize:"50px", textAlign:"center"}}><i className="fa fa-music"></i></div>
        <h2 className="point-title" style={{textAlign: "center", color: "#3c1053"}}>
          Choose your music
        </h2>
        <p className="point-description" style={{textAlign: "center", color: "#fafafa", padding: "0 15px 0 15px"}}>
          The world is full of music; why should you have to listen to music that someone else chose?
        </p>
      </div>
      <div className="mdl-cell mdl-cell---4-col point">
        <div style={{fontSize:"50px", textAlign:"center"}}><i className="fa fa-headphones"></i></div>
        <h2 className="point-title" style={{textAlign: "center", color: "#3c1053"}}>
          Unlimited, streaming, ad-free
        </h2>
        <p className="point-description" style={{textAlign: "center", color: "#fafafa", padding: "0 15px 0 15px"}}>
          No arbitrary limits. No distractions.
        </p>
      </div>
      <div className="mdl-cell mdl-cell---4-col point">
        <div style={{fontSize:"50px", color:"black", textAlign:"center"}}><i className="fa fa-mobile"></i></div>
        <h2 className="point-title" style={{textAlign: "center", color: "#3c1053"}}>
          Mobile enabled
        </h2>
        <p className="point-description" style={{textAlign: "center", color: "#fafafa", padding: "0 15px 0 15px"}}>
        Listen to your music on the go. This streaming device is available on all mobile platforms.
        </p>
      </div>
    </div>
</section>
);

export default Landing;
