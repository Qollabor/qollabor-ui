import React from 'react';

export class FieldDescription extends React.Component {
  render() {
    const { DescriptionField, idSchema, description } = this.props;

    if (!description) {
      return null;
    }
    const id = `${idSchema.id}__description`;
    return <DescriptionField id={id} description={description} />;
  }
}

FieldDescription.propTypes = {
  DescriptionField: React.PropTypes.node,
  idSchema: React.PropTypes.object,
  description: React.PropTypes.string
};
