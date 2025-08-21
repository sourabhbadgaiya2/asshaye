import React from 'react';
import { Layout } from '../../layouts/Layout';

const PrivacyPolicy = () => {
  // Inline styles
  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '7vh auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      lineHeight: '1.6',
      color: '#333'
    },
    header: {
      // textAlign: 'center',
      marginBottom: '20px'
    },
    title: {
      fontSize: '32px',
      fontWeight: 'bold',
      color: '#2c3e50',
      marginBottom: '10px'
    },
    subtitle: {
      fontSize: '16px',
      color: '#7f8c8d'
    },
    contentBox: {
      backgroundColor: '#fff',
      borderRadius: '8px',
      padding: '30px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    },
    section: {
      marginBottom: '30px'
    },
    sectionTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#2c3e50',
      marginBottom: '15px'
    },
    subsectionTitle: {
      fontSize: '18px',
      fontWeight: '500',
      margin: '15px 0 10px 10px'
    },
    divider: {
      border: 'none',
      height: '1px',
      backgroundColor: '#ecf0f1',
      margin: '25px 0'
    },
    list: {
      paddingLeft: '20px',
      margin: '10px 0'
    },
    listItem: {
      marginBottom: '8px'
    },
    link: {
      color: '#3498db',
      textDecoration: 'none'
    }
  };

  return (
      <Layout header={9} footer={1}>
    <div   style={styles.container}>
      {/* You can add this to your index.html instead */}
        <h4 id='margin-top' className=' mt-5 d-none d-sm-block td_section_subtitle_up td_fs_24 td_semibold td_spacing_1  text-uppercase td_accent_color'>
          Privacy Policy - Aashayein Judiciary
          </h4>

      <meta name="description" content="Learn how Aashayein Judiciary collects, uses, and protects your personal information." />

      <div  style={styles.header}>
        <h1  style={styles.title}>Privacy Policy</h1>
        <p style={styles.subtitle}>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>

      <div style={styles.contentBox}>
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>1. Introduction</h2>
          <p>Aashayein Judiciary ("we," "us," or "our") is committed to protecting the privacy of our users. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you visit our website, alec.co.in (the "Site"), and utilize our services, including payments processed through Razorpay. By using the Site, you consent to the practices described in this policy.</p>
        </section>

        <hr style={styles.divider} />

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>2. Information We Collect</h2>
          <p>We collect information from you in various ways, including:</p>

          <div style={{ marginLeft: '15px' }}>
            <h3 style={styles.subsectionTitle}>Personal Information:</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}>When you register for an account, we may collect your name, email address, phone number, and other contact details.</li>
              <li style={styles.listItem}>When you make a payment through Razorpay, we collect information necessary to process the transaction, which may include your billing address and payment details.</li>
              <li style={styles.listItem}>When you communicate with us through email or other channels, we collect the information you provide.</li>
            </ul>

            <h3 style={styles.subsectionTitle}>Payment Information:</h3>
            <p>We use Razorpay, a third-party payment processor, to handle payment transactions. We do not store your full credit card or bank account details. Razorpay's privacy policy applies to the processing of your payment information. We only store transaction ID and transaction status from Razorpay for our records.</p>

            <h3 style={styles.subsectionTitle}>Usage Information:</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}>We collect information about how you use the Site, including your IP address, browser type, operating system, and pages visited.</li>
              <li style={styles.listItem}>We may use cookies and similar technologies to collect this information.</li>
            </ul>

            <h3 style={styles.subsectionTitle}>Educational Information:</h3>
            <p>Information related to courses purchased and user progress.</p>
          </div>
        </section>

        <hr style={styles.divider} />

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>3. How We Use Your Information</h2>
          <p>We use your information for various purposes, including:</p>
          <ul style={styles.list}>
            <li style={styles.listItem}>To process payments and provide our services.</li>
            <li style={styles.listItem}>To create and manage your account.</li>
            <li style={styles.listItem}>To communicate with you about your account, services, and updates.</li>
            <li style={styles.listItem}>To improve our Site and services.</li>
            <li style={styles.listItem}>To provide customer support.</li>
            <li style={styles.listItem}>To comply with legal obligations.</li>
            <li style={styles.listItem}>To track user progress in courses.</li>
          </ul>
        </section>

        {/* Continue with all other sections following the same pattern */}

        <hr style={styles.divider} />

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>13. Governing Law and Jurisdiction</h2>
          <p>This Privacy Policy shall be governed by and construed in accordance with the laws of India. Any disputes arising under this Privacy Policy shall be subject to the exclusive jurisdiction of the courts located in Bhopal, Madhya Pradesh, India.</p>
        </section>

        <hr style={styles.divider} />

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at:</p>
          <p><strong>Email:</strong> <a href="mailto:management@alec.co.in" style={styles.link}>management@alec.co.in</a></p>
          <p><strong>Address:</strong> 3rd Floor, Radhika Heights, 284, in front of APT House, Zone-II, Maharana Pratap Nagar, Bhopal, Madhya Pradesh 462011</p>
          <p><strong>Contact:</strong> +91 9691073595</p>
        </section>
      </div>
    </div>
    </Layout>
  );
};

export default PrivacyPolicy;