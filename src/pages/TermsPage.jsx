import LegalPage from '../components/layout/LegalPage'

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      subtitle="What you can expect from us, and what we expect from you. A fair and transparent agreement for a better shopping experience."
      sections={[
        {
          heading: 'Welcome',
          body: [
            { type: 'p', text: 'When we mention "us," "we," or "Marvel Deals," we\'re referring to the collaborative efforts of all brands under <strong>Soul Love and Earth, a unit of Marvel Deals LLC</strong>. These terms and conditions come into effect when you choose to place an order through our digital gateway, <a href="https://www.soullovenearth.com" style="color: var(--color-teal-600);">www.soullovenearth.com</a>.' },
            { type: 'p', text: 'By proceeding with your order, you embrace the binding nature of these terms and conditions, hereafter referred to as the <strong>"Terms."</strong> We encourage you to take a moment to absorb and grasp these Terms before finalizing your order.' }
          ]
        },
        {
          number: '1', heading: 'Age and Eligibility',
          body: [
            { type: 'p', text: 'You must be of legal age — at least <strong>18 years or older</strong>. If you are below 18, you\'re welcome to explore our Online Store with the guidance and presence of a parent or guardian.' },
            { type: 'p', text: 'Additionally, a valid email address and a delivery address in the UAE are prerequisites for engaging with us.' }
          ]
        },
        {
          number: '2', heading: 'Orders and Commercial Activities',
          body: [
            { type: 'p', text: 'Our platform isn\'t specifically designed for corporate, commercial, or self-employed transactions. We don\'t generate commercial Goods and Services Tax (GST) invoices for corporate use; however, we do offer goods and supplies for corporate and commercial use.' }
          ]
        },
        {
          number: '3', heading: 'Upholding Our Online Experience',
          body: [
            { type: 'p', text: 'We\'re committed to offering you an exceptional online journey. To ensure this, it\'s essential that you abstain from activities that could harm our business, products, or services. This involves:' },
            { type: 'ul', items: [
              'Refraining from posting, transmitting, redistributing, uploading, or promoting content that could negatively impact us.',
              'Avoiding any actions that hinder other users\' access or security of the site.',
              'Not manipulating or extracting content using mechanisms like spiders, bots, or scripts.',
            ]},
            { type: 'p', text: 'We reserve the right to bar access and close accounts of users breaching these terms or acting against the interests of Marvel Deals LLC.' }
          ]
        },
        {
          number: '4', heading: 'Authorized Online Stores',
          body: [
            { type: 'p', text: 'Our products are exclusively available through our Online Store and designated online marketplaces, collectively termed as <strong>"Authorized Online Stores."</strong>' },
            { type: 'highlight', text: 'We don\'t oversee, endorse, or assume responsibility for products proposed by third parties or agents on websites other than our Authorized Online Stores. Any transactions with these parties are undertaken at your own risk.' }
          ]
        },
        {
          heading: 'Changes to These Terms',
          body: [
            { type: 'p', text: 'As our journey together progresses, our Terms may evolve. Rest assured, the Terms applicable at the time of your purchase shall remain in effect solely for that transaction. Any amendments will be incorporated in the most recent version accessible on our Online Store.' },
            { type: 'p', text: 'By purchasing our goods, you accept the prices and delivery charges, return policy and other legal obligations of online purchasing.' }
          ]
        }
      ]}
    />
  )
}
