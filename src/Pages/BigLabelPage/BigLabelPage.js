// This Page is Skeleton of React Structure for Web Development
// If you want to make other page, Copy and Refactor this page.

import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import { NavBar, List } from "../../Components";

import * as DefaultActionCreator from "../../ActionCreators/_DefaultActionCreator";

const defaultProps = {};
const propTypes = {};

const mapStateToProps = state => {
  return {
    actionResult: state.reducer.actionResult
  };
};

class BigLabelPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grade: "",
      semester: ""
    };
  }
  componentWillMount() {
    this.setState({
      grade: this.props.location.params.grade,
      semester: this.props.location.params.semester
    });
  }

  componentDidMount() {
    this.props.dispatch(DefaultActionCreator.action());
  }

  render() {
    const { grade, semester } = this.state;
    return (
      <div className="bigLabel">
        <NavBar title={grade + " " + semester + " 대단원"} />
        <Container>
          <Row className="bigLabel__content">
            <List content="집합" />
            <List content="명제" />
            <List content="유리함수" />
            <List content="무리함수" />
          </Row>
        </Container>
      </div>
    );
  }
}

BigLabelPage.defaultProps = defaultProps;
BigLabelPage.propTypes = propTypes;

export default connect(mapStateToProps)(BigLabelPage);
