import React from 'react';
import { ImageSliderLocaleList } from "./locale";

class DndMainContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      imageSlider: {
        "en-id": {
          locale: 'en-id',
          order: 0,
          items: [
            {
              id : 'item1',
              name: 'item 1',
              order: 0,
              value: 'this is item 1'
            },
            {
              id : 'item2',
              name: 'item 2',
              order: 1,
              value: 'this is item 2'
            },
            {
              id : 'item3',
              name: 'item 3',
              order: 2,
              value: 'this is item 3'
            }]
        }
      }
    };
    this.insertedLocale = '';
  }

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
        />
      </div>
    )
  }

  _handleAddItem = (locale) => () => {
    console.log('current locale : ', locale);
    const { imageSlider } = Object.assign({}, this.state);
    const currItems = imageSlider[locale].items;
    const newId = `item_${new Date().getMilliseconds()}`;

    currItems.push({ id : newId, name: newId, order: (currItems.length - 1), value : newId });

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
