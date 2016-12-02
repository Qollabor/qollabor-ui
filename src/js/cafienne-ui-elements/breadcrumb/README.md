# Breadcrumb

A breadcrumb component

## Usage

```
import { Breadcrumb } from 'cafienne-ui-elements';


const breadCrumbItems = [
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
<Breadcrumb items={breadCrumbItems}/>
```
 
### Props

| Name          | Type      | Required | Values        | Description | 
|---------------|-----------|:--------:|---------------|-------------|
|items          |array<Item>|YES       |[item1, item2, ...]|The item list to show in the breadcrumb
|separator      |string     | &nbsp;   |">", "->", "/" |The separator between the items (Default ">")
 
 
#### The `ITEM` object
| Name          | Type      | Required | Values        | Description | 
|---------------|-----------|:--------:|---------------|-------------|
|label          |string     |YES       |"Item 1"       |The label to show
|url            |string     | &nbsp;   |"#/tasks/curtask"|The url related to the item, if the url is not defined the item is created as a simple label instead as a link
 
