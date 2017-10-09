import React, {PropTypes} from 'react';

const styles = {
  item: {
    width: '200px',
    'border': '1px solid red',
    'margin': '5px',
    'padding': '5px',
    display: 'inline-block',
    fontSize: '13px'
  },
  removeBtn: {
    marginLeft: '10px'
  }
};

class ImageSliderItem extends React.Component {
  constructor(props) {
    super(props);
  }

  _handleRemoveItemClick = (event) => {
    const { handleRemoveItem, id } = this.props;
    handleRemoveItem(id);
  };

  render() {
    const {name, order, value} = this.props;
    return (
      <div style={styles.item}>
        <span>Image Slider Item
          <button
            style={styles.removeBtn}
            onClick={this._handleRemoveItemClick}> x </button>
        </span>
        <div>
          <span>name : <input type="text" disabled={true} value={name}/></span>
          <span>order : <input type="text" disabled={true} value={order}/></span>
          <span>value : <input type="text" disabled={true} value={value}/></span>
        </div>
      </div>
    )
  }
}

ImageSliderItem.propTypes = {
  name: PropTypes.string.isRequired,
  order: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  id : PropTypes.string.isRequired,
  removeItem : PropTypes.func.isRequired
};

export default ImageSliderItem;
