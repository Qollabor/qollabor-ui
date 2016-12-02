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
