// import React, { useState, useEffect } from 'react';
// import { Container, Form, Button, Table } from 'react-bootstrap';
// import { collection, addDoc, onSnapshot, query, orderBy, where, doc, deleteDoc } from 'firebase/firestore';
// import { firestore } from '../Firebase';

// const Booking = () => {
//   console.log('Booking component rendered');

//   const [name, setName] = useState('');
//   const [date, setDate] = useState('');
//   const [time, setTime] = useState('');
//   const [bookings, setBookings] = useState([]);

//   const bookingsRef = collection(firestore, 'bookings');

//   useEffect(() => {
//     const unsubscribe = onSnapshot(query(bookingsRef), (snapshot) => {
//       const updatedBookings = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//       console.log('Updated bookings:', updatedBookings);
//       setBookings(updatedBookings);
//     });

//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   const addBooking = async (e) => {
//     e.preventDefault();
//     await addDoc(bookingsRef, { name, date, time });
//     setName('');
//     setDate('');
//     setTime('');
//   };

//   const deleteBooking = async (id) => {
//     await deleteDoc(doc(firestore, 'bookings', id));
//   };

//   return (
//     <Container>
//       <h2>Book a Lesson</h2>
//       <Form onSubmit={addBooking}>
//         <Form.Group>
//           <Form.Label>Name</Form.Label>
//           <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
//         </Form.Group>
//         <Form.Group>
//           <Form.Label>Date</Form.Label>
//           <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
//         </Form.Group>
//         <Form.Group>
//           <Form.Label>Time</Form.Label>
//           <Form.Control type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
//         </Form.Group>
//         <Button variant="primary" type="submit">
//           Book Lesson
//         </Button>
//       </Form>

//       <h3 className="mt-4">Scheduled Lessons</h3>
//       <Table striped bordered hover size="sm">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Date</th>
//             <th>Time</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {bookings.map((booking) => (
//             <tr key={booking.id}>
//               <td>{booking.name}</td>
//               <td>{booking.date}</td>
//               <td>{booking.time}</td>
//               <td>
//                 <Button variant="danger" onClick={() => deleteBooking(booking.id)} size="sm">
//                   Cancel
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </Container>
//   );
// };

// export default Booking;

// import React, { useState, useEffect } from 'react';
// import { Container, Form, Button, Table } from 'react-bootstrap';
// import { collection, addDoc, onSnapshot, query, orderBy, where, doc, deleteDoc } from 'firebase/firestore';
// import { firestore } from '../Firebase';

// const Booking = () => {
//   console.log('Booking component rendered');

//   const [name, setName] = useState('');
//   const [date, setDate] = useState('');
//   const [time, setTime] = useState('');
//   const [bookings, setBookings] = useState([]);

//   const bookingsRef = collection(firestore, 'bookings');

//   useEffect(() => {
//     const unsubscribe = onSnapshot(query(bookingsRef), (snapshot) => {
//       const updatedBookings = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//       console.log('Updated bookings:', updatedBookings);
//       setBookings(updatedBookings);
//     });

//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   const addBooking = async (e) => {
//     e.preventDefault();
//     await addDoc(bookingsRef, { name, date, time });
//     setName('');
//     setDate('');
//     setTime('');
//   };

//   const deleteBooking = async (id) => {
//     await deleteDoc(doc(firestore, 'bookings', id));
//   };

//   return (
//     <Container>
//       <h2>Book a Lesson</h2>
//       <Form onSubmit={addBooking}>
//         <Form.Group>
//           <Form.Label>Name</Form.Label>
//           <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
//         </Form.Group>
//         <Form.Group>
//           <Form.Label>Date</Form.Label>
//           <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
//         </Form.Group>
//         <Form.Group>
//           <Form.Label>Time</Form.Label>
//           <Form.Control type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
//         </Form.Group>
//         <Button variant="primary" type="submit">
//           Book Lesson
//         </Button>
//       </Form>

//       <h3 className="mt-4">Scheduled Lessons</h3>
//       <Table striped bordered hover size="sm">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Date</th>
//             <th>Time</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {bookings.map((booking) => (
//             <tr key={booking.id}>
//               <td>{booking.name}</td>
//               <td>{booking.date}</td>
//               <td>{booking.time}</td>
//               <td>
//                 <Button variant="danger" onClick={() => deleteBooking(booking.id)} size="sm">
//                   Cancel
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </Container>
//   );
// };

// export default Booking;

// import { useState, useEffect } from 'react';
// import { Container, Form, Button, Table } from 'react-bootstrap';
// import { collection, addDoc, onSnapshot, query, orderBy, where, doc, deleteDoc, getDoc } from 'firebase/firestore';
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';

// const Booking = () => {
//   console.log('Booking component rendered');

//   const [name, setName] = useState('');
//   const [date, setDate] = useState('');
//   const [time, setTime] = useState('');
//   const [bookings, setBookings] = useState([]);
//   const [userRole, setUserRole] = useState(null);

//   const firestore = getFirestore();
//   const auth = getAuth();

//   const bookingsRef = collection(firestore, 'bookings');

//   useEffect(() => {
//     const unsubscribe = onSnapshot(query(bookingsRef), (snapshot) => {
//       const updatedBookings = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//       console.log('Updated bookings:', updatedBookings);
//       setBookings(updatedBookings);
//     });

//     const authUnsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         const userRef = doc(collection(firestore, 'users'), user.uid);
//         const userDocSnap = await getDoc(userRef);
//         const userData = userDocSnap.data();
//         setUserRole(userData?.role);
//       } else {
//         setUserRole(null);
//       }
//     });

//     return () => {
//       unsubscribe();
//       authUnsubscribe();
//     };
//   }, []);

//   const addBooking = async (e) => {
//     e.preventDefault();
//     await addDoc(bookingsRef, { name, date, time, userId: auth.currentUser.uid });
//     setName('');
//     setDate('');
//     setTime('');
//   };

//   const deleteBooking = async (id) => {
//     const booking = bookings.find((booking) => booking.id === id);
//     if (booking.userId === auth.currentUser.uid || userRole === 'admin') { // Check if the current user is the owner of the booking or an admin
//       await deleteDoc(doc(firestore, 'bookings', id));
//     }
//   };

//   return (
//     <Container>
//       <h2>Book a Lesson</h2>
//       <Form onSubmit={addBooking}>
//         <Form.Group>
//           <Form.Label>Name</Form.Label>
//           <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
//         </Form.Group>
//         <Form.Group>
//           <Form.Label>Date</Form.Label>
//           <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
//         </Form.Group>
//         <Form.Group>
//           <Form.Label>Time</Form.Label>
//           <Form.Control type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
//         </Form.Group>
//         <Button variant="primary" type="submit">
//           Book Lesson
//         </Button>
//       </Form>

//       <h3 className="mt-4">Scheduled Lessons</h3>
//       <Table striped bordered hover size="sm">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Date</th>
//             <th>Time</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {bookings.map((booking) => (
//             <tr key={booking.id}>
//               <td>{booking.name}</td>
//               <td>{booking.date}</td>
//               <td>{booking.time}</td>
//               <td>
//                 {(booking.userId === auth.currentUser?.uid || userRole === 'admin') && (
//                   <Button variant="danger" onClick={() => deleteBooking(booking.id)} size="sm">
//                     Cancel
//                   </Button>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </Container>
//   );
// };

// export default Booking;

import { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, doc, deleteDoc, updateDoc, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { Form, Input, Button, Table, Space, DatePicker, TimePicker, Typography, Card, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Title } = Typography;
const { confirm } = Modal;

const Booking = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [bookings, setBookings] = useState([]);
  const [userRole, setUserRole] = useState(null);

  const firestore = getFirestore();
  const auth = getAuth();

  const bookingsRef = collection(firestore, 'bookings');

  useEffect(() => {
    const unsubscribe = onSnapshot(bookingsRef, (snapshot) => {
      const updatedBookings = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setBookings(updatedBookings);
    });

    const authUnsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(collection(firestore, 'users'), user.uid);
        const userDocSnap = await getDoc(userRef);
        const userData = userDocSnap.data();
        setUserRole(userData?.role);
      } else {
        setUserRole(null);
      }
    });

    return () => {
      unsubscribe();
      authUnsubscribe();
    };
  }, []);

  const addBooking = async (e) => {
    e.preventDefault();
    await addDoc(bookingsRef, { name, date, time, userId: auth.currentUser.uid, status: 'pending' });
    setName('');
    setDate('');
    setTime('');
  };

  const deleteBooking = async (id, status) => {
    if (status === 'pending' && userRole === 'admin') {
      await deleteDoc(doc(firestore, 'bookings', id));
    } else {
      Modal.error({
        title: 'Cannot delete a booking',
        content: `Cannot delete a booking with status ${status}`,
      });
    }
  };

  const showDeleteConfirm = (id, status) => {
    confirm({
      title: 'Are you sure delete this booking?',
      icon: <ExclamationCircleOutlined />,
      content: 'Once deleted, this booking cannot be retrieved.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteBooking(id, status);
      },
    });
  };

  const approveBooking = async (id) => {
    await updateDoc(doc(firestore, 'bookings', id), { status: 'approved' });
  };

  const rejectBooking = async (id) => {
    await updateDoc(doc(firestore, 'bookings', id), { status: 'rejected' });
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Actions',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => approveBooking(record.id)}>
            Approve
          </Button>
          <Button onClick={() => rejectBooking(record.id)}>Reject</Button>
          <Button type="primary" danger onClick={() => showDeleteConfirm(record.id, record.status)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Card title={<Title level={2}>Book a Lesson</Title>}>
      <Form onSubmit={addBooking}>
        <Form.Item label="Name">
          <Input value={name} onChange={(e) => setName(e.target.value)} required />
        </Form.Item>
        <Form.Item label="Date">
          <DatePicker value={date && moment(date)} onChange={(date) => setDate(date?.format('YYYY-MM-DD'))} required />
        </Form.Item>
        <Form.Item label="Time">
          <TimePicker format="HH:mm" value={time && moment(time, 'HH:mm')} onChange={(time) => setTime(time?.format('HH:mm'))} required />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Book Lesson
          </Button>
        </Form.Item>
      </Form>
      {userRole === 'admin' ? (
        <Table
          title={() => <Title level={3}>Pending Bookings</Title>}
          columns={columns}
          dataSource={bookings}
          rowKey="id"
        />
      ) : (
        <Table
          title={() => <Title level={3}>Your Bookings</Title>}
          columns={columns.filter((column) => column.key !== 'action')}
          dataSource={bookings.filter((booking) => booking.userId === auth.currentUser.uid)}
          rowKey="id"
        />
      )}
    </Card>
  );
};

export default Booking;