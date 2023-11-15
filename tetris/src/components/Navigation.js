/* eslint-disable*/
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { getAuth, signOut } from "firebase/auth";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import React, { useState, useEffect } from "react";

const Navigation = () => {
	const auth = getAuth();
	const navigate = useNavigate();
	function onLogOut() {
		signOut(auth);
		navigate("/");
	}

	return (
		<>
			<Navbar bg="primary" data-bs-theme="dark">
				<Container>
					<Navbar.Brand href="/">FocuStudy</Navbar.Brand>
					<Nav className="me-right">
						<Nav.Link href="/roomlist">공부방</Nav.Link>
						<Nav.Link href="/community">커뮤니티</Nav.Link>
						<Nav.Link href="/mypage">마이 페이지</Nav.Link>
						<Nav.Link onClick={onLogOut}>로그아웃</Nav.Link>
					</Nav>
				</Container>
			</Navbar>
		</>
	);
};

export default Navigation;
