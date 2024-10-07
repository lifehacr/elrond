import { env } from '@env'
import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
  render,
} from '@react-email/components'

interface ResetPasswordEmailProps {
  userFirstName: string
  resetPasswordLink: string
}

const baseUrl = env.PAYLOAD_URL

const ResetPasswordTemplate = ({
  userFirstName,
  resetPasswordLink,
}: ResetPasswordEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Reset your password</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section>
            <Row style={header}>
              <Column>
                <Img
                  src={`${env.PAYLOAD_URL}/favicon.ico`}
                  width='40'
                  height='40'
                  alt='Emerald'
                />
              </Column>
              <Column>
                <Text style={title}>Emerald</Text>
              </Column>
            </Row>
            <Hr style={hr} />
          </Section>
          <Section style={infoSection}>
            <Text style={infoText}>Hello, {userFirstName}</Text>

            <Text style={infoText}>
              Here&apos;s the link to update your password
            </Text>

            <Button href={resetPasswordLink} style={button}>
              Reset password
            </Button>

            <Text className='dark:text-zinc-300'>
              If you don&apos;t want to change your password or didn&apos;t
              request this, just ignore and delete this message.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default ResetPasswordTemplate

export const ResetPassword = (props: ResetPasswordEmailProps) =>
  render(<ResetPasswordTemplate {...props} />, { pretty: true })

const infoSection = {
  marginBottom: '24px',
}

const header = {
  display: 'flex',
  alignItems: 'center',
  paddingTop: '10px',
}

const title = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#18181B',
  marginLeft: '10px',
}

const main = {
  backgroundColor: '#fff',
  color: '#18181B',
  margin: 'auto',
  padding: '10px 0px',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
}

const container = {
  maxWidth: '600px',
  backgroundColor: '#FAFAFA',
  margin: 'auto',
  padding: '24px',
}

const hr = {
  borderColor: '#334155',
  margin: '20px 0',
}

const infoText = {
  margin: '0 0 10px 0',
  fontSize: '14px',
  color: '#18181B',
  textAlign: 'left' as const,
}

const button = {
  fontSize: '16px',
  backgroundColor: '#7248E6',
  color: '#FAFAFA',
  lineHeight: 1.5,
  borderRadius: '8px',
  padding: '12px 24px',
  transition: 'background-color 0.2s ease-in-out',
  marginTop: '8px',
  marginBottom: '8px',
}
