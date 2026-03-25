import LegalPage from '../components/layout/LegalPage'

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      subtitle="Your guide to understanding how we manage your personal information with transparency and care."
      sections={[
        {
          heading: 'Who This Policy Applies To',
          body: [
            { type: 'p', text: 'This Privacy Notice pertains to a diverse range of individuals, including current, former, and potential customers, users of our services, recipients of our products, visitors to our official websites or stores, and members of our loyalty programs or communities.' }
          ]
        },
        {
          heading: 'Defining Personal Data',
          body: [
            { type: 'p', text: 'Personal data encompasses information that can be directly or indirectly linked to you. This includes — but is not limited to — your name, address, email address, telephone number, payment information, and purchase history. Additionally, data such as usage patterns, IP addresses, and member IDs also fall under personal data.' }
          ]
        },
        {
          heading: 'Our Responsibility for Your Data',
          body: [
            { type: 'p', text: 'Within the framework of the Marvel Deals Group, the entity responsible for processing your personal data varies based on the specific purpose for which the data is collected. Primarily, <strong>Marvel Deals LLC</strong> is responsible for overseeing most of the personal data processing described in this Privacy Notice.' }
          ]
        },
        {
          heading: 'When Your Personal Data is Processed',
          body: [
            { type: 'p', text: 'Our collection, processing, use, and storage of personal data is strictly governed by valid lawful bases:' },
            { type: 'ul', items: [
              '<strong>Consent:</strong> When you explicitly grant us consent, we will process your personal data for the precise purpose you\'ve provided consent for — particularly relevant when you choose to receive our newsletters.',
              '<strong>Contract:</strong> We process the necessary personal data to fulfil contractual obligations, such as a purchase agreement, and to meet related responsibilities.',
              '<strong>Legitimate Interest:</strong> We may process your personal data to serve our legitimate interests, provided our interests do not override your individual rights. This includes customer support, product enhancement, and fraud prevention.',
              '<strong>Legal Requirement:</strong> When processing your personal data is essential to fulfil legal obligations in the country of operation.',
            ]}
          ]
        },
        {
          heading: 'Safeguarding Minors',
          body: [
            { type: 'p', text: 'Our websites do not intentionally collect personal data directly from minors. If we happen to come into possession of such information inadvertently, we will promptly delete it from our records.' }
          ]
        },
        {
          heading: 'EU & EMEA Compliance',
          body: [
            { type: 'highlight', text: 'Soul Love &amp; Earth operates in accordance with the data protection laws and regulations of the European Union (EU) and the Europe, Middle East, and Africa (EMEA) region.' },
            { type: 'ul', items: [
              '<strong>Data Collection:</strong> We collect personal information from you when you voluntarily provide it — such as when you create an account, place an order, or contact us for support.',
              '<strong>Data Sharing:</strong> We may share your personal information with third-party service providers (payment processors, shipping companies, marketing partners) to facilitate our Services.',
              '<strong>Data Transfer:</strong> Your personal information may be transferred outside the EU/EMEA region. We take appropriate safeguards including use of standard contractual clauses approved by the European Commission.',
              '<strong>Data Retention:</strong> We retain your personal information for as long as necessary to fulfill the outlined purposes, unless a longer retention period is required by law.',
              '<strong>Your Rights:</strong> You have the right to access, correct, or delete your personal information, and to object to or restrict processing as permitted by applicable law.',
            ]}
          ]
        },
        {
          heading: 'Updates to This Policy',
          body: [
            { type: 'p', text: 'We may update this Privacy Policy from time to time to reflect changes in our practices or applicable law. We will notify you of any material changes by posting the updated version on our website.' },
            { type: 'p', text: 'By using our Services, you consent to the collection, use, and processing of your personal information as described in this Privacy Policy.' }
          ]
        }
      ]}
    />
  )
}
