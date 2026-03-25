import LegalPage from '../components/layout/LegalPage'

export default function ReviewTermsPage() {
  return (
    <LegalPage
      title="Terms for Customer Reviews"
      subtitle="When you write a review, you're helping our community make better choices. Here's how we use and manage reviews."
      sections={[
        {
          heading: 'License You Grant Us',
          body: [
            { type: 'p', text: 'When you submit a customer review using our Customer Rate and Review service for any of our products, you provide <strong>Marvel Deals LLC (Soul Love and Earth)</strong> with a non-exclusive, royalty-free, global license to utilize your written reviews for marketing and advertising purposes.' },
            { type: 'p', text: 'This includes, but is not limited to, usage in our online store, newsletters, catalogs, emails, customer communications, store materials, and other promotional endeavours.' }
          ]
        },
        {
          heading: 'Review Evaluation & Publication',
          body: [
            { type: 'p', text: 'You grant Soul Love and Earth, a unit of Marvel Deals LLC, the authority to evaluate the reviews before publication. We will only publish comments that offer <strong>pertinent insights into a product</strong>, aiding fellow customers in making informed choices.' },
            { type: 'highlight', text: 'Comments of a generally inappropriate nature, featuring indecent or unsuitable language, or revealing personally identifiable information will <strong>not be published</strong>.' }
          ]
        },
        {
          heading: 'Language & Review Removal',
          body: [
            { type: 'p', text: 'Marvel Deals LLC communicates in the local language(s) specific to each market. We retain the right to remove any customer review at our discretion, particularly if:' },
            { type: 'ul', items: [
              'The comment violates the aforementioned guidelines.',
              'The product is no longer available.',
              'The comment has become outdated.',
            ]}
          ]
        },
        {
          heading: 'Release of Claims',
          body: [
            { type: 'p', text: 'By agreeing to these terms, you release Marvel Deals LLC from any obligation to compensate you for the utilization of your content and any associated copyrights. Furthermore, you release, indemnify, and hold Marvel Deals LLC and its representatives harmless from any and all claims, demands, and liabilities related to the usage of customer reviews as described above.' }
          ]
        },
        {
          heading: 'Changes to These Review Terms',
          body: [
            { type: 'p', text: 'Marvel Deals LLC reserves the prerogative to modify these terms periodically without prior notification. However, the terms accessible to you on <a href="https://soullovenearth.com" style="color: var(--color-teal-600);">soullovenearth.com</a> at the time of submitting your review will be applicable to that particular review.' },
            { type: 'p', text: 'We recommend saving a copy of these terms, as we are unable to store or provide previous versions.' }
          ]
        }
      ]}
    />
  )
}
