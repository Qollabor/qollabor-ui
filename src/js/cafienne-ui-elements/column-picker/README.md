# Breadcrumb

A ColumnPicker component

## Usage

```
import { ColumnPicker } from 'cafienne-ui-elements';

const columns = [
  {
    label: 'My tasks',
    key: 'taskAssignedTo',
    visible: true
  },
  {
    label: 'Name',
    key: 'taskName',
    visible: true
  },
  {
    label: 'Case',
    key: 'taskCase',
    visible: true
  },
  {
    label: 'Due date',
    key: 'taskDueDate',
    visible: true
  }
];

...
<ColumnPicker columns={columns} onMenuItemClicked={onMenuItemClicked}/>
```
 
### Props

| Name          | Type      | Required | Values        | Description | 
|---------------|-----------|:--------:|---------------|-------------|
|columns        |array<Column>|YES     |[item1, item2, ...]|The item list to show in the breadcrumb
|onMenuItemClicked|function| &nbsp;    | &nbsp;            |A callback called when an item is toggled. Is called with the full <em>column</em> object
 
 
#### The `Column` object
| Name          | Type      | Required | Values        | Description | 
|---------------|-----------|:--------:|---------------|-------------|
|label          |string     |YES       |"Item 1"       |The label to show
|key            |string     |YES       |"column_1_key" |The key related to the column
|visible        |bool       | &nbsp;   |true, false    |If set to true, the column is showed, otherwise is hidden
 
