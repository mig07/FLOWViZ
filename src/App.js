
import React from "react";
import { hot } from 'react-hot-loader/root';
import Button from '@material-ui/core/Button';

class App extends React.Component {
  render() {
    const { name } = this.props;
    return (
      <>
        <h1>
          {name} web app
        </h1>
        <Button variant="contained">this is a material UI button</Button>
      </>
    );
  }
}

export default hot(App);
