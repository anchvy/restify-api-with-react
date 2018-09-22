import mail from '@sendgrid/mail'
import { MAIL_SENDER } from '../configs/mail'
import { validateObjectValueExist } from '../utils/validate'

function initialMailService() {
  mail.setApiKey(process.env.SENDGRID_API_KEY)
}

async function send(sendData) {
  initialMailService()

  const { to, subject, html } = sendData
  const validateInfo = validateObjectValueExist({ to, subject, html })

  if (!validateInfo.isAllExist) {
    return false
  }

  return mail.send({
    from: MAIL_SENDER,
    to,
    subject,
    html,
  })
}

export default {
  send,
}
