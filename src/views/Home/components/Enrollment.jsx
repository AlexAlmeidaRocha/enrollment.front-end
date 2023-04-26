import { useEffect, useState } from 'react';
import enrollmentApi from '../../../api/enrollment.api';
//import Skeleton from 'react-loading-skeleton'

const Enrollment = ({ id }) => {

    const [enrollment, setEnrollment] = useState(null)

    useEffect(() => {

        enrollmentApi.getById(id).then(result => {            
            if (result.status === 200) {
                setEnrollment(result.data);
            }
        });
    }, [])

    // if (enrollment === null) {
    //     return <Skeleton count={1} />
    // }

    return (
        <> {enrollment?.name} </>
    );
}

export default Enrollment;