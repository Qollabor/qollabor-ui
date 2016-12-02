# TitledListBox

A component to show an asyncronous list of items with an icon and a label.

## Usage

```
import { TitledListBox } from 'cafienne-ui-elements';

const sampleItemList = [
  {
    id: 'myTaskId01',
    caseInstanceId: 'd62dea32_62b8_4206_b12e_029436d75001',
    icon: 'view_list',
    taskName: 'First task item with very long sentence which will never end blab blal bal bal bl abal',
    color: '#388AC3',
    action: action('ActionLink')
  },
  {
    id: 'myTaskId02',
    caseInstanceId: 'd62dea32_62b8_4206_b12e_029436d75001',
    icon: 'query_builder',
    taskName: 'Add information to request',
    color: '#F3974F',
    url: 'some'
  }
];

...

render() {
  return <TitledListBox
     title={title}
     items={sampleItemList}
     labelField="taskName"
     emptyListMessage="No items in the list"
     />
}

```
 
### Props

| Name          | Type      | Required | Values        | Description | 
|---------------|-----------|:--------:|---------------|-------------|
|title          |string     | YES      |"A sample title"|The title of the box
|isFetching     |bool       | &nbsp;   |true, false    |Define if the box is in a fetching data state. If isFetching is set to true, a loading icon replace the content
|error          |object     | &nbsp;   |{ isError: true, message : "Error message"}|The error status of the fetching process, if `error.isError` is set to true then a 
|items          |array<ITEM>|YES       |[{icon:..., ...}, ....]|The list of the items to show
|labelField     |string     |YES       |"taskName"     |The field to search in the item for retrieving the label
|emptyListMessage|string    |YES       |"There are no items in the list"|The list of the items to show


#### The `ITEM` object
| Name          | Type      | Required | Values        | Description | 
|---------------|-----------|:--------:|---------------|-------------|
|label (defined in the `labelField` prop)|string|YES|"Some label"|The label to show
|icon           |string     |YES       |query_builder  |The icon name in the material ui
|color          |string     | &nbsp;   |#33ddff        |The icon color (default: #607D8B)
|url            |string     | &nbsp;   |http://someurl.com/|The url provided for the action, if a url is provided the item is created using an html link
|action         |function   | &nbsp;   |() => doSomething  |The action provided, if a action is provided the item is created using a div and adding an onClick event
 
### action vs. url
In the item element can be passed a `url` or an `action` value.
 
The `url` create the row inside a html link element `<a href="url">...</a>`. 
It allows then to open the link in a new page using the right mouse button. 

The `action` create the row inside a div element ```<div onClick={action}>...<div>```.
