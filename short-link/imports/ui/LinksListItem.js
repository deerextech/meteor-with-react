import React from 'react';
import PropTypes from 'prop-types';
import Clipboard from 'clipboard';
import {Meteor} from 'meteor/meteor';
import moment from 'moment';

export default class LinksListItem extends React.Component{
  constructor(props){
    super(props)
    this.state={copied:false}
  }
  componentDidMount(){
  this.clipboard =  new Clipboard(this.refs.copy);

  this.clipboard.on('success', ()=>{
    this.setState({copied:true})
    setTimeout(()=> this.setState({copied:false}),1000);
  }).on('error', ()=>{

  });
  }
  componentWillUnmount(){
    this.clipboard.destroy();
  }
  renderStats(){
    const visitMessage = this.props.visitedCount === 1 ? 'visit':'visits';
    let visitedMessage = null;

    if(typeof this.props.lastVisitedAt === 'number'){
      let momentNow = moment();
      visitedMessage = `(visted ${moment(this.props.lastVistedAt).fromNow()})`


    }
    return(
      <p>{this.props.visitedCount} {visitMessage} {visitedMessage}</p>
    )
  }
  render(){
    return(

      <div>
        <p>{this.props.url}</p>
        <p>{this.props.shortUrl}</p>
        <p>{this.props.visible.toString()}</p>
        {this.renderStats()}
        <a className="button button--pill button--link" href={this.props.shortUrl} target="_blank"> Visit </a>
        <button className="button button--pill" ref="copy"  data-clipboard-text={this.props.shortUrl}>{this.state.copied ? 'Copied' : 'Copy'}</button>
        <button className="button button--pill" onClick={()=>{Meteor.call('links.setVisibility', this.props._id, !this.props.visible)}}>
          {this.props.visible ? 'Hide':'Unhide'}
        </button>
      </div>
    )
  }
}

LinksListItem.propTypes = {
  _id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  shortUrl: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  visitedCount: PropTypes.number.isRequired,
  lastVisitedAt: PropTypes.number

}
