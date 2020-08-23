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
    console.log("Current state is: " + JSON.stringify(values));
    alert("Current state is: " + JSON.stringify(values));
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
                  model=".name"
                  id="name"
                  placeholder="Your Name"
                  name="name"
                  className="form-control"
                  validators={{
                    required,
                    minLength: minLength(2),
                    maxLength: maxLength(15),
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".name"
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
                <Label htmlFor="comment">Comment</Label>
                <Control.textarea
                  model=".comment"
                  id="comment"
                  name="comment"
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

function RenderComments({comments}) {
  if (comments) {
    return (
      <div className="col-md-5 m-1">
        <h4>Comments</h4>
        {comments.map((comment) => (
          <div key={comment.id}>
            <p>{comment.text}</p>
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
        <CommentForm />
      </div>
          );
  }
  return <div />;
}

function CampsiteInfo(props) {
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
            <RenderComments comments={props.comments} />
          
          </div>
          
      </div>
      
  );  }
  return <div />; // campsite not truthy --> display nothing
}
export default CampsiteInfo;