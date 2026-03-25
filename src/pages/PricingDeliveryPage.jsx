import LegalPage from '../components/layout/LegalPage'

export default function PricingDeliveryPage() {
  return (
    <LegalPage
      title="Pricing & Delivery Charges"
      subtitle="Transparent pricing, free UAE delivery, and affordable international shipping — here's everything you need to know."
      sections={[
        {
          number: '1', heading: 'Pricing',
          body: [
            { type: 'ul', items: [
              'Our <strong>Online Store proudly displays prices that include the applicable VAT or Goods and Services Tax (GST)</strong>, ensuring compliance with all relevant regulations. However, these prices do not include the delivery charge.',
              'As you proceed to checkout, you\'ll see the <strong>total cost of your purchase</strong>, including the delivery charge.',
            ]}
          ]
        },
        {
          number: '2', heading: 'Online Store vs. Physical Stores',
          body: [
            { type: 'p', text: 'Please be aware that prices in our Online Store may differ from those in our physical retail locations. We work diligently to offer competitive pricing across all platforms, but variations may occur due to operational differences.' }
          ]
        },
        {
          number: '3', heading: 'Delivery Charges',
          body: [
            { type: 'highlight', text: '🎉 <strong>FREE Delivery across the UAE!</strong> It\'s our way of showing appreciation for your local support.' },
            { type: 'p', text: 'For our international customers, we provide delivery at very nominal rates. Rest assured, we strive to keep these international shipping charges as affordable as possible, ensuring a seamless shopping experience no matter where you are in the world.' }
          ]
        },
        {
          number: '4', heading: 'Promotions & Discounts',
          body: [
            { type: 'ul', items: [
              'Periodically, Soul Love and Earth runs promotions, provides <strong>discount codes</strong>, and offers complimentary gifts to express our gratitude to you, our esteemed patrons.',
              'These offers come with specific validity periods and are subject to terms and conditions as outlined with each promotion.',
              'Unless expressly stated otherwise in the Online Store, these offers <strong>cannot be combined</strong> with other discounts.',
              'To take advantage of a discount code or promotional offer, ensure that you enter the code during the checkout process.',
            ]}
          ]
        },
        {
          heading: undefined,
          body: [
            { type: 'p', text: 'We are committed to delivering exceptional products and outstanding service, whether you\'re right here in the UAE or shopping internationally. Should you have any questions or require further information, please write us at <a href="mailto:support@soullovenearth.com" style="color: var(--color-teal-600); text-decoration: none;">support@soullovenearth.com</a>.' },
            { type: 'p', text: 'Your satisfaction remains our top priority. — Soul Love and Earth, a unit of <strong>Marvel Deals LLC</strong> (copyright registered commercial trade license since 2017).' }
          ]
        }
      ]}
    />
  )
}
