import React from "react";

const Hero = () => {
  return (
    <section className="hero">
      {/* LEFT CONTENT */}
      <div className="hero-content">
        <div className="hero-badge">
          <span className="badge-icon">✓</span>
          Stay connect to get upcoming job with <strong>HireNova</strong>
        </div>

        <h1>Find Your Dream Job Today</h1>

        <h4>
          Connecting Talent with Opportunities Across the Nation for Every Skill
          Level
        </h4>
      </div>

      {/* RIGHT VISUAL */}
      <div className="hero-visual">
        <div className="hero-circle-bg"></div>

        {/* Person image */}
        <div className="hero-image-wrap">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/046/598/534/small/smiling-man-with-arms-crossed-wearing-a-red-shirt-on-transparent-background-png.png"
            alt="Professional"
            className="hero-person-img"
          />
        </div>

        {/* LEFT floating cards */}
        <div className="hero-float-card card-upload">
          <span className="float-icon">📄</span>
          <span>Upload CV</span>
        </div>

        <div className="hero-float-card card-hired">
          <div className="hired-number">25k</div>
          <div className="hired-label">People Got Hired</div>
        </div>

        {/* RIGHT floating cards — new */}
        <div className="hero-float-card card-matches">
          <span className="float-icon">🎯</span>
          <span>Top Matches</span>
        </div>

        <div className="hero-float-card card-jobs">
          <div className="hired-number">8k+</div>
          <div className="hired-label">Jobs Posted</div>
        </div>

        {/* Decorative */}
        <span className="deco-plus plus-1">+</span>
        <span className="deco-plus plus-2">+</span>
        <span className="deco-dot dot-1"></span>
        <span className="deco-dot dot-2"></span>
      </div>
    </section>
  );
};

export default Hero;