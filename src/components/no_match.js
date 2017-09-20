import React from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron, Button } from 'reactstrap';

export default () => (
    <Jumbotron>
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
    </Jumbotron>
)