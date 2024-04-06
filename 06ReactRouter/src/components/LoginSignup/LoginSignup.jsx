import React, { useState } from "react";

const LoginSignup = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [mobileNo, setMobileNo] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log(
      "Logging in with email:",
      loginEmail,
      "and password:",
      loginPassword
    );
  };

  const handleSignup = (e) => {
    e.preventDefault();
    // Handle signup logic here
    console.log(
      "Signing up with name:",
      signupName,
      "email:",
      signupEmail,
      "password:",
      signupPassword,
      "and mobile number:",
      mobileNo
    );
  };

  return (
    <div className="max-w-md mx-auto m-4 p-4 bg-white rounded-lg shadow-lg">
      <div className="mb-8 flex justify-center">
        <button
          className={`mr-4 py-2 px-4 rounded focus:outline-none ${
            showLogin ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
          }`}
          onClick={() => setShowLogin(true)}
        >
          Login
        </button>
        <button
          className={`py-2 px-4 rounded focus:outline-none ${
            showLogin ? "bg-gray-300 text-black" : "bg-blue-500 text-white"
          }`}
          onClick={() => setShowLogin(false)}
        >
          Sign Up
        </button>
      </div>

      {showLogin ? (
        <form onSubmit={handleLogin} className="mb-4">
          <div className="mb-4">
            <label className="block mb-1 text-gray-600">Email:</label>
            <input
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              type="email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-600">Password:</label>
            <input
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
            />
          </div>
          <button
            className="w-full py-2 px-4 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
            type="submit"
          >
            Login
          </button>
        </form>
      ) : (
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block mb-1 text-gray-600">Name:</label>
            <input
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              type="text"
              value={signupName}
              onChange={(e) => setSignupName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-600">Email:</label>
            <input
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              type="email"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-600">Password:</label>
            <input
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              type="password"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-600">Mobile No.:</label>
            <input
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              type="tel"
              value={mobileNo}
              onChange={(e) => setMobileNo(e.target.value)}
              required
            />
          </div>
          <button
            className="w-full py-2 px-4 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
            type="submit"
          >
            Sign Up
          </button>
        </form>
      )}
    </div>
  );
};

export default LoginSignup;
