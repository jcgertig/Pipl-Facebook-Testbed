import React, { PropTypes } from 'react';
import { isString, get, has } from 'lodash';

import CircularProgress from 'material-ui/CircularProgress';

import { keysToCamel } from '../utils/general';
import { mapping } from '../utils/pipl';

import styles from '../styles/PiplOption.css';


const addToCol = (mapObj, key, val) => {
  mapObj.push((
    <div className={styles['PiplOption-value-option']} key={key}>
      {val}
    </div>
  ));
};

const addToMapped = (mapped, key, text, val) => {
  mapped.push((
    <div className={styles['PiplOption-wrapper']} key={key}>
      <div className={styles['PiplOption-title']}>{text}</div>
      <div className={styles['PiplOption-value']}>{val}</div>
    </div>
  ));
};

const PiplOption = (props) => {
  if (!props.basic && props.option) {
    const mapped = [];
    for (const key of Object.keys(mapping)) {
      if (has(props.option, key)) {
        const base = props.option[key];
        const { path, text, collection } = mapping[key];
        let val = [];
        if (collection) {
          for (let i = 0; i < base.length; i++) {
            const value = isString(path) ? get(base[i], path) : path(keysToCamel(base[i]), i);
            addToCol(val, `${key}-${i}`, value);
          }
        } else {
          val = isString(path) ? get(base, path) : path(keysToCamel(base));
        }
        addToMapped(mapped, key, isString(text) ? text : text(keysToCamel(base)), val);
      }
    }

    return (
      <div className={styles.PiplOption}>
        {mapped}
      </div>
    );
  } else if (props.basic) {
    return (
      <div className={styles.PiplOption}>
        <div className={`${styles['PiplOption-wrapper']} ${props.isLoading ? styles['is-loading'] : ''}`}>
          <div className="text-center" style={{ marginBottom: '10px' }}>
            {props.text}
          </div>
          {props.isLoading ? <CircularProgress size={80} thickness={5} /> : null}
        </div>
      </div>
    );
  }
  return null;
};

PiplOption.propTypes = {
  option: PropTypes.object,
  basic: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

PiplOption.defaultProps = {
  basic: false,
  text: '',
  isLoading: false,
};

export default PiplOption;
