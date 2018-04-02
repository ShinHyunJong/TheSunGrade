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

import * as LevelCreator from "../../ActionCreators/LevelCreator";

import { ImageNavigateNext, ActionDelete } from "material-ui/svg-icons";
import { green600, green400 } from "material-ui/styles/colors";

const defaultProps = {};
const propTypes = {};

const mapStateToProps = state => {
  return {
    level: state.reducer.level
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

class LevelPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      level: [],
      newLevel: ""
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
      newLevel: e.target.value
    });
  };

  handleDelete = async level => {
    console.log(level);
    let levelArray = this.state.level;
    for (let i = 0; i < levelArray.length; i++) {
      if (levelArray[i].name === level) {
        levelArray.splice(i, 1);
      }
    }
    await this.setState({
      level: levelArray
    });
    await this.props.dispatch(LevelCreator.deleteLevel(level));
  };

  handlePost = async() => {
    await this.setState(state => ({
      level: state.level.concat({ name: state.newLevel })
    }));
    await this.props
      .dispatch(LevelCreator.postLevel(this.state.newLevel))
      .then(this.setState({ open: false }));
  };

  componentDidMount() {
    this.props.dispatch(LevelCreator.getLevel()).then(value => {
      this.setState({ level: value });
    });
  }

  render() {
    const { level, newLevel } = this.state;
    const actions = [
      <FlatButton label="취소" onClick={this.handleClose} />,
      <FlatButton label="등록" primary={true} onClick={this.handlePost} />
    ];
    return (
      <div className="levelPage">
        <NavBar title="난이도" />
        <Dialog
          title="난이도 항목 추가하기"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          <TextField
            onChange={this.handleInput}
            fullWidth={true}
            hintText="ex) 심화"
          />
        </Dialog>
        <Container>
          <Row className="levelPage__content">
            {level.map((data, index) => {
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

LevelPage.defaultProps = defaultProps;
LevelPage.propTypes = propTypes;

export default connect(mapStateToProps)(LevelPage);
