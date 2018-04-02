// This Page is Skeleton of React Structure for Web Development
// If you want to make other page, Copy and Refactor this page.

import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import { NavBar, List } from "../../Components";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import FloatingActionButton from "material-ui/FloatingActionButton";
import TextField from "material-ui/TextField";
import ContentAdd from "material-ui/svg-icons/content/add";

import * as DefaultActionCreator from "../../ActionCreators/_DefaultActionCreator";
import * as ActivityCreator from "../../ActionCreators/ActivityCreator";
import { ImageNavigateNext, ActionDelete } from "material-ui/svg-icons";
import { green600, green400 } from "material-ui/styles/colors";

const defaultProps = {};
const propTypes = {};

const mapStateToProps = state => {
  return {
    activity: state.reducer.activity
  };
};

const styleAdd = {
  position: "absolute",
  right: 150,
  bottom: 50
};

const iconStyles = {
  width: 25,
  height: 25,
  marginRight: 10
};

class ActionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      activity: [],
      action: ""
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleInput = e => {
    this.setState({
      action: e.target.value
    });
  };

  handleDelete = async activity => {
    console.log(activity);
    let activityArray = this.state.activity;
    for (let i = 0; i < activityArray.length; i++) {
      if (activityArray[i].name === activity) {
        activityArray.splice(i, 1);
      }
    }
    await this.setState({
      activity: activityArray
    });
    await this.props.dispatch(ActivityCreator.deleteActivity(activity));
  };

  handlePost = async() => {
    await this.setState(state => ({
      activity: state.activity.concat({ name: state.action })
    }));
    await this.props
      .dispatch(ActivityCreator.postActivity(this.state.action))
      .then(this.setState({ open: false }));
  };

  componentDidMount() {
    this.props.dispatch(ActivityCreator.getActivity()).then(value => {
      this.setState({ activity: value });
    });
  }

  render() {
    const { activity, action } = this.state;
    console.log(activity);
    const actions = [
      <FlatButton label="Cancel" onClick={this.handleClose} />,
      <FlatButton label="Submit" primary={true} onClick={this.handlePost} />
    ];
    return (
      <div className="actionPage">
        <NavBar title="행동 영역" />
        <Dialog
          title="행동 영역 항목 추가하기"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          <TextField
            onChange={this.handleInput}
            fullWidth={true}
            hintText="ex) 응용"
          />
        </Dialog>
        <Container>
          <Row className="actionPage__content">
            {activity.map((data, index) => {
              return (
                <List
                  key={index}
                  content={data.name}
                  onClickIcon={() => this.handleDelete(data.name)}
                  next={<ActionDelete style={iconStyles} color={green600} />}
                />
              );
            })}
          </Row>
        </Container>
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

ActionPage.defaultProps = defaultProps;
ActionPage.propTypes = propTypes;

export default connect(mapStateToProps)(ActionPage);
