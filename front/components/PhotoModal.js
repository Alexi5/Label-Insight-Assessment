import React from 'react';
import { connect } from 'react-redux'
import { Link, Router, Route, browserHistory } from 'react-router';
import store from '../store.js';
import axios from 'axios'

//components
import { Grid, Row, Col, Modal, Button } from 'react-bootstrap';

class PhotoModal extends React.Component {

  constructor(props){
      super(props);
      this.state = {
        photo: props.singlePhoto,
        description: '',
      }

      this.handleChange=this.handleChange.bind(this)
      this.handleSubmit=this.handleSubmit.bind(this)
      this.closeModal = this.closeModal.bind(this)
  }

  handleChange(field, event){
    this.setState({
        [field]: event.target.value,
    })
  }

  handleSubmit(event){
    event.preventDefault(); 
    
    //update the store
    store.dispatch(updatePhoto(this.state.photo.id, this.state.description))

    //reset local state
    this.setState({
      description: '', 
    })
  }

  closeModal() {
    console.log(this.props.showModal)
    this.props.showModal = false;
  }

  render() {
    return (     
      <div>
        {/*Display Info*/}
        <div className="single-photo-display">
          <div>
             <img src={this.state.photo.url} className="display-image" />
          </div>
          <div className="display-title">
            <span>{this.state.photo.title}</span>
          </div>
        </div>

        {/*Modal Form*/}
        <div className="row">
          <div className="col-md-6 col-md-offset-2">
            <form onSubmit={this.handleSubmit.bind(this)} >
              <div className="form-group">
                <label>Description</label>
                <input  
                   className="form-control"
                   type="text" 
                   name="description"
                   value={this.state.description}
                   placeholder="add photo description" 
                   onChange={e => this.handleChange('description', e)} />
              </div>
              <button className="btn btn-primary">Save</button>
            </form>
          </div>
          <button className="btn btn-primary" onClick={this.closeModal}>Close</button>
        </div>
      </div>
    )
  }
};

const mapStateToProps = (state, ownProps) => {
  return { 
    showModal: ownProps.showModal,
    singlePhoto: ownProps.singlePhoto,
    allPhotos: ownProps.allPhotos
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return { 
    showModal: function (boolean) {
      dispatch(showModal(boolean));
    },
    updatePhoto: function(photoId, description){
      dispatch(updatePhoto(photoId, description))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PhotoModal);



