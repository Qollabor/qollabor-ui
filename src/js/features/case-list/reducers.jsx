import Immutable from 'immutable';
/*
search list reducer sample =>

{
  searchText : ...,
  sortKey : ...,
  sortDesc : ...,
  isFetching : true | false,
  items : [
    {
      "_index": "",
      "_type": "tasks",
      "_id": "65bc721c_1a1a_4d72_896b_1a91d38a2aaf",
      "_score": 1.0722185,
      "_source": {
        "id": "65bc721c_1a1a_4d72_896b_1a91d38a2aaf",
        "caseInstanceId": "9f09d206_1c3d_4c67_8037_78b1e704cb78",
        "caseDefinition": "TravelRequest",
        "rootCaseInstanceId": "9f09d206_1c3d_4c67_8037_78b1e704cb76",
        "parentCaseInstanceId": null,
        "taskName": "Travel Request Approval",
        "planState": "Active",
        "inputParams": {},
        "mappedInput": {},
        "assignee": "thijs",
        "role": "Admin",
        "dueDate": null,
        "taskModel": null,
        "createdOn": "2016-07-20T11:15:00.238230482Z",
        "taskState": "Assigned",
        "createdBy": "admin",
        "lastModified": "2016-07-20T11:15:00.238230482Z"
      }
    },
    {
      "_index": "",
      "_type": "case",
      "_id": "Peer-1469423547505",
      "_score": 1.0073638,
      "_source": {
        "id": "Peer-1469423547505",
        "definition": "Peer Review Request",
        "rootCaseId": "Peer-1469423547505",
        "planitems": [
          {
            "isRequired": false,
            "isRepeating": false,
            "caseInstanceId": "Peer-1469423547505",
            "name": "PeerReviewRequest",
            "id": "907a7514_c02d_41c0_bda8_af1d1bf8ead6",
            "lastModified": "2016-07-25T05:12:30.317321992Z",
            "currentState": "Active",
            "type": "CasePlan",
            "user": "admin",
            "historyState": "Null",
            "transition": "Create",
            "dueDate": "2016-07-22T05:12:30.317321992Z",
            "stageId": null
          }
        ],
        "team": []
      }
    }
  ]
  }
}

*/

const defaultCaseListState = Immutable.fromJS({
  isFetching: false,
  position: 0,
  items: [],
  error: {
    message: '',
    isError: false
  }
});

const getCaseInstances = (responseItems) => {
  const cases = responseItems.reduce((arr, caseInstance) => {
    const casePlanItem = caseInstance.planitems.find((elmt) => elmt.type === 'CasePlan');
    casePlanItem.definition = caseInstance.definition;
    casePlanItem.parentCaseId = caseInstance.parentCaseId;
    casePlanItem.team = caseInstance.team;
    casePlanItem.id = caseInstance.id;
    return arr.concat(casePlanItem);
  }, []);

  return Immutable.List(cases);
};

export const reducers = (state = defaultCaseListState, action) => {
  switch (action.type) {
    case 'CASE:LIST:REQUEST:INIT':
      return state.set('items', Immutable.List())
            .set('position', 0);
    case 'CASE:LIST:FETCH':
      return state.set('isFetching', true);
    case 'CASE:LIST:FETCH:SUCCESS':
      return state.set('isFetching', false)
                  .set('position', state.get('position') + action.items.length)
                  .set('items', state.get('items').concat(getCaseInstances(action.items)));
    case 'CASE:LIST:FETCH:FAIL':
      return state.set('isFetching', false)
                  .set('error', Immutable.Map({ message: action.error, isError: true }));
    default:
      return state;
  }
};
