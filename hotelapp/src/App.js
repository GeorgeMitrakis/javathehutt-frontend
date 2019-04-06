import React, { Component } from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';

import { Container} from 'reactstrap';

class App extends Component {
  render() {
    return (
        <Container fluid className="App">
            <Layout>
                
            </Layout>
        </Container>
    );
  }
}

export default App;
