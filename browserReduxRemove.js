const test = {
  app: {
    isOnInit: true,
    auth0Client: {
      options: {
        domain: 'qollabor-dev.eu.auth0.com',
        client_id: 'dB6D4G0TT11vJAzNatGksL3hDGo4ymC6',
        redirect_uri: 'http://localhost:8080'
      },
      cacheLocation: 'memory',
      cookieStorage: {},
      sessionCheckExpiryDays: 1,
      cache: {},
      transactionManager: {
        storage: {},
        transaction: null
      },
      domainUrl: 'https://qollabor-dev.eu.auth0.com',
      tokenIssuer: 'https://qollabor-dev.eu.auth0.com/',
      defaultScope: 'openid profile email',
      customOptions: {}
    },
    showDrawer: true,
    showCaseUsers: false,
    headerMenu: [
      {
        name: 'Start Case',
        url: '/casemodels'
      }
    ],
    caseLastModified: null,
    breadcrumbItem: {
      label: 'My Tasks',
      url: '#/'
    }
  },
  notifier: {
    current: 0,
    notifications: []
  },
  user: {
    loggedUser: {
      username: 'hank',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjE4MDgyLyIsInN1YiI6ImhhbmsiLCJyb2xlcyI6WyJSZXF1ZXN0b3IiLCJQZXJzb25hbEFzc2lzdGFudCIsImRlVG96b0NvbnRyb2xldXIiXSwiaXNzIjoiY2FmaWVubmUiLCJleHAiOjE2MDg1NjA4MDgsImlhdCI6MTYwODU1NzIwOH0.048PI7NhV-hX4cFfJk65frBK3Yd59ahjVQ-W6FTZwAA'
    },
    hidePasswordForm: false,
    hideProfileForm: false,
    error: {
      message: '',
      isError: false
    },
    profile: {
      name: 'suzy',
      email: 'hank@travelatwork.com',
      avatarLastModified: '',
      roles: [
        'Requestor',
        'PersonalAssistant',
        'deTozoControleur'
      ],
      uniqueId: 'hank'
    },
    avatar: null,
    isFetching: false
  },
  login: {
    isLoggingIn: false,
    isVerifyAuth: false,
    errors: {}
  },
  tasks: {
    columns: [
      {
        label: 'Task name',
        key: 'taskName',
        visible: true
      },
      {
        label: 'Case',
        key: 'caseDefinition',
        visible: true
      },
      {
        label: 'Case ID',
        key: 'caseInstanceId',
        visible: false
      },
      {
        label: 'Time Remaining',
        key: 'dueDate',
        visible: true
      },
      {
        label: 'Creation date',
        key: 'createdOn',
        visible: true
      }
    ],
    list: {
      isFetching: false,
      items: [
        {
          modifiedBy: 'hank',
          caseInstanceId: 'a897d868_a74f_48eb_b231_7782185370eb',
          rootCaseInstanceId: 'a897d868_a74f_48eb_b231_7782185370eb',
          dueDate: '2020-11-25T00:00:00Z',
          caseDefinition: 'travelrequest',
          taskInput: {
            TravelRequest: {
              Project: {
                'IMIS-activity-code': 'werk',
                Assistant: 'admin',
                'IMIS-code': '7829',
                Manager: 'admin'
              },
              TravelDetails: {
                ReturnDate: '2020-12-03',
                Destination: [
                  {
                    Country: 'ES',
                    City: 'Madrid'
                  }
                ],
                AdvanceRequired: true,
                DeparturePoint: 'Amsterdam',
                Purpose: 'werk',
                Justification: 'moet',
                DepartureDate: '2020-11-25',
                ReturnPoint: 'Amsterdam'
              },
              Meeting: {
                StartDate: '2020-11-23',
                DurationIncLeave: 0,
                EndTime: '18:54:47',
                StartTime: '10:54:38',
                EndDate: '2020-11-30'
              },
              TravellerDetails: {
                RequestDate: '2020-11-06',
                Traveller: [
                  {
                    PassNo: 'HJ5710',
                    Email: 'frans@xkla.nl',
                    Nationality: 'NL',
                    Name: 'frans'
                  }
                ],
                Requestor: 'hank'
              },
              Transport: {
                ModeOfTransport: 'Shuttle'
              }
            }
          },
          taskOutput: {},
          createdOn: '2020-11-06T09:58:26.031747819Z',
          planState: 'Active',
          rawOutput: {},
          parentCaseInstanceId: null,
          attachment_taskoutputdata: {
            content_type: 'text/plain; charset=ISO-8859-1',
            language: 'lt',
            content: '{ }',
            content_length: 4
          },
          taskState: 'Assigned',
          viewInternalData: {
            status: 'DUE',
            icon: 'history',
            iconStyle: {
              color: 'orange'
            }
          },
          assignee: 'hank',
          taskName: 'View Travel request',
          attachment_taskinputdata: {
            content_type: 'text/plain; charset=ISO-8859-1',
            language: 'ro',
            content: '{\n  "TravelRequest" : {\n    "TravellerDetails" : {\n      "RequestDate" : "2020-11-06",\n      "Requestor" : "hank",\n      "Traveller" : [ {\n        "Name" : "frans",\n        "Email" : "frans@xkla.nl",\n        "Nationality" : "NL",\n        "PassNo" : "HJ5710"\n      } ]\n    },\n    "TravelDetails" : {\n      "Destination" : [ {\n        "Country" : "ES",\n        "City" : "Madrid"\n      } ],\n      "DepartureDate" : "2020-11-25",\n      "ReturnDate" : "2020-12-03",\n      "DeparturePoint" : "Amsterdam",\n      "ReturnPoint" : "Amsterdam",\n      "AdvanceRequired" : true,\n      "Purpose" : "werk",\n      "Justification" : "moet"\n    },\n    "Meeting" : {\n      "StartDate" : "2020-11-23",\n      "StartTime" : "10:54:38",\n      "EndDate" : "2020-11-30",\n      "EndTime" : "18:54:47",\n      "DurationIncLeave" : 0\n    },\n    "Transport" : {\n      "ModeOfTransport" : "Shuttle"\n    },\n    "Project" : {\n      "IMIS-code" : "7829",\n      "IMIS-activity-code" : "werk",\n      "Manager" : "admin",\n      "Assistant" : "admin"\n    }\n  },\n  "Assignee" : "hank",\n  "DueDate" : "2020-11-25T00:00:00Z"\n}',
            content_length: 1086
          },
          owner: 'hank',
          role: 'Requestor',
          id: '6cc7b689_eefe_42cd_9da7_aaf06e46ecaa',
          createdBy: 'hank',
          lastModified: '2020-11-06T09:58:26.031747819Z'
        },
        {
          modifiedBy: 'hank',
          caseInstanceId: '015ffc3b_3774_4853_adb5_9f9e7c1fc6ac',
          rootCaseInstanceId: '015ffc3b_3774_4853_adb5_9f9e7c1fc6ac',
          dueDate: '2020-11-25T00:00:00Z',
          caseDefinition: 'travelrequest',
          taskInput: {
            TravelRequest: {
              Project: {
                'IMIS-activity-code': 'fdsaet4355',
                Assistant: 'suzannetest',
                'IMIS-code': '34fdsaf',
                Manager: 'hank'
              },
              TravelDetails: {
                ReturnDate: '2020-11-26',
                Destination: [
                  {
                    Country: 'NL',
                    City: 'Amsterdam'
                  }
                ],
                Comments: 'Geen commentaar',
                DeparturePoint: 'Leiden CS',
                Purpose: 'Zakenreis',
                Justification: 'Weet ik niet',
                DepartureDate: '2020-11-25',
                ReturnPoint: 'Leiden CS'
              },
              Meeting: {
                StartDate: '2020-11-25',
                DurationIncLeave: 12,
                EndTime: '10:00:58',
                StartTime: '10:00:42',
                EndDate: '2020-11-26'
              },
              TravellerDetails: {
                RequestDate: '2020-11-10',
                Traveller: [
                  {
                    PassNo: '1234',
                    Email: 'suzanne.vandergrind@spronq.com',
                    Nationality: 'NL',
                    Name: 'suzanne'
                  }
                ],
                Requestor: 'hank'
              },
              Transport: {
                ModeOfTransport: 'Train',
                POMVMake: 'geen idee',
                POMVLicense: 'geen idee'
              }
            }
          },
          taskOutput: {},
          createdOn: '2020-11-10T08:34:27.310947869Z',
          planState: 'Active',
          rawOutput: {},
          parentCaseInstanceId: null,
          attachment_taskoutputdata: {
            content_type: 'text/plain; charset=ISO-8859-1',
            language: 'lt',
            content: '{ }',
            content_length: 4
          },
          taskState: 'Assigned',
          viewInternalData: {
            status: 'DUE',
            icon: 'history',
            iconStyle: {
              color: 'orange'
            }
          },
          assignee: 'hank',
          taskName: 'View Travel request',
          attachment_taskinputdata: {
            content_type: 'text/plain; charset=ISO-8859-1',
            language: 'et',
            content: '{\n  "TravelRequest" : {\n    "TravellerDetails" : {\n      "RequestDate" : "2020-11-10",\n      "Requestor" : "hank",\n      "Traveller" : [ {\n        "Name" : "suzanne",\n        "Email" : "suzanne.vandergrind@spronq.com",\n        "Nationality" : "NL",\n        "PassNo" : "1234"\n      } ]\n    },\n    "TravelDetails" : {\n      "Destination" : [ {\n        "Country" : "NL",\n        "City" : "Amsterdam"\n      } ],\n      "DepartureDate" : "2020-11-25",\n      "ReturnDate" : "2020-11-26",\n      "DeparturePoint" : "Leiden CS",\n      "ReturnPoint" : "Leiden CS",\n      "Purpose" : "Zakenreis",\n      "Justification" : "Weet ik niet",\n      "Comments" : "Geen commentaar"\n    },\n    "Meeting" : {\n      "StartDate" : "2020-11-25",\n      "StartTime" : "10:00:42",\n      "EndDate" : "2020-11-26",\n      "EndTime" : "10:00:58",\n      "DurationIncLeave" : 12\n    },\n    "Transport" : {\n      "ModeOfTransport" : "Train",\n      "POMVMake" : "geen idee",\n      "POMVLicense" : "geen idee"\n    },\n    "Project" : {\n      "IMIS-code" : "34fdsaf",\n      "IMIS-activity-code" : "fdsaet4355",\n      "Manager" : "hank",\n      "Assistant" : "suzannetest"\n    }\n  },\n  "Assignee" : "hank",\n  "DueDate" : "2020-11-25T00:00:00Z"\n}',
            content_length: 1205
          },
          owner: 'hank',
          role: 'Requestor',
          id: 'ebbc1bb4_06e5_4064_b1d8_69978ab8d128',
          createdBy: 'hank',
          lastModified: '2020-11-10T08:34:27.310947869Z'
        },
        {
          modifiedBy: 'hank',
          caseInstanceId: '015ffc3b_3774_4853_adb5_9f9e7c1fc6ac',
          rootCaseInstanceId: '015ffc3b_3774_4853_adb5_9f9e7c1fc6ac',
          dueDate: '2020-11-24T00:00:00Z',
          caseDefinition: 'travelrequest',
          taskInput: {
            TravelRequest: {
              Project: {
                'IMIS-activity-code': 'fdsaet4355',
                Assistant: 'suzannetest',
                'IMIS-code': '34fdsaf',
                Manager: 'hank'
              },
              TravelDetails: {
                ReturnDate: '2020-11-26',
                Destination: [
                  {
                    Country: 'NL',
                    City: 'Amsterdam'
                  }
                ],
                Comments: 'Geen commentaar',
                DeparturePoint: 'Leiden CS',
                Purpose: 'Zakenreis',
                Justification: 'Weet ik niet',
                DepartureDate: '2020-11-25',
                ReturnPoint: 'Leiden CS'
              },
              Meeting: {
                StartDate: '2020-11-25',
                DurationIncLeave: 12,
                EndTime: '10:00:58',
                StartTime: '10:00:42',
                EndDate: '2020-11-26'
              },
              TravellerDetails: {
                RequestDate: '2020-11-10',
                Traveller: [
                  {
                    PassNo: '1234',
                    Email: 'suzanne.vandergrind@spronq.com',
                    Nationality: 'NL',
                    Name: 'suzanne'
                  }
                ],
                Requestor: 'hank'
              },
              Transport: {
                ModeOfTransport: 'Train',
                POMVMake: 'geen idee',
                POMVLicense: 'geen idee'
              }
            }
          },
          taskOutput: {},
          createdOn: '2020-11-10T08:34:27.318777465Z',
          planState: 'Active',
          rawOutput: {},
          parentCaseInstanceId: null,
          attachment_taskoutputdata: {
            content_type: 'text/plain; charset=ISO-8859-1',
            language: 'lt',
            content: '{ }',
            content_length: 4
          },
          taskState: 'Assigned',
          viewInternalData: {
            status: 'DUE',
            icon: 'history',
            iconStyle: {
              color: 'orange'
            }
          },
          assignee: 'hank',
          taskName: 'Approve Travel request',
          attachment_taskinputdata: {
            content_type: 'text/plain; charset=ISO-8859-1',
            language: 'et',
            content: '{\n  "TravelRequest" : {\n    "TravellerDetails" : {\n      "RequestDate" : "2020-11-10",\n      "Requestor" : "hank",\n      "Traveller" : [ {\n        "Name" : "suzanne",\n        "Email" : "suzanne.vandergrind@spronq.com",\n        "Nationality" : "NL",\n        "PassNo" : "1234"\n      } ]\n    },\n    "TravelDetails" : {\n      "Destination" : [ {\n        "Country" : "NL",\n        "City" : "Amsterdam"\n      } ],\n      "DepartureDate" : "2020-11-25",\n      "ReturnDate" : "2020-11-26",\n      "DeparturePoint" : "Leiden CS",\n      "ReturnPoint" : "Leiden CS",\n      "Purpose" : "Zakenreis",\n      "Justification" : "Weet ik niet",\n      "Comments" : "Geen commentaar"\n    },\n    "Meeting" : {\n      "StartDate" : "2020-11-25",\n      "StartTime" : "10:00:42",\n      "EndDate" : "2020-11-26",\n      "EndTime" : "10:00:58",\n      "DurationIncLeave" : 12\n    },\n    "Transport" : {\n      "ModeOfTransport" : "Train",\n      "POMVMake" : "geen idee",\n      "POMVLicense" : "geen idee"\n    },\n    "Project" : {\n      "IMIS-code" : "34fdsaf",\n      "IMIS-activity-code" : "fdsaet4355",\n      "Manager" : "hank",\n      "Assistant" : "suzannetest"\n    }\n  },\n  "DueDate" : "2020-11-24T00:00:00Z",\n  "Assignee" : "hank"\n}',
            content_length: 1205
          },
          owner: 'hank',
          role: 'Approver',
          id: '5cb962c6_a7cc_4874_bb19_4c3e36fa64d7',
          createdBy: 'hank',
          lastModified: '2020-11-10T08:34:27.318777465Z'
        },
        {
          modifiedBy: 'admin',
          caseInstanceId: 'cffb67fb_3751_4084_8e0e_af88b9a927b2',
          rootCaseInstanceId: 'cffb67fb_3751_4084_8e0e_af88b9a927b2',
          dueDate: '2020-11-15T00:00:00Z',
          caseDefinition: 'travelrequest',
          taskInput: {
            TravelRequest: {
              Project: {
                'IMIS-activity-code': '123',
                ChiefServiceLine: 'suzy',
                Assistant: 'suzannetest',
                'IMIS-code': '123',
                Manager: 'hank'
              },
              TravelDetails: {
                ReturnDate: '2020-11-23',
                Destination: [
                  {
                    Country: 'BE',
                    City: 'brussel'
                  }
                ],
                Comments: 'none',
                DeparturePoint: 'amsterdam',
                Purpose: 'werk',
                Justification: 'werk',
                DepartureDate: '2020-11-16',
                ReturnPoint: 'amsterdam'
              },
              Meeting: {
                StartDate: '2020-11-17',
                DurationIncLeave: 8,
                EndTime: '17:21:15',
                StartTime: '09:21:06',
                EndDate: '2020-11-21'
              },
              TravellerDetails: {
                RequestDate: '2020-11-10',
                Traveller: [
                  {
                    PassNo: 'hjio9we',
                    Email: 'frans@spronq.com',
                    Nationality: 'NL',
                    Name: 'frans'
                  }
                ],
                Requestor: 'admin'
              },
              Transport: {
                ModeOfTransport: 'Shuttle',
                POMVMake: '123',
                POMVLicense: '123'
              }
            }
          },
          taskOutput: {},
          createdOn: '2020-11-10T08:22:06.765900095Z',
          planState: 'Active',
          rawOutput: {},
          parentCaseInstanceId: null,
          attachment_taskoutputdata: {
            content_type: 'text/plain; charset=ISO-8859-1',
            language: 'lt',
            content: '{ }',
            content_length: 4
          },
          taskState: 'Assigned',
          viewInternalData: {
            status: 'DUE',
            icon: 'history',
            iconStyle: {
              color: 'orange'
            }
          },
          assignee: 'hank',
          taskName: 'Approve Travel request',
          attachment_taskinputdata: {
            content_type: 'text/plain; charset=ISO-8859-1',
            language: 'et',
            content: '{\n  "TravelRequest" : {\n    "TravellerDetails" : {\n      "RequestDate" : "2020-11-10",\n      "Requestor" : "admin",\n      "Traveller" : [ {\n        "Name" : "frans",\n        "Email" : "frans@spronq.com",\n        "Nationality" : "NL",\n        "PassNo" : "hjio9we"\n      } ]\n    },\n    "TravelDetails" : {\n      "Destination" : [ {\n        "Country" : "BE",\n        "City" : "brussel"\n      } ],\n      "DepartureDate" : "2020-11-16",\n      "ReturnDate" : "2020-11-23",\n      "DeparturePoint" : "amsterdam",\n      "ReturnPoint" : "amsterdam",\n      "Purpose" : "werk",\n      "Justification" : "werk",\n      "Comments" : "none"\n    },\n    "Meeting" : {\n      "StartDate" : "2020-11-17",\n      "StartTime" : "09:21:06",\n      "EndDate" : "2020-11-21",\n      "EndTime" : "17:21:15",\n      "DurationIncLeave" : 8\n    },\n    "Transport" : {\n      "ModeOfTransport" : "Shuttle",\n      "POMVMake" : "123",\n      "POMVLicense" : "123"\n    },\n    "Project" : {\n      "IMIS-code" : "123",\n      "IMIS-activity-code" : "123",\n      "Manager" : "hank",\n      "ChiefServiceLine" : "suzy",\n      "Assistant" : "suzannetest"\n    }\n  },\n  "DueDate" : "2020-11-15T00:00:00Z",\n  "Assignee" : "hank"\n}',
            content_length: 1180
          },
          owner: 'hank',
          role: 'Approver',
          id: '567b7e00_e2f4_4eed_bce5_b0a562792d53',
          createdBy: 'admin',
          lastModified: '2020-11-10T08:22:06.765900095Z'
        }
      ],
      sortKey: 'dueDate',
      sortDesc: true,
      error: {
        message: '',
        isError: false
      },
      taskAction: {
        onGoing: false,
        error: {
          message: '',
          isError: false
        }
      }
    },
    filters: {
      currentTasksFilter: {
        id: 'myTasks',
        label: 'My Tasks',
        filter: [
          'myTasks'
        ]
      },
      tasksFilterTypes: [
        {
          id: 'myTasks',
          icon: 'view_list',
          label: 'My Tasks',
          color: '#388AC3',
          filter: [
            'myTasks'
          ],
          type: 'claimed'
        },
        {
          id: 'groupTasks',
          icon: 'assignment_ind',
          label: 'Unclaimed Tasks',
          color: '#ACCFEB',
          filter: [
            'unassigned'
          ],
          type: 'unclaimed'
        }
      ]
    },
    queryParams: {},
    stats: {
      isFetching: false,
      stats: {
        claimed: 4,
        unclaimed: 23
      },
      error: {
        message: '',
        isError: false
      }
    }
  },
  task: {
    isFetching: false,
    redirectToCase: false,
    taskDetails: {},
    error: {
      message: '',
      isError: false
    },
    transition: {
      onGoing: false,
      success: false,
      error: {
        message: '',
        isError: false
      }
    },
    save: {
      onGoing: false,
      error: {
        message: '',
        isError: false
      }
    }
  },
  case: {
    case: {
      isFetching: false,
      item: {},
      error: {
        isError: false,
        message: ''
      }
    },
    attachments: {
      isFetching: false,
      items: [],
      error: {
        isError: false,
        message: ''
      }
    },
    completedTasks: {
      isFetching: false,
      items: [],
      error: {
        isError: false,
        message: ''
      }
    },
    activeTasks: {
      isFetching: false,
      items: [],
      error: {
        isError: false,
        message: ''
      }
    },
    discretionaryItems: {
      isFetching: false,
      items: [],
      error: {
        isError: false,
        message: ''
      }
    },
    caseTeam: {
      isFetching: false,
      items: [],
      error: {
        isError: false,
        message: ''
      }
    }
  },
  casemodel: {
    details: {
      showFeedbackForm: false,
      error: {
        message: '',
        isError: false
      },
      data: {},
      actionError: {
        message: '',
        isError: false
      },
      isFetching: false
    },
    list: {
      isFetching: false,
      position: 0,
      filterString: '',
      items: [],
      error: {
        message: '',
        isError: false
      }
    },
    caseTeam: {
      roles: {},
      user: null,
      isSelected: null
    }
  },
  schemaForm: {
    status: 'initial',
    formData: {
      title: 'First task',
      done: true,
      birth: '2015-10-10',
      time: '22:55'
    }
  },
  form: {
    UserProfile: {
      values: {
        name: 'suzy',
        email: 'hank@travelatwork.com',
        avatarLastModified: '',
        roles: [
          'Requestor',
          'PersonalAssistant',
          'deTozoControleur'
        ],
        uniqueId: 'hank'
      },
      initial: {
        name: 'suzy',
        email: 'hank@travelatwork.com',
        avatarLastModified: '',
        roles: [
          'Requestor',
          'PersonalAssistant',
          'deTozoControleur'
        ],
        uniqueId: 'hank'
      }
    }
  },
  searchResult: {
    isFetching: false,
    sortKey: 'score',
    sortDesc: false,
    position: 0,
    items: [],
    error: {
      message: '',
      isError: false
    }
  },
  userSelector: {
    isFetching: false,
    USERS_SELECTOR: [],
    filterUSERS_SELECTOR: [],
    error: {
      message: '',
      isError: false
    }
  },
  caseList: {
    isFetching: false,
    position: 0,
    items: [],
    filterText: '',
    columns: [
      {
        label: 'ID',
        key: 'caseInstanceId',
        visible: false
      },
      {
        label: 'Name',
        key: 'definition',
        visible: true
      },
      {
        label: 'Status',
        key: 'currentState',
        visible: true
      },
      {
        label: 'Milestone',
        key: 'currentMileStone',
        visible: true
      },
      {
        label: 'Parent',
        key: 'parentCaseId',
        visible: false
      },
      {
        label: 'Modified By',
        key: 'lastModifiedBy',
        visible: true
      },
      {
        label: 'Modified At',
        key: 'lastModified',
        visible: true
      }
    ],
    error: {
      message: '',
      isError: false
    }
  },
  routing: {
    locationBeforeTransitions: {
      pathname: '/tasks',
      search: '',
      hash: '',
      state: null,
      action: 'REPLACE',
      key: null,
      query: {},
      $searchBase: {
        search: '',
        searchBase: ''
      }
    }
  }
}
;
