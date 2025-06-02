import { Form, ErrorMessage, Field, Formik } from 'formik'
import * as Yup from 'yup'
import { SubDiv, SmallerDiv, Button, HeadingL } from './Styled'
import styled from 'styled-components'
import { PropTypes } from 'prop-types'

const FormStyled = styled(Form)`
  display: flex;
  flex-direction: column;
  height: 200px;
  justify-content: space-evenly;
`
const RedErrorMessage = styled.div`
  color: red;
  font-size: small;
`
const WrapField = styled.div`
  display: flex;
  flex-direction: column;
  text-align: start;
`

function Subscribe(props) {
  return (
    <>
      <HeadingL>{props.header}</HeadingL>
      <Formik
        initialValues={{ firstName: '', lastName: '', email: '' }}
        validationSchema={Yup.object({
          firstName: Yup.string().required('First Name is required'),
          lastName: Yup.string().required('Last Name is required'),
          email: Yup.string()
            .email('Invalid email adress')
            .required('Email is required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(
              `Thank you ${values.firstName} for subscribing to DailyPoems! Your first Poem will be sent to ${values.email} tomorrow.`
            )

            setSubmitting(false)
          }, 400)
        }}
      >
        <SubDiv>
          <SmallerDiv>
            <h2>Subscribe to DailyPoems</h2>
            <p>
              Get a daily poem by signing up below. Every day a poem will be
              sent to you to get you a moment och peace and thought.
            </p>
          </SmallerDiv>
          <FormStyled>
            <WrapField>
              <label htmlFor="firstName">First Name</label>
              <Field name="firstName" type="text" />
              <ErrorMessage name="firstName" component={RedErrorMessage} />
            </WrapField>

            <WrapField>
              <label htmlFor="lastName">Last Name</label>
              <Field name="lastName" type="text" />
              <ErrorMessage name="lastName" component={RedErrorMessage} />
            </WrapField>

            <WrapField>
              <label htmlFor="email">Email Adress</label>
              <Field name="email" type="email" />
              <ErrorMessage name="email" component={RedErrorMessage} />
            </WrapField>

            <Button type="submit">Submit</Button>
          </FormStyled>
        </SubDiv>
      </Formik>
    </>
  )
}
Subscribe.propTypes = {
  header: PropTypes.string,
}
export default Subscribe
