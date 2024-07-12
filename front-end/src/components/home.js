import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            <p>Navigate to the Signup page to create an account or login.</p>
            <div>
                <Link to="/signup">
                    <button>Signup</button>
                </Link>
                <Link to="/login">
                    <button>Login</button>
                </Link>
            </div>
        </div>
    );
}

export default Home;
