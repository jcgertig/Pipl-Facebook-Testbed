require('./styles.css');

import React, { Component, PropTypes } from 'react';
import { isString, get, has, isEqual, isUndefined } from 'lodash';

import { keysToCamel } from 'utils/general';
import { compareAll, clean } from 'utils/pipl';

import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import CheckIcon from 'material-ui/svg-icons/toggle/check-box';
import CircularProgress from 'material-ui/CircularProgress';

const mapping = {
  'names': {
    collection: true,
    path: ({ first, last, middle, prefix, postfix }) => {
      return clean(`${prefix} ${first} ${middle} ${last} ${postfix}`);
    },
    text: 'Name',
  },
  'dob': {
    path: 'date_range.start',
    text: 'Date of Birth',
  },
  'gender': {
    path: 'content',
    text: 'Gender',
  },
  'phones': {
    collection: true,
    path: 'number',
    text: 'Phone Numbers',
  },
  'addresses': {
    collection: true,
    path: ({ house, street, city, state, zipCode, country }) => {
      return clean(`${house} ${street}, ${city}, ${state} ${zipCode}, ${country}`);
    },
    text: 'Addresses',
  },
  'relationships': {
    collection: true,
    path: (item) => {
      const { first, last, middle, prefix, postfix } = item.names[0];
      return clean(`${prefix} ${first} ${middle} ${last} ${postfix}`);
    },
    text: 'Relationships',
  },
  'jobs': {
    collection: true,
    path: (item) => {
      const { title, organization, dateRange } = item;
      return (
        <div style={{marginBottom: '10px'}}>
          <div>{title}</div>
          <div>{organization}</div>
          {dateRange ? <div>{dateRange.start} - {isUndefined(dateRange.end) ? 'Present' : dateRange.end}</div> : null}
        </div>
      );
    },
    text: 'Jobs',
  },
  'educations': {
    collection: true,
    path: (item) => {
      const { degree, school, dateRange } = item;
      return (
        <div style={{marginBottom: '10px'}}>
          <div>{degree}</div>
          <div>{school}</div>
          {dateRange ? <div>{dateRange.start} - {isUndefined(dateRange.end) ? 'Present' : dateRange.end}</div> : null}
        </div>
      );
    },
    text: 'Education',
  },
  'usernames': {
    collection: true,
    path: 'content',
    text: 'Usernames',
  },
};

const PiplOption = (props) => {
  const renderFromMapping = () => {
    const mapped = [];
    const addToMapped = (key, text, val) => {
      mapped.push((
        <div className="PiplOption-wrapper" key={key}>
          <div className="PiplOption-title">{text}</div>
          <div className="PiplOption-value">{val}</div>
        </div>
      ));
    };
    const addToCol = (mapObj, key, val) => {
      mapObj.push((
        <div className="PiplOption-value-option" key={key}>
          {val}
        </div>
      ));
    };
    for (const key of Object.keys(mapping)) {
      if (has(props.option, key)) {
        const base = props.option[key];
        const { path, text, collection } = mapping[key];
        let val = [];
        if (collection) {
          for (let i = 0; i < base.length; i++) {
            const _val = isString(path) ? get(base[i], path) : path(keysToCamel(base[i]), i);
            addToCol(val, `${key}-${i}`, _val);
          }
        } else {
          val = isString(path) ? get(base, path) : path(keysToCamel(base));
        }
        addToMapped(key, isString(text) ? text : text(keysToCamel(base)), val);
      }
    }
    return mapped;
  };

  return (
    <div className="PiplOption">
      {props.isFirst ? (
        <IconButton
          className="PiplOption-mostlikely"
          tooltip="Most likely Match"
          touch={true}
          tooltipPosition="bottom-left"
        >
          <CheckIcon />
        </IconButton>
      ) : null}
      {renderFromMapping()}
    </div>
  );
};

PiplOption.propTypes = {
  option: PropTypes.object.isRequired,
  value: PropTypes.any.isRequired,
  isFirst: PropTypes.bool.isRequired,
};

class InfoBlock extends Component {
  state = { comparing: false, compared: [] };

  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== null && !isEqual(nextProps.user, this.props.user)) {
      const { pipl } = nextProps.user;
      if (pipl && pipl.baseData !== null) {
        this.setState({ comparing: true });
        compareAll(nextProps.currentUser.piplData.base_data, pipl.baseData)
          .then(val => {
            this.setState({ comparing: false, compared: val });
          });
      }
    }
  }

  renderPipl = () => {
    const { pipl, name } = this.props.user;
    if (!this.state.comparing) {
      if (this.state.compared.length > 0) {
        return this.state.compared.map((option, i) => (
          <PiplOption option={option.pipl} value={option.value} isFirst={i === 0} key={`${name}-${i}`} />
        ));
      }
      if (pipl && pipl.baseData === null) {
        return (
          <div className="PiplOption">
            <div className="PiplOption-wrapper">
              <div className="text-center">No Pipl Data Available</div>
            </div>
          </div>
        );
      }
    }
    return (
      <div className="PiplOption">
        <div className="PiplOption-wrapper is-loading">
          <div className="text-center" style={{ marginBottom: '10px'}}>
            Loading
          </div>
          <CircularProgress size={80} thickness={5} />
        </div>
      </div>
    );
  }

  render() {
    const { user } = this.props;
    if (user !== null) {
      return (
        <div className="InfoBlock">
          <h1>{user.name}</h1>
          <Divider />
          {this.renderPipl()}
        </div>
      );
    }
    return null;
  }

  static displayName = 'InfoBlock';

  static propTypes = {
    user: PropTypes.object,
    currentUser: PropTypes.object,
  };

  static defaultProps = {
    user: null,
  };

}

export default InfoBlock;
