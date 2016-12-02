# Breadcrumb

A JSON object viewer component.
The component provide a `button` with a customizable label 
that when is clicked open a popup that shows an highlighted formatted JSON. 

## Usage

```
import { JsonObjectViewer } from 'cafienne-ui-elements';

const someObject = [
  {
    label: 'My tasks',
    url: '#/tasks',
    id: '1'
  },
  {
    label: 'current task',
    url: '#/tasks/curtask',
    id: '2'
  },
  {
    label: 'last task',
    id: '3'
  }
];

...
 <JsonObjectViewer
      object={someObject}
      buttonTitle="Open case short"
      buttonIsPrimary={true}
      modalTitle="This is a title"
    />
    
```
 
### Props

| Name          | Type      | Required | Values        | Description | 
|---------------|-----------|:--------:|---------------|-------------|
| object        |  object   | YES      | {a: 1, b: 2}  | The object to show
|buttonTitle    |string     | &nbsp;   | "Open case"   |The text to show in the button
|buttonIsPrimary|boolean    | &nbsp;   | true, false   |Define if the button is a primary button
|buttonStyle    |object     | &nbsp;   | {color: 'red'}|Define the style of the button
|modalTitle     |boolean    | &nbsp;   | true, false   |Define the title text that should be shown in the popup


