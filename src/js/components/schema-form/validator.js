import { Validator } from 'jsonschema';
import { SchemaContext } from 'jsonschema/lib/helpers';

// Validates Schema agains the formData passed. Definitions has to be
// specified if there are external references in the Schema
export const validate = (schema, definitions, formData) => {
  const validator = new Validator();
  const schemas = {};
  if (definitions) {
    Object.keys(definitions).forEach((definitionName) => {
      const schemaPath = `#/definitions/${definitionName}`;
      validator.addSchema(definitions[definitionName], schemaPath);
      schemas[schemaPath] = definitions[definitionName];
    });
  }

  const schemaContext = new SchemaContext(schema, {}, '#', '#', schemas);
  const vResults = validator.validate(formData, schema, {}, schemaContext);

  vResults.normalizedErrors = normalizeErrors(vResults.errors);

  return vResults;
};

// The JSON Schema Validator provides the Validation results as a flat structure.
// Here we make the errors into a structure similar to the schema so that we can
// show the errors where they occour. We have used a really crude way of doing this
// Maybe more ideal to do this using the Schema specified in each of the errors
const normalizeErrors = (errors) => {
  const normalizedErrors = { length: 0 };
  errors.forEach((error) => {
    const propertyPaths = error.property.split('.').slice(1);
    let normalizedError = normalizedErrors;
    normalizedError.length ++;

    propertyPaths.forEach((propPath) => {
      // eslint-disable-next-line no-useless-escape
      const arrayCountCk = /[^\[]*[\[]([^\[\]]+)[\]]/.exec(propPath);
      const arrayCount = arrayCountCk && arrayCountCk[1];
      const path = propPath.split('[')[0];

      if (! normalizedError[path]) {
        normalizedError[path] = ((typeof(error.instance) === 'object') || arrayCount) ? {} : error;
      }
      normalizedError = normalizedError[path];
      if (arrayCount) {
        if (! normalizedError[arrayCount]) {
          normalizedError[arrayCount] = (typeof(error.instance) === 'object') ? {} : error;
        }
        normalizedError = normalizedError[arrayCount];
      }
    });
    if (typeof(error.instance) === 'object') {
      normalizedError[error.argument] = error;
    }
  });

  return normalizedErrors;
};
