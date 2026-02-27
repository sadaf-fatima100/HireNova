import React from "react";

const TopNiches = () => {
  const services = [
    {
      id: 1,
      service: "Software Development",
      description:
        "Build, scale, and ship products that matter. From robust backends to elegant APIs — find engineers who turn complex problems into clean solutions.",
    },
    {
      id: 2,
      service: "Web Development",
      description:
        "Fast, responsive, and visually stunning websites. Connect with full-stack developers who craft seamless digital experiences from pixel to server.",
    },
    {
      id: 3,
      service: "Data Science",
      description:
        "Turn raw data into business decisions. Hire analysts and ML engineers who uncover patterns, build models, and drive measurable results.",
    },
    {
      id: 4,
      service: "Cloud Computing",
      description:
        "Migrate, optimize, and secure your infrastructure in the cloud. Find certified experts across AWS, Azure, and GCP ready to build at scale.",
    },
    {
      id: 5,
      service: "DevOps",
      description:
        "Ship faster, break less. Connect with DevOps engineers who automate pipelines, manage containers, and keep your systems resilient 24/7.",
    },
    {
      id: 6,
      service: "Mobile App Development",
      description:
        "iOS, Android, or cross-platform — hire mobile developers who build apps users love, from smooth UI to solid performance under pressure.",
    },
  ];

  return (
    <section className="services">
      <h3>Top Niches</h3>
      <div className="grid">
        {services.map((element) => {
          return (
            <div className="card" key={element.id}>
              <h4>{element.service}</h4>
              <p>{element.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TopNiches;