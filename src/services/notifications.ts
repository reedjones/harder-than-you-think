

// notifications.ts
export async function requestNotificationPermission() {
  if (Notification.permission === 'default') {
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        console.log('Notifications enabled!');
        // Optional: Show a notification as confirmation
        new Notification('Notifications enabled!');
        return true;
      } else {
        console.log('Notifications permission denied');
        return false;
      }
    } catch (error) {
      console.error('Error requesting notifications permission:', error);
      return false;
    }
  } else if (Notification.permission === 'denied') {
    alert(
      'Notifications are currently blocked. Please enable them in your browser settings if you want to receive updates.'
    );
    return false
  }
};





export async function showNotification(title: string, options?: NotificationOptions) {
  if (!('Notification' in window)) {
    console.warn('This browser does not support notifications');
    return;
  }
  console.log("prepare for notification")
  const registration = await navigator.serviceWorker.ready;
  if (Notification.permission === 'granted') {
    console.log("premisisons grandted")
    registration.showNotification(title, {
      badge: '/badge-72x72.png',
      icon: '/icon-192x192.png',
      ...options
    });
    console.log("sent")
  } else {
    console.warn("no premissions")
  }
  console.log("here")
}