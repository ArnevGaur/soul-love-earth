import LegalPage from '../components/layout/LegalPage'

export default function ReturnPolicyPage() {
  return (
    <LegalPage
      title="Return Policy"
      subtitle="We want you to love your purchase. Here's how our returns process works — simple and hassle-free."
      sections={[
        {
          heading: 'Your Right to Return',
          body: [
            { type: 'highlight', text: 'You have the right to return any or all items from your order within <strong>5 days of receiving it</strong>, for any reason.' }
          ]
        },
        {
          number: '1', heading: 'Initiating a Return Online',
          body: [
            { type: 'p', text: 'You should have a profile with us to initiate a refund online. Simply sign up at the time of shopping or post shopping.' },
            { type: 'ul', items: [
              'Log in to your account on our Online Store.',
              'Navigate to <strong>"My Orders"</strong> on your account page.',
              'Select the specific order you wish to return.',
              'Choose the item(s) you want to return and submit your request.',
              'Once your request is approved, place the item(s) securely in the original packaging and hand it over to the designated delivery person for pick-up.',
            ]}
          ]
        },
        {
          number: '2', heading: 'Alternative Return Arrangements',
          body: [
            { type: 'p', text: 'If you prefer an alternative method for returning your item(s), please get in touch with our Customer Service team via email, WhatsApp, or any preferred social media DM.' }
          ]
        },
        {
          number: '3', heading: 'Return Requirements',
          body: [
            { type: 'ul', items: [
              'Ensure that the returned item(s) are correct and complete; failure to do so may result in processing delays.',
              'We can only accept returns for items <strong>purchased from the Soul Love and Earth online store</strong>. Items purchased from our physical stores should not be included in the return parcel.',
            ]}
          ]
        },
        {
          number: '4', heading: 'Refund Process',
          body: [
            { type: 'ul', items: [
              'Upon approval of your return request, we will process your refund, excluding the delivery cost.',
              'If you choose to keep certain items from your order and only return a portion, the delivery cost will not be refunded.',
              'Your refund will be credited to the <strong>same payment method</strong> used for the original purchase within <strong>30 days</strong> of receiving the returned items.',
            ]}
          ]
        },
        {
          number: '5', heading: 'Condition of Returned Items',
          body: [
            { type: 'ul', items: [
              'We will provide a <strong>full refund</strong> for any returned item that is in the same condition as when you received it.',
              'Items that have been damaged, soiled, washed, altered, or worn (except for trying on) to an extent that reduces their value will <strong>not be eligible</strong> for a refund.',
            ]}
          ]
        },
        {
          number: '6', heading: 'Exceptions',
          body: [
            { type: 'p', text: 'Please note that the right of withdrawal and return <strong>does not apply</strong> to certain products if the seal has been removed. This includes items such as beauty products and cosmetics, due to health protection and hygiene reasons.' }
          ]
        },
        {
          heading: undefined,
          body: [
            { type: 'p', text: 'Thank you for choosing Soul Love and Earth, a unit of <strong>Marvel Deals LLC</strong>. Your trust and support mean the world to us.' }
          ]
        }
      ]}
    />
  )
}
