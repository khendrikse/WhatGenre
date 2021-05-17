import React from 'react';
import PropTypes from 'prop-types';

function Notification({ notification }) {
  if (!notification || !notification.message) return null;

  return (
    <div className='notification-container'>
      <p style={{ color: notification.type === 'error' ? 'red' : 'green' }}>
        {notification.message}
      </p>
    </div>
  );
}

Notification.propTypes = {
  notification: PropTypes.shape({
    type: PropTypes.oneOf(['warning', 'error', 'success']),
    message: PropTypes.string
  })
};

export default Notification;
