import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

export default () => (
    <div className="container d-flex-column justify-content-center">
        <h1>Oops!</h1>
        <h2>404 Not Found</h2>
        <p>
            Sorry, an error has occured, Requested page not found!
        </p>

        <div>
            <Link to="/">
	            <Button className="btn-primary">
	            	Take Me Home
	            </Button>
            </Link>
        </div>
    </div>
)
