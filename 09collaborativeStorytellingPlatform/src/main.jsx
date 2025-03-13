import React from "react";
import ReactDOM from "react-dom/client";
import store from "./store/store.js";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { Protected } from "./components";
import {
  Home,
  AddStory,
  UserProfile,
  UserProfileFrom,
  Login,
  Signup,
  PasswordRecovery,
  StoryDetail,
  EditedChapters,
  Chapter,
  AddChapters,
} from "./Pages/index.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={
          <Protected authentication={false} ProfileAuth={false}>
            <Login />
          </Protected>
        }
      />
      <Route
        path="/signup"
        element={
          <Protected authentication={false} ProfileAuth={false}>
            <Signup />
          </Protected>
        }
      />
      <Route
        path="/make-password-recovery"
        element={
          <Protected authentication={false} ProfileAuth={false}>
            <PasswordRecovery />
          </Protected>
        }
      />
      <Route
        path="/add-story"
        element={
          <Protected authentication={true} ProfileAuth={true}>
            <AddStory />
          </Protected>
        }
      />
      <Route
        path="/profile"
        element={
          <Protected authentication={true} ProfileAuth={true}>
            <UserProfile />
          </Protected>
        }
      />
      <Route
        path="/create-profile"
        element={
          <Protected authentication={true} ProfileAuth={false}>
            <UserProfileFrom />
          </Protected>
        }
      />
    <Route path="/story/:StoryId/add-Chapter" element={
      <Protected authentication={true} ProfileAuth={true}>
      <AddChapters />
      </Protected>
    }
    />
    <Route path="/story/:StoryId/edited-chapter/:editedChapterId" element={
      <Protected authentication={true} ProfileAuth={true}>
      <EditedChapters />
      </Protected>
    }
    />
    <Route path="/story/:StoryId/chapter/:ChapterId" element={<Chapter />}/>
      <Route path="/story/:StoryId" element={<StoryDetail />}/>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
