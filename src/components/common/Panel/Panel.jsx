import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Panel.scss';

class Panel extends Component {
  render() {
    const {
      isOpen,
      panelId,
      closePanelFunction,
      children,
      panelClass,
      headerText,
      footer,
      blocking,
      visibleBlock,
    } = this.props;
    return (
      <div className={isOpen ? 'Panel Panel--open' : 'Panel'}>
        {visibleBlock && blocking ?
          <div className="Panel-blocking-visibleBlock" /> : null
        }
        {blocking ?
          <div
            className="Panel-blocking"
            onClick={() => closePanelFunction(panelId)}
            role="button"
            tabIndex={0}
          /> : null
        }
        <div className={`Panel-main${panelClass ? ` ${panelClass}` : ''}`}>
          <div className="Panel-main-wrapper">
            <div className="Panel-main-wrapper-header">
              {headerText || null}
            </div>
            <div className="Panel-main-wrapper-body">
              {children}
            </div>
            {footer ?
              <div className="Panel-main-wrapper-footer">
                {footer}
              </div> : null}
          </div>
        </div>
      </div>
    );
  }
}

Panel.defaultProps = {
  panelClass: null,
  headerText: null,
  footer: null,
  blocking: true,
  visibleBlock: true,
};

Panel.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  panelId: PropTypes.string.isRequired,
  closePanelFunction: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  panelClass: PropTypes.string,
  headerText: PropTypes.string,
  footer: PropTypes.element,
  blocking: PropTypes.bool,
  visibleBlock: PropTypes.bool,
};

export default Panel;
