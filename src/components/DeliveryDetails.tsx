import type { CheckoutFormValues } from '../types'

const deliveryLabels: Record<keyof CheckoutFormValues, string> = {
  fullName: 'Full name',
  email: 'Email',
  address: 'Address',
  city: 'City',
}
const fields = Object.keys(deliveryLabels) as Array<keyof CheckoutFormValues>

export default function DeliveryDetails({ delivery }: { delivery: CheckoutFormValues }) {
  return (
    <section aria-labelledby="delivery-heading" className="panel min-w-0 p-4 sm:p-6">
      <h2 id="delivery-heading" className="mb-5 text-xl font-semibold">Delivery details</h2>
      <dl className="space-y-4">
        {fields.map((field) => (
          <div key={field}>
            <dt className="text-sm text-muted">{deliveryLabels[field]}</dt>
            <dd className="break-words font-medium">{delivery[field]}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
