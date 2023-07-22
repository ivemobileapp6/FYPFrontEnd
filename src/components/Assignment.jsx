import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { Container, Table, Button, Form } from 'react-bootstrap';
import { firestore } from '../Firebase';

const Assignment = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [assignmentTitle, setAssignmentTitle] = useState('');
  const [assignmentDescription, setAssignmentDescription] = useState('');
  const [assignmentDate, setAssignmentDate] = useState('');
  const [assignmentName, setAssignmentName] = useState('');

  const fetchAssignments = async () => {
    setLoading(true);
    setError(null);
    try {
      const assignmentsCollection = collection(firestore, 'assignments');
      const assignmentsSnapshot = await getDocs(assignmentsCollection);
      const assignmentsList = assignmentsSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setAssignments(assignmentsList);
    } catch (err) {
      setError('Failed to fetch assignments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setShowForm(false);
    try {
      if (editingAssignment) {
        const assignmentRef = doc(firestore, 'assignments', editingAssignment.id);
        await updateDoc(assignmentRef, {
          title: assignmentTitle,
          description: assignmentDescription,
          date: assignmentDate,
          name: assignmentName,
        });
      } else {
        await addDoc(collection(firestore, 'assignments'), {
          title: assignmentTitle,
          description: assignmentDescription,
          date: assignmentDate,
          name: assignmentName,
        });
      }
      fetchAssignments();
    } catch (err) {
      setError('Failed to submit assignment');
    }
    setAssignmentTitle('');
    setAssignmentDescription('');
    setAssignmentDate('');
    setAssignmentName('');
    setEditingAssignment(null);
  };

  const handleEdit = (assignment) => {
    setEditingAssignment(assignment);
    setAssignmentTitle(assignment.title);
    setAssignmentDescription(assignment.description);
    setAssignmentDate(assignment.date);
    setAssignmentName(assignment.name);
    setShowForm(true);
  };

  const handleDelete = async (assignmentId) => {
    if (window.confirm('Are you sure you want to delete this assignment?')) {
      setError(null);
      try {
        const assignmentRef = doc(firestore, 'assignments', assignmentId);
        await deleteDoc(assignmentRef);
        fetchAssignments();
      } catch (err) {
        setError('Failed to delete assignment');
      }
    }
  };

  return (
    <Container>
      <h2>Assignments Overview</h2>
      {error && <div>{error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Button onClick={() => setShowForm(true)}>Add Assignment</Button>

          {showForm && (
            <div className="assignment-form">
              <h4>{editingAssignment ? 'Edit Assignment' : 'Add Assignment'}</h4>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={assignmentName}
                    onChange={(e) => setAssignmentName(e.target.value)}
                    required
                  />
                </Form.Group>
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
                <Form.Group>
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={assignmentDate}
                    onChange={(e) => setAssignmentDate(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  {editingAssignment ? 'Save Changes' : 'Add Assignment'}
                </Button>
                <Button variant="secondary" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </Form>
            </div>
          )}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Title</th>
                <th>Description</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment) => (
                <tr key={assignment.id}>
                  <td>{assignment.name}</td>
                  <td>{assignment.title}</td>
                  <td>{assignment.description}</td>
                  <td>{assignment.date}</td>
                  <td>
                    <Button variant="warning" onClick={() => handleEdit(assignment)}>
                      Edit
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(assignment.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </Container>
  );
};

export default Assignment;