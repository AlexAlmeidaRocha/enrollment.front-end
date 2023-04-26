//import React, { lazy, Suspense } from 'react';
import {  Routes, Route, } from 'react-router-dom';
import ProtectedRoute from '../router/components/ProtectedRoute';
import Login from '../views/Login';
import Home from '../views/Home/Home';
import AddUser from '../views/user/User';
import AddEnrollment from '../views/enrollment/Enrollment';
import NewEnrollmentCandidate from '../views/NewEnrollmentCandidate';


export const Router = () => {
    return (
        <Routes>
            <Route path="/login" element={
                    <Login />}>
            </Route>
            <Route path="/" element={
                <ProtectedRoute>
                    <Home />
                </ProtectedRoute>}>
            </Route>
            <Route path="/candidate" element={
                <ProtectedRoute>
                    <AddUser />
                </ProtectedRoute>}>
            </Route>
            <Route path="/enrollment" element={
                <ProtectedRoute>
                    <AddEnrollment />
                </ProtectedRoute>}>
            </Route>
            <Route path="/new-enrollment" element={
                <ProtectedRoute>
                    <NewEnrollmentCandidate />
                </ProtectedRoute>}>
            </Route>
        </Routes>
    );
}

export default Router;