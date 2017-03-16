import React, { PropTypes } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';
import store from '../store.js';

//components
import { Modal } from 'react-bootstrap';
import PhotoModal from './PhotoModal';

//reducers
import { setAllPhotos } from '../reducers/photos';
import { updatePhoto } from '../reducers/photos'

class Main extends React.Component {

  constructor(props){
      super(props);
      this.state = {
        singlePhoto: {},
        allPhotos: {},
        showModal: false,
        dirtyInput: '',
        description: ''
      }
      this.handleChange=this.handleChange.bind(this)
      this.handleSubmit=this.handleSubmit.bind(this)
      this.openModal = this.openModal.bind(this)
      this.closeModal = this.closeModal.bind(this)
      this.photoDetials = this.photoDetials.bind(this)
      this.renderAllPhotos = this.renderAllPhotos.bind(this)
      this.loadDescription = this.loadDescription.bind(this)
  }

  handleChange(field, event){
    this.setState({
        [field]: event.target.value,
    })
  }

  handleSubmit(event){
    event.preventDefault(); 
    
    //update the store
    if(this.state.dirtyInput){
      store.dispatch(updatePhoto(this.state.singlePhoto.id, this.state.dirtyInput))
    }

    //reset local state
    this.setState({
      dirtyInput: '', 
    })
  }

  openModal() {
    this.setState({ showModal: true });
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  photoDetials(photo){
    this.setState({
      singlePhoto: photo, 
    })
    this.openModal()
  }

  renderAllPhotos(photos){
    return(
      <div className="container-row">
      {
        photos && Object.values(photos).map(photo => {
          return (
            <div key={photo.id} className="photos-col">
              <img src={photo.thumbnailUrl} onClick={ e => this.photoDetials(photo, e)} />
            </div>
          )
        })
      }  
      </div>
    )
  }

  loadDescription(photo){
    return(
      <div className="photo-description">
        {photo.description && 
          <p>description: {photo.description}</p>
        }
      </div>
    )
  
  }

  render() {
    let photos = this.props.allPhotos;
    let photo = this.state.singlePhoto;

    return (
      <div id="main">
        {this.renderAllPhotos(photos)}
        <Modal show={this.state.showModal} onHide={this.close}>
          {/*Display Info*/}
          <div className="single-photo-display">
            <div>
               <img src={photo.url} className="display-image" />
            </div>
            <div className="display-title">
              <span>{photo.title}</span>
            </div>
            {this.loadDescription(photo)}
          </div>

          {/*Modal Form*/}
          <div className="row">
            <div className="col-md-6 col-md-offset-2">
              <form onSubmit={this.handleSubmit.bind(this)} >
                <div className="modal-form-group">
                  <div className="modal-input">
                    <input  
                       className="form-control-override"
                       type="text" 
                       name="description"
                       value={this.state.dirtyInput}
                       placeholder="add photo description" 
                       onChange={e => this.handleChange('dirtyInput', e)} />
                  </div>
                  <button className="modal-button" onClick={this.closeModal}>Save</button>
                  <button className="modal-button" onClick={this.closeModal}>Close</button>
                </div>
              </form>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
};


const mapStateToProps = (state) => {
  return {
    allPhotos: state.photos,
    showModal: state.modal.showModal
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAllPhotos: function(photos){
      dispatch(setAllPhotos(photos))
    },
    showModal: (boolean) => {
      dispatch(showModal(boolean));
    },
    updatePhoto: function(photoId, description){
      dispatch(updatePhoto(photoId, description))
    }
  };
};

Main.propTypes = {
  showModal: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);



