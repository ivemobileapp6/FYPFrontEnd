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

import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Table } from 'react-bootstrap';
import { collection, addDoc, onSnapshot, query, orderBy, where, doc, deleteDoc } from 'firebase/firestore';
import { firestore } from '../Firebase';

const Booking = () => {
  console.log('Booking component rendered');

  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [bookings, setBookings] = useState([]);

  const bookingsRef = collection(firestore, 'bookings');

  useEffect(() => {
    const unsubscribe = onSnapshot(query(bookingsRef), (snapshot) => {
      const updatedBookings = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      console.log('Updated bookings:', updatedBookings);
      setBookings(updatedBookings);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const addBooking = async (e) => {
    e.preventDefault();
    await addDoc(bookingsRef, { name, date, time });
    setName('');
    setDate('');
    setTime('');
  };

  const deleteBooking = async (id) => {
    await deleteDoc(doc(firestore, 'bookings', id));
  };

  return (
    <Container>
      <h2>Book a Lesson</h2>
      <Form onSubmit={addBooking}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Date</Form.Label>
          <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Time</Form.Label>
          <Form.Control type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
        </Form.Group>
        <Button variant="primary" type="submit">
          Book Lesson
        </Button>
      </Form>

      <h3 className="mt-4">Scheduled Lessons</h3>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.name}</td>
              <td>{booking.date}</td>
              <td>{booking.time}</td>
              <td>
                <Button variant="danger" onClick={() => deleteBooking(booking.id)} size="sm">
                  Cancel
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Booking;