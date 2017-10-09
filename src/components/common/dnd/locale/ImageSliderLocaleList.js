import React, { PropTypes } from 'react';
import ImageSliderLocale from './ImageSliderLocale';

class ImageSliderLocaleList extends React.Component{

  _renderItemLocaleitems = () => {
    const { imageSlider , handleAddItem, handleRemoveItem } = this.props;
    return Object.keys(imageSlider).map(imageSliderItem => {
      const { items, locale, order } = imageSlider[imageSliderItem];
      return (
        <ImageSliderLocale
          items={items}
          handleAddItem={handleAddItem(locale)}
          handleRemoveItem={handleRemoveItem(locale)}
          locale={locale}
          order={order}
        />
      )
    });
  };

  render(){
    return (
      <div style={{padding : '10px', 'border' : '1px solid black'}}>
        {this._renderItemLocaleitems()}
      </div>
    )
  }
}
ImageSliderLocale.propTypes = {
  imageSlider : PropTypes.object.isRequired,
  handleAddItem : PropTypes.func.isRequired,
  handleRemoveItem : PropTypes.func.isRequired
};

export default ImageSliderLocaleList;
