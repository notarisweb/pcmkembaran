export default {
  name: 'pwa_subscription',
  title: 'PWA Subscriptions',
  type: 'document',
  fields: [
    { name: 'endpoint', type: 'string', title: 'Endpoint' },
    { name: 'keys', type: 'object', title: 'Keys', fields: [
      { name: 'p256dh', type: 'string' },
      { name: 'auth', type: 'string' }
    ]},
    { name: 'subscribedAt', type: 'datetime', title: 'Subscribed At' }
  ]
}