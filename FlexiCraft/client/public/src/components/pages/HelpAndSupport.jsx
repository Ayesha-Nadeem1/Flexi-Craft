import React from 'react'
import WithLayout_User from '../shared/Layout'

const HelpSupport = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <h1 className="text-4xl text-neutral-900 font-bold mb-8 text-center mt-20">Help & Support</h1>

      {/* Introduction */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-neutral-900">Welcome to Help & Support</h2>
        <p className="text-gray-700">
          We are here to assist you with any questions or issues you may have. Browse through our
          frequently asked questions, or feel free to reach out to us directly for further support.
        </p>
      </section>

      {/* FAQs */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-neutral-900">Frequently Asked Questions</h2>

        <div className="mb-6">
          <h3 className="text-xl font-medium text-indigo-700 mb-2">How do I reset my password?</h3>
          <p className="text-gray-600">
            To reset your password, go to the login page and click on the "Forgot Password" link.
            Enter your email address, and you will receive a link to reset your password.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-medium text-indigo-700 mb-2">How can I change my username?</h3>
          <p className="text-gray-600">
            You can change your username by going to the Settings page. Navigate to the "Username"
            section, enter your new desired username, and click "Save Changes."
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-medium text-indigo-700 mb-2">Where can I find my account settings?</h3>
          <p className="text-gray-600">
            Account settings can be found by clicking on your profile picture or username in the top
            right corner and selecting "Settings" from the dropdown menu.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-medium text-indigo-700 mb-2">What should I do if I encounter a bug?</h3>
          <p className="text-gray-600">
            If you encounter a bug, please report it to us by emailing our support team. Include as
            much detail as possible, including screenshots if applicable, to help us resolve the
            issue promptly.
          </p>
        </div>
      </section>

      {/* Common Issues */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-neutral-900">Common Issues</h2>

        <div className="mb-6">
          <h3 className="text-xl font-medium text-red-600 mb-2">I can't log in to my account.</h3>
          <p className="text-gray-600">
            If you are having trouble logging in, make sure you are using the correct email and
            password. If you've forgotten your password, you can reset it using the "Forgot Password"
            link on the login page.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-medium text-red-600 mb-2">My account has been hacked.</h3>
          <p className="text-gray-600">
            If you believe your account has been hacked, immediately change your password and enable
            two-factor authentication (2FA). Contact our support team to report the incident and get
            further assistance.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-medium text-red-600 mb-2">I'm experiencing technical difficulties.</h3>
          <p className="text-gray-600">
            If you encounter technical issues, try clearing your browser cache and cookies. If the
            problem persists, try using a different browser or device. Contact our support team if
            you continue to experience difficulties.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-neutral-900">Contact Us</h2>
        <p className="text-gray-700">
          If you can't find the answer to your question, or if you need further assistance, please
          don't hesitate to reach out to our support team.
        </p>

        <div className="mt-6">
          <h3 className="text-xl font-medium mb-2 text-neutral-900">Email Support</h3>
          <p className="text-gray-600">
            You can contact us via email at{' '}
            <a
              href="mailto:support@yourdomain.com"
              className="text-indigo-600 hover:text-indigo-800"
            >
              support@yourdomain.com
            </a>. We aim to respond to all inquiries within 24 hours.
          </p>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-medium mb-2 text-neutral-900">Phone Support</h3>
          <p className="text-gray-600">
            If you prefer to speak to us directly, you can reach us at{' '}
            <a href="tel:+1234567890" className="text-indigo-600 hover:text-indigo-800">
              +1 (234) 567-890
            </a>. Our phone lines are open Monday to Friday, 9 AM to 5 PM (PST).
          </p>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-medium mb-2 text-neutral-900">Mailing Address</h3>
          <p className="text-gray-600">
            You can also reach us via mail at:
          </p>
          <p className="text-gray-600 mt-2">
            Your Company Name<br />
            1234 Street Name, Suite 5678<br />
            City, State, Zip Code<br />
            Country
          </p>
        </div>
      </section>
    </div>
  );
};

// Export the component with layout
export default WithLayout_User(HelpSupport);
