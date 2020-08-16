/*
Thai Nguyen
React-3
Date: 08-09-2020
*/
import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";

function RenderCampsite({campsite}) {
      return (
        <div className="col-md-5 m-1">
          <Card>
            <CardImg top src={campsite.image} alt={campsite.name} />
            <CardBody>
              <CardTitle>{campsite.name}</CardTitle>
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
                <RenderCampsite campsite={props.campsite} />
                <RenderComments comments={props.campsite.comments} />
              </div>
            </div>
          );
        }
        return <div />; // campsite not truthy --> display nothing
}
export default CampsiteInfo;