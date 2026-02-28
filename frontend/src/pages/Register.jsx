import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearAllUserErrors, register } from "../store/slices/userSlice";
import { toast } from "react-toastify";

import { FaAddressBook, FaPencilAlt, FaRegUser } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { MdCategory, MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, isAuthenticated, error, message } = useSelector(
    (state) => state.user
  );

  const [formDataState, setFormDataState] = useState({
    role: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    firstNiche: "",
    secondNiche: "",
    thirdNiche: "",
    coverLetter: "",
    resume: null,
  });

  const nichesArray = [
    "Software Development",
    "Web Development",
    "Cybersecurity",
    "Data Science",
    "Artificial Intelligence",
    "Cloud Computing",
    "DevOps",
    "Mobile App Development",
    "Blockchain",
    "Database Administration",
    "Network Administration",
    "UI/UX Design",
    "Game Development",
    "IoT (Internet of Things)",
    "Big Data",
    "Machine Learning",
    "IT Project Management",
    "IT Support and Helpdesk",
    "Systems Administration",
    "IT Consulting",
  ];

  const handleChange = (e) => {
    setFormDataState({
      ...formDataState,
      [e.target.name]: e.target.value,
    });
  };

  const resumeHandler = (e) => {
    setFormDataState({
      ...formDataState,
      resume: e.target.files[0] || null,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(formDataState).forEach((key) => {
      if (formDataState[key]) formData.append(key, formDataState[key]);
    });
    await dispatch(register(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }

    // ✅ Register hone ke baad login par bhejo
    if (message) {
      toast.success("Registered successfully! Please login.");
      navigate("/login");
    }
  }, [dispatch, error, message, navigate]);

  return (
    <section className="authPage">
      <div className="container">
        <div className="header">
          <h3>Create a New Account</h3>
        </div>

        <form onSubmit={handleRegister}>
          {/* Role + Name */}
          <div className="wrapper">
            <div className="inputTag">
              <label>Register As</label>
              <div>
                <select
                  name="role"
                  value={formDataState.role || ""}
                  onChange={handleChange}
                >
                  <option value="">Select Role</option>
                  <option value="Employer">Register as Employer</option>
                  <option value="Job Seeker">Register as Job Seeker</option>
                </select>
                <FaRegUser />
              </div>
            </div>

            <div className="inputTag">
              <label>Name</label>
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formDataState.name || ""}
                  onChange={handleChange}
                />
                <FaPencilAlt />
              </div>
            </div>
          </div>

          {/* Email + Phone */}
          <div className="wrapper">
            <div className="inputTag">
              <label>Email</label>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="youremail@gmail.com"
                  value={formDataState.email || ""}
                  onChange={handleChange}
                />
                <MdOutlineMailOutline />
              </div>
            </div>

            <div className="inputTag">
              <label>Phone</label>
              <div>
                <input
                  type="number"
                  name="phone"
                  placeholder="111-222-333"
                  value={formDataState.phone || ""}
                  onChange={handleChange}
                />
                <FaPhoneFlip />
              </div>
            </div>
          </div>

          {/* Address + Password */}
          <div className="wrapper">
            <div className="inputTag">
              <label>Address</label>
              <div>
                <input
                  type="text"
                  name="address"
                  placeholder="Your Address"
                  value={formDataState.address || ""}
                  onChange={handleChange}
                />
                <FaAddressBook />
              </div>
            </div>

            <div className="inputTag">
              <label>Password</label>
              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Your Password"
                  value={formDataState.password || ""}
                  onChange={handleChange}
                />
                <RiLock2Fill />
              </div>
            </div>
          </div>

          {/* Job Seeker Fields */}
          {formDataState.role === "Job Seeker" && (
            <>
              <div className="wrapper">
                {["firstNiche", "secondNiche", "thirdNiche"].map(
                  (field, index) => (
                    <div className="inputTag" key={index}>
                      <label>Your Niche</label>
                      <div>
                        <select
                          name={field}
                          value={formDataState[field] || ""}
                          onChange={handleChange}
                        >
                          <option value="">Select Niche</option>
                          {nichesArray.map((niche, i) => (
                            <option key={i} value={niche}>
                              {niche}
                            </option>
                          ))}
                        </select>
                        <MdCategory />
                      </div>
                    </div>
                  )
                )}
              </div>

              <div className="wrapper">
                <div className="inputTag">
                  <label>Cover Letter</label>
                  <div>
                    <textarea
                      name="coverLetter"
                      rows="6"
                      value={formDataState.coverLetter || ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="wrapper">
                <div className="inputTag">
                  <label>Resume</label>
                  <div>
                    <input type="file" onChange={resumeHandler} />
                  </div>
                </div>
              </div>
            </>
          )}

          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>

          <Link to="/login">Already have an account? Login</Link>
        </form>
      </div>
    </section>
  );
};

export default Register;
