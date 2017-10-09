import React from 'react';
import { ImageSliderLocaleList } from "./locale";
import { DragDropContext } from 'react-dnd';
import update from 'immutability-helper'
import HTML5Backend from 'react-dnd-html5-backend';

@DragDropContext(HTML5Backend)
class DndMainContainer extends React.Component{
  constructor(props){
    super(props);

    this.images = [
      'http://www.karenfosbergphotography.com/wp-content/uploads/2014/05/SCRAPS-Pet-Portal-5-08-14-20.jpg',
      'https://i.pinimg.com/736x/b6/b7/18/b6b718b7514ea4255360189571798b02--simons-cat-kitten-care.jpg',
      'https://i.pinimg.com/736x/7a/ce/85/7ace85f1207a0fc850b1b99d92837550--baby-animals-funny-animals.jpg',
      'https://i.pinimg.com/736x/a0/50/bb/a050bb0e9a439db670f3c39b19a9c039--dog-selfie-save-animals.jpg',
      'https://i.pinimg.com/736x/34/51/21/3451216c8bccff00e06d127bb1099584--dog-selfie-oscars.jpg',
      'http://www.petmd.com/sites/default/files/what-does-it-mean-when-cat-wags-tail.jpg',
      'https://pbs.twimg.com/profile_images/378800000532546226/dbe5f0727b69487016ffd67a6689e75a.jpeghttps://pbs.twimg.com/profile_images/378800000532546226/dbe5f0727b69487016ffd67a6689e75a.jpeg',
      'http://www.bristol.ac.uk/media-library/sites/vetscience/migrated/images/catstudymonte.jpg',
      'https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/21224995_113817375999392_8620381134125006848_n.jpg'
    ];

    this.state = {
      imageSlider: {
        "en-sg": {
          locale: 'en-sg',
          order: 0,
          items: []
        },
        "en-id": {
          locale: 'en-id',
          order: 0,
          items: [
            {
              id : 'item1',
              name: 'item 1',
              order: 0,
              value: 'this is item 1',
              image : this.images[this._generateRandomValue()]
            },
            {
              id : 'item2',
              name: 'item 2',
              order: 1,
              value: 'this is item 2',
              image : this.images[this._generateRandomValue()]
            },
            {
              id : 'item3',
              name: 'item 3',
              order: 2,
              value: 'this is item 3',
              image : this.images[this._generateRandomValue()]
            }]
        }
      }
    };
    this.insertedLocale = '';
  }

  _generateRandomValue = () => {
    const randomValue = Math.floor(Math.random() * (this.images.length - 1));
    return randomValue;
  };

  render(){
    return (
      <div>
        <div>
          <input type="text" ref={(input) => this.textInput = input } onChange={this._handleLocaleInputChange} />
          <button onClick={this._handleAddLocale}> + Add Locale</button>
        </div>
        <ImageSliderLocaleList
          imageSlider={this.state.imageSlider}
          handleAddItem={this._handleAddItem}
          handleRemoveItem={this._handleRemoveItem}
          handleMoveItem={this._handleMoveItem}
        />
      </div>
    )
  }

  _handleMoveItem = (locale) => (dragIndex, dragLocale, hoverIndex, hoverLocale) => {
    const {imageSlider} = Object.assign({}, this.state);

    if(dragLocale === hoverLocale) {
      let currItems = imageSlider[locale].items;
      const dragCard = currItems[dragIndex];
      currItems.splice(dragIndex, 1);
      currItems.splice(hoverIndex, 0, dragCard);
      imageSlider[locale].items = currItems;
    }else{
      console.log(`different locale : ${dragLocale} ${hoverLocale}`);
    }

    this.setState({
      imageSlider : imageSlider
    });
  };

  _handleAddItem = (locale) => () => {
    console.log('current locale : ', locale);
    const { imageSlider } = Object.assign({}, this.state);
    const currItems = imageSlider[locale].items;
    const newId = `item_${new Date().getMilliseconds()}`;

    currItems.push({ id : newId, name: newId, order: (currItems.length - 1), value : newId, image : this.images[this._generateRandomValue()] });

    imageSlider[locale].items = currItems;
    this.setState({
      imageSlider : imageSlider
    });
  };

  _handleRemoveItem = (locale) => (itemId) => {
    console.log('current locale : ', locale);
    console.log('current itemId : ', itemId);

    const { imageSlider } = Object.assign({}, this.state);
    let currItems = imageSlider[locale].items;
    const currItemIndex = currItems.findIndex((item) => item.id === itemId);
    if(currItemIndex > -1){
      currItems.splice(currItemIndex,1);
    }

    imageSlider[locale].items = currItems;
    this.setState({
      imageSlider : imageSlider
    });
  };

  _generateNewImageSliderLocaleData = (locale) => {
    return {
      locale: locale,
      order: 0,
      items: []
    }
  };

  _handleAddLocale = (event) => {
    const { insertedLocale } = this;
    const { imageSlider } = Object.assign({},this.state);
    imageSlider[insertedLocale] = this._generateNewImageSliderLocaleData(insertedLocale);

    this.setState({
      imageSlider: imageSlider
    });
    this.textInput.value = '';
  };

  _handleLocaleInputChange = (event) => {
    this.insertedLocale = event.target.value
  };
}

export default DndMainContainer;
