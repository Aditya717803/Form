import React, { useState } from 'react';
import axios from 'axios';
import emailjs from '@emailjs/browser';

const FeedbackForm = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captcha, setCaptcha] = useState(generateCaptcha());

  function generateCaptcha() {
    return Math.random().toString(36).substring(2, 8);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (captchaInput !== captcha) {
      alert('CAPTCHA is incorrect. Please try again.');
      setCaptcha(generateCaptcha());
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          address,
          phone,
          gender,
        }),
      });

      if (response.ok) {
        alert('Feedback submitted successfully!');

        // Prepare data for EmailJS
        const emailData = {
          service_id: 'service_ainu8rl',
          template_id: 'template_an24zun',
          user_id: 'ld2Dd-b2a9-bQ0hsF',
          template_params: {
            from_name: name,
            to_name: 'Service Center', 
            message: `New feedback submitted:\nName: ${name}`,
          },
        };

        // Send the email using EmailJS
        try {
          const res = await axios.post('https://api.emailjs.com/api/v1.0/email/send', emailData);
          console.log(res.data);
          alert('Email sent successfully!');
        } catch (emailError) {
          console.error('Email sending error:', emailError);
          alert('Failed to send email.');
        }

        // Reset form fields
        setName('');
        setAddress('');
        setPhone('');
        setGender('');
        setCaptcha(generateCaptcha());
        setCaptchaInput('');
      } else {
        alert('Failed to submit feedback.');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Failed to submit feedback.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white shadow-lg rounded-lg max-w-md w-full">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            placeholder='Enter your name'
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            placeholder='Enter your address'
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Phone</label>
          <input
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            placeholder='Enter your phone no'
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">
            Enter CAPTCHA:
            <div className="font-bold text-center m-1 text-2xl text-decoration-line: line-through">{captcha}</div>
          </label>
          <input
            type="text"
            value={captchaInput}
            onChange={(e) => setCaptchaInput(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
            placeholder="Enter the Captcha from above"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
