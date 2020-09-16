import React, { Component } from 'react';
import { Container, Col, Row, Form, ProgressBar } from 'react-bootstrap';
import axios from 'axios';
import test_data from './test-data/webapp';
import ScoreAction from './components/ScoreAction/ScoreAction';

import 'bootstrap/dist/css/bootstrap.min.css';  
import './App.css';

class App extends Component {
  state = {
    datatype : "",
    data: []
  }

  onDataTypeChange = (datatype) => {
    this.setState({datatype}, 
      () => {
      if(this.state.datatype === "test data") {
        const testData = JSON.parse(test_data);

        const data = this.getMappedCountryAverageTestData(testData);
        this.setState({data});
      } else {
        axios.get("https://assessments.reliscore.com/api/cric-scores/")
        .then((resp) => {
          const data = this.getMappedCountryAverageServerData(resp.data);
          this.setState({data});
        })
      }      
    });
  }

  getMappedCountryAverageTestData = (cricketScoreData) => {
    const data = cricketScoreData.reduce((obj, countryScore) => {
      const country = countryScore.country.toLowerCase();

      if(!obj[country]) {
        obj[country] = {count: 1, sum: countryScore.score}
      } else {
        const score = obj[country].sum + countryScore.score;
        const count = obj[country].count + 1;

        obj[country] = { count: count , sum: score};
      }
      return obj;      
    }, {});

    const formatedcountryScore = Object.keys(data).reduce((obj, countryName) => {
      const country = countryName.toLowerCase();

      obj[country] = data[country].sum / data[country].count;
      obj[country] = Math.round(obj[country]);

      return obj;
    }, {});

    return formatedcountryScore;
  }

  getMappedCountryAverageServerData = (cricketScoreData) => {
    const data = cricketScoreData.reduce((obj, countryScore) => {

      const countryName = countryScore[0].toLowerCase(); 

      if(!obj[countryName]) {
        obj[countryName] = {count: 1, sum: countryScore[1]}
      } else {
        const score = obj[countryName].sum + countryScore[1];
        const count = obj[countryName].count + 1;

        obj[countryName] = { count: count , sum: score};
      }
      return obj;      
    }, {});

    const formatedcountryScore = Object.keys(data).reduce((obj, countryName) => {
      const country = countryName.toLowerCase();

      obj[country] = data[country].sum / data[country].count;
      obj[country] =  Math.round(obj[country]);

      return obj;
    }, {});

    return formatedcountryScore;
  }

  render() {
    const { data, datatype } =  this.state;

    return (
      <Container className="country-score-container">
        <Row className="title">
          <Col md="12 heading">Welcome to country score dashboard</Col>
        </Row>
        <Container>
        <Row className="source-container-row">
          <Col className="source-container" md="6">
            <Row>
              <Col className="source-item padding-0" md="4">Source of data:</Col>
              <Col className="source-item" md="4">
                <Form.Check
                  type="radio"
                  label="Test Data"
                  name="formHorizontalRadios"
                  onClick={() => this.onDataTypeChange("test data")}
                />
              </Col>
              <Col className="source-item" md="4">
                <Form.Check
                  type="radio"
                  label="Server data"
                  name="formHorizontalRadios"
                  onClick={() => this.onDataTypeChange("server data")}
                />
              </Col>
            </Row>
          </Col>
          {/* <Col md="6"></Col> */}
        </Row>
          {datatype.length > 0 && <>
          <ScoreAction data={data}/>
          <ScoreAction data={data}/>
          </>}
          </Container>  
      </Container>
    );
  }
}

export default App;
