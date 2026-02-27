import React from "react";
import { LuUserPlus } from "react-icons/lu";
import { VscTasklist } from "react-icons/vsc";
import { BiSolidLike } from "react-icons/bi";

const HowItWorks = () => {
  return (
    <section className="howItWorks">
      <h3>How does it work?</h3>
      <div className="container">
        <div className="card">
          <div className="icon">
            <LuUserPlus />
          </div>
          <h4>Create an Account</h4>
          <p>
            Get started in minutes — sign up as a job seeker or employer and
            build a profile that stands out. Showcase your skills, experience,
            and goals so the right opportunities find you faster.
          </p>
        </div>
        <div className="card">
          <div className="icon">
            <VscTasklist />
          </div>
          <h4>Post or Browse Jobs</h4>
          <p>
            Employers post detailed listings, job seekers explore hundreds of
            openings. Use smart filters to match roles by location, salary, and
            skill — cutting your search time in half.
          </p>
        </div>
        <div className="card">
          <div className="icon">
            <BiSolidLike />
          </div>
          <h4>Hire or Get Hired</h4>
          <p>
            Employers shortlist top candidates and send offers directly. Job
            seekers review, compare, and accept positions that truly align with
            their ambitions — all in one seamless platform.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;