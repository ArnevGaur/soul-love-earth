import LegalPage from '../components/layout/LegalPage'

export default function ReportScamPage() {
  return (
    <LegalPage
      title="Report a Suspected Scam"
      subtitle="We are committed to protecting our customers. Here's how to identify and report suspicious activity involving our brand."
      sections={[
        {
          heading: 'Recognizing Scams',
          body: [
            { type: 'ul', items: [
              '<strong>Email Verification:</strong> When contacted via email, verify the sender\'s authenticity by checking for an official Soul Love and Earth email address. If uncertain, reach out to us so we can confirm the sender\'s legitimacy.',
              '<strong>Social Media Verification:</strong> If you suspect a social media account, ensure whether it\'s verified or not. Verified accounts and pages typically display a checkmark, signifying their authenticity.',
              '<strong>Payment Requests:</strong> With the exception of transactions on <a href="https://soullovenearth.com" style="color: var(--color-teal-600);">soullovenearth.com</a>, we will <strong>never</strong> solicit payments for participation in competitions, raffles, programs, or any similar initiatives.',
            ]}
          ]
        },
        {
          heading: 'Reporting Suspicious Activity',
          body: [
            { type: 'p', text: 'If you\'ve encountered an activity that raises suspicion, kindly report it to us.' },
            { type: 'ul', items: [
              'Include the <strong>URL linked to the suspicious website</strong> in your report.',
              'If the contact was through email, <strong>attach the original email</strong> to your report.',
            ]},
            { type: 'highlight', text: '📧 Send your report directly to <a href="mailto:support@soullovenearth.com" style="color: var(--color-teal-700); font-weight:600;">support@soullovenearth.com</a>' }
          ]
        },
        {
          heading: 'If You\'ve Fallen Victim',
          body: [
            { type: 'p', text: 'If you suspect you\'ve fallen victim to a scam, we strongly advise you to <strong>promptly inform your local law enforcement authorities</strong>.' },
            { type: 'p', text: 'Our Customer Service team is also available to provide support and guidance. Your security is our priority, and we — the Soul Love and Earth Team, under Marvel Deals LLC — are committed to assisting you in every possible way.' }
          ]
        }
      ]}
    />
  )
}
