import React, { useState, useEffect } from 'react';
import { Layout, Space } from 'antd';
import { Card, Button, DatePicker, Col, Row } from 'antd';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Login from './components/Login';
import WordWritingComponent from './components/WordWritingComponent';
import UserList from './components/UserList';
import { auth } from './Firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Logout from './components/Logout';
import Assignment from './components/Assignment';
import English from './components/English';
import Booking from './components/Booking';
import PeerReview from './components/PeerReview';
import ParaphraseApp from './components/ParaphraseApp';
import SpeechToText from './components/SpeechToText';
import News from './components/News';
import 'regenerator-runtime/runtime';

const { Header, Content, Footer } = Layout;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setIsLoggedIn(true);
        setUser(authUser);
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <BrowserRouter>
      <Layout>
        <Header className="header-container">
          <Row>
            <Col span={18}>
              <nav>
                <Space>
                  <Link to="/">Home</Link>
                  <Link to="/word-writing">Writing</Link>
                  <Link to="/speechtotext">Speaking</Link>
                  <Link to="/english">Vocab</Link>
                  <Link to="/paraphase">Paraphase</Link>
                  <Link to="/news">News</Link>
                                    <Link to="/peerreview">Upload Readings</Link>

                  <Link to="/assignment">Assignment</Link>
                  <Link to="/userlist">UserList</Link>
                  <Link to="/booking">Booking</Link>
                </Space>
              </nav>
            </Col>
            <Col span={6}>
              <nav>
                <Space>
                  {isLoggedIn ? (
                    <>
                      <span>Welcome, {user.displayName}</span>
                      <Link to="/logout">Logout</Link>
                    </>
                  ) : (
                    <>
                      <Link to="/login">Login</Link>
                      <Link to="/register">Register</Link>
                    </>
                  )}
                </Space>
              </nav>
            </Col>
          </Row>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Layout style={{ padding: '24px 0', minHeight: 600 }}>
            <Routes>
              <Route path="/word-writing" element={<WordWritingComponent />} />
              <Route path="/userlist" element={<UserList />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/assignment" element={<Assignment />} />
              <Route path="/english" element={<English />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/peerreview" element={<PeerReview />} />
              <Route path="/paraphase" element={<ParaphraseApp />} />
              <Route path="/speechtotext" element={<SpeechToText />} />
              <Route path="/news" element={<News />} />
            </Routes>
          </Layout>
        </Content>
        <Footer style={{ padding: '0 0 0 10px' }}>
          <p>VTC 2022-2023</p>
        </Footer>
      </Layout>
    </BrowserRouter>
  );
}

export default App;