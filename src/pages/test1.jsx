import React, { Component } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

// const Test1 = (props) => {
//     const navigate = useNavigate();
//     onclick = () => {
//         navigate("/test2");
//     }

//     return (
//         <button onClick={onclick}>
//             Click!
//         </button>
//     );
// };

// export default Test1;

class Test1 extends Component {
    onclick = () => {
        return <Navigate to='/test2'/>
    }
    
    render() {
        return (
            <button onClick={onclick}>
                Click!
            </button>
        );
    }
}

export default Test1;