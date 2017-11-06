import React from 'react';
import { FormattedMessage } from 'react-intl';

import intlKeys from 'translations';

const Hello = () => {
  return (
    <FormattedMessage
      id={intlKeys.example.test}
      values={{
        name: 'World',
      }}
    />
  );
};

export default Hello;
