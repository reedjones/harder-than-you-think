export async function requestNotificationPermission() {
  if (!('Notification' in window)) {
    console.warn('This browser does not support notifications');
    return false;
  }

  const permission = await Notification.requestPermission();
  return permission === 'granted';
}

export function showNotification(title: string, options?: NotificationOptions) {
  if (!('Notification' in window)) {
    console.warn('This browser does not support notifications');
    return;
  }

  if (Notification.permission === 'granted') {
    return new Notification(title, {
      badge: '/badge-72x72.png',
      icon: '/icon-192x192.png',
      vibrate: [100, 50, 100],
      ...options,
    });
  }
}