import { CollectionAfterChangeHook } from 'payload'

import { renderUserAcknowledgmentEmail } from '@/payload/blocks/Contact/email-templates/ContactEmailForUser'

const OPERATION = 'create'
export const ContactEmailToUser: CollectionAfterChangeHook = async ({
  operation,
  doc,
  req,
}) => {
  if (operation === OPERATION) {
    req.payload.sendEmail({
      to: doc.email,
      from: process.env.RESEND_SENDER_EMAIL,
      subject: `Hello ${doc.name}, Thanks for contacting us!`,
      html: renderUserAcknowledgmentEmail({
        userName: doc.name,
      }),
    })
  }
}
