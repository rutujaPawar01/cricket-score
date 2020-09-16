import React, { Component } from 'react';
import { Container, Col, Row, Form, ProgressBar } from 'react-bootstrap';

class ScoreAction extends Component {
    state = {
        country: "India",
    }

    countryChange = (event) => {
        if(event.target.value) {
            const country = event.target.value.toLowerCase();
            this.setState({country});
        }
    }

    render() {
        const {country} = this.state;
        const {data} = this.props;

        return (
            <Row>
            <Col md="12" className="action-container" >
            <Row>
                <Col className="input-container" md="4">
                <Row>
                    <Form.Group as={Row}>
                    <Form.Label column sm="6">
                        The Country:
                    </Form.Label>
                    <Col sm="6">
                        <Form.Control 
                            type="text" 
                            placeholder="Country" 
                            onChange={this.countryChange}
                            />
                    </Col>              
                    </Form.Group>
                </Row>
                </Col>
                <Col className="input-container" md="4">
                <Row>
                {data[country] && <>
                    <Form.Label column sm="6">
                        The Average:
                    </Form.Label>
                    <Form.Label column sm="6">
                        {data[country.toLowerCase()]}
                    </Form.Label>  
                    </>   
    }        
                </Row>
                </Col>
                <Col md="4">
                {data[country] && <ProgressBar now={data[country.toLowerCase()]} />}
                </Col>
            </Row>
            </Col>
            </Row>    
        );
    }
}

export default ScoreAction;