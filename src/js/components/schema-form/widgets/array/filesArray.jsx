import React, { PropTypes } from 'react';

import {
  getDefaultFormState,
  shouldRender,
  getDefaultRegistry,
  setState
} from 'react-jsonschema-form/lib/utils';
import FileWidget from 'react-jsonschema-form/lib/components/widgets/FileWidget';

export class FilesArray extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getStateFromProps(props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.getStateFromProps(nextProps));
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shouldRender(this, nextProps, nextState);
  }

  getStateFromProps(props) {
    const formData = Array.isArray(props.formData) ? props.formData : null;
    const { definitions } = this.props.registry;
    return {
      items: getDefaultFormState(props.schema, formData, definitions) || []
    };
  }

  asyncSetState(state, options = { validate: false }) {
    setState(this, state, () => {
      this.props.onChange(this.state.items, options);
    });
  }

  handleSelectChange(value) {
    this.asyncSetState({ items: value });
  }

  render() {
    const { schema, idSchema, name, disabled, readonly } = this.props;
    const title = schema.title || name;
    const { items } = this.state;
    return (
      <FileWidget
        id={idSchema && idSchema.id}
        multiple={true}
        onChange={this.handleSelectChange.bind(this)}
        schema={schema}
        title={title}
        value={items}
        disabled={disabled}
        readonly={readonly}
      />
    );
  }
}

FilesArray.defaultProps = {
  uiSchema: {},
  idSchema: {},
  registry: getDefaultRegistry(),
  required: false,
  disabled: false,
  readonly: false
};

if (process.env.NODE_ENV !== 'production') {
  FilesArray.propTypes = {
    schema: PropTypes.object.isRequired,
    uiSchema: PropTypes.object,
    idSchema: PropTypes.object,
    errorSchema: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    formData: PropTypes.array,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    registry: PropTypes.shape({
      widgets: PropTypes.objectOf(PropTypes.func).isRequired,
      fields: PropTypes.objectOf(PropTypes.func).isRequired,
      definitions: PropTypes.object.isRequired
    })
  };
}

export default FilesArray;
