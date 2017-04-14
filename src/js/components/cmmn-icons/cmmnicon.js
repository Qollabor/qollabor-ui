import React from 'react';

const defaultBadgeStyle = {
  width: 'fit-content',
  borderRadius: '15px',
  padding: '3px 10px'
};

const CMMNIcon = ({ children, backgroundColor, itemName, className, showDescription, style }) => {
  const badgeStyle = Object.assign({}, defaultBadgeStyle, style, {
    backgroundColor
  });
  const cmmnItemMapping = getCMMNItemDetail(itemName);
  const classNameOrIconClass =
    className ?
    `${className} ${cmmnItemMapping.iconClass}`
    : cmmnItemMapping.iconClass;

  return (
    <label style={badgeStyle} title={cmmnItemMapping.description}>
      <span className={classNameOrIconClass} />
      {showDescription && cmmnItemMapping.description}
      {children}
    </label>
  );
};

const cmmnPrefix = 'cmmn-icon-';
const CMMNItemMappings = {
  milestone: {
    iconClass: `${cmmnPrefix}milestone`,
    description: 'Milestone'
  },
  stage: {
    iconClass: `${cmmnPrefix}stage`,
    description: 'Stage'
  },
  caseplan: {
    iconClass: `${cmmnPrefix}case-plan-model`,
    description: 'Case Plan'
  },
  humantask: {
    iconClass: `${cmmnPrefix}human-blocking-task`,
    description: 'Human Task'
  },
  casetask: {
    iconClass: `${cmmnPrefix}case-task`,
    description: 'Case Task'
  },
  processtask: {
    iconClass: `${cmmnPrefix}process-task`,
    description: 'Process Task'
  },
  decisiontask: {
    iconClass: `${cmmnPrefix}decision-task`,
    description: 'Decision Task'
  },
  userevent: {
    iconClass: `${cmmnPrefix}user-event-listener`,
    description: 'User Event'
  },
  timerevent: {
    iconClass: `${cmmnPrefix}timer-event-listener`,
    description: 'Timer Event'
  }
};

const getCMMNItemDetail = (itemName) => {
  if (!itemName) return {};
  let iconMapping = CMMNItemMappings[itemName.toLowerCase()];
  if (!iconMapping) {
    iconMapping = {
      iconClass: cmmnPrefix + itemName.toLowerCase(),
      description: itemName
    };
  }
  return iconMapping;
};

CMMNIcon.propTypes = {
  children: React.PropTypes.node,
  itemName: React.PropTypes.string,
  backgroundColor: React.PropTypes.string,
  className: React.PropTypes.string,
  showDescription: React.PropTypes.bool,
  style: React.PropTypes.object
};

export { CMMNIcon };
