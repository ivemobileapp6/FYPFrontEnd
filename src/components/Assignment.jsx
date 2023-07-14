import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import { firestore } from '../Firebase';

const Assignment = () => {
  const [assignments, setAssignments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [assignmentTitle, setAssignmentTitle] = useState('');
  const [assignmentDescription, setAssignmentDescription] = useState('');

  useEffect(() => {
    const fetchAssignments = async () => {
      const assignmentsCollection = collection(firestore, 'assignments');
      const assignmentsSnapshot = await getDocs(assignmentsCollection);
      const assignmentsList = assignmentsSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setAssignments(assignmentsList);
    };

    fetchAssignments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowModal(false);

    if (editingAssignment) {
      const assignmentRef = doc(firestore, 'assignments', editingAssignment.id);
      await updateDoc(assignmentRef, {
        title: assignmentTitle,
        description: assignmentDescription,
      });
    } else {
      await addDoc(collection(firestore, 'assignments'), {
        title: assignmentTitle,
        description: assignmentDescription,
      });
    }

    setAssignmentTitle('');
    setAssignmentDescription('');
    setEditingAssignment(null);
  };

  const handleEdit = (assignment) => {
    setEditingAssignment(assignment);
    setAssignmentTitle(assignment.title);
    setAssignmentDescription(assignment.description);
    setShowModal(true);
  };

  const handleDelete = async (assignmentId) => {
    const assignmentRef = doc(firestore, 'assignments', assignmentId);
    await deleteDoc(assignmentRef);
  };

  return (
    <Container>
      <h2>Assignments Overview</h2>
      <Button onClick={() => setShowModal(true)}>Add Assignment</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment) => (
            <tr key={assignment.id}>
              <td>{assignment.title}</td>
              <td>{assignment.description}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(assignment)}>Edit</Button>{' '}
                <Button variant="danger" onClick={() => handleDelete(assignment.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingAssignment ? 'Edit Assignment' : 'Add Assignment'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ padding: '1rem' }}> {/* Add this div with padding */}
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={assignmentTitle}
                  onChange={(e) => setAssignmentTitle(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={assignmentDescription}
                  onChange={(e) => setAssignmentDescription(e.target.value)}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                {editingAssignment ? 'Save Changes' : 'Add Assignment'}
              </Button>
            </Form>
          </div> 
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Assignment;