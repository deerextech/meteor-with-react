import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';
export const Links = new Mongo.Collection('links');

if(Meteor.isServer){
  Meteor.publish('linksPublication', function() {

    console.log('this userid', this.userId);
    var user = this.userId;
    //exposing links so they can be subscribed to
    return Links.find({'userId':user});
  })
}
//methods
Meteor.methods({
//resource.action
//links.insert
'links.insert'(url){
    //user must be logged in
  if(!this.userId){
      throw new Meteor.Error('not-authorized');
  }
    new SimpleSchema({
      url:{
        label:'your link ',
        type:String,
        regEx:SimpleSchema.RegEx.Url
      }
    }).validate({url})

    Links.insert({
      _id: shortid.generate(),
      url,
      userId: this.userId,
      visible:true,
      visitedCount:0,
      lastVisitedAt:null
    })
  },
  'links.setVisibility'(_id, visible){
    if(!this.userId){
        throw new Meteor.Error('not-authorized');
    }
    new SimpleSchema({
      _id:{
        type:String,
        min:1
      },
      visible:{
        type:Boolean
      }
    }).validate({_id, visible})

    Links.update({
      _id,
      userId:this.userId
    },{
      $set:  {visible}
    })
  },
  'links.trackVisit'(_id){
    new SimpleSchema({
      _id:{
        type:String,
        min:1
      }
    }).validate({_id});

    Links.update({ _id },
      {
      $set:{
        lastVisitedAt: new Date().getTime()
      },
      $inc:{
        visitedCount: 1
      }
    })
  }

});
