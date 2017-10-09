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
              name: 'item 1',
              order: 0,
              value: 'this is item 1'
            },
            {
              name: 'item 2',
              order: 1,
              value: 'this is item 2'
            },
            {
              name: 'item 3',
              order: 1,
              value: 'this is item 3'
            }]
        }
      },
      insertedLocale : ''
    };
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
        />
      </div>
    )
  }

  _handleAddItem = (locale) => () => {
    console.log('current locale : ', locale);
  };

  _generateNewImageSliderLocaleData = (locale) => {
    return {
      locale: locale,
      order: 0,
      items: []
    }
  };

  _handleAddLocale = (event) => {
    const { insertedLocale } = this.state;
    const { imageSlider } = Object.assign({},this.state);
    imageSlider[insertedLocale] = this._generateNewImageSliderLocaleData(insertedLocale);

    this.setState({
      insertedLocale : '',
      imageSlider: imageSlider
    });
    this.textInput.value = '';
  };

  _handleLocaleInputChange = (event) => {
    this.setState({ insertedLocale: event.target.value })
  };

}

export default DndMainContainer;
