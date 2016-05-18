const moment = require('moment');
const constant = require('./const');

const yesterday = moment().subtract(1, 'day');

const userOne = 'admin';
// const userTwo = 'otherUser';

module.exports = [
  {
    definition: 'TravelRequest',
    rootCaseId: 'd62dea32_62b8_4206_b12e_029436d75001',
    id: 'd62dea32_62b8_4206_b12e_029436d75001',
    plan: {
      items: [
        {
          isRequired: false,
          isRepeating: false,
          caseInstanceId: 'd62dea32_62b8_4206_b12e_029436d75001',
          name: 'TravelRequest',
          id: 'f6518fcc_be0d_4e51_ac38_7cdd4270f8fd',
          lastModified: yesterday,
          currentState: constant.CASE_STATES_ACTIVE,
          type: constant.CASE_TYPE_CASEPLAN,
          user: userOne,
          historyState: 'Null',
          transition: 'Create',
          stageId: null
        },
        {
          isRequired: false,
          isRepeating: false,
          caseInstanceId: 'd62dea32_62b8_4206_b12e_029436d75001',
          name: 'Request',
          id: '164bf41b_a1bc_4575_8c10_08b7b1f68f72',
          lastModified: yesterday,
          currentState: constant.CASE_STATES_ACTIVE,
          type: constant.CASE_TYPE_STAGE,
          user: userOne,
          historyState: 'Available',
          transition: 'Start',
          stageId: 'f6518fcc_be0d_4e51_ac38_7cdd4270f8fd'
        },
        {
          isRequired: false,
          isRepeating: false,
          caseInstanceId: 'd62dea32_62b8_4206_b12e_029436d75001',
          name: 'Request Travel',
          id: '6f684032_5c2b_4b58_beb6_e8ccbea18bd2',
          lastModified: yesterday,
          currentState: constant.CASE_STATES_ACTIVE,
          type: 'HumanTask',
          user: userOne,
          historyState: 'Available',
          transition: 'Start',
          stageId: '164bf41b_a1bc_4575_8c10_08b7b1f68f72'
        },
        {
          isRequired: false,
          isRepeating: false,
          caseInstanceId: 'd62dea32_62b8_4206_b12e_029436d75001',
          name: 'Approve',
          id: '1fbc2eca_49d2_4a76_a0cc_2ded3ad22cf1',
          lastModified: yesterday,
          currentState: constant.CASE_STATES_ACTIVE,
          type: constant.CASE_TYPE_STAGE,
          user: userOne,
          historyState: 'Null',
          transition: 'Create',
          stageId: 'f6518fcc_be0d_4e51_ac38_7cdd4270f8fd'
        },
        {
          isRequired: false,
          isRepeating: false,
          caseInstanceId: 'd62dea32_62b8_4206_b12e_029436d75001',
          name: 'Book',
          id: '64d5c828_2d0a_45e3_aaba_28391af94c16',
          lastModified: yesterday,
          currentState: constant.CASE_STATES_AVAILABLE,
          type: constant.CASE_TYPE_STAGE,
          user: userOne,
          historyState: 'Null',
          transition: 'Create',
          stageId: 'f6518fcc_be0d_4e51_ac38_7cdd4270f8fd'
        },
        {
          isRequired: false,
          isRepeating: false,
          caseInstanceId: 'd62dea32_62b8_4206_b12e_029436d75001',
          name: 'Invoice',
          id: 'ee299aaf_fe10_43e7_9149_e736771f903c',
          lastModified: yesterday,
          currentState: constant.CASE_STATES_AVAILABLE,
          type: constant.CASE_TYPE_STAGE,
          user: userOne,
          historyState: 'Null',
          transition: 'Create',
          stageId: 'f6518fcc_be0d_4e51_ac38_7cdd4270f8fd'
        }
      ]
    }
  }
];

