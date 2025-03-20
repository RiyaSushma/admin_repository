import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../Assets/Navbar";
import "../styles/CourseManage.css";
import * as Pi from "@phosphor-icons/react";

function CourseManage() {
  const [courses, setCourses] = useState([]);
  const [learningAreas, setLearningAreas] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [coursePrice, setCoursePrice] = useState("");
  const [learningAreaIds, setLearningAreaIds] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch courses and learning areas
        const [coursesResponse, learningAreasResponse] = await Promise.all([
          axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/courses`),
          axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/learning-areas`)
        ]);

        // Ensure courses have learning_areas property
        const mappedCourses = coursesResponse.data.map(course => ({
          ...course,
          learning_areas: course.learning_areas || []
        }));

        setCourses(mappedCourses);
        setLearningAreas(learningAreasResponse.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addCourse = async () => {
    try {
      if (!courseName.trim() || !coursePrice.trim() || learningAreaIds.length === 0) {
        throw new Error("Please fill in all required fields and select at least one learning area.");
      }

      const requestBody = {
        title: courseName,
        description: courseDescription,
        price: parseFloat(coursePrice),
        learningAreaIds,
      };

      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/courses`, requestBody);

      // Add new course with empty learning_areas if not present
      setCourses([...courses, {
        ...response.data,
        learning_areas: response.data.learning_areas || []
      }]);

      // Reset form fields
      setCourseName("");
      setCourseDescription("");
      setCoursePrice("");
      setLearningAreaIds([]);
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      alert(`Error adding course: ${errorMessage}`);
    }
  };

  const deleteCourse = async (courseId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/courses/${courseId}`);
      setCourses(courses.filter((course) => course.courseId !== courseId));
    } catch (err) {
      alert(`Error deleting course: ${err.response?.data?.message || err.message}`);
    }
  };

  // Filter courses based on search query
  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleLearningArea = (learningId) => {
    setLearningAreaIds((prevState) =>
      prevState.includes(learningId)
        ? prevState.filter((id) => id !== learningId)
        : [...prevState, learningId]
    );
  };

  if (loading) {
    return (
      <div className="container">
        <div className="course-manage">
          <NavBar />
          <div className="loading">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="course-manage">
          <NavBar />
          <div className="error">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <>

    <div className="container">
      <SideBar />
      <NavBar />
      <div className="course-manage">
  

        <header className="CMheader">
          <h1>Welcome to Course Management</h1>
          <p>Organize and manage your courses efficiently.</p>
        </header>
<hr className="line"></hr>
        <div className="add-course-form">
          <label>Add Course: </label>
          <input
            type="text"
            placeholder="Enter course name"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Enter course description"
            value={courseDescription}
            onChange={(e) => setCourseDescription(e.target.value)}
          />
          <input
            type="number"
            placeholder="Enter course price"
            value={coursePrice}
            onChange={(e) => setCoursePrice(e.target.value)}
            required
          />

          <div className="learning-area-selection">
            <h3>Select Learning Areas</h3>
            <div className="learning-areas">
              {learningAreas.map((area) => (
                <label key={area.learningid}>
                  <input
                    type="checkbox"
                    checked={learningAreaIds.includes(area.learningid)}
                    onChange={() => toggleLearningArea(area.learningid)}
                  />
                  {area.domainname}
                </label>
              ))}
            </div>
          </div>

          <button onClick={addCourse} className="add-btn">
            Add Course
          </button>
        </div>

        <div className="course-list">
          <h2>Existing Courses</h2>
          <table>
            <thead>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Learning-Area</th>
              <th id="taction">Actions</th>
            </thead>
            {filteredCourses.length ===0 ? (<p>No courses available</p>) : (
              filteredCourses.map((course)=>(
                <tr key={course.courseId || course.courseid}>
                  <td>{course.title}</td>
                  <td>{course.description}</td>
                  <td>{course.price}</td>
                  <td>{Array.isArray(course.learning_areas) && course.learning_areas.length > 0
                          ? course.learning_areas.map(area => area.domainname || area.name).join(", ")
                          : "N/A"}</td>
                  <td id="tbutton"><button className="delete-btn" onClick={() => deleteCourse(course.courseId || course.courseid)}><Pi.Trash /></button></td>
                </tr>
              ))
            )}
          </table>
        </div>
      </div>
    </div>
    </>
  );
}

export default CourseManage;