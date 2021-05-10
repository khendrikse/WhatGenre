import React from 'react';
import PropTypes from 'prop-types';

function Notification({ notification }) {
  if (!notification || !notification.message) return null;

  return (
    <p style={{ color: notification.type === 'error' ? 'red' : 'green' }}>
      {notification.message}
    </p>
  );
}

Notification.propTypes = {
  notification: PropTypes.shape({
    type: PropTypes.oneOf(['warning', 'error', 'success']),
    message: PropTypes.string
  })
};

export default Notification;
