import React, { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import UserList from "./users";

const Form = () => {
  // instead of using multiple usestate we can use objects
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    state: "",
    district: "",
    village: "",
    panNumber: "",
    aadhaarNumber: "",
  });

  const [activeInput, setActiveInput] = useState(null);
  const [edit, setEdit] = useState(false);
  const [userId, setUserId] = useState(null);

  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleStartListening = (fieldName) => {
    SpeechRecognition.startListening();
    setActiveInput(fieldName);
  };

  const handleStopListening = () => {
    SpeechRecognition.stopListening();
    if (activeInput) {
      setFormData((prevData) => ({ ...prevData, [activeInput]: transcript }));
      resetTranscript();
      setActiveInput(null);
    }
  };

  // created the separate function to render the inputs with respect to active input
  const renderInputWithListening = (fieldName, label, placeholder) => (
    <div className="input-group mb-3" style={{ width: "100%" }}>
      <div className="form-floating">
        <input
          type="text"
          className="form-control"
          id={fieldName}
          name={fieldName}
          value={formData[fieldName]}
          onChange={handleInputChange}
          placeholder={placeholder}
          required
        />
        <label
          htmlFor={fieldName}
          style={{ width: "100%" }}
          className="d-flex justify-content-between"
        >
          <span>{label + "*"}</span>
          {listening && activeInput === fieldName && <span>Recording...</span>}
        </label>
      </div>
      <span
        className="input-group-text"
        style={{
          backgroundColor:
            listening && activeInput === fieldName ? "#2cbc29" : "#F8F9FA",
        }}
        id="basic-addon2"
      >
        {listening && activeInput === fieldName ? (
          <button className="btn" onClick={handleStopListening}>
            <i
              className="fa-solid fa-microphone-lines-slash"
              style={{ fontSize: "25px", color: "white" }}
            ></i>
          </button>
        ) : (
          <button
            className="btn"
            title="Tap to speech"
            onClick={() => handleStartListening(fieldName)}
          >
            <i
              className="fa-solid fa-microphone"
              style={{ fontSize: "25px" }}
            ></i>
          </button>
        )}
      </span>
    </div>
  );

  const handleSubmit = async () => {
    try {
      let error = false;

      // checking the each field in formData to ensure it's not an empty string
      Object.values(formData).forEach((value) => {
        if (value === "") {
          error = true;
        }
      });

      // if any field is empty, alert the user and return
      if (error) return alert("All fields are required.");

      if (edit) {
        await axios.put(`/api/users/${userId}`, formData);
        setEdit(false);
        setUserId(null);
        handleReset();
        alert("Form updated successfully!");
      } else {
        await axios.post("/api/users", formData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        // console.log(formData);
        handleReset();
        alert("Form submitted successfully!");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Please try again.");
    }
  };

  function handleReset() {
    setFormData({
      firstName: "",
      lastName: "",
      state: "",
      district: "",
      village: "",
      panNumber: "",
      aadhaarNumber: "",
    });
    resetTranscript();
    setActiveInput(null);
  }

  const handleEdit = async (user) => {
    setEdit(true);
    setUserId(user._id);
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      state: user.state,
      district: user.district,
      village: user.village,
      panNumber: user.panNumber,
      aadhaarNumber: user.aadhaarNumber,
    });
  };

  return (
    <div className="Home d-flex">
      <div className="container mt-4 mb-3">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <h2>Speech-To-Text Convert Form</h2>

            {renderInputWithListening(
              "firstName",
              "First Name",
              "Enter your first name"
            )}
            {renderInputWithListening(
              "lastName",
              "Last Name",
              "Enter your last name"
            )}
            {renderInputWithListening("state", "State", "Enter your state")}
            {renderInputWithListening(
              "district",
              "District",
              "Enter your district"
            )}
            {renderInputWithListening(
              "village",
              "Village",
              "Enter your village"
            )}
            {renderInputWithListening(
              "panNumber",
              "PAN Number",
              "Enter your PAN number"
            )}
            {renderInputWithListening(
              "aadhaarNumber",
              "Aadhaar Number",
              "Enter your Aadhaar number"
            )}
            <div className="d-flex gap-2 ">
              <button
                className="btn btn-success w-100 "
                type="button"
                onClick={handleSubmit}
              >
                {!edit ? "Submit" : "Update"}
              </button>
              <button
                className="btn btn-dark w-100 "
                type="button"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
      <UserList updateUser={handleEdit} user={userId} />
    </div>
  );
};

export default Form;
