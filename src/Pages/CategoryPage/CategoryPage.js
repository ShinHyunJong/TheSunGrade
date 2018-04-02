// This Page is Skeleton of React Structure for Web Development
// If you want to make other page, Copy and Refactor this page.

import React, { Component } from "react";
import { connect } from "react-redux";
import { NavBar, List } from "../../Components";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import FloatingActionButton from "material-ui/FloatingActionButton";
import TextField from "material-ui/TextField";
import ContentAdd from "material-ui/svg-icons/content/add";
import { Container, Row, Col } from "reactstrap";
import { Route, Link } from "react-router-dom";
import { ImageNavigateNext } from "material-ui/svg-icons";
import { green600, green400 } from "material-ui/styles/colors";

import * as DefaultActionCreator from "../../ActionCreators/_DefaultActionCreator";

const defaultProps = {};
const propTypes = {};

const style = {
  height: 80,
  width: 500,
  margin: 20,
  textAlign: "center",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  display: "flex"
};

const styleAdd = {
  position: "absolute",
  right: 250,
  bottom: 100
};

const iconStyles = {
  width: 30,
  height: 30,
  marginRight: 10
};

const mapStateToProps = state => {
  return {
    actionResult: state.reducer.actionResult
  };
};

class CategoryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }
  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    this.props.dispatch(DefaultActionCreator.action());
  }

  render() {
    const actions = [
      <FlatButton label="Cancel" primary={true} onClick={this.handleClose} />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={true}
        onClick={this.handleClose}
      />
    ];
    return (
      <div className="categoryPage">
        <NavBar title="카테고리 입력" />
        <div className="categoryPage__content">
          <Link to="/category/action" className="link">
            <List
              content="행동 영역"
              next={<ImageNavigateNext style={iconStyles} color={green600} />}
            />
          </Link>
          <Link to="/category/level" className="link">
            <List
              content="난이도"
              next={<ImageNavigateNext style={iconStyles} color={green600} />}
            />
          </Link>

          <Dialog
            title="카테고리 추가하기"
            actions={actions}
            modal={true}
            open={this.state.open}
          >
            <TextField fullWidth={true} hintText="ex) 난이도" />
          </Dialog>
        </div>
        <FloatingActionButton
          style={styleAdd}
          label="Modal Dialog"
          onClick={this.handleOpen}
        >
          <ContentAdd />
        </FloatingActionButton>
      </div>
    );
  }
}

CategoryPage.defaultProps = defaultProps;
CategoryPage.propTypes = propTypes;

export default connect(mapStateToProps)(CategoryPage);
