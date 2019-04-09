import React, { Component } from 'react';
import './App.css';
import { Container} from 'reactstrap';

import Layout from './hoc/Layout/Layout';
import IndexPage from './containers/IndexPage/IndexPage' ;


class App extends Component {
  render() {
    return (
        <Container fluid className="App">
            <Layout>
                <IndexPage/>
            </Layout>
        </Container>
    );
  }
}

export default App;
