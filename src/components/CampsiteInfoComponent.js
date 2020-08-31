/*
Thai Nguyen
React-3
Date: 08-09-2020
*/
import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { LocalForm, Control, Errors } from "react-redux-form";
import { Loading } from './LoadingComponent';
// Validation
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenModal: false
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({
        isOpenModal: !this.state.isOpenModal
    });
  }
  handleSubmit(values) {
    this.toggleModal();
    //console.log("Current state is: " + JSON.stringify(values));
    alert("Current state is: " + JSON.stringify(values));
    this.props.addComment(this.props.campsiteId, values.rating, values.author, values.text);
  }
  render() {
    return (
      <>
        <Button outline onClick={this.toggleModal}>
          <i class="fa fa-lg fa-pencil" /> Submit Comment
        </Button>
        
        <Modal isOpen={this.state.isOpenModal} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}><h3>Submit Comment</h3></ModalHeader>
          <ModalBody>
          <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <div className="form-group">
                <Label htmlFor="rating">Rating</Label>
                <Control.select model=".rating" id="rating" name="rating" className="form-control" defaultValue="1">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </Control.select>
              </div>
              <div className="form-group">
                <Label htmlFor="name">Your Name</Label>
                <Control.text
                  model=".author"
                  id="author"
                  placeholder="Your Name"
                  name="author"
                  className="form-control"
                  validators={{
                    required,
                    minLength: minLength(2),
                    maxLength: maxLength(15),
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".author"
                  show="touched"
                  component="div"
                  messages={{
                    required: "Required",
                    minLength: "Must be at least 2 characters",
                    maxLength: "Must be 15 characters or less",
                  }}
                />
              </div>
              <div className="form-group">
                <Label htmlFor="text">Comment</Label>
                <Control.textarea
                  model=".text"
                  id="text"
                  name="text"
                  className="form-control"
                  rows="5"
                />
              </div>
              <Button type="submit" color="primary">
                Submit
              </Button>
            </LocalForm>          
          </ModalBody>
          </Modal>                 
      </>
    );
  }
}
function RenderCampsite({campsite}) {
      return (
        <div className="col-md-5 m-1">
          <Card>
            <CardImg top src={campsite.image} alt={campsite.name} />
            <CardBody>
              <CardText>{campsite.description}</CardText>
            </CardBody>
          </Card>
        </div>
      );
}

function RenderComments({comments, addComment, campsiteId}) {
  if (comments) {
    return (
      <div className="col-md-5 m-1">
        <h4>Comments</h4>
        {comments.map((comment) => (
          <div key={comment.id}>
            
              <p className="comment_css">{comment.text}</p>
              <p>
                {comment.author} -{" "}
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                }).format(new Date(Date.parse(comment.date)))}
              </p>
            
          </div>
        ))}
        <CommentForm campsiteId={campsiteId} addComment={addComment} />
      </div>
          );
  }
  return <div />;
}

function CampsiteInfo(props) {
  if (props.isLoading) {
      return (
          <div className="container">
              <div className="row">
                  <Loading />
              </div>
          </div>
      );
  }
  if (props.errMess) {
      return (
          <div className="container">
              <div className="row">
                  <div className="col">
                      <h4>{props.errMess}</h4>
                  </div>
              </div>
          </div>
      );
  }

  // check if an object with the name "campsite" (passed in via props) can be evaluated as truthy
  if (props.campsite) { // campsite is truthy
    return (
      <div className="container">
          <div className="row">
              <div className="col">
                  <Breadcrumb>
                      <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                      <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                  </Breadcrumb>
                  <h2>{props.campsite.name}</h2>
                  <hr />
              </div>
          </div>
          <div className="row">
            <RenderCampsite campsite={props.campsite} />
            <RenderComments 
                comments={props.comments}
                addComment={props.addComment}
                campsiteId={props.campsite.id}
            /> 
          </div>
          
      </div>
      
  );  }
  return <div />; // campsite not truthy --> display nothing
}
export default CampsiteInfo;