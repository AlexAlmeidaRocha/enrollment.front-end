import Menu from '../Menu';
import React, { useState, useEffect } from 'react';
import EnrollmentTable from './components/EnrollmentTable';
import AddEnrollmentForm from './components/AddEnrollmentForm';
import AlterEnrollmentForm from './components/AlterEnrollmentForm';
import enrollmentApi from '../../api/enrollment.api';


function Enrollment() {

  //Add
  const [add, setAddEnrollment] = useState(false)

  const [enrollments, setEnrollments] = useState([])

  //Alterar
  const [editing, setEditing] = useState(false)

  const initialFormState = { id: null, name: '' }

  const [currentEnrollment, setCurrentEnrollment] = useState(initialFormState)

  const editRow = enrollment => {
    setEditing(true)
    setCurrentEnrollment({ id: enrollment.id, name: enrollment.name })
  }

  const getenrollments = () => {
    enrollmentApi.getAll().then(result => {

      if (result.status === 200 && result.data.length > 0) {
        setEnrollments(result.data);
      }
    });
  }
  useEffect(() => {
    getenrollments();
  }, [])

  return (
    <>    
      <Menu />
      {
        editing ? (
          <AlterEnrollmentForm
            setEditing={setEditing}
            currentEnrollment={currentEnrollment}
            getenrollments={getenrollments}
          />
        ) : add ? (
          <AddEnrollmentForm
            setAddEnrollment={setAddEnrollment}
            getenrollments={getenrollments}
          />
        ) : <EnrollmentTable
          setAddEnrollment={setAddEnrollment}
          enrollments={enrollments}
          getenrollments={getenrollments}
          editRow={editRow}
        />
      }
    </>
  );
}

export default Enrollment;