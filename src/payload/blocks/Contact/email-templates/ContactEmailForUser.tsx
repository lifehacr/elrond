import { env } from '@env'
import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
  render,
} from '@react-email/components'

interface ContactFormForUserEmailProps {
  userName: string
}

const baseUrl = env.PAYLOAD_URL

export const ContactEmailForUser = ({
  userName,
}: ContactFormForUserEmailProps) => (
  <Html>
    <Head />
    <Preview>Successful Submission of Contact Details </Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`${baseUrl}/pubic/favicon.ico`}
          width='50'
          height='50'
          alt='Koala'
          style={logo}
        />
        <Text style={paragraph}>Hi {userName},</Text>
        <Text style={paragraph}>
          I would like to inform you that your contact details have been
          successfully submitted.
        </Text>
        <Section>
          <Button style={button} href={`${baseUrl}`}>
            ✦ &nbsp;Back To Site
          </Button>
        </Section>
        <Text style={paragraph}>
          Best,
          <br />
          Emerald team
        </Text>
        <Hr style={hr} />
        <Text style={footer}>#1148, South San Francisco, CA 94080</Text>
      </Container>
    </Body>
  </Html>
)

export const renderUserAcknowledgmentEmail = (
  props: ContactFormForUserEmailProps,
) => render(<ContactEmailForUser {...props} />, { pretty: true })

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
}

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
}

const hr = {
  borderColor: '#cccccc',
  margin: '20px 0',
}

const footer = {
  color: '#8898aa',
  fontSize: '12px',
}

const logo = {
  margin: '0 auto',
}

const button = {
  height: '40px',
  maxHeight: '40px',
  width: '100%',
  borderRadius: '8px',
  backgroundColor: '#5F51E8',
  fontSize: '14px',
  fontWeight: '500',
  color: '#fff',
  textAlign: 'center' as const,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}
