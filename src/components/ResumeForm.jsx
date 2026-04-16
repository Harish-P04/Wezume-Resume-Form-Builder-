import React, { useState } from 'react';
import axios from 'axios';

const ResumeForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    skills: '',
    experience: ''
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.skills.trim()) newErrors.skills = 'Skills are required';
    if (!formData.experience.trim()) newErrors.experience = 'Experience is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setSuccess('');

    try {
      const response = await axios.post(
        'http://localhost:8080/resume/create',
        formData,
        { headers: { 'Content-Type': 'application/json' } }
      );

      console.log('✅ Resume saved:', response.data);
      setSuccess('🎉 Resume saved successfully in the database!');

      // Reset form
      setFormData({ name: '', email: '', skills: '', experience: '' });
      setErrors({});
    } catch (error) {
      console.error('❌ Error:', error);
      alert('Failed to save resume. Please check if backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h1>Wezume Resume Builder</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label>Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label>Skills (comma separated) *</label>
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="React, Java, Spring Boot, MySQL"
          />
          {errors.skills && <p className="error">{errors.skills}</p>}
        </div>

        <div className="form-group">
          <label>Experience *</label>
          <textarea
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            placeholder="Briefly describe your work experience..."
          />
          {errors.experience && <p className="error">{errors.experience}</p>}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Saving to Database...' : 'Submit & Save Resume'}
        </button>
      </form>

      {success && <p className="success">{success}</p>}
    </div>
  );
};

export default ResumeForm;