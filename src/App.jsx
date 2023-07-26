// import React, { useState, useEffect } from 'react';
// import { Layout, Menu, Row, Col } from 'antd';
// import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
// import Login from './components/Login';
// import WordWritingComponent from './components/WordWritingComponent';
// import UserList from './components/UserList';
// import { auth } from './Firebase';
// import { onAuthStateChanged } from 'firebase/auth';
// import Logout from './components/Logout';
// import Assignment from './components/Assignment';
// import English from './components/English';
// import Booking from './components/Booking';
// import PeerReview from './components/PeerReview';
// import ParaphraseApp from './components/ParaphraseApp';
// import SpeechToText from './components/SpeechToText';
// import News from './components/News';
// import { GrammarlyEditor } from './components/Grammar';
// import 'regenerator-runtime/runtime';

// import './App.css';

// const { Header, Content, Footer } = Layout;

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (authUser) => {
//       if (authUser) {
//         setIsLoggedIn(true);
//         setUser(authUser);
//       } else {
//         setIsLoggedIn(false);
//         setUser(null);
//       }
//     });

//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   return (
//     <BrowserRouter>
//       <Layout>
        // <Header className="header-container">
        //   <Row>
        //     <Col xs={24} sm={24} md={18}>
        //       <Menu mode="horizontal" className="menu-style">
        //         <Menu.Item key="home"><Link to="/">Home</Link></Menu.Item>
        //         <Menu.SubMenu key="exercises" title="Exercises">
        //           <Menu.Item key="writing"><Link to="/word-writing">Writing</Link></Menu.Item>
        //           <Menu.Item key="speaking"><Link to="/speechtotext">Speaking</Link></Menu.Item>
        //           <Menu.Item key="vocab"><Link to="/english">Vocab</Link></Menu.Item>
        //         </Menu.SubMenu>
        //         <Menu.Item key="paraphrase"><Link to="/paraphase">Paraphrase</Link></Menu.Item>
        //         <Menu.Item key="news"><Link to="/news">News</Link></Menu.Item>
        //         <Menu.Item key="peerreview"><Link to="/peerreview">Upload Readings</Link></Menu.Item>
        //         <Menu.Item key="assignment"><Link to="/assignment">Assignment</Link></Menu.Item>
        //         <Menu.Item key="userlist"><Link to="/userlist">UserList</Link></Menu.Item>
        //         <Menu.Item key="booking"><Link to="/booking">Booking</Link></Menu.Item>
        //         <Menu.Item key="grammar"><Link to="/grammar">GrammarlyEditor</Link></Menu.Item>
        //       </Menu>
        //     </Col>
        //     <Col xs={24} sm={24} md={6}>
        //       <Menu mode="horizontal" className="menu-style menu-right">
        //         {isLoggedIn ? (
        //           <>
        //             <Menu.Item key="welcome">Welcome, {user.displayName}</Menu.Item>
        //             <Menu.Item key="logout"><Link to="/logout">Logout</Link></Menu.Item>
        //           </>
        //         ) : (
        //           <>
        //             <Menu.Item key="login"><Link to="/login">Login</Link></Menu.Item>
        //             <Menu.Item key="register"><Link to="/register">Register</Link></Menu.Item>
        //           </>
        //         )}
        //       </Menu>
        //     </Col>
        //   </Row>
        // </Header>
//         <Content className="content-container" style={{ padding: '0 50px' }}>
//           <Layout style={{ padding: '24px 0', minHeight: 600 }}>
//             <Routes>
//               <Route path="/word-writing" element={<WordWritingComponent />} />
//               <Route path="/userlist" element={<UserList />} />
//               <Route path="/login" element={<Login />} />
//               <Route path="/logout" element={<Logout />} />
//               <Route path="/assignment" element={<Assignment />} />
//               <Route path="/english" element={<English />} />
//               <Route path="/booking" element={<Booking />} />
//               <Route path="/peerreview" element={<PeerReview />} />
//               <Route path="/paraphase" element={<ParaphraseApp />} />
//               <Route path="/speechtotext" element={<SpeechToText />} />
//               <Route path="/news" element={<News />} />
//               <Route path="/grammar" element={<GrammarlyEditor />} />

//             </Routes>
//           </Layout>
//         </Content>
//         <Footer style={{ padding: '0 0 0 10px' }}>
//           <p>VTC 2022-2023</p>
//         </Footer>
//       </Layout>
//     </BrowserRouter>
//   );
// }

// export default App

import React, { useState, useEffect } from 'react';
import { Layout, Menu, Row, Col } from 'antd';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { getDoc, doc, collection } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import Register from './components/Register';
import Login from './components/Login';
import WordWritingComponent from './components/WordWritingComponent';
import UserList from './components/UserList';
import { firestore, auth } from './Firebase';
import Logout from './components/Logout';
import Assignment from './components/Assignment';
import English from './components/English';
import Booking from './components/Booking';
import PeerReview from './components/PeerReview';
import ParaphraseApp from './components/ParaphraseApp';
import SpeechToText from './components/SpeechToText';
import News from './components/News';
import { GrammarlyEditor } from './components/Grammar';
import ImageAnalyzer from './components/Vision'
import PresentTenseExercise from './components/Tense'
import PastTenseExercise from './components/PastTense'
import FutureTenseExercise from './components/FutureTense'
import WordBlanker from './components/WorldBlanker'
import SentenseReorder from './components/SentenseReorder'
import FileList from './components/FileList'
import Recorder from './components/Recorder'
import Transcript from './components/Transcript'
import TextGenerator from './components/TextGenerator'
import Reading from './components/Reading'
import FileUploader from './components/FileUploader'
import FileDisplay from './components/FileDisplay'

import 'regenerator-runtime/runtime';
import './App.css';

const { Header, Content, Footer } = Layout;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        const userRef = doc(collection(firestore, 'users'), authUser.uid);
        const userDocSnap = await getDoc(userRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          authUser = {...authUser, role: userData.role}; // Add role to user object
          setUserRole(userData.role);
        }
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        setUserRole(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      <Layout>
        <Header className="header-container">
          <Row>
            <Col xs={24} sm={24} md={18}>
              <Menu mode="horizontal" className="menu-style">
                <Menu.Item key="home"><Link to="/">Home</Link></Menu.Item>
                <Menu.SubMenu key="exercises" title="Exercises">
                  <Menu.Item key="writing"><Link to="/word-writing">Writing</Link></Menu.Item>
                  <Menu.Item key="speaking"><Link to="/speechtotext">Speaking</Link></Menu.Item>
                  <Menu.Item key="transcript"><Link to="/transcript">Listening</Link></Menu.Item>  
                  <Menu.Item key="vocab"><Link to="/english">Vocab</Link></Menu.Item>
                  <Menu.Item key="sentensereorder"><Link to="/sentensereorder">SentenseReorder</Link></Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu key="tools" title="Tools">
                  <Menu.Item key="paraphrase"><Link to="/paraphase">Paraphrase</Link></Menu.Item>
                  <Menu.Item key="vision"><Link to="/vision">Vision</Link></Menu.Item>
                  <Menu.Item key="textgenerator"><Link to="/textgenerator">Text Generator</Link></Menu.Item> 
                  <Menu.Item key="grammar"><Link to="/grammar">Grammarly Editor</Link></Menu.Item>
                  <Menu.Item key="reading"><Link to="/reading">Keyword Extraction
</Link></Menu.Item>  
                  <Menu.Item key="news"><Link to="/news">News</Link></Menu.Item>
                </Menu.SubMenu>
                <Menu.Item key="peerreview"><Link to="/peerreview">Upload Readings</Link></Menu.Item>
                <Menu.Item key="assignment"><Link to="/assignment">Assignment</Link></Menu.Item>
                <Menu.Item key="userlist"><Link to="/userlist">UserList</Link></Menu.Item>
                <Menu.Item key="booking"><Link to="/booking">Booking</Link></Menu.Item>
                <Menu.SubMenu key="tenses" title="Tenses">
                <Menu.Item key="tense"><Link to="/tense">Present Tense</Link></Menu.Item>                          <Menu.Item key="ptense"><Link to="/ptense">Past Tense</Link></Menu.Item>
                <Menu.Item key="ftense"><Link to="/ftense">Future Tense</Link></Menu.Item>  
                </Menu.SubMenu>
                <Menu.Item key="wordblanker"><Link to="/wordblanker">WordBlanker</Link></Menu.Item>  
                <Menu.Item key="filelist"><Link to="/filelist">Assignment Handedin</Link></Menu.Item>  
                <Menu.Item key="recorder"><Link to="/recorder">Recorder</Link></Menu.Item>  
                <Menu.Item key="fileuploader"><Link to="/fileuploader">Fileuploader</Link></Menu.Item>  
                <Menu.Item key="filedisplay"><Link to="/filedisplay">Reading</Link></Menu.Item>  

                  
              </Menu>
            </Col>
            <Col xs={24} sm={24} md={6}>
              <Menu mode="horizontal" className="menu-style menu-right">
                {isLoggedIn ? (
                  <>
                    <Menu.Item key="welcome">Welcome, {userRole}</Menu.Item>
                    <Menu.Item key="logout"><Link to="/logout">Logout</Link></Menu.Item>
                  </>
                ) : (
                  <>
                    <Menu.Item key="login"><Link to="/login">Login</Link></Menu.Item>
                    <Menu.Item key="register"><Link to="/register">Register</Link></Menu.Item>
                  </>
                )}
              </Menu>
            </Col>
          </Row>
        </Header>
        <Content className="content-container" style={{ padding: '0 50px' }}>
          <Layout style={{ padding: '24px 0', minHeight: 600 }}>
            <Routes>
              {userRole === 'admin' || userRole === 'student' ? (
                <>
                  <Route path="/word-writing" element={<WordWritingComponent />} />
                  <Route path="/userlist" element={<UserList />} />
                  <Route path="/logout" element={<Logout />} />
                  <Route path="/assignment" element={<Assignment />} />
                  <Route path="/english" element={<English />} />
                  <Route path="/booking" element={<Booking />} />
                  <Route path="/peerreview" element={<PeerReview />} />
                  <Route path="/paraphase" element={<ParaphraseApp />} />
                  <Route path="/speechtotext" element={<SpeechToText />} />
                  <Route path="/news" element={<News />} />
                  <Route path="/grammar" element={<GrammarlyEditor />} />
                  <Route path="/vision" element={<ImageAnalyzer />} />
                  <Route path="/tense" element={<PresentTenseExercise />} />
                  <Route path="/ptense" element={<PastTenseExercise />} />
                  <Route path="/ftense" element={<FutureTenseExercise />} />
                  <Route path="/wordblanker" element={<WordBlanker />} />
                  <Route path="/sentensereorder" element={<SentenseReorder />} />
                  <Route path="/filelist" element={<FileList />} />
                  <Route path="/recorder" element={<Recorder />} />
                  <Route path="/transcript" element={<Transcript />} />
                  <Route path="/textgenerator" element={<TextGenerator />} />
                  <Route path="/reading" element={<Reading />} />
                  <Route path="/fileuploader" element={<FileUploader />} />
                  <Route path="/filedisplay" element={<FileDisplay />} />


                </>
              ) : null}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

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