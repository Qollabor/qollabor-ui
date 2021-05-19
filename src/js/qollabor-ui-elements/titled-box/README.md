# TitledBox

A high order component to show asyncronous content.

## Usage

```
import { TitledBox } from 'qollabor-ui-elements';

// Define the component to wrap in the `TitledBox`
class SampleUnboxedComponent extends React.Component {
  render() {
    return <div>And add some content</div>
  }
}

/* Define additional props,
 * the props are added to the TitledBox props,
 * in case of homonymy the TitledBox original prop is overriden
 */
SampleUnboxedComponent.propTypes = {
  items: PropTypes.array.isRequired
}

export const SampleBoxedComponent = TitledBox(SampleUnboxedComponent);

// Define the displayName, required for debugging
SampleBoxedComponent.displayName = 'SampleBoxedComponent';

export default SampleBoxedComponent;
```

### Props

| Name          | Type      | Required | Values        | Description |
|---------------|-----------|:--------:|---------------|-------------|
|title          |string     | &nbsp;   |"A title"      |The title of the box
|isFetching     |bool       | &nbsp;   |true, false    |Define if the box is in a fetching data state. If isFetching is set to true, a loading icon replace the content
|error          |object     | &nbsp;   |{ isError: true, message : "Error message"}|The error status of the fetching process, if `error.isError` is set to true then a
