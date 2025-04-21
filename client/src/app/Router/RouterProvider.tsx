import { type JSX } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import IssuesPage from "../../pages/IssuesPage/IssuesPage";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";
import Layout from "../../shared/layout/layout/Layout";
import BoardsPage from "../../pages/BoardsPage/BoardsPage";
import OneBoardPage from "../../pages/OneBoardPage/OneBoardPage";

export default function RouterProvider(): JSX.Element {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/issues" element={<IssuesPage />} />
        <Route path="/" element={<Navigate to="/issues" replace />} />
        <Route path="/boards" element={<BoardsPage />} />
        <Route path="/boards/:id" element={<OneBoardPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}
