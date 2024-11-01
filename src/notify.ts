// notifications.ts
export const requestNotificationPermission = async () => {
  if (Notification.permission === 'default') {
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        console.log('Notifications enabled!');
        // Optional: Show a notification as confirmation
        new Notification('Notifications enabled!');
      } else {
        console.log('Notifications permission denied');
      }
    } catch (error) {
      console.error('Error requesting notifications permission:', error);
    }
  } else if (Notification.permission === 'denied') {
    alert(
      'Notifications are currently blocked. Please enable them in your browser settings if you want to receive updates.'
    );
  }
};
